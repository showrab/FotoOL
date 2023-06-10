package ch.showrab.fotool.server.controllers;

import ch.showrab.fotool.server.entities.HighScore;
import ch.showrab.fotool.server.repositories.HighScoreRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
public class AdminController {
  @PostMapping("/admin/login")
  boolean login(@RequestBody String password) {
    if (password.equals("viva11")) {
      return true;
    }
    return false;
  }
}




