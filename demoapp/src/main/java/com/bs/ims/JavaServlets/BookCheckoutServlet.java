package com.bs.ims.JavaServlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.io.BufferedReader;
import java.time.LocalDate;

import com.bs.ims.JDBC_Authentication;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BookCheckoutServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Populates with Database Connection information for JDBC
    private static JDBC_Authentication jdbcConnection = new JDBC_Authentication();

    private static final String JDBC_URL = jdbcConnection.getURL();
    private static final String JDBC_USERNAME = jdbcConnection.getUsername();
    private static final String JDBC_PASSWORD = jdbcConnection.getPassword();

    // Handles incoming POST requests to /demoapp/checkout
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Read the POST request body
        StringBuilder jsonBuffer = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                jsonBuffer.append(line);
            }
        }

        // Then, parse the JSON Data
        JsonObject jsonObject = JsonParser.parseString(jsonBuffer.toString()).getAsJsonObject();
        String title = jsonObject.get("title").getAsString();
        String username = jsonObject.get("username").getAsString();

        String bookID = null;
        LocalDate currentDate = LocalDate.now();
        LocalDate dueDate = currentDate.plusWeeks(2);
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        try {
            // Establish a connection with the database
            connection = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);

            // First, get the BookID of the Book being checked out
            // Create a PreparedStatement
            String sql = "SELECT * FROM IMS_Books WHERE Title = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, title);

            // Execute Query and store in ResultSet
            resultSet = statement.executeQuery();

            while (resultSet.next()) {
                bookID = resultSet.getString("BookID");
            }

            // Then, using Username and BookID, create a checkout record in the Checkout
            // table
            sql = "INSERT INTO IMS_Checkout (UserName, BookID, CheckoutDate, ReturnedDate, DueDate) VALUES (?,?,?,NULL,?)";
            statement = connection.prepareStatement(sql);
            statement.setString(1, username);
            statement.setInt(2, Integer.valueOf(bookID));
            statement.setDate(3, java.sql.Date.valueOf(currentDate));
            statement.setDate(4, java.sql.Date.valueOf(dueDate));

            // Execute Update Query
            int rowsAffected = statement.executeUpdate();

            // If update was successful, set CheckedOut = 1 in Books table
            if (rowsAffected > 0) {
                sql = "UPDATE IMS_Books SET CheckedOut = '1' WHERE BookID = ?";
                statement = connection.prepareStatement(sql);
                statement.setInt(1, Integer.valueOf(bookID));

                // Execute Update Query
                int updateRows = statement.executeUpdate();

                String jsonResponse;
                if (updateRows > 0) {
                    jsonResponse = "{\"message\": \"Book checked out successfully.\"}";
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
