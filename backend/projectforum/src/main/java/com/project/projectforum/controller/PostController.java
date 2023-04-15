package com.project.projectforum.controller;

import com.project.projectforum.model.entity.Post;
import com.project.projectforum.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/post")
public class PostController {
	private final PostService postService;

	public PostController(PostService postService) {
		this.postService = postService;
	}

	@PostMapping("/")
	public Post addPost(@RequestBody Post post) {
		Post newPost = postService.addPost(post);
		return newPost;
	}

	@GetMapping("/")
	public List<Post> getAll() {
		List<Post> allPosts = postService.getAllPosts();
		return allPosts;
	}

	@GetMapping("/filter")
	public ResponseEntity<List<Post>> getCreatorPosts(@RequestParam("query") UUID query) {
		return ResponseEntity.ok(postService.getCreatorPosts(query));
	}
}
