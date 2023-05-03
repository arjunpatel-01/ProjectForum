package com.project.projectforum.model.exception;

import java.text.MessageFormat;

public class UserNotFoundException extends RuntimeException {
	public UserNotFoundException(String id) {
		super(MessageFormat.format("Could not find user with id {0}", id.toString()));
	}
}
