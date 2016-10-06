var async = require('async');

var privileges = require.main.require('./src/privileges');
var plugins = require.main.require('./src/plugins');
var db = require.main.require('./src/database');

var Priviledges = {}

Priviledges.list = [
    {
        slug: "moonlight:roster:view",
        label: "View Roster"
    },
    {
        slug: "moonlight:roster:update",
        label: "Update Roster"
    }
]

module.exports = Priviledges;

module.exports = function (privileges) {
    privileges.roster = {};
    privileges.roster.list = function (callback) {
        var privilegeLabels = [
            { name: 'View Roster' },
            { name: 'Update Roster' }
        ];

        async.parallel({
            labels: function (next) {
                async.parallel({
                    users: async.apply(plugins.fireHook, 'filter:privileges.list_human', privilegeLabels),
                    groups: async.apply(plugins.fireHook, 'filter:privileges.groups.list_human', privilegeLabels)
                }, next);
            },
            users: function (next) {
                var userPrivileges;
                async.waterfall([
                    async.apply(plugins.fireHook, 'filter:privileges.list', privileges.userPrivilegeList),
                    function (_privs, next) {
                        userPrivileges = _privs;
                        groups.getMembersOfGroups(userPrivileges.map(function (privilege) {
                            return 'roster:privileges:' + privilege;
                        }), next);
                    },
                    function (memberSets, next) {

                        memberSets = memberSets.map(function (set) {
                            return set.map(function (uid) {
                                return parseInt(uid, 10);
                            });
                        });

                        var members = _.unique(_.flatten(memberSets));

                        user.getUsersFields(members, ['picture', 'username'], function (err, memberData) {
                            if (err) {
                                return next(err);
                            }

                            memberData.forEach(function (member) {
                                member.privileges = {};
                                for (var x = 0, numPrivs = userPrivileges.length; x < numPrivs; x++) {
                                    member.privileges[userPrivileges[x]] = memberSets[x].indexOf(parseInt(member.uid, 10)) !== -1;
                                }
                            });

                            next(null, memberData);
                        });
                    }
                ], next);
            },
            groups: function (next) {
                var groupPrivileges;
                async.waterfall([
                    async.apply(plugins.fireHook, 'filter:privileges.groups.list', privileges.groupPrivilegeList),
                    function (_privs, next) {
                        groupPrivileges = _privs;
                        groups.getMembersOfGroups(groupPrivileges.map(function (privilege) {
                            return 'roster:privileges:' + privilege;
                        }), next);
                    },
                    function (memberSets, next) {

                        var uniqueGroups = _.unique(_.flatten(memberSets));

                        groups.getGroups('groups:createtime', 0, -1, function (err, groupNames) {
                            if (err) {
                                return next(err);
                            }

                            groupNames = groupNames.filter(function (groupName) {
                                return groupName.indexOf(':privileges:') === -1 && uniqueGroups.indexOf(groupName) !== -1;
                            });

                            groupNames = groups.getEphemeralGroups().concat(groupNames);
                            var registeredUsersIndex = groupNames.indexOf('registered-users');
                            if (registeredUsersIndex !== -1) {
                                groupNames.splice(0, 0, groupNames.splice(registeredUsersIndex, 1)[0]);
                            } else {
                                groupNames = ['registered-users'].concat(groupNames);
                            }

                            var adminIndex = groupNames.indexOf('administrators');
                            if (adminIndex !== -1) {
                                groupNames.splice(adminIndex, 1);
                            }

                            var memberPrivs;

                            var memberData = groupNames.map(function (member) {
                                memberPrivs = {};

                                for (var x = 0, numPrivs = groupPrivileges.length; x < numPrivs; x++) {
                                    memberPrivs[groupPrivileges[x]] = memberSets[x].indexOf(member) !== -1;
                                }
                                return {
                                    name: member,
                                    privileges: memberPrivs,
                                };
                            });

                            next(null, memberData);
                        });
                    },
                    function (memberData, next) {
                        // Grab privacy info for the groups as well
                        async.map(memberData, function (member, next) {
                            groups.isPrivate(member.name, function (err, isPrivate) {
                                if (err) {
                                    return next(err);
                                }

                                member.isPrivate = isPrivate;
                                next(null, member);
                            });
                        }, next);
                    }
                ], next);
            }
        }, function (err, payload) {
            if (err) {
                return callback(err);
            }

            // This is a hack because I can't do {labels.users.length} to echo the count in templates.js
            payload.columnCount = payload.labels.users.length + 2;

            callback(null, payload);
        });
    };

    privileges.roster.get = function (uid, callback) {
        async.parallel({
            'roster:update': function (next) {
                helpers.isUserAllowedTo('roster:update', uid, [], next);
            },
            'roster:view': function (next) {
                helpers.isUserAllowedTo('roster:view', uid, [], next);
            },
            isAdministrator: function (next) {
                user.isAdministrator(uid, next);
            }
        }, function (err, results) {
            if (err) {
                return callback(err);
            }

            var isAdminOrMod = results.isAdministrator;

            plugins.fireHook('filter:privileges.roster.get', {
                uid: uid,
                'roster:update': results['roster:update'][0] || isAdminOrMod,
                'roster:view': results['roster:view'][0] || isAdminOrMod,
                isAdminOrMod: isAdminOrMod
            }, callback);
        });
    };

    privileges.roster.isAdminOrMod = function (uid, callback) {
        if (!parseInt(uid, 10)) {
            return callback(null, false);
        }
        helpers.some([
            function (next) {
                user.isAdministrator(uid, next);
            }
        ], callback);
    };

    privileges.categories.isUserAllowedTo = function (privilege, cid, uid, callback) {
        if (!cid) {
            return callback(null, false);
        }
        helpers.isUserAllowedTo(privilege, uid, [cid], function (err, results) {
            callback(err, Array.isArray(results) && results.length ? results[0] : false);
        });
    };

    privileges.categories.can = function (privilege, cid, uid, callback) {
        if (!cid) {
            return callback(null, false);
        }
        categories.getCategoryField(cid, 'disabled', function (err, disabled) {
            if (err) {
                return callback(err);
            }

            if (parseInt(disabled, 10) === 1) {
                return callback(null, false);
            }

            helpers.some([
                function (next) {
                    helpers.isUserAllowedTo(privilege, uid, [cid], function (err, results) {
                        next(err, Array.isArray(results) && results.length ? results[0] : false);
                    });
                },
                function (next) {
                    user.isModerator(uid, cid, next);
                },
                function (next) {
                    user.isAdministrator(uid, next);
                }
            ], callback);
        });
    };
};