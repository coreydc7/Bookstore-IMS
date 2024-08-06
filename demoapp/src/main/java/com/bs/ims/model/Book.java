package com.bs.ims.model;

public class Book {
    private int ID;
    private String title;
    private String publisher;
    private String ISBN;
    private String format;
    private String language;
    private int lexile;

    public Book(int ID, String title, String publisher, String ISBN, String format, String language, int lexile) {
        this.ID = ID;
        this.title = title;
        this.publisher = publisher;
        this.ISBN = ISBN;
        this.format = format;
        this.language = language;
        this.lexile = lexile;
    }

    // Getters and setters
    public int getID() {
        return ID;
    }

    public String getTitle() {
        return title;
    }

    public String getPublisher() {
        return publisher;
    }

    public String getISBN() {
        return ISBN;
    }

    public String getFormat() {
        return format;
    }

    public String getLanguage() {
        return language;
    }

    public int getLexile() {
        return lexile;
    }
}