package com.project.projectforum.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
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
	private String altName;

	@NonNull
	private String email;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "creator", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Post> createdPosts = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<Post> savedPosts = new ArrayList<>();
}
