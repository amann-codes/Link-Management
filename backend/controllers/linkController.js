const Link = require("../models/Link");
const Click = require("../models/Click");
exports.createLink = async (req, res) => {
  try {
    const { originalUrl, expirationDate } = req.body;

    if (!originalUrl || !expirationDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const shortUrl = Math.random().toString(36).substring(2, 8);

    const newLink = await Link.create({
      originalUrl,
      shortUrl,
      expirationDate,
      user: req.user.id,
    });

    res.status(201).json(newLink);
  } catch (error) {
    console.error("Error creating link:", error.message);
    res.status(500).json({ message: "Failed to create the link" });
  }
};

exports.getLinks = async (req, res) => {
  const links = await Link.find({ user: req.user.id })
    .skip(req.query.page * 10)
    .limit(10);
  res.json(links);
};

exports.trackClick = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    console.log("Received shortUrl:", shortUrl);

    const link = await Link.findOne({ shortUrl });
    if (!link) {
      console.log("Link not found for shortUrl:", shortUrl);
      return res.status(404).json({ message: "Link not found" });
    }

    console.log("Redirecting to:", link.originalUrl);
    res.redirect(link.originalUrl);
  } catch (error) {
    console.error("Error during redirection:", error.message);
    res.status(500).json({ message: "Failed to redirect" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalLinks = await Link.countDocuments({ user: req.user.id });

    const linkIds = await Link.find({ user: req.user.id }).select("_id");
    const totalClicks = await Click.countDocuments({ link: { $in: linkIds } });

    res.json({ totalLinks, totalClicks });
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};