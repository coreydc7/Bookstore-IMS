package com.bs.ims.JavaServlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.bs.ims.JDBC_Authentication;
import com.bs.ims.model.Book;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class InventorySearchServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Populates with Database Connection info stored in JDBC_Authentication.java
    public static final JDBC_Authentication jdbcConnection = new JDBC_Authentication();
    private static final String JDBC_URL = jdbcConnection.getURL();
    private static final String JDBC_USERNAME = jdbcConnection.getUsername();
    private static final String JDBC_PASSWORD = jdbcConnection.getPassword();

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // String display = request.getParameter("d");

        List<Book> searchResult = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try {
            // Establishes a connection with the database
            connection = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);

            // Creates a Prepared SQL Statement
            String sql = "SELECT * FROM IMS_Books";
            statement = connection.prepareStatement(sql);

            // Execute Query
            resultSet = statement.executeQuery();

            // Create Book objects containing information returned for each entry in
            // Database
            while (resultSet.next()) {
                int bookID = resultSet.getInt("BookID");
                String title = resultSet.getString("Title");
                String publisher = resultSet.getString("Publisher");
                String ISBN = resultSet.getString("ISBN");
                String format = resultSet.getString("Format");
                String BookLanguage = resultSet.getString("BookLanguage");
                int lexile = resultSet.getInt("Lexile");
                String checkedOut = resultSet.getString("CheckedOut");

                Book newBook = new Book(bookID, title, publisher, ISBN, format, BookLanguage, lexile, checkedOut);
                searchResult.add(newBook);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close all resources
            try {
                if (resultSet != null)
                    resultSet.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            try {
                if (statement != null)
                    statement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            try {
                if (connection != null)
                    connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        // Convert searchResult into JSON and send as a response
        Gson gson = new Gson();
        String jsonResult = gson.toJson(searchResult);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(jsonResult);
        out.flush();
    }
}
