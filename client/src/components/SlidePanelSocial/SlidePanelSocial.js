import React, { Component, PropTypes } from 'react';

class SlidePanelSocial extends Component {
  render() {
    const twitterFollowStyle = {
      position: 'static',
      visibility: 'visible',
      width: '115px',
      height: '20px'
    };

    const twitterTweetStyle = {
      position: 'static',
      visibility: 'visible',
      width: '55px',
      height: '20px'
    };

    return (
      <div className="slidePanel-social">
        <iframe
          data-url="https://github.com/JaredHawkins/TweetGeoViz"
          src="http://platform.twitter.com/widgets/tweet_button.a428ab2e859e8008e0df5404770eb017.en.html#_=1445128480488&amp;count=none&amp;dnt=false&amp;id=twitter-widget-1&amp;lang=en&amp;original_referer=http%3A%2F%2Flocalhost%3A2063%2Fsearch&amp;size=m&amp;text=TweetGeoViz%20-%20Visualization%20tool%20to%20view%20tweets%20by%20location%20and%20content.&amp;type=share&amp;url=https%3A%2F%2Fgithub.com%2FJaredHawkins%2FTweetGeoViz&amp;via=twitanvk"
          title="Twitter Tweet Button"
          style={twitterTweetStyle}
          className="twitter-share-button twitter-share-button-rendered twitter-tweet-button"
          allowTransparency="true"
          scrolling="no"
          id="twitter-widget-1"
          frameBorder="0"
        >
        </iframe>
        <iframe
          data-screen-name="twitanvk"
          src="http://platform.twitter.com/widgets/follow_button.450bd5fbaeab74caf9d49a3141d20693.en.html#_=1445128480471&amp;dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=twitanvk&amp;show_count=false&amp;show_screen_name=true&amp;size=m"
          title="Twitter Follow Button"
          style={twitterFollowStyle}
          className="twitter-follow-button twitter-follow-button-rendered"
          allowTransparency="true"
          scrolling="no"
          id="twitter-widget-0"
          frameBorder="0"
        >
        </iframe>
        <iframe
          src="http://ghbtns.com/github-btn.html?user=JaredHawkins&amp;repo=TweetGeoViz&amp;type=fork&amp;count=true"
          allowTransparency="true"
          scrolling="0"
          frameBorder="0"
          height="20"
          width="120"
        >
        </iframe>
        <iframe
          src="http://ghbtns.com/github-btn.html?user=JaredHawkins&amp;repo=TweetGeoViz&amp;type=follow&amp;count=true"
          allowTransparency="true"
          scrolling="0"
          frameBorder="0"
          height="20"
          width="120"
        >
        </iframe>
      </div>
    );
  }
}

export default SlidePanelSocial;
