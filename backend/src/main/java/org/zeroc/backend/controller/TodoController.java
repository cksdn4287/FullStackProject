package org.zeroc.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import org.zeroc.backend.dto.PageRequestDTO;
import org.zeroc.backend.dto.PageResponseDTO;
import org.zeroc.backend.dto.TodoDTO;
import org.zeroc.backend.service.TodoService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService service;

    @GetMapping("/{tno}")
    public TodoDTO get(@PathVariable("tno") Long tno){
        return  service.get(tno);
    }

    @GetMapping("/list")
    public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO){
        log.info(pageRequestDTO);

        return  service.list(pageRequestDTO);
    }

    @PostMapping("/")
    public Map<String , Long>  register(@RequestBody TodoDTO todoDTO){
        log.info("TodoDTO 객채 : " + todoDTO);

        Long tno = service.register(todoDTO);

        return Map.of("TNO" , tno);
    }

    @PutMapping("/{tno}")
    public Map<String, String> modify(@PathVariable("tno") Long tno, @RequestBody TodoDTO todoDTO){

        todoDTO.setTno(tno);

        log.info("수정 : " + todoDTO);

        service.modify(todoDTO);

        return  Map.of("결과" ,"성공");
    }
    @DeleteMapping("/{tno}")
    public Map<String, String> remove(@PathVariable("tno") Long tno){
        log.info("삭제 : " + tno);

        service.remove(tno);

        return  Map.of("RESULT", "SUCESS");
    }
}
