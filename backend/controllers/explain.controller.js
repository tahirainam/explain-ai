const { getExplanation } = require("../services/explain.service");

const explainCode = async (req, res) => {
  const { code, mode } = req.body;

  if (!code || !mode) {
    return res.status(400).json({ error: "Code and mode are required." });
  }

  try {
    const explanation = await getExplanation(code, mode);
    res.status(200).json({ explanation });
  } catch (error) {
    res.status(500).json({ error: "Failed to get explanation." });
  }
};

module.exports = { explainCode };