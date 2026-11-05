# Quest Glasses AI

Unofficial no-login smart-glasses-style web experience for PC, Meta Quest 2, and Meta Quest 3.

## Included
- Redesigned dark, headset-friendly interface.
- PC Test, Quest 2, and Quest 3 display modes.
- Browser speech recognition where supported.
- Spoken replies using browser text-to-speech.
- Real AI chat through a private server-side OpenAI API key.
- In-session chat history.
- Music and call demo controls (clearly simulations).

## Important limits
This is not official Meta software and does not turn a Quest into Ray-Ban Meta glasses. A normal website cannot replace the Quest operating system, make real phone calls, or automatically access all headset cameras. Camera/passthrough access depends on Meta's supported native developer APIs and permissions. Microphone and speech support varies by browser; hosted microphone access requires HTTPS.

## Run locally
1. Install Node.js 20 or newer.
2. Open a terminal in this folder and run `npm install`.
3. Copy `.env.example` to `.env`.
4. Put your API key after `OPENAI_API_KEY=` in `.env`.
5. Run `npm start` and open `http://localhost:3000`.

Never put the API key in the `public` folder or commit `.env` to GitHub.

## Deploy to Render
Create a Render **Web Service** connected to this GitHub repository. Use build command `npm install` and start command `npm start`. Add `OPENAI_API_KEY` under Render → Environment, then deploy. The `render.yaml` file also contains the service settings.

API usage may cost money depending on your OpenAI account and usage.
