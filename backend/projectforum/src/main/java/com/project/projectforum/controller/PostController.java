package com.project.projectforum.controller;

import com.project.projectforum.model.entity.Post;
import com.project.projectforum.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/posts")
public class PostController {
	private final PostService postService;

	public PostController(PostService postService) {
		this.postService = postService;
	}

	@GetMapping
	public ResponseEntity<List<Post>> getPosts() {
		List<Post> allPosts = postService.getAllPosts();
		return new ResponseEntity<>(allPosts, HttpStatus.OK);
	}

	@DeleteMapping("/{postID}")
	public ResponseEntity<String> deletePost(@PathVariable final String postID) {
		UUID postId = UUID.fromString(postID);
		postService.deletePost(postId);
		return new ResponseEntity<>(MessageFormat.format("Post with id {0} has been deleted", postID), HttpStatus.OK);
	}

	@PutMapping("/{postID}/completed")
	public ResponseEntity<Post> updatePostCompletion(@PathVariable final String postID, @RequestBody final String url) {
		UUID postId = UUID.fromString(postID);
		Post updatedPost = postService.updateCompletion(postId, url);
		return new ResponseEntity<>(updatedPost, HttpStatus.OK);
	}

	@PutMapping("/{postID}/flag")
	public ResponseEntity<Post> flagPost(@PathVariable final String postID, @RequestBody final String message) {
		UUID postId = UUID.fromString(postID);
		Post flaggedPost = postService.flagPost(postId, message);
		return new ResponseEntity<>(flaggedPost, HttpStatus.OK);
	}
}
