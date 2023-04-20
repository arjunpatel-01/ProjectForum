package com.project.projectforum.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.projectforum.model.dto.PostDto;
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
	private Boolean isCompleted = false;

	@NonNull
	private Boolean isFlagged = false;

	@CreationTimestamp
	private LocalDateTime timestamp;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "creator_id")
	@JsonBackReference
	private User creator;

	public static Post from(PostDto postDto) {
		return Post.builder()
				.title(postDto.getTitle())
				.isStarted(postDto.getIsStarted())
				.githubURL(postDto.getGithubURL())
				.description(postDto.getDescription())
				.isAnonymous(postDto.getIsAnonymous())
				.isCompleted(false)
				.isFlagged(false)
				.build();
	}
}

//TODO: Utilized @Value and maybe @ConfigurationProperties instead of setting boolean = false
