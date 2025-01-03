const apiKeyValidator = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKeys = [process.env.API_KEY];
    if (!apiKey || !validApiKeys.includes(apiKey)) {
      return res.status(403).json({ success: false, message: "Access denied. Invalid API key." });
    }
  
    next();
  };
  
  module.exports = apiKeyValidator;
  