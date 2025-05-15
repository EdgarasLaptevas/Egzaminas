package lt.techin.egzaminas.spring_api.service;

import lt.techin.egzaminas.spring_api.model.Role;
import lt.techin.egzaminas.spring_api.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    public final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> findRoleById(long id) {
        return roleRepository.findById(id);
    }

    public void deleteRoleById(long id) {
        roleRepository.deleteById(id);
    }
}
