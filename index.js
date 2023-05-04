const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const configuration = new Configuration({
  organization: "org-16m6uSHpOokWmpGm6G6jb159",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// create a simple api that calls the function above
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3080;

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  console.log(message, "message");
  console.log(currentModel, "currentModel");
  console.log(message);
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  console.log();
  res.json({
    message: response.data.choices[0].text,
  });
});
app.get('/models', async (req, res) => {
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({
    models: response.data.data
  })
});
app.listen(port, () => {
  console.log(`example app listening at http://localhost:${port}`);
});
