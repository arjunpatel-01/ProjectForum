package com.project.projectforum.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "user", schema = "public")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;

	@NonNull
	private String name;

	@NonNull
	private String email;

//	@OneToMany
//	private List<Post> savedPosts;
}
