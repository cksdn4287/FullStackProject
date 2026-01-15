package org.zeroc.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.query.results.internal.Builders;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.zeroc.backend.domain.Todo;
import org.zeroc.backend.dto.PageRequestDTO;
import org.zeroc.backend.dto.PageResponseDTO;
import org.zeroc.backend.dto.TodoDTO;
import org.zeroc.backend.repository.TodoRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public TodoDTO get(Long tno){
        Optional<Todo>  result = todoRepository.findById(tno);

        Todo todo = result.orElseThrow();

        TodoDTO dto = modelMapper.map(todo, TodoDTO.class);

        return dto;

    }

    public  void modify(TodoDTO todoDTO){

        Optional<Todo> result = todoRepository.findById(todoDTO.getTno());

        Todo todo = result.orElseThrow();

        todo.changeTitle(todoDTO.getTitle());
        todo.changeDueDate(todoDTO.getDueDate());
        todo.changeComplete(todoDTO.isComplete());

        todoRepository.save(todo);
    }

    public void remove(Long tno){
        todoRepository.deleteById(tno);
    }

    public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO){

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1 ,
                pageRequestDTO.getSize(),
                Sort.by("tno").descending());

        Page<Todo> result = todoRepository.findAll(pageable);

        List<TodoDTO> dtoList = result.getContent().stream()
                .map(todo -> modelMapper.map(todo, TodoDTO.class))
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<TodoDTO>  responseDTO =
                PageResponseDTO.<TodoDTO>withAll()
                        .dtoList(dtoList)
                        .pageRequestDTO(pageRequestDTO)
                        .totalCount(totalCount)
                        .build();

        return responseDTO;



    }
}
