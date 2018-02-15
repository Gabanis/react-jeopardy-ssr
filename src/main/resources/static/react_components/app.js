var App = React.createClass({
	displayName: "App",
	componentDidMount: function () {
        axios.get("http://jservice.io/api/random").then(
        		function(result){
        			this.setState({question: result.data[0]})
        		}.bind(this)
        )
    },
    getInitialState: function () {
        return {question: {}};
    },
    render: function () {
        return (
            React.createElement("div", {}, 
                "Hello World",
                JSON.stringify(this.state.question)
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