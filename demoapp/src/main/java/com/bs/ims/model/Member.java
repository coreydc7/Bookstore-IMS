package com.bs.ims.model;

public class Member {
    private String username;
    private String type;
    private String password;

    public Member(String username, String type, String password) {
        this.username = username;
        this.type = type;
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public String getType() {
        return this.type;
    }

    public String getPassword() {
        return this.password;
    }
}
