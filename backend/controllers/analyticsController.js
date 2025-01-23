const Click = require("../models/Click");

exports.getLinkAnalytics = async (req, res) => {
  const clicks = await Click.find({ link: req.params.linkId });

  const analyticsData = clicks.reduce(
    (acc, click) => {
      const { userAgent, timestamp } = click;
      const deviceType = userAgent.includes("Mobile")
        ? "Mobile"
        : userAgent.includes("Tablet")
        ? "Tablet"
        : "Desktop";

      acc.deviceTypes[deviceType] = (acc.deviceTypes[deviceType] || 0) + 1;
      acc.clicks++;
      acc.timestamps.push(timestamp);
      return acc;
    },
    { clicks: 0, deviceTypes: {}, timestamps: [] }
  );

  res.json({ analyticsData });
};
