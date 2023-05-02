package com.project.projectforum.model.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@NoArgsConstructor(force = true)
@AllArgsConstructor
//@Builder
@Data
@Entity
@Table(name = "user", schema = "public")
@JsonIdentityInfo(
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;

	@NonNull
	private String name;

//	@NonNull
//	private String altName;

	@NonNull
	private String email;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "creator", cascade = CascadeType.ALL)
	@JsonManagedReference(value = "creator")
	private List<Post> createdPosts = new ArrayList<>();

//	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//	@JsonManagedReference
//	@OneToMany(fetch = FetchType.LAZY)
//	private List<Post> savedPosts = new ArrayList<>();

	@ManyToMany(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
	@JoinTable(
			name = "user_post",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "post_id")
	)
	private List<Post> savedPosts = new ArrayList<>();
}
//TODO: List -> Set
