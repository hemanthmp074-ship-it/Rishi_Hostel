const User = require('../models/User')

exports.onboarding = async (req, res) => {
  try {
    const authUser = req.user;
    if (!authUser) {
      return res.status(400).json({ message: "user not found" });
    }

    const user = await User.findById( authUser._id);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (user.onboardingCompleted) {
      return res.status(400).json({ message: "the onboarding is already completed" });
    }

    const {
      name,
      dob,
      address,
      phone_no,
      aadhar_no_4,
      allocated_room_no,
      joining_date,
      leaving_date
    } = req.body;

    if (
      !name ||
      !dob ||
      !address ||
      !phone_no ||
      !aadhar_no_4 ||
      !allocated_room_no ||
      !joining_date
    ) {
      return res.status(400).json({ message: "all the fields are required" });
    }

    

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name,
      dob,
      address,
      phone_no,
      aadhar_no_4,
      allocated_room_no,
      joining_date,
      leaving_date

        
      },
      { new: true } // return updated document
    );

    user.onboardingCompleted=true;
    await user.save();
    

    return res
      .status(200)
      .json({ message: "onboarding completed", onboardingCompleted: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "server side error" });
  }
};
