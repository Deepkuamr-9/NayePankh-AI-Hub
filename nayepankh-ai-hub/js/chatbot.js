// NayePankh AI Hub — Chatbot Module
// Powered by Google Gemini API (FREE - No credit card needed)

// ============================================================
// 🔑 PASTE YOUR GEMINI API KEY BELOW (between the quotes)
// Get it FREE at: https://aistudio.google.com → Get API Key
// ============================================================
const API_KEY = "YOUR_API_KEY";
// ============================================================

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are Pankh, the official AI assistant for NayePankh Foundation — a registered NGO dedicated to empowering underprivileged youth through education, skill development, and community initiatives across India.

Your role:
- Answer questions about NayePankh Foundation's programs, mission, campaigns, and volunteering opportunities
- Help potential volunteers understand how to join and contribute
- Inform donors about how their contributions are used
- Explain the Foundation's AI and technology initiatives
- Be warm, encouraging, and inspiring — this is a social good organization

Key facts about NayePankh Foundation:
- Founded to provide wings (pankh) to underprivileged students
- Runs education drives, skill workshops, fundraising campaigns, and awareness campaigns
- Has 2,400+ volunteers across 48+ cities in India
- Offers free internships to college students to gain practical experience
- Campaigns include digital literacy, career guidance, and scholarship support

Always respond in a friendly, professional tone. Keep responses concise (2-4 short paragraphs max). Use emojis occasionally to keep the tone warm.`;

let chatHistory = [];

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  await processMessage(text);
}

async function sendQuick(text) {
  await processMessage(text);
}

async function processMessage(text) {
  addMessage('user', text);
  chatHistory.push({ role: 'user', parts: [{ text }] });
  showTyping();

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'Understood! I am Pankh, NayePankh Foundation\'s AI assistant. How can I help?' }] },
        ...chatHistory
      ],
      generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
    })
    });

    const data = await response.json();
    removeTyping();

    if (data.error) {
      addMessage('bot', `⚠️ Error: ${data.error.message}`);
      return;
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble. Please try again!";
    addMessage('bot', reply);
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });

  } catch (err) {
    removeTyping();
    addMessage('bot', "⚠️ Connection issue. Make sure your Gemini API key is set in js/chatbot.js");
  }
}

function addMessage(role, text) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `msg ${role === 'bot' ? 'bot-msg' : 'user-msg'}`;

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = role === 'bot' ? '🌱' : '👤';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/•/g, '&bull;');

  div.appendChild(avatar);
  div.appendChild(bubble);
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg bot-msg typing-bubble';
  div.id = 'typingIndicator';
  div.innerHTML = '<div class="msg-avatar">🌱</div><div class="msg-bubble">Pankh is thinking...</div>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function clearChat() {
  chatHistory = [];
  const container = document.getElementById('chatMessages');
  container.innerHTML = '';
  addMessage('bot', 'Chat cleared! How can I help you with NayePankh Foundation? 🌱');
}

// ── AI Agent Tasks
const AGENT_PROMPTS = {
  social: {
    label: '📱 Social Media Post Generator',
    prompt: `You are a social media manager for NayePankh Foundation NGO. Generate 3 social media posts (for Instagram, Twitter/X, and LinkedIn) for a new education campaign called "Digital Wings" that teaches digital literacy to underprivileged students in rural India. Include relevant emojis, hashtags, and a call to action for each platform. Format each post clearly with the platform name as a header.`
  },
  report: {
    label: '📋 Weekly Impact Report Generator',
    prompt: `Generate a formatted weekly impact report for NayePankh Foundation for the week of June 9-14, 2025. Include: Executive Summary, Volunteer Activity (with sample numbers), Campaign Progress (2 active campaigns), Fundraising Update, Key Achievements, Challenges & Solutions, and Next Week's Goals. Make it professional, inspiring, and include realistic numbers. Format with clear sections.`
  },
  email: {
    label: '📧 Volunteer Welcome Email',
    prompt: `Write a warm, inspiring welcome email for a new volunteer named Priya Sharma who has joined NayePankh Foundation as a Content Writing volunteer from Pune. She is a 2nd year B.Com student. Include: warm welcome, what to expect in first week, introduction to the team culture, key resources, first task suggestion, and an inspiring closing. Subject line included.`
  },
  fundraise: {
    label: '💌 Fundraising Appeal Letter',
    prompt: `Write a compelling fundraising appeal for NayePankh Foundation's "Education for All" campaign. Goal is Rs 5 lakh to fund digital devices for 200 underprivileged students. Include: emotional opening story (fictional student), problem statement, donation tiers (Rs 500, 1000, 2500, 5000), impact numbers, and a strong call to action. Make it heartfelt yet professional.`
  }
};

async function runAgent(type) {
  const output = document.getElementById('agentOutput');
  const status = document.getElementById('agentStatus');
  const copyBtn = document.getElementById('copyBtn');
  const config = AGENT_PROMPTS[type];

  status.textContent = `⚡ Running: ${config.label}`;
  status.className = 'agent-running';
  copyBtn.style.display = 'none';
  output.innerHTML = '<div style="color:#ffc947;padding:1rem">⚡ AI Agent is working...<br/><br/><span style="font-size:.8rem;color:#4a6080">Calling Gemini API · Generating content · Formatting output...</span></div>';

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: config.prompt }] }],
        generationConfig: { maxOutputTokens: 1000, temperature: 0.8 }
      })
    });

    const data = await response.json();

    if (data.error) {
      output.innerHTML = `<span style="color:#ff6b6b">⚠️ Error: ${data.error.message}</span>`;
      status.textContent = '❌ Error';
      status.className = 'agent-idle';
      return;
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Error getting response.';
    output.textContent = text;
    status.textContent = '✅ Task Complete';
    status.className = 'agent-done';
    copyBtn.style.display = 'block';

  } catch (err) {
    output.innerHTML = '<span style="color:#ff6b6b">⚠️ API error. Make sure your Gemini API key is set in js/chatbot.js</span>';
    status.textContent = '❌ Error';
    status.className = 'agent-idle';
  }
}

function copyAgentOutput() {
  const text = document.getElementById('agentOutput').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = '✅ Copied!';
    setTimeout(() => btn.textContent = '📋 Copy Output', 2000);
  });
}
