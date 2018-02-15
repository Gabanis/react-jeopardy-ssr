var App = React.createClass({displayName: "App",
    render: function () {
        return (
            React.createElement("div", {}, 
                "Hello World"
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