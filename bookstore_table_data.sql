-- This file describes the Schema used for our Bookstore
CREATE DATABASE Bookstore_IMS;
USE Bookstore_IMS;

-- Reset tables
DROP TABLE IMS_Checkout;
DROP TABLE IMS_Members;
DROP TABLE IMS_Books;

-- Create the Members table 
CREATE TABLE IMS_Members (
    UserName VARCHAR(60) PRIMARY KEY,
    UserType VARCHAR(20) NOT NULL,
    Pass VARCHAR(60) NOT NULL
);

-- Create the Books table (Contains all book details)
CREATE TABLE IMS_Books (
    BookID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    Publisher VARCHAR(255) NOT NULL,
    ISBN VARCHAR(14) NOT NULL, 
    Format VARCHAR(20) NOT NULL,
    BookLanguage VARCHAR(20) NOT NULL,
    Lexile INT, 
    CheckedOut VARCHAR(1)
);

-- Create the Checkout table
CREATE TABLE IMS_Checkout (
    UserName VARCHAR(60) NOT NULL,
    BookID INT NOT NULL,
    CheckoutDate DATE NOT NULL,
    ReturnedDate DATE,
    DueDate DATE,
    PRIMARY KEY (UserName, BookID, CheckoutDate),
    FOREIGN KEY (UserName) REFERENCES IMS_Members(UserName),
    FOREIGN KEY (BookID) REFERENCES IMS_Books(BookID)
);


-- This is some imaginary table data to demonstrate the functionality of our system

-- Reset table data if needed
delete from IMS_Members;
delete from IMS_Books;
delete from IMS_Checkout;

-- Populate Books table
INSERT INTO IMS_Books (Title, Publisher, ISBN, Format, BookLanguage, Lexile, CheckedOut) VALUES
('The Hobbit (The Lord of the Rings)','Clarion Books; Young Reader ed. edition (August 15, 2002)','978-0618260300','Paperback','English',1000,'0'),
('Treasure Island','Independently published (March 11, 2020)','979-8623553805','Paperback','English',760,'0'),
('Fahrenheit 451','Simon & Schuster; Reissue edition (January 10, 2012)','978-1451673319','Paperback','English',890,'0'),
('Fairy Tale','Scribner (June 6, 2023)','978-1668002193','Paperback','English',870,'0')
;
