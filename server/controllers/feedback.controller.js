import Feedback from "../models/FeedbackSchema.js";

// Add feedback
export const addFeedback = async (req, res) => {
  const { name, message } = req.body;
  try {
    const feedback = new Feedback({
      name,
      message,
    });
    await feedback.save();
    res.status(201).json({
      success: true,
      message: "Feedback Submitted",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all feedbacks
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json({
      data: feedbacks,
      success: true,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
