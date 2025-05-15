package lt.techin.egzaminas.spring_api.dto.user;

import java.util.List;

public record UserListResponseDTO(List<UserResponseDTO> userResponseDTOList) {
}
