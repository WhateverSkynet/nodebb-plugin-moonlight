import * as React from 'react';
import { RecruitmentWidget } from './recruitment/recruitment';
import { publicPath } from '../util';
import { BlogPostEntity } from '../../models/blog';
import { connect } from 'react-redux';
import { State } from '../states/state';
import { selectBlogPosts } from '../reducers/db/blog-post';


interface LandingPageProps {
  posts: BlogPostEntity[];
}
const LandingPage = ({posts}: LandingPageProps) => {
  return (
    <div className='section'>
      <div className='row'>
        <div className='col-xs-12'>
          <h2 className='title title--landing'>Mythic raiding guild on Auchindoun-EU</h2>
        </div>
        <div className='col-md-8'>
          <div className='news-container'>
            {
              posts.map(post => (
                <div key={post.id} className='panel'>
                  <img className="panel__image" src={post.imageUrl} alt={post.imageAlt}></img>
                  <div className='panel__heading'>{post.title}</div>
                  <div className='panel__content panel__content--dark'>
                    {
                      post.content
                        ? post.content.split('\n')
                          .map((paragraph, i) => (<p key={i}>{paragraph}</p>))
                        : ''
                    }
                  </div>
                  <div className='panel__footer'>
                    <span className='panel__text timeago' title={new Date(post.date).toString()}>{window.jQuery.timeago(post.date)}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='col-md-4'>
          <RecruitmentWidget></RecruitmentWidget>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const props: LandingPageProps = {
    posts: selectBlogPosts(state),
  };
  return props;
};

export const LandingPageContainer = connect(mapStateToProps)(LandingPage);
