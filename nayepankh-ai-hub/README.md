# 🌱 NayePankh AI Hub
### AI-Powered Platform for NayePankh Foundation
**Internship Project — AI, Data Analytics, Python, ML, AI Agent, AI Web Development**

---

## 🚀 What This Project Does

A fully functional, single-page web application built for the NayePankh Foundation internship selection task. It covers **6 internship roles** in one unified platform:

| Module | Internship Role |
|--------|----------------|
| 🤖 AI Chatbot (Powered by Claude) | AI Internship |
| 📊 Data Analytics Dashboard | Data Analytics Internship |
| 🙋 Smart Volunteer Registration | Full Stack / Web Dev |
| 🧠 ML Campaign Success Predictor | Machine Learning Internship |
| ⚡ Autonomous AI Agent | AI Agent Development |
| 🐍 Python Automation Pipeline | Python Development |

---

## ✨ Features

### 🤖 AI Chatbot — "Pankh"
- Powered by **Claude Sonnet** (Anthropic API)
- Answers questions about NayePankh Foundation
- Remembers conversation history
- Quick-reply suggestion buttons
- Typing indicator with smooth animations

### 📊 Analytics Dashboard
- 4 KPI cards with live counter animations
- Volunteer growth line chart (Chart.js)
- Campaign categories doughnut chart
- Monthly fundraising bar chart
- Regional distribution horizontal bar chart

### 🙋 Volunteer Registration
- 2-step form with smooth transitions
- Skill-tag selection (toggle UI)
- **AI role matching** — suggests best volunteer team based on skills
- Animated success confirmation

### 🧠 ML Campaign Predictor
- Slider-based input for budget, audience, duration
- Simulated ML scoring algorithm
- Score circle with animated counter
- Metric bars with fill animations
- Personalized AI insights

### ⚡ AI Agent Workflows
- 4 agent tasks powered by Claude API
- Social media post generator
- Weekly impact report generator
- Volunteer welcome email drafter
- Fundraising appeal writer
- Copy-to-clipboard output

### 🐍 Python Pipeline Simulator
- Live syntax-highlighted Python code display
- Animated pipeline step visualization
- Step-by-step terminal log output
- Simulates: data ingestion → validation → AI enrichment → reporting → email dispatch

---

## 🛠️ How to Run

### Option 1: Open Directly (Recommended)
Just open `index.html` in any modern browser. No server needed!

```bash
# Double-click index.html, or:
open index.html
```

### Option 2: Local Server (for full API features)
```bash
# Python
python -m http.server 3000

# Then open: http://localhost:3000
```

---

## 🔑 API Key Setup (For Live AI Features)

The AI features (Chatbot + AI Agent) require an Anthropic API key.

1. Get your free API key at: https://console.anthropic.com
2. Open `js/chatbot.js`
3. The API calls go to `https://api.anthropic.com/v1/messages`
4. **Note:** For production use, API keys should be stored server-side

> Without an API key, all other features (charts, forms, predictor, pipeline) work fully. The chatbot and agent will show a connection error.

---

## 📁 Project Structure

```
nayepankh-ai/
├── index.html          # Main HTML (all sections)
├── css/
│   └── style.css       # Complete stylesheet (dark theme)
├── js/
│   ├── charts.js       # Chart.js visualizations
│   ├── chatbot.js      # Claude AI chatbot + agent
│   └── app.js          # Form, predictor, pipeline logic
└── README.md           # This file
```

---

## 🎨 Design System

- **Colors:** Deep teal (#00c9a7), Electric green (#39ff85), Warm gold (#ffc947)
- **Background:** Dark navy (#060d1a) with animated ambient orbs
- **Typography:** Sora (display/headings) + Inter (body)
- **Components:** Glass-morphism cards, gradient text, animated counters
- **Responsive:** Works on mobile, tablet, and desktop

---

## 🌟 Built For

**NayePankh Foundation Internship Selection Task**
Covers: AI, Data Analytics, Python Development, Machine Learning, AI Agent Development, AI Web Development

Built with ❤️ to demonstrate real-world AI integration for social good organizations.

---

## 📬 Submission

- Submit as GitHub link or Google Drive link
- Ensure the link is publicly accessible
- Live demo recommended (use GitHub Pages or Netlify)
