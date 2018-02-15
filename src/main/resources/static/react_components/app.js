var converter = new Showdown.converter();

var CommentForm = React.createClass({displayName: "CommentForm",
    handleSubmit: function (e) {
        e.preventDefault();
        var author = e.target.author.value.trim();
        var text = e.target.text.value.trim();
        if (!author || !text) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        e.target.reset();
    },
    render: function () {
        return (
            React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
                React.createElement("input", {type: "text", name: "author", placeholder: "Your name"}), 
                React.createElement("input", {type: "text", name: "text", placeholder: "Say something..."}), 
                React.createElement("input", {type: "submit", value: "Post"})
            )
        );
    }
});

var Comment = React.createClass({displayName: "Comment",
    render: function () {
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            React.createElement("div", {className: "comment"}, 
                React.createElement("h2", null, this.props.author), 
                React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
            )
        );
    }
});

var CommentList = React.createClass({displayName: "CommentList",
    render: function () {
        var commentNodes = this.props.data.map(function (comment, index) {
            return (
                React.createElement(Comment, {author: comment.author, key: index}, 
                    comment.text
                )
            );
        });
        return (
            React.createElement("div", {className: "commentList"}, 
                commentNodes
            )
        );
    }
});

var CommentBox = React.createClass({displayName: "CommentBox",
    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        comments.push(comment);
        
        this.setState({data: comments}, function () {
        	
        		axios.post(this.props.url, comment).then(
            		function(results){)
            			this.setState({data: results.data})
            		}.bind(this)
            )
        		
        });
    },
    loadCommentsFromServer: function () {
    	
    		axios.get(this.props.url).then(
        		function(results){
        			this.setState({data: results.data})
        		}.bind(this)
        )
        
    },
    getInitialState: function () {
        return {data: this.props.data};
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comments"), 
                React.createElement(CommentList, {data: this.state.data}), 
                React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
            )
        );
    }
});

var renderClient = function (comments) {
    var data = comments || [];
    React.render(
        React.createElement(CommentBox, {data: data, url: "/comments", pollInterval: 5000}),
        document.getElementById("content")
    );
};

var renderServer = function (comments) {
    var data = Java.from(comments);
    return React.renderToString(
        React.createElement(CommentBox, {data: data, url: "/comments", pollInterval: 5000})
    );
};