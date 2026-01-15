package org.zeroc.backend.service;

import org.zeroc.backend.dto.PageRequestDTO;
import org.zeroc.backend.dto.PageResponseDTO;
import org.zeroc.backend.dto.TodoDTO;

public interface TodoService {

    Long register(TodoDTO todoDTO);

    TodoDTO get(Long tno);

    void modify(TodoDTO todoDTO);

    void remove(Long tno);

    PageResponseDTO<TodoDTO>  list(PageRequestDTO pageRequestDTO);
}
