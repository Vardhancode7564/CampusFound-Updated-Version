const { GoogleGenerativeAI } = require("@google/generative-ai");
const Item = require('../models/Item');

// Initialize Gemini
// Note: This requires GEMINI_API_KEY in .env
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Moved inside handler

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(503).json({ 
            message: "AI service is currently unavailable (API Key missing)." 
        });
    }
    
    const genAI = new GoogleGenerativeAI(apiKey.trim());

    // 1. Fetch Context (Recent Found Items)

    // 1. Fetch Context (Recent Found Items)
    // We get the last 5 'found' items to give the AI some "eyes" on the database
    const recentItems = await Item.find({ type: 'found', status: 'active' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title description category location date');

    const itemsContext = recentItems.map(item => 
      `- ${item.title} (${item.category}) found at ${item.location} on ${new Date(item.date).toLocaleDateString()}. Desc: ${item.description}`
    ).join('\n');

    // 2. Construct Prompt
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

    const prompt = `
      You are CampusBot, a helpful assistant for the CampusFound lost and found platform.
      
      Here is a list of recently FOUND items in the database:
      ${itemsContext}

      User Query: "${message}"

      Instructions:
      1. If the user is asking about a lost item, check the 'found items' list above. 
         - If you see a match, tell them about it specifically!
         - If no match, tell them to post a 'Lost Item' report on the dashboard.
      2. If the user asks how to use the app:
         - To report: "Go to the 'Post' page."
         - To claim: "Click on an item and select 'Claim'."
      3. Be friendly, concise, and helpful. Keep responses under 3 sentences if possible.
    `;

    // 3. Generate Content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ 
        message: "I'm having trouble thinking right now. Please try again later." 
    });
  }
};

module.exports = {
  chatWithAI
};
