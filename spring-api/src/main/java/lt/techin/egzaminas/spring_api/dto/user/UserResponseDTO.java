package lt.techin.egzaminas.spring_api.dto.user;

import lt.techin.egzaminas.spring_api.dto.role.RoleResponseDTO;

import java.util.List;

public record UserResponseDTO(Long userId,
                              String username,
                              List<RoleResponseDTO> roleResponseDTOList
) {
}
