import * as React from 'react';
import { RecruitmentWidget } from './recruitment/recruitment';
import { publicPath } from '../util';
import { BlogPost } from '../../models/blog';

const blogPosts: BlogPost[] = [
  {
    bpId: 2,
    imageUrl: `${publicPath}/${require('../../assets/uploads/we-helya.jpg')}`,
    imageAlt: 'Hellya down',
    title: 'M Hell Yeah!',
    date: '13.01.2017',
    paragraphs: [
      'Finally! After the normal attendance issues and the what-not which always happen around the holidays, we managed to get a full raid group together and killed her. Post-nerf, but still felt good to get some revenge on the bitch.',
    ],
  },
  {
    bpId: 1,
    imageUrl: `${publicPath}/${require('../../assets/uploads/m-xavius.jpg')}`,
    imageAlt: 'Xavius down',
    title: 'M Xavius down!',
    date: '25.10.2016',
    paragraphs: [
      ' After several computer issues, work trips to greece and some holidays we downed Cenarius, the real end boss of this raid. Subsequently we quickly proceeded to liberate the Emerald Dream from Xavius\' hold. Thanks to everyone for being a part of it and see you soon in Trial of Valor, followed by Nighthold, the real raid of the first tier. Special shout out to Deli for being the first one in the guild for a very long time to get genuinely excited at getting a realm first and some awkward nerd screams.',
    ],
  },
];

export const LandingPage = () => {
  return (
    <div className='section'>
      <div className='row'>
        <div className='col-xs-12'>
          <h2 className='title title--landing'>Mythic raiding guild on Auchindoun-EU</h2>
        </div>
        <div className='col-md-8'>
          <div className='news-container'>
            {
              blogPosts.map(post => (
                <div key={post.bpId} className='news-item'>
                  <img src={post.imageUrl} alt={post.imageAlt}></img>
                  <div className='news-item--content'>
                    <div className='news-item--title'>
                      <div className='news-title'>{post.title}</div>
                    </div>
                    {
                      post.paragraphs.map((paragraph, i) => (<p key={i}>{paragraph}</p>))
                    }
                    <div className='news-item--date'>
                      <div className='news-date'>{post.date}</div>
                    </div>
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
