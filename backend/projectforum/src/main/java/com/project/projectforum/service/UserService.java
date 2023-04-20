package com.project.projectforum.service;

import com.project.projectforum.model.entity.Post;
import com.project.projectforum.model.entity.User;
import com.project.projectforum.model.exception.UserNotFoundException;
import com.project.projectforum.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
	private final UserRepository userRepository;
	private final PostService postService;

	public UserService(UserRepository userRepository, PostService postService) {
		this.userRepository = userRepository;
		this.postService = postService;
	}

	public User addUser(User user) {
		return userRepository.save(user);
	}

	public List<User> getUsers() {
		return userRepository.findAll();
	}

	public Post createPost(UUID userID, Post post) {
		User user = userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));
		post.setCreator(user);
		user.getCreatedPosts().add(post);
		userRepository.save(user);
		return user.getCreatedPosts().get(user.getCreatedPosts().size()-1);
	}

	public List<Post> getCreatedPosts(UUID userID) {
		User user = userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));
		return user.getCreatedPosts();
	}

	public Post savePost(UUID userID, UUID postID) {
		User user = userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));
		Post post = postService.getPost(postID);
		user.getSavedPosts().add(post);
		userRepository.save(user);
		return post;
	}

	public void unsavePost(UUID userID, UUID postID) {
		User user = userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));
		Post post = postService.getPost(postID);
		user.getSavedPosts().remove(post);
		userRepository.save(user);
	}

	public List<Post> getSavedPosts(UUID userID) {
		User user = userRepository.findById(userID).orElseThrow(() -> new UserNotFoundException(userID));
		return user.getSavedPosts();
	}
}
