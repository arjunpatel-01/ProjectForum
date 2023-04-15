package com.project.projectforum.repository;

import com.project.projectforum.model.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
	@Query("SELECT p FROM Post p WHERE p.creatorId = :query")
	List<Post> filterByCreator(UUID query);

	@Query(value = "SELECT * FROM post p WHERE p.creatorId = :query", nativeQuery = true)
	List<Post> filterByCreatorSQL(UUID query);

}
