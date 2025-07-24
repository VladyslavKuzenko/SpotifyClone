package edu.itstep.api.services;

import edu.itstep.api.models.Album;
import edu.itstep.api.repositories.AlbumRepository;
import edu.itstep.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlbumService {
    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private UserRepository userRepository;

    public Album updateAlbum(Long id, Album updatedAlbum) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Album not found"));

        album.setTracks(updatedAlbum.getTracks());
        album.setImageUrl(updatedAlbum.getImageUrl());

        return albumRepository.save(album); // це оновлення
    }
//    public Album updateAlbumSavedBy(String user_id, Album updatedAlbum) {
//        Album album = albumRepository.findById(updatedAlbum.getId())
//                .orElseThrow(() -> new RuntimeException("Album not found"));
//        User user = userRepository.findById(user_id)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//
//
//        return albumRepository.save(album);
//    }

}
