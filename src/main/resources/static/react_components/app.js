var App = React.createClass({
	displayName: "App",
	componentDidMount: function () {
        this.getNewQuestion();
    },
    getNewQuestion: function () {
	    	axios.get("http://jservice.io/api/random").then(
        		function(result){
        			this.setState({data: result.data[0]})
        		}.bind(this)
        )
    },
    score: function(event){
    		event.preventDefault();
    		if(this.state.data.answer === event.target.userAnswer.value){
    			this.setState({score: this.state.score + this.state.data.value})
    		}else{
    			this.setState({score: this.state.score - this.state.data.value})
    		}
    		event.target.reset();
    		this.getNewQuestion();
    },
    getInitialState: function () {
        return {
        		data: { 
        			category: {},
    			},
    			score: 0
        }
    },
    render: function () {
	    	if(this.state.data.question){
	        return (
	            React.createElement("div", {}, 
	                "Category: " + this.state.data.category.title,
	                React.createElement("br"),
	                "Question: " + this.state.data.question,
	                React.createElement("br"),
	                "value: " + this.state.data.value,
	                React.createElement("br"),
	                React.createElement("br"),
	                "Current Score: " + this.state.score,
	                React.createElement("br"),
	                React.createElement("br"),
	                React.createElement("form", {onSubmit: this.score}, 
                        React.createElement("input", {type: "text", name:"userAnswer", placeholder: "What is?"}), 
                        React.createElement("button", {type: "submit"}, "Submit")
                    ),
                    React.createElement("br"),
                    "Shhhhhh: " + this.state.data.answer
	            )
	        );
	    	}
	        
	    return (
	        React.createElement("div", {}, 
	            "Loading..."
	        )
	    );
    }
});

var renderClient = function () {
    React.render(
        React.createElement(App),
        document.getElementById("content")
    );
};

var renderServer = function () {
    return React.renderToString(
        React.createElement(App)
    );
};