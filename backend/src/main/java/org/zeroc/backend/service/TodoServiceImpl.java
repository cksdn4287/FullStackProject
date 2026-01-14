package org.zeroc.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.zeroc.backend.domain.Todo;
import org.zeroc.backend.dto.TodoDTO;
import org.zeroc.backend.repository.TodoRepository;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{

    private final TodoRepository todoRepository;

    private  final ModelMapper modelMapper;

    public  Long register(TodoDTO todoDTO){
        log.info("--------------------");

        Todo todo = modelMapper.map(todoDTO, Todo.class);

        Todo savedTodo = todoRepository.save(todo);

        return  savedTodo.getTno();
    }
}
