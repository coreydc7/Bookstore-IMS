package main.java.com.bs.ims.JavaServlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;

import main.java.com.bs.ims.JDBC_Authentication;
import main.java.com.bs.ims.model.Member;
import main.java.com.bs.ims.model.HashPassword;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MemberLoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Populates with Database Connection information for JDBC
    private static JDBC_Authentication jdbcConnection = new JDBC_Authentication();
    
	private static final String JDBC_URL = jdbcConnection.getURL();
    private static final String JDBC_USERNAME = jdbcConnection.getUsername();
    private static final String JDBC_PASSWORD = jdbcConnection.getPassword();

    // Handles incoming POST requests to /demoapp/login/
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
        String username = jsonObject.get("username").getAsString();
        String password = jsonObject.get("password").getAsString();

        // Hash password
        String hashedPassword = HashPassword.hashPassword(password);

        Member memberResult = null;
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

            // Create a PreparedStatement
            String sql = "SELECT * FROM IMS_Members WHERE UserName = ? AND Pass = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1,username);
            statement.setString(2,hashedPassword);

            // Execute Query and store in ResultSet
            resultSet = statement.executeQuery();

            while (resultSet.next()) {
                String foundUser = resultSet.getString("UserName");
                String foundType = resultSet.getString("UserType");
                String foundPass = resultSet.getString("Pass");

                memberResult = new Member(foundUser,foundType,foundPass);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close all resources
            try { if (resultSet != null) resultSet.close(); } catch (SQLException e) { e.printStackTrace(); }
            try { if (statement != null) statement.close(); } catch (SQLException e) { e.printStackTrace(); }
            try { if (connection != null) connection.close(); } catch (SQLException e) { e.printStackTrace(); }
        }

        // Convert memberResult into JSON and send as a response. Will be null if nothing found
        Gson gson = new Gson();
        String jsonResult = gson.toJson(memberResult);

        // Send back a response to the client
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print(jsonResult);
        out.flush();
    }
}
