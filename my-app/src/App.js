import React from 'react';
import './App.css';
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
    this.state={imageURL : dis, width: window.innerWidth, height: window.innerHeight}
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
                  <img id="whitelogo" src="static/white o logo.png"/><div id="menu"><a class="a_menu" href="/">Daily Route Optimizer</a><a class="a_menu" href="/grade_calculator">Grade Calculator</a><a href="all_knowing_mirror" class="a_menu" >All knowing mirror</a><a href="/read_for_me" class="a_menu" >Read For Me</a></div>
                  <p class='desktop_layout_p'>First and foremost you have to understand that we are working with data that some people might consider sensitive. Consider this before using our services.</p>
                  <br/>
                  <p class='desktop_layout_p'>
                    The ui is fairly simple. By default the tracking is off. If you wish to start recording your location, press the left button. We recommend doing this a couple of minutes before leaving your current location.
                    In the middle is a bar that indicates whether the tracking is on (colored) or off (grey).
                    The button on the right then stops the tracking and shows you whether any paths you've taken weren't optimal. If there were more then once it also changes to next button which lets you go through all of them. Once you're at the end, you can start the tracking again.
                  </p>
                  <p class='desktop_layout_p'>Get it on play store</p>
                  <a href="https://github.com/RedDawe/DailyRouteOptimizer"><img id="github_link" src="static/githublogo.png" /></a>
                  <a href="https://play.google.com/store/apps/details?id=com.definitelynotexample.etlantis.dro">
                      <img src={this.state.imageURL}/>
                      <img src={frm} id="frame"/>
                  </a>
                  <div></div>
              </>
    )
    }
    else{
        return(
                <>
                    <Helmet>
                      <title>{ TITLE }</title>
                    </Helmet>
                    <img id="whitelogo" src="static/white o logo.png"/><div id="menu"><a class="a_menu" href="/daily_route_optimizer">Daily Route Optimizer</a><a class="a_menu" href="/grade_calculator">Grade Calculator</a><a href="/all_knowing_mirror" class="a_menu" >All knowing mirror</a><a href="/read_for_me" class="a_menu" >Read For Me</a></div>
                    <a href="https://play.google.com/store/apps/details?id=com.definitelynotexample.etlantis.dro">
                      <br/>
                      <p class="phone_layout_p">First and foremost you have to understand that we are working with data that some people might consider sensitive. Consider this before using our services.</p>
                      <br/>
                      <p class="phone_layout_p">
                        The ui is fairly simple. By default the tracking is off. If you wish to start recording your location, press the left button. We recommend doing this a couple of minutes before leaving your current location.
                        In the middle is a bar that indicates whether the tracking is on (colored) or off (grey).
                        The button on the right then stops the tracking and shows you whether any paths you've taken weren't optimal. If there were more then once it also changes to next button which lets you go through all of them. Once you're at the end, you can start the tracking again.
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
