package org.zeroc.backend.service;

import org.zeroc.backend.dto.TodoDTO;

public interface TodoService {

    Long register(TodoDTO todoDTO);
}
