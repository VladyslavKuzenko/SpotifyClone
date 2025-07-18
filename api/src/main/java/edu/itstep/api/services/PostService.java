package edu.itstep.api.services;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import edu.itstep.api.models.Content;
import edu.itstep.api.models.Post;
import edu.itstep.api.models.Story;
import edu.itstep.api.models.User;
import edu.itstep.api.repositories.PostRepository;
import edu.itstep.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @Value("${app.secret.key}")
    private String privateKeyPath;

    public Post updatePost(Long id, Post updatedPost) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found"));

        post.getContents().clear();

        // Додати новий контент, прив'язати його до поста
        for (Content content : updatedPost.getContents()) {
            content.setPost(post); // важливо!
            post.getContents().add(content);
        }


//        post.setMediaUrl(updatedPost.getMediaUrl());
        return postRepository.save(post); // це оновлення
    }

    public String postFileToVM(MultipartFile file,String postId){
        String remoteHost = "ec2-18-170-58-194.eu-west-2.compute.amazonaws.com";
        String username = "ubuntu";
        String remoteDir="";
        String resultRequestUtl="http://"+remoteHost;
        String contentType = file.getContentType();
        if (contentType == null) return "невідомий тип контенту";

        if (contentType.startsWith("image/")) {
            remoteDir= "/var/www/html/uploads/img/";
            resultRequestUtl+="/uploads/img/";
        } else if (contentType.startsWith("audio/")) {
            remoteDir= "/var/www/html/uploads/songs/";
            resultRequestUtl+="/uploads/songs/";
        } else if (contentType.startsWith("video/")) {
            remoteDir= "/var/www/html/uploads/video/";
            resultRequestUtl+="/uploads/video/";
        }

        try {
            // Зберегти файл локально тимчасово
            File tempFile = File.createTempFile("upload-", file.getOriginalFilename());
            file.transferTo(tempFile);
            // Підключення по SSH
            JSch jsch = new JSch();
            Session session = jsch.getSession(username, remoteHost, 22);
            session.setPassword(privateKeyPath);
            // Пропуск перевірки ключа
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect();

            // SFTP канал
            Channel channel = session.openChannel("sftp");

            channel.connect();

            ChannelSftp sftp = (ChannelSftp) channel;

            // Завантаження файлу
            resultRequestUtl+=postId+"_"+file.getOriginalFilename();
            sftp.put(tempFile.getAbsolutePath(), remoteDir + postId+"_"+file.getOriginalFilename());

            // Закриття
            sftp.exit();
            session.disconnect();

            // Видалити тимчасовий файл
            tempFile.delete();

            return resultRequestUtl;
        } catch (Exception e) {
            e.printStackTrace();
            return "Помилка при завантаженні: " + e.getMessage();
        }
    }

    public List<Post> getPostByFollowing(String userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<User> followings = user.getFollowings();

        if (followings.isEmpty()) {
            return Collections.emptyList(); // або обробити якось інакше
        }

        return postRepository.findByUserIn(followings);
    }
}
