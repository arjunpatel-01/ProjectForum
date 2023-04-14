package com.project.projectforum.repositories;

import com.project.projectforum.models.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AWSRDSRepository extends JpaRepository<Post, UUID> {
}
