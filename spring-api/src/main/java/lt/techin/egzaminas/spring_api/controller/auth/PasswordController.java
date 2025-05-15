package lt.techin.egzaminas.spring_api.controller.auth;

import lt.techin.egzaminas.spring_api.controller.BaseController;
import lt.techin.egzaminas.spring_api.dto.ApiResponse;
import lt.techin.egzaminas.spring_api.dto.password.PasswordConfirmDTO;
import lt.techin.egzaminas.spring_api.model.User;
import lt.techin.egzaminas.spring_api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class PasswordController extends BaseController {

    private final UserService userService;

    @Autowired
    public PasswordController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/verify-password")
    public ResponseEntity<ApiResponse<String>> verifyPassword(@Valid @RequestBody PasswordConfirmDTO passwordConfirmDTO, Authentication authentication) {
        String password = passwordConfirmDTO.password();

        User user = userService.findUserByUsername(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));


        boolean isValidPassword = userService.verifyAccountPassword(user, password);
        if (!isValidPassword) {
            return forbidden("Incorrect password");
        }

        return ok(null, "Password verified");
    }
}
