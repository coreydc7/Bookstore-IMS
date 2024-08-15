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

public class BookReturnServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Populates with Database Connection info stored in JDBC_Authentication.java
    public static final JDBC_Authentication jdbcConnection = new JDBC_Authentication();
    private static final String JDBC_URL = jdbcConnection.getURL();
    private static final String JDBC_USERNAME = jdbcConnection.getUsername();
    private static final String JDBC_PASSWORD = jdbcConnection.getPassword();

    // Handles incoming POST requests to /demoapp/bookReturn/
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
        String title = jsonObject.get("title").getAsString();

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

            // Create a PreparedStatement to update the checkout record
            String sql = "UPDATE IMS_Checkout SET ReturnedDate = CURDATE() WHERE (BookID, CheckoutDate) IN (SELECT c.BookID, MAX(c.CheckoutDate) FROM IMS_Checkout c JOIN IMS_Books b ON c.BookID = b.BookID WHERE b.Title = ? AND c.ReturnedDate IS NULL GROUP BY c.BookID);";
            statement = connection.prepareStatement(sql);
            statement.setString(1, title);

            // Execute Update query
            int rowsAffected = statement.executeUpdate();

            // If update was successful, set CheckedOut = 0 in Books table
            if (rowsAffected > 0) {
                sql = "UPDATE IMS_Books SET CheckedOut = '0' WHERE title = ?";
                statement = connection.prepareStatement(sql);
                statement.setString(1,title);

                int updateRows = statement.executeUpdate();

                String jsonResponse;
                if (updateRows > 0) {
                    jsonResponse = "{\"message\": \"Book returned successfully.\"}";
                } else {
                    jsonResponse = null;
                }
                // Send Response
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(jsonResponse);
            }

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
