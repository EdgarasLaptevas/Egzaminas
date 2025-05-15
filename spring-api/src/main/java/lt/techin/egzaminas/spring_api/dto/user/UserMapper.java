package lt.techin.egzaminas.spring_api.dto.user;

import lt.techin.egzaminas.spring_api.dto.role.RoleMapper;
import lt.techin.egzaminas.spring_api.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {RoleMapper.class})
public interface UserMapper {

    User toEntity(UserRequestDTO dto);

    @Mapping(source = "roles", target = "roleResponseDTOList")
    UserResponseDTO toResponseDto(User user);

    List<UserResponseDTO> toResponseDtoList(List<User> userList);

    default UserListResponseDTO toListResponseDto(List<User> userList) {
        return new UserListResponseDTO(toResponseDtoList(userList));
    }

}
