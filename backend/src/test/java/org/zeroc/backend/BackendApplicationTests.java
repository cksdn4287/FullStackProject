package org.zeroc.backend;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.servlet.resource.ResourceUrlProvider;
import org.zeroc.backend.domain.Todo;
import org.zeroc.backend.repository.TodoRepository;


import java.time.LocalDate;
import java.util.Optional;


@SpringBootTest
@Log4j2
class BackendApplicationTests {


    @Autowired
    private TodoRepository todoRepository;
    @Autowired
    private ResourceUrlProvider resourceUrlProvider;

    @Test
    void contextLoads() {

        for (int i = 1; i <= 100; i++) {
            Todo todo = Todo.builder()
                    .title("Title......" + i)
                    .dueDate(LocalDate.of(2026, 1, 14))
                    .writer("user00")
                    .build();

            todoRepository.save(todo);
              log.info("todo테이블 데이터입력");

        }

    }
    @Test
    public void testRead(){
        Long tno = 33L;
        Optional<Todo> result = todoRepository.findById(tno);

        Todo todo = result.orElseThrow();

        log.info(todo);
    }

    @Test
    public void testModify(){
        Long tno = 33L;

        Optional<Todo> result = todoRepository.findById(tno);

        Todo todo = result.orElseThrow();
        todo.changeTitle("수정중 33.....");
        todo.changeComplete(true);
        todo.changeDueDate(LocalDate.of(2026,10,15));

        todoRepository.save(todo);
    }

    @Test
    public void testDelete(){
        Long tno = 1L;

        todoRepository.deleteById(tno);
    }

    @Test
    public void testPaging(){

        Pageable pageable = PageRequest.of(0,10, Sort.by("tno").descending());

        Page<Todo> result = todoRepository.findAll(pageable);

        log.info(result.getTotalElements());

        result.getContent().stream().forEach(todo -> log.info(todo));
    }


}