package com.project.projectforum.models.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "post", schema = "public")
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;

	@NonNull
	private String title;

	@NonNull
	private Boolean isStarted;

	private String githubURL;

	@NonNull
	private String description;

	@NonNull
	private Boolean isAnonymous;

	@NonNull
	private String creator;

	@NonNull
	private String creatorAltId;

	@NonNull
	private Boolean isCompleted;

	private Boolean isFlagged;


}
