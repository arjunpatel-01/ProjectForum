package com.project.projectforum.service;

import com.project.projectforum.model.entity.Post;
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

	public Post addPost(Post post) {
		return postRepository.save(post);
	}

	public List<Post> getCreatorPosts(UUID query) {
		return postRepository.filterByCreator(query);
	}
}
