package com.example.quizapp.controller;


import com.example.quizapp.model.Question;
import com.example.quizapp.repository.QuestionRepository;
import jakarta.persistence.GeneratedValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {
    @Autowired
    private QuestionRepository repository;

    @GetMapping
    public List<Question> getAllQuestions() {
        return repository.findAll();
    }

    @PostMapping
    public Question saveQuestion(@RequestBody Question question) {
        return repository.save(question);
    }
}