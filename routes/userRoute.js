const Router = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User.model");
const router = Router.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const Authentication = require("../Middleware/verifyAuthentication");
const Subscriber = require("../models/Subscriber.model");
/**
 * @route   POST api/user/register
 * @desc    Register new user
 * @access  Public
 */

router.post("/registerAuthor", async (req, res) => {
    const { name, email, password, phone, emailNotification } = req.body;

    // Validation
    console.log(req.body);
    if (!name || !email || !password || !phone || !emailNotification) {
        return res.status(400).json({ msg: "Please enter all feilds" });
    }

    try {
        const mailCheck = await User.findOne({ email });
        if (mailCheck) return res.status(400).json({ msg: "Email already exists" });

        // const emailN = await User.findOne({ email });
        // if (emailN)  return res.status(400).json({ msg:"Phone Number already exists"});

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error("Something went wrong with bcrypt");

        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error("Something went wrong hashing password");

        const newUser = new User({
            name: name,
            email: email,
            password: hash,
            phone: phone,
            emailNotification: emailNotification,
            type: "Author"
        });

        const savedUser = await newUser.save();
        if (!savedUser) throw Error("Something went wrong saving the user");
        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
            expiresIn: 3600,
        });

        res.status(200).json({
            token,
            user: {
                id: savedUser._id,
                name: savedUser.firstName,
                email: savedUser.email,
            },
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/registerSubscriber", async (req, res) => {
    const { email } = req.body;

    // Validation
    console.log(req.body);
    if (!email) {
        return res.status(400).json({ msg: "Please enter all feilds" });
    }

    try {
        const mailCheck = await Subscriber.findOne({ email });
        if (mailCheck) return res.status(200).json({ msg: "Already Subscribed" });

        const newSubscriber = new Subscriber({
            email: email,
        });

        const savedSubscriber = await newSubscriber.save();
        if (!savedSubscriber) throw Error("Something went wrong saving the user");
        res.status(200).json({
            msg: "Subscribed Successfully",
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @route   POST api/user/login
 * @desc    Login  user
 * @access  Public
 */

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // Validation
    console.log(JWT_SECRET)
    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all feilds" });
    }

    try {
        // Check exisitng User
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid email or password" });
        console.log(JWT_SECRET);

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600000 });
        if (!token) return res.status(500).json({ msg: "Internal Server Error" });
        console.log("we are testing our frontend");
        res.status(200).json({
            token,
            // user: {
            //   id: user._id,
            //   name: user.name,
            //   email: user.email,
            // },
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

/**
 * @route   GET api/users/all
 * @desc    Get all users
 * @access  Private
 */
router.get("/profile", async (req, res) => {
    const userId = req.user.id;
    // Retrieve user profile data from the database using the user ID
    try {
        const userProfile = await User.findById(userId);
        res.json({ profile: userProfile });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
});

/* router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("No users exist");
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}); */

/**
 * @route   GET api/users/id
 * @desc    Get specific user
 * @access  Private
 */

router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @route   Delete api/users/id
 * @desc    User Deleted
 * @access  Private
 */

router.route("/:id").delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User Deleted !"))
        .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @route   GET api/users/update/:id
 * @desc    Get all users
 * @access  Private
 */

router.route("/update/:id").post((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            // password left
            user
                .save()
                .then(() => res.json("User updated !"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;


