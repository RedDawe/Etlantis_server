import React from 'react';
import './App.css';
import { Helmet } from 'react-helmet'
import psl from './play_store_logo.png'

const TITLE = 'Etlantis'


class App extends React.Component {
    constructor(){
        super();
        this.state = {mobile : window.innerWidth < window.innerHeight, average: 0, grades: "Grades", weights: "Weights"};

        this.handleGradeChange = this.handleGradeChange.bind(this);
        this.handleWeightsChange = this.handleWeightsChange.bind(this);
        this.grade_submit = this.grade_submit.bind(this);
    }

    handleGradeChange(event){
        this.setState({grades: event.target.value});
    }

    handleWeightsChange(event){
        this.setState({weights: event.target.value});
    }

    grade_submit(event) {
        var grds = this.state.grades.split(" ");
        var wghts = this.state.weights.split(" ");

        var grades_array = [];
        var weights_array = [];

        for (var i = 0; i < grds.length; i++){
            grades_array.push(parseFloat(grds[i]));
            weights_array.push(parseFloat(wghts[i]));
        }


        var sum = 0;
        var div = 0;
        for (var i = 0; i < grades_array.length; i++){
            sum += grades_array[i] * weights_array[i];
            div += weights_array[i];
        }

        this.setState({average: sum/div});
        event.preventDefault();
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentDidUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
      this.setState({mobile : window.innerWidth < window.innerHeight});
    }

    render(){
    if (this.state.mobile){
        return(
          <>
            <Helmet>
              <title>{ TITLE }</title>
            </Helmet>
            <img id="whitelogo" src="static/white o logo.png"/><div id="menu"><a class="a_menu" href="/">Daily Route Optimizer</a><a class="a_menu" href="/grade_calculator">Grade Calculator</a><a href="all_knowing_mirror" class="a_menu" >All knowing mirror</a><a href="/read_for_me" class="a_menu" >Read For Me</a></div>
            <p id="main_text">
            Hey,<br></br>
            seems like you're in luck today. You're on a phone so you can get the full app by clicking the play store logo below.
            </p>
            <a href="https://play.google.com/store/apps/details?id=etlantis.gradecalculator"><img id="psl" src={psl}/></a>
            <br></br>
            <a href="https://github.com/RedDawe/GradeCalculator"><img id="github_link" src="static/githublogo.png" /></a>
          </>
        )
    }
    else{
        return(
          <>
            <Helmet>
              <title>{ TITLE }</title>
            </Helmet>
            <img id="whitelogo" src="static/white o logo.png"/><div id="menu"><a class="a_menu" href="/">Daily Route Optimizer</a><a class="a_menu" href="/grade_calculator">Grade Calculator</a><a href="all_knowing_mirror" class="a_menu" >All knowing mirror</a><a href="/read_for_me" class="a_menu" >Read For Me</a></div>
            <p id="main_p">
                This is a preview page for the Grade Calculator app. You can get the full app by clicking the play store logo below.
            </p>

            <form onSubmit={this.grade_submit}>
                <input type="text" value={this.state.grades} onChange={this.handleGradeChange}/>
                <input type="text" value={this.state.weights} onChange={this.handleWeightsChange}/>
                <input type="submit" value="Calculate" />
            </form>

            <p id="result">
                {this.state.average}
            </p>
            <a href="https://play.google.com/store/apps/details?id=etlantis.gradecalculator"><img id="psl" src={psl}/></a>
            <br></br>
            <a href="https://github.com/RedDawe/GradeCalculator"><img id="github_link" src="static/githublogo.png" /></a>
          </>
        )
    }
    }
}

export default App;
