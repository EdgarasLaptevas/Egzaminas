package lt.techin.egzaminas.spring_api.controller.auth;

import jakarta.validation.Valid;
import lt.techin.egzaminas.spring_api.controller.BaseController;
import lt.techin.egzaminas.spring_api.dto.ApiResponse;
import lt.techin.egzaminas.spring_api.dto.user.UserListResponseDTO;
import lt.techin.egzaminas.spring_api.dto.user.UserMapper;
import lt.techin.egzaminas.spring_api.dto.user.UserRequestDTO;
import lt.techin.egzaminas.spring_api.dto.user.UserResponseDTO;
import lt.techin.egzaminas.spring_api.exceptions.ApiErrorException;
import lt.techin.egzaminas.spring_api.model.User;
import lt.techin.egzaminas.spring_api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController extends BaseController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<ApiResponse<UserResponseDTO>> addUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        if (userService.userExistsByUsername(userRequestDTO.username())) {

            return badRequest(null, "User already exists");
        }

        User user = userMapper.toEntity(userRequestDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserResponseDTO responseDTO = userMapper.toResponseDto(userService.saveUser(user));

        return created(responseDTO, "User created successfully");
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<UserListResponseDTO>> getALlUsers() {
        return ok(userMapper.toListResponseDto(userService.findAllUsers()));
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<UserResponseDTO>> getUser(@PathVariable long userId) {

        User foundUser = userService.findUserById(userId).orElseThrow(() -> new ApiErrorException("User not found", HttpStatus.NOT_FOUND));

        UserResponseDTO userResponseDTO = userMapper.toResponseDto(foundUser);
        return ok(userResponseDTO);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable long userId) {

        userService.findUserById(userId).orElseThrow(() -> new ApiErrorException("User not found", HttpStatus.NOT_FOUND));

        userService.deleteUserById(userId);
        return ok(null, "user deleted successfully");
    }
}

