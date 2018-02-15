package com.hr.react.reactjeopardyssr.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hr.react.reactjeopardyssr.models.Comment;
import com.hr.react.reactjeopardyssr.services.CommentService;



@RestController
@RequestMapping("/comments")
public class CommentController {

    private CommentService service;

    public CommentController(CommentService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Comment> getComments() {
        return service.getComments();
    }

    @RequestMapping(method = RequestMethod.POST)
    public List<Comment> addComment(@RequestBody Comment comment) {
        return service.addComment(comment);
    }

}
