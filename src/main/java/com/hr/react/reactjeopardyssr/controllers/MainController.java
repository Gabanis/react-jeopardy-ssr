package com.hr.react.reactjeopardyssr.controllers;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hr.react.reactjeopardyssr.React;
import com.hr.react.reactjeopardyssr.models.Comment;
import com.hr.react.reactjeopardyssr.services.CommentService;

@Controller
public class MainController {
	
	private React react;
	private CommentService service;
	private ObjectMapper mapper;
	
	public MainController(CommentService service) {
		this.service = service;
        this.react = new React();
        this.mapper = new ObjectMapper();
	}
	
	@RequestMapping("/")
	public ModelAndView home() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("index");
		List<Comment> comments = service.getComments();
		String data = mapper.writeValueAsString(comments);
		String renderedComponent = react.renderApp(comments);
		mv.addObject("content", renderedComponent);
		mv.addObject("data", data);
		return mv;
	}

}
