package com.hr.react.reactjeopardyssr.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.hr.react.reactjeopardyssr.React;

@Controller
public class MainController {
	
	private React react;
	
	public MainController() {
		react = new React();
	}
	
	@RequestMapping("/")
	public ModelAndView home() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("index");
		
		String renderedComponent = react.renderApp();
		mv.addObject("content", renderedComponent);
		
		return mv;
	}

}
