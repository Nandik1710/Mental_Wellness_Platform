import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/chat", async (req, res) => {
    try {
        console.log("Received message:", req.body.message);

        const chat = model.startChat({
            history: [],
            generationConfig: { maxOutputTokens: 500 },
        });

        const result = await chat.sendMessage(req.body.message);
        const response = await result.response;
        const text = await response.text();

        console.log("✅ AI Response:", text);
        res.json({ reply: text });

    } catch (error) {
        console.error("❌ API Error:", error);
        res.status(500).json({ error: "Failed to fetch response from Gemini API" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
