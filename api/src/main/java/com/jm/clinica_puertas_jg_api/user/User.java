package com.jm.clinica_puertas_jg_api.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jm.clinica_puertas_jg_api.role.Role;
import com.jm.clinica_puertas_jg_api.role.RoleName;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column
    private String name;

    @Column
    private String surname;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private List<Role> roles;

    public User(String username, String name, String surname, String email, String password, List<Role> roles) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    public List<RoleName> getRoleNames() {
        return this.roles.stream().map(Role::getName).toList();
    }

    public String getDisplayName() {
        return this.name + " " + this.surname;
    }
}
