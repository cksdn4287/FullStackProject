package org.zeroc.backend;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zeroc.backend.domain.Todo;
import org.zeroc.backend.repository.TodoRepository;

import java.time.LocalDate;


@SpringBootTest
@Log4j2
class BackendApplicationTests {


    @Autowired
    private TodoRepository todoRepository;

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
}