package com.project.projectforum.services;

import com.project.projectforum.models.entity.Post;
import com.project.projectforum.repositories.AWSRDSRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
	private final AWSRDSRepository awsrdsRepository;

	public PostService(AWSRDSRepository awsrdsRepository) {
		this.awsrdsRepository = awsrdsRepository;
	}

	public List<Post> getAllPosts() {
		return awsrdsRepository.findAll();
	}

	public Post addPost(Post post) {
		return awsrdsRepository.save(post);
	}
}
