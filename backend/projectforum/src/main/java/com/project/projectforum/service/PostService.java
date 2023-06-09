package com.project.projectforum.service;

import com.project.projectforum.model.entity.Post;
import com.project.projectforum.model.entity.User;
import com.project.projectforum.model.exception.PostNotFoundException;
import com.project.projectforum.repository.PostRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class PostService {
	private final PostRepository postRepository;

	@PersistenceContext
	private EntityManager entityManager;

	public PostService(PostRepository postRepository) {
		this.postRepository = postRepository;
	}

	//TODO: return sorted by timestamp
	public List<Post> getAllPosts() {
		return postRepository.findAll(Sort.by(Sort.Direction.DESC, "timestamp"));
	}

	public Post getPost(UUID postID) {
		return postRepository.findById(postID).orElseThrow(() -> new PostNotFoundException(postID));
	}

	public void deletePost(UUID postID) {
		Post post = postRepository.findById(postID).orElseThrow(() -> new PostNotFoundException(postID));
		for (User user : post.getUsers()) {
			user.getSavedPosts().remove(post);
		}
		postRepository.deleteById(postID);
	}

	public Post updateCompletion(UUID postID, String url) {
		Post post = postRepository.findById(postID).orElseThrow(() -> new PostNotFoundException(postID));
		post.setIsCompleted(!post.getIsCompleted());
		if (post.getIsCompleted()) {
			post.setCompletedURL(url);
		} else {
			post.setCompletedURL(null);
		}
		postRepository.save(post);
		return post;
	}

	public Post flagPost(UUID postID, String message) {
		Post post = postRepository.findById(postID).orElseThrow(() -> new PostNotFoundException(postID));
		post.setIsFlagged(true);
		post.setFlagType(message);
		postRepository.save(post);
		return post;
	}
}
