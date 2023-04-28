package com.project.projectforum.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
//@Builder
@Data
@Entity
@Table(name = "post", schema = "public")
//@JsonIdentityInfo(
//		generator = ObjectIdGenerators.PropertyGenerator.class,
//		property = "id"
//)
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;

	@NotBlank
	private String title;

	private Boolean isStarted;

	private String githubURL;

	@NotBlank
	private String description;

//	private Boolean isAnonymous;

	@NonNull
	private Boolean isCompleted = false;

	@NonNull
	private Boolean isFlagged = false;

	@CreationTimestamp
	private LocalDateTime timestamp;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "creator_id", nullable = false)
	@JsonBackReference(value = "creator")
	private User creator;

	@Column(name = "creator_id", insertable = false, nullable = false, updatable = false)
	private UUID creatorID;

	private String creatorName;

	@ManyToMany(mappedBy = "savedPosts", fetch = FetchType.LAZY)
	@JsonIgnore
//	@JsonBackReference(value = "saved")
	private List<User> users = new ArrayList<>();
}

//TODO: Utilized @Value and maybe @ConfigurationProperties instead of setting boolean = false
