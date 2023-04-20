package com.project.projectforum.service;

import com.project.projectforum.model.entity.Post;
import com.project.projectforum.model.exception.PostNotFoundException;
import com.project.projectforum.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PostService {
	private final PostRepository postRepository;

	public PostService(PostRepository postRepository) {
		this.postRepository = postRepository;
	}

	public List<Post> getAllPosts() {
		return postRepository.findAll();
	}

	public Post getPost(UUID postID) {
		return postRepository.findById(postID).orElseThrow(() -> new PostNotFoundException(postID));
	}

	public void deletePost(UUID postID) {
		postRepository.findById(postID).orElseThrow(() -> new PostNotFoundException(postID));
		postRepository.deleteById(postID);
	}

	public Post updateCompletion(UUID postID) {
		Post post = postRepository.findById(postID).orElseThrow(() -> new PostNotFoundException(postID));
		post.setIsCompleted(!post.getIsCompleted());
		postRepository.save(post);
		return post;
	}

	public Post flagPost(UUID postID) {
		Post post = postRepository.findById(postID).orElseThrow(() -> new PostNotFoundException(postID));
		post.setIsFlagged(true);
		postRepository.save(post);
		return post;
	}
}
