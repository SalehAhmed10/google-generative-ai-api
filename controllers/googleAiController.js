const dotenv = require("dotenv").config();

// import { TextServiceClient } from "@google-ai/generativelanguage";
// import { GoogleAuth } from "google-auth-library";
const { TextServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";

const API_KEY = process.env.API_KEY;

// send post request to /api/google-ai
const postGoogleApi = async (req, res) => {
  // get prompt from req.body
  const { prompt } = req.body;
  // const prompt = "What is the Capital of France?\n\nCapital of France is";

  console.log(prompt);
  try {
    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const response = await client.generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    });

    const result = response[0].candidates[0].output;

    res.json({
      message: "welcome to the google api",
      status: 200,
      result,
      response,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getGoogleAPi = async (req, res) => {
  // get params from url eg: /api/google-ai?prompt=hello
  const prompt = req.query.prompt;
  // const prompt = "What is the Capital of France?\n\nCapital of France is";

  console.log(prompt);
  try {
    const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const response = await client.generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    });

    const result = response[0].candidates[0].output;

    res.json({
      message: "welcome to the google api",
      status: 200,
      result,
      response,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  getGoogleAPi,
  postGoogleApi,
};
