package com.bs.ims.model;

public class Checkout {
    private String title; 
    private String checkoutDate;
    private String returned;

    public Checkout(String title, String checkoutDate, String returned) {
        this.title = title;
        this.checkoutDate = checkoutDate;
        this.returned = returned;
    }

    public String getTitle() {
        return this.title;
    }

    public String getReturned() {
        return this.returned;
    }

    public String getCheckoutDate() {
        return this.checkoutDate;
    }
}
