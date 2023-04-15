package com.project.projectforum.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
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

	@NotBlank
	private String title;

	private Boolean isStarted;

	private String githubURL;

	@NotBlank
	private String description;

	private Boolean isAnonymous;

	@NonNull
	private UUID creatorId;

	@NonNull
	private String creatorName;

	@NonNull
	private String creatorAltName;

	@NonNull
	private Boolean isCompleted = false;

	@NonNull
	private Boolean isFlagged = false;

	@CreationTimestamp
	private LocalDateTime timestamp;
}

//TODO: Utilized @Value and maybe @ConfigurationProperties instead of setting boolean = false
