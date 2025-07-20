package edu.itstep.api.models.dto;

import java.util.List;

public class UserCreationDTO {
    public String id;
    public String firstName;
    public String lastName;
    public String username;
    public String shortBio;
    public List<IdWrapper> genres;
    public Boolean isArtist;
}

