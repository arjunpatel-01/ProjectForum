package com.project.projectforum.model.exception;

import java.text.MessageFormat;
import java.util.UUID;

public class UserNotFoundException extends RuntimeException {
	public UserNotFoundException(UUID id) {
		super(MessageFormat.format("Could not find user with id {0}", id.toString()));
	}
}
//TODO: error message not displaying correct for userID
