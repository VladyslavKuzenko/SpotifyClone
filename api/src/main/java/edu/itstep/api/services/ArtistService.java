package edu.itstep.api.services;

import edu.itstep.api.models.Artist;
import edu.itstep.api.repositories.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtistService {
    @Autowired
    private ArtistRepository artistRepository;
    public void addListeningToArtistTrack(String id){
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artist not found"));

        artist.setListeningCount(artist.getListeningCount()+1);
        artistRepository.save(artist);
    }
    public Artist updateAbout(Artist updatedArtist){
        Artist artist = artistRepository.findById(updatedArtist.getId())
                .orElseThrow(() -> new RuntimeException("Artist not found"));
        artist.setAboutArtist(updatedArtist.getAboutArtist());
        artist.setFacebookLink(updatedArtist.getFacebookLink());
        artist.setTwitterLink(updatedArtist.getTwitterLink());
        artist.setInstagramLink(updatedArtist.getInstagramLink());
        artist.setAboutImgUrl(updatedArtist.getAboutImgUrl());
        return artistRepository.save(artist);
    }
}
