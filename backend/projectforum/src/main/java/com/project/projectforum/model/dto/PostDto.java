package com.project.projectforum.model.dto;

import com.project.projectforum.model.entity.Post;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class PostDto {

	private UUID id;

	private String title;

	private Boolean isStarted;

	private String githubURL;

	private String description;

	private Boolean isAnonymous;

	private Boolean isCompleted;

	private Boolean isFlagged;



//	public static PostDto from(Post post) {
//		return PostDto.builder()
//				.title(post.getTitle())
//				.isStarted(post.getIsStarted())
//				.githubURL(post.getGithubURL())
//				.description(post.getDescription())
////				.isAnonymous(post.getIsAnonymous())
//				.isCompleted(post.getIsCompleted())
//				.isFlagged(post.getIsFlagged())
//				.build();
//	}


}
