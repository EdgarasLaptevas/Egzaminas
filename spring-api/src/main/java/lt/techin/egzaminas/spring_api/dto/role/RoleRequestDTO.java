package lt.techin.egzaminas.spring_api.dto.role;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RoleRequestDTO(@NotNull(message = "You must provide role name")
                             @NotBlank(message = "Role name cannot be empty")
                             String name) {
}
