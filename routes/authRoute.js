const Router = require("express");
const router = Router.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")
const authController = require("../Controller/authController");
const cors = require("cors");
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * @swagger
 * tags:
 * - name: Books
 *   description: The books managing API
 * /login:
 *   get:
 *     summary: Lists all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *   put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */

/**
 * @swagger
 * /login:
 *  get: 
 *    description: Obtém a lista de clientes
 *    responses:
 *      '200': 
 *        description: Clientes obtidos com sucesso 
 */
router.post("/login", authController.login);
router.post("/logout", authController.logOut);
router.post("/registerAuthor", authController.signUp);
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  cors(),
  passport.authenticate("google", {
    failureRedirect: "https://cms-web-app-07.web.app/",
  }),
  function (req, res) {
    // Successful authentication, redirect secrets.
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, {
      expiresIn: 36000000,
    });
    res.cookie("token", token, {
      httpOnly: false,
      domain: "cms-web-app-07.web.app", // Replace with your desired domain
    });

       res.setHeader("Set-Cookie", [
         `token=${token}; HttpOnly; secure; domain=.cms-web-app-07.web.app; samesite=none; path=/`
       ]);

res.setHeader("Set-Cookie", [
                            `bearer=${token}; HttpOnly; secure; domain=cms-web-app-07.web.app; samesite=none; path=/; max-age=${60 * 60 * 24 * 7 * 2}`,
                            `bearer=${token}; HttpOnly; samesite=lax; path=/; max-age=${60 * 60 * 24 * 7 * 2}`]);
    res.redirect("https://cms-web-app-07.web.app/");
  }
);

module.exports = router;
