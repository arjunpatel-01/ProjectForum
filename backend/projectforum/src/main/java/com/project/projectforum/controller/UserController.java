package com.project.projectforum.controller;

import com.project.projectforum.model.entity.User;
import com.project.projectforum.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/")
	public User addUser(@RequestBody User user) {
		User newUser = userService.addUser(user);
		return newUser;
	}
}
