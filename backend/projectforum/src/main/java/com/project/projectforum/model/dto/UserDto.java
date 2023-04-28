package com.project.projectforum.model.dto;

import com.project.projectforum.model.entity.Post;
import com.project.projectforum.model.entity.User;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
//@Builder
public class UserDto {

	private UUID id;

	private String name;

	private String altName;

	private String email;

	private List<Post> createdPosts = new ArrayList<>();

//	public static UserDto from(User user) {
//		return UserDto.builder()
//				.id(user.getId())
//				.name(user.getName())
////				.altName(user.getAltName())
//				.email(user.getEmail())
//				.createdPosts(user.getCreatedPosts())
//				.build();
//	}
}
