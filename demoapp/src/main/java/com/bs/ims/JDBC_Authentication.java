package main.java.com.bs.ims;

public class JDBC_Authentication {
    // Populate these fields with Database Connection information for JDBC

    private static final String JDBC_URL = "jdbc:mysql://faure.cs.colostate.edu:3306/coreydc";
    private static final String JDBC_USERNAME = "coreydc";
    private static final String JDBC_PASSWORD = "835870365";

    public String getURL() {
        return JDBC_URL;
    }

    public String getUsername() {
        return JDBC_USERNAME;
    }

    public String getPassword() {
        return JDBC_PASSWORD;
    }

}
