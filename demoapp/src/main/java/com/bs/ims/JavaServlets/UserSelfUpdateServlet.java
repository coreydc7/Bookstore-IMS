package com.bs.ims.JavaServlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.io.BufferedReader;

import com.bs.ims.JDBC_Authentication;
import com.bs.ims.model.HashPassword;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UserSelfUpdateServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Populates with Database Connection info stored in JDBC_Authentication.java
    public static final JDBC_Authentication jdbcConnection = new JDBC_Authentication();
    private static final String JDBC_URL = jdbcConnection.getURL();
    private static final String JDBC_USERNAME = jdbcConnection.getUsername();
    private static final String JDBC_PASSWORD = jdbcConnection.getPassword();

    // Handles incoming POST requests to /demoapp/memberUpdateInfo/
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

        // Then, parse the JSON data
        JsonObject jsonObject = JsonParser.parseString(jsonBuffer.toString()).getAsJsonObject();
        String username = jsonObject.get("username").getAsString();
        String newUsername = jsonObject.get("newUsername").getAsString();
        String password = jsonObject.get("password").getAsString();

        // Hash and Salt the password using BCrypt
        String hashedPassword = HashPassword.hashPassword(password);

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
            String sql = "UPDATE IMS_Members SET UserName = ?, Pass = ? WHERE UserName = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, newUsername);
            statement.setString(2, hashedPassword);
            statement.setString(3, username);
            // Execute Update query
            int rowsAffected = statement.executeUpdate();

            // Construct Response
            String jsonResponse;
            if (rowsAffected > 0) {
                jsonResponse = "{\"message\": \"User Updated successfully.\"}";
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
