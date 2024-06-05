-- This file describes the Schema used for our Bookstore

-- Create the Users table 
CREATE TABLE BS.Users (
    UserID INT PRIMARY KEY,
    UserName VARCHAR(60) NOT NULL UNIQUE,
    UserType VARCHAR(20) NOT NULL
);

-- Create the Books table (Contains book details)
CREATE TABLE BS.Books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Publisher VARCHAR(50) NOT NULL,
    ISBN VARCHAR(14) NOT NULL, -- Assume ISBN-13
    Format VARCHAR(20) NOT NULL,
    BookLanguage VARCHAR(20) NOT NULL,
    Lexile INT
);

-- Create the Checkout table
CREATE TABLE BS.Checkout (
    UserID INT NOT NULL,
    BookID INT NOT NULL,
    CheckoutDate DATE,
    DueDate DATE,
    PRIMARY KEY (UserID, BookID, CheckoutDate, DueDate),
    FOREIGN KEY (UserID) REFERENCES BS.Users(UserID),
    FOREIGN KEY (BookID) REFERENCES BS.Books(BookID)
);


-- This is some imaginary table data to demonstrate the functionality of our system

-- Reset table data if needed
delete from BS.Users;
delete from BS.Books;
delete from BS.Checkout;

-- Populate Users table
INSERT INTO BS.Users (UserID, UserName, UserType) VALUES
(1,'coreydc7','Admin'),(2,'FrostyNoFace','Admin'),(3,'Corey','Member'),(4,'Colton','Member');

-- Populate Books table
INSERT INTO BS.Books (BookID, Title, Publisher, ISBN, Format, BookLanguage, Lexile) VALUES
(1,'The Hobbit (The Lord of the Rings)','Clarion Books; Young Reader ed. edition (August 15, 2002)','978-0618260300','Paperback','English',1000),
(2,'Treasure Island','Independently published (March 11, 2020)','979-8623553805','Paperback','English',760),
(3,'Fahrenheit 451','Simon & Schuster; Reissue edition (January 10, 2012)','978-1451673319','Paperback','English',890),
(4,'Fairy Tale','Scribner (June 6, 2023)','978-1668002193','Paperback','English',NULL)
;
