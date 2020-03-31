import React from 'react';
import './App.css';
import SanitizedHTML from 'react-sanitized-html';
import { Helmet } from 'react-helmet'
import map from './map.jpg'
import dis from './dis.jpg'
import sto from './sto.jpg'
import frm from './frame_transparent.png'

const TITLE = 'Etlantis'
var Offset;

class App extends React.Component {
constructor(){
    super();
    this.state={imageURL : dis, width: window.innerWidth, height: window.innerHeight, menu: "loading..."}
    setInterval(this.nextImage, 30);
  }
  nextImage = () => {
    Offset = window.pageYOffset/window.innerHeight;
    if (Offset < 0.25){
        this.setState({imageURL:dis});
    }
    if (Offset >= 0.25 && Offset < 0.6){
        this.setState({imageURL:map});
    }
    if (Offset >= 0.6){
        this.setState({imageURL:sto});
    }
    console.log(window.pageYOffset);
}

    componentDidMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
      fetch('fetch/menu')
        .then(response => response.text())
        .then(menu => this.setState({menu}));
    }

    componentDidUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight});
    };

  render() {
    const width = this.state.width;
    const {height} = this.state;
    const isMobile = width <= height;
  if (!isMobile){
    return (
            <>
                <Helmet>
                  <title>{ TITLE }</title>
                </Helmet>
                  <SanitizedHTML allowedAttributes={{ 'a': ['href', 'class'], 'div': ['id'], 'img': ['id', 'src'] }} allowedTags={['a', 'div', 'img']} html={ this.state.menu } />
                  <p class='desktop_layout_p'>First and foremost you have to understand that we are working with data that some people might consider sensitive. Consider this before using our services.</p>
                  <br/>
                  <p class='desktop_layout_p'>
                    The ui is fairly simple. By default the tracking is off. If you wish to start recording your location, press the left button. We recommend doing this a couple of minutes before leaving your current location.
                    In the middle is a bar that indicates whether the tracking is on (colored) or off (grey).
                    The button on the right then stops the tracking and shows you whether any paths you've taken weren't optimal. If there were more than one it also changes to "Next" button which lets you go through all of them. Once you're at the end, you can start the tracking again.
                  </p>
                  <p class='desktop_layout_p'>Get it on play store</p>
                  <a href="https://github.com/RedDawe/DailyRouteOptimizer"><img id="github_link" src="static/githublogo.png" /></a>
                  <a href="https://play.google.com/store/apps/details?id=com.definitelynotexample.etlantis.dro">
                      <img src={this.state.imageURL}/>
                      <img src={frm} id="frame"/>
                  </a>
                  <div id="bottom_margin_div"></div>
              </>
    )
    }
    else{
        return(
                <>
                    <Helmet>
                      <title>{ TITLE }</title>
                    </Helmet>
                    <SanitizedHTML allowedAttributes={{ 'a': ['href', 'class'], 'div': ['id'], 'img': ['id', 'src'] }} allowedTags={['a', 'div', 'img']} html={ this.state.menu } />
                    <a href="https://play.google.com/store/apps/details?id=com.definitelynotexample.etlantis.dro">
                      <br/>
                      <p class="phone_layout_p">First and foremost you have to understand that we are working with data that some people might consider sensitive. Consider this before using our services.</p>
                      <br/>
                      <p class="phone_layout_p">
                        The ui is fairly simple. By default the tracking is off. If you wish to start recording your location, press the left button. We recommend doing this a couple of minutes before leaving your current location.
                        In the middle is a bar that indicates whether the tracking is on (colored) or off (grey).
                        The button on the right then stops the tracking and shows you whether any paths you've taken weren't optimal. If there were more than one it also changes to "Next" button which lets you go through all of them. Once you're at the end, you can start the tracking again.
                      </p>
                      <p class="phone_layout_p">Get it on play store</p>
                      </a>
                      <a href="https://github.com/RedDawe/DailyRouteOptimizer"><img id="github_link" src="static/githublogo.png" /></a>
                </>
        )
    }
  }
}

export default App;
