import Workshop from "../models/WorkshopSchema.js";

export const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workshops", error });
  }
};

export const addWorkshop = async (req, res) => {
  try {
    const { name, details, time, link } = req.body;

    if (!name || !details || !time) {
      return res
        .status(400)
        .json({ message: "All fields except link are required" });
    }

    const newWorkshop = new Workshop({
      name,
      details,
      time,
      link: link || "",
    });

    await newWorkshop.save();
    res
      .status(201)
      .json({ message: "Workshop added successfully", workshop: newWorkshop });
  } catch (error) {
    res.status(500).json({ message: "Error adding workshop", error });
  }
};

export const deleteWorkshop = async (req, res) => {
  try {
    const { id } = req.body;
    const workshop = await Workshop.findById(id);

    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    await Workshop.findByIdAndDelete(id);
    res.json({ message: "Workshop deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting workshop", error });
  }
};
