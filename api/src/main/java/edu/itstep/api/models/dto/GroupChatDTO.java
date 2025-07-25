package edu.itstep.api.models.dto;

import java.util.List;

public class GroupChatDTO {
    private String title;
    private List<String> userIds;

    public GroupChatDTO() {
    }

    public GroupChatDTO(String title, List<String> userIds) {
        this.title = title;
        this.userIds = userIds;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<String> userIds) {
        this.userIds = userIds;
    }
}
