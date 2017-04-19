"use-strict";

const async = require("async");
const plugins = require.main.require("./src/plugins");
const privileges = require.main.require("./src/privileges");
const db = require.main.require("./src/database");
const groups = require.main.require('./src/groups');
const user = require.main.require('./src/user');
const websockets = require.main.require('./src/socket.io');
const _ = require("lodash");

const isOfficer = (uid, next) => {
  if (Array.isArray(uid)) {
    groups.isMembers(uid, 'officers', next);
  } else {
    groups.isMember(uid, 'officers', next);
  }
};

const createObject = (id, uid, { title, imageText, imageUrl, content, date, published, deleted }) => {
  const timestamp = Date.now();
  return {
    id, // number
    uid, // number
    title, // string
    imageText, // string
    imageUrl, //string
    content, // string
    date, // string (timestamp)
    timestamp, // number (timestamp)
    published: published ? 1 : 0,
    deleted: deleted || 0,
  };
};

const praseObject = (post) => {
  post.id = parseInt(post.id, 10);
  post.uid = parseInt(post.uid, 10);
  post.timestamp = parseInt(post.timestamp, 10);
  post.date = parseInt(post.date, 10);
  post.published = parseInt(post.published, 10) === 1;
  post.deleted = parseInt(post.deleted, 10);
  return post;
};

const createPost = (uid, data, next) => {
  const { title, imageText, content, date, published } = data;
  const timestamp = Date.now();

  let post;
  async.waterfall([
    (next) => {
      isOfficer(uid, next);
    },
    (canCreateNewPost, next) => {
      if (canCreateNewPost) {
        db.incrObjectField("mnl:global", "nextBlogPostId", next);
      } else {
        next(new Error("Unauthorized"));
      }
    },
    (id, next) => {
      post = createObject(id, uid, data);
      db.setObject("mnl:blog:post:" + id, post, next);
    },
    (next) => {
      async.parallel([
        (next) => {
          db.sortedSetsAdd([
            "mnl:blog:id",
          ], timestamp, post.id, next);
        },
        (next) => {
          // Add to published id set
          if (published && date) {
            db.sortedSetsAdd([
              "mnl:blog:pid",
            ], date, post.id, next);
          } else {
            next(null);
          }
        },
        (next) => {
          websockets.in("mnl.blog").emit('event:mnl.blog.post.created', post);
          next(null);
        }
      ], next);
    },

  ], (err) => {
    if (err) {
      next(err);
    } else {
      next(null, post);
    }
  });
};

const updatePost = (uid, data, next) => {
  const { id, date, published } = data;
  const timestamp = data.timestamp || Date.now();
  let post;
  async.waterfall([
    (next) => {
      isOfficer(uid, next);
    },
    (canCreateNewPost, next) => {
      if (canCreateNewPost) {
        next(null);
      } else {
        next(new Error("Unauthorized"));
      }
    },
    (next) => {
      post = createObject(id, uid, data);
      db.setObject("mnl:blog:post:" + post.id, post, next);
    },
    (next) => {
      async.parallel([
        (next) => {
          if (published && date) {
            db.sortedSetsAdd([
              "mnl:blog:pid",
            ], date, post.id, next);
          } else {
            db.sortedSetsRemove([
              "mnl:blog:pid",
            ], post.id, next);
          }
        },
        (next) => {
          websockets.in("mnl.admin").emit('event:mnl.blog.post.updated', post);
          next(null);
        }
      ], next);
    },

  ], (err, result) => {
    if (err) {
      next(err);
    } else {
      next(null, praseObject(post));
    }
  });
};

const saveBlogPost = (uid, data, next) => {
  if (data.id) {
    updatePost(uid, data, next);
  } else {
    createPost(uid, data, next);
  }
};

const getPublishedPosts = (uid, data, next) => {
  async.waterfall([
    (next) => {
      db.getSortedSetRevRange("mnl:blog:pid", 0, -1, next);
    },
    (ids, next) => {
      const keys = ids.map(id => "mnl:blog:post:" + id);
      db.getObjects(keys, next);
    },
    (data, next) => {
      if (!data || !data.length || !data[0]) {
        return next(null, []);
      }
      const posts = data.map(praseObject)
        .filter(post => post.deleted === 0);
      next(null, posts);
    },
  ], (err, result) => {
    if (err) {
      next(err);
    } else {
      next(null, result);
    }
  });
};

const getAllPosts = (uid, data, next) => {
  let posts;
  async.waterfall([
    (next) => {
      privileges.users.isAdministrator(uid, next);
    },
    (isAdmin, next) => {
      if (isAdmin) {
        next(null);
      } else {
        next(new Error("Unauthorized"));
      }
    },
    (next) => {
      db.getSortedSetRevRange("mnl:blog:id", 0, -1, next);
    },
    (ids, next) => {
      const keys = ids.map(id => "mnl:blog:post:" + id);
      db.getObjects(keys, next);
    },
    (data, next) => {
      if (!data || !data.length || !data[0]) {
        posts = [];
        return next(null, []);
      }
      posts = data.map(praseObject)
        .filter(post => post.deleted === 0);;
      uids = Object.keys(_.groupBy(posts, post => post.uid)).map(uid => parseInt(uid, 10));
      user.getUsersFields(uids, ['uid', 'username'], next);
    },
    (users, next) => {
      for (let post of posts) {
        const index = uids.indexOf(post.uid);
        post.author = users[index].username;
      }
      next(null, posts);
    }

  ], (err, result) => {
    if (err) {
      next(err);
    } else {
      next(null, result);
    }
  });
};

const deletePost = (uid, { id }, next) => {
  let apps;
  let uids;
  async.waterfall([
    (next) => {
      privileges.users.isAdministrator(uid, next);
    },
    (isAdmin, next) => {
      if (isAdmin) {
        next(null);
      } else {
        next(new Error("Unauthorized"));
      }
    },
    (id, next) => {
      db.setObjectField("mnl:blog:post:" + id, "deleted", 1, next);
    },
  ], (err, result) => {
    if (err) {
      next(err);
    } else {
      next(null, result);
    }
  });
};


module.exports = {
  saveBlogPost,
  getPublishedPosts,
  getAllPosts,
  deletePost,
};