package com.jm.clinica_puertas_jg_api.user;

import com.jm.clinica_puertas_jg_api.role.Role;
import com.jm.clinica_puertas_jg_api.role.RoleService;
import com.jm.clinica_puertas_jg_api.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = UserController.PATH)
@RequiredArgsConstructor
public class UserController {
    public static final String PATH = "/users";

    private final UserService userService;
    private final RoleService roleService;
    private final ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<User> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping
    public ResponseEntity<User> create(@Valid @RequestBody UserDto user) {
        User userToCreate = modelMapper.map(user, User.class);
        List<Role> roles = user.getRoleNames().stream()
                .map(roleService::findByName)
                .toList();
        userToCreate.setRoles(roles);

        User createdUser = userService.create(userToCreate);
        URI location = getUserLocation(createdUser);

        return ResponseEntity.created(location).body(createdUser);
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<Void> put(@PathVariable Long id, @Valid @RequestBody UserDto user) {
        User userToUpdate = modelMapper.map(user, User.class);
        List<Role> roles = user.getRoleNames().stream()
                .map(roleService::findByName)
                .toList();
        userToUpdate.setRoles(roles);

        userService.updateById(id, userToUpdate);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private URI getUserLocation(User user) {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(UserController.PATH + "/{userId}").buildAndExpand(user.getId()).toUri();
    }
}
