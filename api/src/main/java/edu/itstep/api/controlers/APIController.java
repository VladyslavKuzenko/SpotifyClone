package edu.itstep.api.controlers;

import edu.itstep.api.models.MessageAuth0;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class APIController {

    @GetMapping(value = "/public")
    public MessageAuth0 publicEndpoint() {
        return new MessageAuth0("All good. You DO NOT need to be authenticated to call /api/public.");
    }

    @GetMapping(value = "/private")
    public MessageAuth0 privateEndpoint() {
        return new MessageAuth0("All good. You can see this because you are Authenticated.");
    }

    @GetMapping(value = "/private-scoped")
    public MessageAuth0 privateScopedEndpoint() {
        return new MessageAuth0("All good. You can see this because you are Authenticated with a Token granted the 'read:messages' scope");

    }
}
