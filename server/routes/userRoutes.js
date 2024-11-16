const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user by providing username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields or user already exists
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user by email and password and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful and returns access token
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", loginUser);


router.get("/current", validateToken, currentUser);

module.exports = router;
