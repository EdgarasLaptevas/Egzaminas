package lt.techin.egzaminas.spring_api.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(@NotNull(message = "You must provide a username")
                             @NotBlank(message = "Username cannot be blank")
                             @Size(min = 4, max = 100, message = "Username must be between 4 and 100 characters")
                             String username,

                             @NotNull(message = "You must provide a password")
                             @NotBlank(message = "Password cannot be blank")
                             @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters")
                             String password) {
}
