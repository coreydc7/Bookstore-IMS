package com.bs.ims.model;

import org.mindrot.jbcrypt.BCrypt;

public class HashPassword {
    // The higher the workFactor, the more secure but slower the hash
    private static final int workFactor = 12;

    public static String hashPassword(String plainTextPassword) {
        return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt(workFactor));
    }

    public static boolean checkPassword(String plainTextPassword, String hashedPassword) {
        return BCrypt.checkpw(plainTextPassword, hashedPassword);
    }
}
