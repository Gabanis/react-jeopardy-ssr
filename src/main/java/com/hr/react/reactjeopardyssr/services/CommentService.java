package com.hr.react.reactjeopardyssr.services;

import org.springframework.stereotype.Service;

import com.hr.react.reactjeopardyssr.models.Comment;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {

    private List<Comment> comments = new ArrayList<>();

    public CommentService() {
        comments.add(new Comment("Peter Parker", "This is a comment."));
        comments.add(new Comment("John Doe", "This is *another* comment."));
    }

    public List<Comment> getComments() {
        return comments;
    }

    public List<Comment> addComment(Comment comment) {
        comments.add(comment);
        return comments;
    }
}
