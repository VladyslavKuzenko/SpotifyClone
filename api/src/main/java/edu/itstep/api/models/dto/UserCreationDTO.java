package edu.itstep.api.models.dto;

import java.util.List;

public class UserCreationDTO {
    public String id;
    public String firstName;
    public String lastName;
    public String username;
    public String shortBio;
    public IdWrapper goal;
    public List<IdWrapper> genres;
    public List<IdWrapper> vibes;
}

