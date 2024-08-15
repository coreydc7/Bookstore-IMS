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
import com.bs.ims.model.Checkout;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BookHistoryServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Populates with Database Connection info stored in JDBC_Authentication.java
    public static final JDBC_Authentication jdbcConnection = new JDBC_Authentication();
    private static final String JDBC_URL = jdbcConnection.getURL();
    private static final String JDBC_USERNAME = jdbcConnection.getUsername();
    private static final String JDBC_PASSWORD = jdbcConnection.getPassword();

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String title = request.getParameter("title");

        List<Checkout> searchResult = new ArrayList<>();
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

            // Create Prepared SQL Statement
            String sql = "SELECT DISTINCT c.UserName, c.CheckoutDate, c.ReturnedDate FROM IMS_Checkout c JOIN IMS_Books b ON c.BookID = b.BookID WHERE b.title LIKE ? ORDER BY c.CheckoutDate DESC;";

            statement = connection.prepareStatement(sql);
            statement.setString(1, "%" + title + "%");

            // Execute SQL Query
            resultSet = statement.executeQuery();

            // Create Book objects containing information returned for each entry in
            // Database
            while (resultSet.next()) {
                String username = resultSet.getString("UserName");
                String checkoutDate = resultSet.getString("CheckoutDate");
                String returned = resultSet.getString("ReturnedDate");

                Checkout checkoutResult = new Checkout(title, checkoutDate, returned, username);
                searchResult.add(checkoutResult);
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
