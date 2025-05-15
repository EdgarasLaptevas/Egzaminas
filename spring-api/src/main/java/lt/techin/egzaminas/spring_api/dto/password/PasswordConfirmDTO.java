package lt.techin.egzaminas.spring_api.dto.password;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PasswordConfirmDTO(@NotNull(message = "You must provide a password")
                                 @NotBlank(message = "Password cannot be blank")
                                 @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters")
                                 String password) {
}
