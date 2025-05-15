package lt.techin.egzaminas.spring_api.dto.role;

import lt.techin.egzaminas.spring_api.dto.user.UserMapper;
import lt.techin.egzaminas.spring_api.model.Role;
import org.mapstruct.Mapper;


import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface RoleMapper {

    Role toEntity(RoleRequestDTO dto);

    RoleResponseDTO toResponseDto(Role role);

    List<RoleResponseDTO> toResponseDtoList(List<Role> roleList);

}
