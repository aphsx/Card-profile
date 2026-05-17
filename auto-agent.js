import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? process.env.CLAUDE_API_KEY
});

async function main() {
  try {
    console.log("Calling MiniMax API...");

    const message = await client.messages.create({
      model: "MiniMax-M2.7",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: "Write a short, unique JavaScript coding tip or a small useful utility function for today. Return ONLY the markdown content, no extra talk."
        }
      ]
    });

    const aiContent = message.content[0].text;
    const fs = await import('fs');
    const logText = `\n\n### Update: ${new Date().toISOString().split('T')[0]}\n${aiContent}`;
    fs.appendFileSync('TODAYS_TIPS.md', logText);

    console.log("AI generation complete and file updated!");
  } catch (error) {
    console.error("Error running AI agent:", error);
    process.exit(1);
  }
}

main();