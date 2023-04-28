package com.project.projectforum.controller;

import com.project.projectforum.model.entity.Post;
import com.project.projectforum.model.entity.User;
import com.project.projectforum.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {
	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity<User> addUser(@RequestBody User user) {
		User newUser = userService.addUser(user);
		return new ResponseEntity<>(newUser, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<User>> getUsers() {
		List<User> users = userService.getUsers();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}

	@PostMapping("/{userID}/post")
	public ResponseEntity<Post> createPost(@PathVariable final String userID, @RequestBody Post post) {
		UUID userId = UUID.fromString(userID);
		Post createdPost = userService.createPost(userId, post);
		return new ResponseEntity<>(createdPost, HttpStatus.OK);
	}

	@GetMapping("/{userID}/creations")
	public ResponseEntity<List<Post>> getCreatedPosts(@PathVariable final String userID) {
		UUID userId = UUID.fromString(userID);
		List<Post> createdPosts = userService.getCreatedPosts(userId);
		return new ResponseEntity<>(createdPosts, HttpStatus.OK);
	}

	//TODO: figure out if PUT is correct here
	@PostMapping("/{userID}/post/{postID}/save")
	public ResponseEntity<Post> savePost(@PathVariable final String userID, @PathVariable final String postID) {
		UUID userId = UUID.fromString(userID);
		UUID postId = UUID.fromString(postID);
		Post savedPost = userService.savePost(userId, postId);
		return new ResponseEntity<>(savedPost, HttpStatus.OK);
	}

	//TODO: figure out if PUT is correct here
	@PutMapping("/{userID}/post/{postID}/unsave")
	public ResponseEntity<String> unsavePost(@PathVariable final String userID, @PathVariable final String postID) {
		UUID userId = UUID.fromString(userID);
		UUID postId = UUID.fromString(postID);
		userService.unsavePost(userId,postId);
		return new ResponseEntity<>(MessageFormat.format("Post with id {0} has been unsaved", postID), HttpStatus.OK);
	}

	@GetMapping("/{userID}/saved")
	public ResponseEntity<List<Post>> getSavedPosts(@PathVariable final String userID) {
		UUID userId = UUID.fromString(userID);
		List<Post> savedPosts = userService.getSavedPosts(userId);
		return new ResponseEntity<>(savedPosts, HttpStatus.OK);
	}
}
