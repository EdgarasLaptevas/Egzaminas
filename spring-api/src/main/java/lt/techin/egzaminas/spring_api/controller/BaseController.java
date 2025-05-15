package lt.techin.egzaminas.spring_api.controller;

import lt.techin.egzaminas.spring_api.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public abstract class BaseController {

    protected <T> ResponseEntity<ApiResponse<T>> ok(T data, String message) {
        return ResponseEntity.ok(new ApiResponse<>(data, message, true));
    }

    protected <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        return ResponseEntity.ok(new ApiResponse<>(data, null, true));
    }

    protected <T> ResponseEntity<ApiResponse<T>> created(T data, String message) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(data, message, true));
    }

    protected <T> ResponseEntity<ApiResponse<T>> notFound(String message) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(null, message, false));
    }

    protected <T> ResponseEntity<ApiResponse<T>> badRequest(T data, String message) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(data, message, false));
    }

    protected <T> ResponseEntity<ApiResponse<T>> forbidden(String message) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse<>(null, message, false));
    }

    protected <T> ResponseEntity<ApiResponse<T>> unAuthorized(String message) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse<>(null, message, false));
    }

    protected <T> ResponseEntity<ApiResponse<T>> noContent() {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse<>(null, null, true));
    }

    protected <T> ResponseEntity<ApiResponse<T>> serverError(String message) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(null, message, false));
    }
}
