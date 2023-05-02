package com.project.projectforum.model.exception;

import java.text.MessageFormat;
import java.util.UUID;

public class PostNotFoundException extends RuntimeException {
	public PostNotFoundException(UUID id) {
		super(MessageFormat.format("Could not find post with id {0}", id.toString()));
	}
}
