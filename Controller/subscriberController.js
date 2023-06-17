const Subscriber = require("../models/Subscriber.model");
const DEBUG = process.env.DEBUG;
const newSubscriber = async (req, res) => {
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
};

module.exports = {
  newSubscriber,
};
