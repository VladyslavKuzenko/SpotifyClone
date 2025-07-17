package edu.itstep.api.models.dto;

public class MessageDTO {
    private String contentJson;
    private Long chatId;

    public MessageDTO() {
    }

    public String getContentJson() {
        return contentJson;
    }

    public void setContentJson(String contentJson) {
        this.contentJson = contentJson;
    }

    public Long getChatId() {
        return chatId;
    }

    public void setChatId(Long chatId) {
        this.chatId = chatId;
    }
}
