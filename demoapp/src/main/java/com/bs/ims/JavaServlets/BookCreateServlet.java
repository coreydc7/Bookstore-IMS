package com.bs.ims.JavaServlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.io.BufferedReader;

import com.bs.ims.JDBC_Authentication;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BookCreateServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Populates with Database Connection information for JDBC
    private static JDBC_Authentication jdbcConnection = new JDBC_Authentication();

    private static final String JDBC_URL = jdbcConnection.getURL();
    private static final String JDBC_USERNAME = jdbcConnection.getUsername();
    private static final String JDBC_PASSWORD = jdbcConnection.getPassword();

    // Handles incoming POST requests to /register
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Read in POST request body
        StringBuilder jsonBuffer = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                jsonBuffer.append(line);
            }
        }

        // Then, parse JSON data
        JsonObject jsonObject = JsonParser.parseString(jsonBuffer.toString()).getAsJsonObject();
        String title = jsonObject.get("title").getAsString();
        String publisher = jsonObject.get("publisher").getAsString();
        String isbn = jsonObject.get("isbn").getAsString();
        String format = jsonObject.get("format").getAsString();
        String lang = jsonObject.get("lang").getAsString();
        int lexile = jsonObject.get("lexile").getAsInt();

        Connection connection = null;
        PreparedStatement statement = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try {
            // Establish a connection with the database
            connection = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);

            // Create a PreparedStatement
            String sql = "INSERT INTO IMS_Books (Title, Publisher, ISBN, Format, BookLanguage, Lexile, CheckedOut) VALUES (?,?,?,?,?,?,'0')";
            statement = connection.prepareStatement(sql);
            statement.setString(1, title);
            statement.setString(2, publisher);
            statement.setString(3, isbn);
            statement.setString(4, format);
            statement.setString(5, lang);
            statement.setInt(6, lexile);

            // Execute Update Query
            int rowsAffected = statement.executeUpdate();

            // Construct Response
            String jsonResponse;
            if (rowsAffected > 0) {
                jsonResponse = "{\"message\": \"Book added successfully.\"}";
            } else {
                jsonResponse = null;
            }
            // Send Response
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(jsonResponse);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close all resources
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

    }
}
