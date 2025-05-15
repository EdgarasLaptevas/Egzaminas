package lt.techin.egzaminas.spring_api.controller.auth;

import jakarta.validation.Valid;
import lt.techin.egzaminas.spring_api.controller.BaseController;
import lt.techin.egzaminas.spring_api.dto.ApiResponse;
import lt.techin.egzaminas.spring_api.dto.LoginRequestDTO;
import lt.techin.egzaminas.spring_api.exceptions.ApiErrorException;
import lt.techin.egzaminas.spring_api.model.User;
import lt.techin.egzaminas.spring_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class TokenController extends BaseController {

    private final JwtEncoder jwtEncoder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public TokenController(JwtEncoder jwtEncoder, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.jwtEncoder = jwtEncoder;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/token")
    public ResponseEntity<ApiResponse<String>> token(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        Instant now = Instant.now();
        long expiry = 36000L;

        String username = loginRequestDTO.username();
        String password = loginRequestDTO.password();

        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Account not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new ApiErrorException("Invalid Password", HttpStatus.BAD_REQUEST);
        }

        String scope = user.getRoles().stream().map((role) -> role.getName().toUpperCase()).collect(Collectors.joining(" "));

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(username)
                .claim("user_id", user.getUserId())
                .claim("scope", scope)
                .build();

        String token = jwtEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();

        return ok(token, "Login successful");
    }
}
