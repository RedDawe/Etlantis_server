(this["webpackJsonpgc-app"]=this["webpackJsonpgc-app"]||[]).push([[0],{15:function(e,t,a){e.exports=a(29)},20:function(e,t,a){},21:function(e,t,a){},29:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(9),r=a.n(l),s=(a(20),a(10)),o=a(11),c=a(13),h=a(12),u=a(1),d=a(14),g=(a(21),a(3)),m=a.n(g),p=a(4),b=a(5),w=a.n(b),E=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(h.a)(t).call(this))).handleWindowSizeChange=function(){e.setState({mobile:window.innerWidth<window.innerHeight})},e.state={mobile:window.innerWidth<window.innerHeight,average:0,grades:"",weights:"",menu:"loading..."},e.handleGradeChange=e.handleGradeChange.bind(Object(u.a)(e)),e.handleWeightsChange=e.handleWeightsChange.bind(Object(u.a)(e)),e.grade_submit=e.grade_submit.bind(Object(u.a)(e)),e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"handleGradeChange",value:function(e){this.setState({grades:e.target.value})}},{key:"handleWeightsChange",value:function(e){this.setState({weights:e.target.value})}},{key:"grade_submit",value:function(e){for(var t=this.state.grades.split(" "),a=this.state.weights.split(" "),n=[],i=[],l=0;l<t.length;l++)n.push(parseFloat(t[l])),i.push(parseFloat(a[l]));var r=0,s=0;for(l=0;l<n.length;l++)r+=n[l]*i[l],s+=i[l];this.setState({average:r/s}),e.preventDefault()}},{key:"componentDidMount",value:function(){var e=this;window.addEventListener("resize",this.handleWindowSizeChange),fetch("fetch/menu").then((function(e){return e.text()})).then((function(t){return e.setState({menu:t})}))}},{key:"componentDidUnmount",value:function(){window.removeEventListener("resize",this.handleWindowSizeChange)}},{key:"render",value:function(){return this.state.mobile?i.a.createElement(i.a.Fragment,null,i.a.createElement(p.Helmet,null,i.a.createElement("title",null,"Etlantis")),i.a.createElement(m.a,{allowedAttributes:{a:["href","class"],div:["id"],img:["id","src"]},allowedTags:["a","div","img"],html:this.state.menu}),i.a.createElement("p",{id:"main_text"},"Hey,",i.a.createElement("br",null),"seems like you're in luck today. You're on a phone so you can get the full app by clicking the play store logo below."),i.a.createElement("a",{href:"https://play.google.com/store/apps/details?id=etlantis.gradecalculator"},i.a.createElement("img",{id:"psl",src:w.a})),i.a.createElement("br",null),i.a.createElement("a",{href:"https://github.com/RedDawe/GradeCalculator"},i.a.createElement("img",{id:"github_link",src:"static/githublogo.png"}))):i.a.createElement(i.a.Fragment,null,i.a.createElement(p.Helmet,null,i.a.createElement("title",null,"Etlantis")),i.a.createElement(m.a,{allowedAttributes:{a:["href","class"],div:["id"],img:["id","src"]},allowedTags:["a","div","img"],html:this.state.menu}),i.a.createElement("p",{id:"main_p"},"This is a preview page for the Grade Calculator app. You can get the full app by clicking the play store logo below."),i.a.createElement("form",{onSubmit:this.grade_submit},i.a.createElement("p",{class:"labels"},"Grades"),i.a.createElement("input",{type:"text",value:this.state.grades,onChange:this.handleGradeChange,placeholder:"2 1 2.5 1"}),i.a.createElement("p",{class:"labels"},"Weights"),i.a.createElement("input",{type:"text",value:this.state.weights,onChange:this.handleWeightsChange,placeholder:"1 2 1 1"}),i.a.createElement("input",{type:"submit",value:"Calculate"})),i.a.createElement("p",{id:"result"},this.state.average),i.a.createElement("a",{href:"https://play.google.com/store/apps/details?id=etlantis.gradecalculator"},i.a.createElement("img",{id:"psl",src:w.a})),i.a.createElement("br",null),i.a.createElement("a",{href:"https://github.com/RedDawe/GradeCalculator"},i.a.createElement("img",{id:"github_link",src:"static/githublogo.png"})))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},5:function(e,t,a){e.exports=a.p+"media/play_store_logo.b4c508ba.png"}},[[15,1,2]]]);
//# sourceMappingURL=main.fee6f827.chunk.js.map