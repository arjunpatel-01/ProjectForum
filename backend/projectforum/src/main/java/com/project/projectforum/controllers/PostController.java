package com.project.projectforum.controllers;

import com.project.projectforum.models.entity.Post;
import com.project.projectforum.services.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
