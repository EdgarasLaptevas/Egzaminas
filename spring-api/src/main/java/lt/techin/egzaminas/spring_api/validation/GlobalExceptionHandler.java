package lt.techin.egzaminas.spring_api.validation;

import lt.techin.egzaminas.spring_api.controller.BaseController;
import lt.techin.egzaminas.spring_api.dto.ApiResponse;
import jakarta.validation.ConstraintViolationException;
import lt.techin.egzaminas.spring_api.exceptions.ApiErrorException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ServerErrorException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler extends BaseController {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleConstraintViolation(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getConstraintViolations().forEach(violation ->
                errors.put(violation.getPropertyPath().toString(), violation.getMessage())
        );
        return badRequest(errors, "Validation failed");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        return badRequest(errors, "Validation failed");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        return badRequest(null, ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleGenericException(Exception ex) {
        return serverError("An unexpected error occurred: " + ex.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<String>> handleAccessDeniedException(AccessDeniedException ex) {
        return forbidden("Access Denied");
    }

    @ExceptionHandler(ServerErrorException.class)
    public ResponseEntity<ApiResponse<String>> handleServerErrorException(ServerErrorException ex) {
        return serverError("Server error");
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return notFound(ex.getMessage());
    }

    @ExceptionHandler(ApiErrorException.class)
    public ResponseEntity<ApiResponse<String>> handleApiError(ApiErrorException ex) {
        return ResponseEntity
                .status(ex.getStatus())
                .body(new ApiResponse<>(null, ex.getMessage(), false));
    }

}
