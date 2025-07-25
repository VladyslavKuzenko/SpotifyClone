//package edu.itstep.api.models;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "notification")
//public class Notification {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User contentOwner;
//    @Column(name = "content_type")
//    private String contentType;
//    @Column(name = "content_id")
//    private String contentId;
//
//    public Notification() {
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public User getContentOwner() {
//        return contentOwner;
//    }
//
//    public void setContentOwner(User contentOwner) {
//        this.contentOwner = contentOwner;
//    }
//
//    public String getContentType() {
//        return contentType;
//    }
//
//    public void setContentType(String contentType) {
//        this.contentType = contentType;
//    }
//
//    public String getContentId() {
//        return contentId;
//    }
//
//    public void setContentId(String contentId) {
//        this.contentId = contentId;
//    }
//}
