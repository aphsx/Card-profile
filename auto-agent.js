import fs from 'fs';

async function callMiniMax() {
  const apiKey = process.env.CLAUDE_API_KEY;
  const url = 'https://api.minimaxi.com/v1/chat/completions';

  const payload = {
    model: "minimax-text-01",
    messages: [
      {
        role: "user",
        content: "Write a short, unique JavaScript coding tip or a small useful utility function for today. Return ONLY the markdown content, no extra talk."
      }
    ],
    temperature: 0.7,
    max_tokens: 1024
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`MiniMax API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function main() {
  try {
    console.log("Calling MiniMax API...");
    const aiContent = await callMiniMax();

    const logText = `\n\n### Update: ${new Date().toISOString().split('T')[0]}\n${aiContent}`;
    fs.appendFileSync('TODAYS_TIPS.md', logText);

    console.log("AI generation complete and file updated!");
  } catch (error) {
    console.error("Error running AI agent:", error);
    process.exit(1);
  }
}

main();