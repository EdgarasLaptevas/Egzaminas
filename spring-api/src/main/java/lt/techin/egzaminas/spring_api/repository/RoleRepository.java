package lt.techin.egzaminas.spring_api.repository;

import lt.techin.egzaminas.spring_api.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String roleName);

}
