package org.zeroc.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.zeroc.backend.domain.Todo;

public interface TodoRepository  extends JpaRepository<Todo, Long> {
}
