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

public class BookSearchServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Populate with Database Connection information for JDBC
    public static final JDBC_Authentication jdbcConnection = new JDBC_Authentication();
	private static final String JDBC_URL = jdbcConnection.getURL();
    private static final String JDBC_USERNAME = jdbcConnection.getUsername();
    private static final String JDBC_PASSWORD = jdbcConnection.getPassword();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userInput = request.getParameter("userInput");

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
            // Establish a connection with the database
            connection = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);

            // Create Prepared SQL Statement
            String sql;
            if(userInput == "") {
                sql = "SELECT * FROM IMS_Books";
                statement = connection.prepareStatement(sql);
            } else {
                sql = "SELECT * FROM IMS_Books WHERE Title LIKE ? OR Publisher LIKE ? OR ISBN = ?";
                statement = connection.prepareStatement(sql);
                statement.setString(1,"%" + userInput + "%");
                statement.setString(2, "%" + userInput + "%");
                statement.setString(3, userInput);
            }

            // Execute SQL Query
            resultSet = statement.executeQuery();

            // Create Book objects containing information returned from database
            while (resultSet.next()) {
                int bookID = resultSet.getInt("BookID");
                String title = resultSet.getString("Title");
                String publisher = resultSet.getString("Publisher");
                String ISBN = resultSet.getString("ISBN");
                String format = resultSet.getString("Format");
                String BookLanguage = resultSet.getString("BookLanguage");
                int lexile = resultSet.getInt("Lexile");

                Book newBook = new Book(bookID,title,publisher,ISBN,format,BookLanguage,lexile);
                searchResult.add(newBook);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close all resources
            try { if (resultSet != null) resultSet.close(); } catch (SQLException e) { e.printStackTrace(); }
            try { if (statement != null) statement.close(); } catch (SQLException e) { e.printStackTrace(); }
            try { if (connection != null) connection.close(); } catch (SQLException e) { e.printStackTrace(); }
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
