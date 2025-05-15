package lt.techin.egzaminas.spring_api.exceptions;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
public class ApiErrorException extends RuntimeException {

    private HttpStatus status;

    public ApiErrorException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
