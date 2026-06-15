// NayePankh AI Hub — App Logic
// Volunteer Form, ML Predictor, Python Pipeline

// ── Smooth tab open
function openTab(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Volunteer Form Steps
let currentStep = 1;

function nextStep() {
  const name  = document.getElementById('vName').value.trim();
  const email = document.getElementById('vEmail').value.trim();
  if (!name || !email) {
    alert('Please fill in your name and email to continue.');
    return;
  }
  goToStep(2);
}

function prevStep() { goToStep(1); }

function goToStep(n) {
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById('formStep' + n).classList.add('active');
  currentStep = n;
}

function toggleSkill(el) {
  el.classList.toggle('selected');
}

async function submitVolunteer() {
  const name   = document.getElementById('vName').value.trim();
  const email  = document.getElementById('vEmail').value.trim();
  const city   = document.getElementById('vCity').value.trim() || 'your city';
  const org    = document.getElementById('vOrg').value.trim() || 'your institution';
  const hours  = document.getElementById('vHours').value;
  const skills = [...document.querySelectorAll('.skill-tag.selected')].map(t => t.textContent.trim());

  if (skills.length === 0) {
    alert('Please select at least one skill!');
    return;
  }

  // AI role matching based on skills
  const roleMap = {
    '🎨 Design': 'Creative & Design Team',
    '💻 Coding': 'Tech & Development Wing',
    '📝 Content Writing': 'Content & Communications',
    '📱 Social Media': 'Digital Marketing Team',
    '🎤 Public Speaking': 'Outreach & Events',
    '📊 Data Analysis': 'Research & Analytics',
    '🤖 AI / ML': 'AI Innovation Lab',
    '📷 Photography': 'Media & Visual Team',
    '🎬 Video Editing': 'Media & Visual Team',
    '🧑‍🏫 Teaching': 'Education & Mentoring'
  };

  const topSkill   = skills[0];
  const suggestedRole = roleMap[topSkill] || 'General Volunteering';
  const emoji = ['🎉', '🌟', '✨', '🚀'][Math.floor(Math.random() * 4)];

  document.getElementById('successMsg').textContent =
    `Welcome to NayePankh, ${name}! Your registration is confirmed for ${city}. A confirmation has been sent to ${email}.`;

  document.getElementById('roleMatch').innerHTML = `
    <div style="color:#00c9a7;font-weight:700;font-size:1rem;margin-bottom:.75rem">${emoji} Your AI-Matched Role</div>
    <div style="font-size:1.2rem;font-weight:800;margin-bottom:.5rem">${suggestedRole}</div>
    <div style="color:#94a8c4;font-size:.88rem">Based on your skills: <strong style="color:#f0f6ff">${skills.join(', ')}</strong></div>
    <div style="margin-top:1rem;color:#94a8c4;font-size:.85rem">Availability: <strong style="color:#f0f6ff">${hours || 'Flexible'}</strong> per week</div>
    <div style="margin-top:.75rem;padding:.75rem;background:rgba(0,201,167,.08);border-radius:.5rem;font-size:.82rem;color:#94a8c4">
      💌 Your team lead will contact you within 48 hours. Meanwhile, join our WhatsApp community!
    </div>
  `;

  goToStep(3);
}

function resetForm() {
  document.getElementById('vName').value = '';
  document.getElementById('vEmail').value = '';
  document.getElementById('vCity').value = '';
  document.getElementById('vOrg').value = '';
  document.getElementById('vHours').value = '';
  document.querySelectorAll('.skill-tag').forEach(t => t.classList.remove('selected'));
  goToStep(1);
}

// ── ML Campaign Predictor
function updateSlider(id, displayId) {
  const val = document.getElementById(id).value;
  const el  = document.getElementById(displayId);
  if (id === 'budget') el.textContent = '₹' + parseInt(val).toLocaleString();
  else if (id === 'duration') el.textContent = val + ' days';
  else el.textContent = parseInt(val).toLocaleString();
}

function predictCampaign() {
  const type     = document.getElementById('campType').value;
  const audience = parseInt(document.getElementById('audienceSize').value);
  const budget   = parseInt(document.getElementById('budget').value);
  const duration = parseInt(document.getElementById('duration').value);
  const social   = document.getElementById('socialMedia').value;

  // Simulated ML scoring model
  const typeBonus   = { education: 0.85, awareness: 0.78, recruitment: 0.72, skill: 0.8, fundraising: 0.68 };
  const socialBonus = { low: 0.6, medium: 0.78, high: 0.92 };
  const budgetScore = Math.min(budget / 50000, 1);
  const durScore    = Math.min(duration / 45, 1);
  const audScore    = Math.min(audience / 5000, 1);

  const raw = (typeBonus[type] * 0.3) + (socialBonus[social] * 0.25) + (budgetScore * 0.2) + (durScore * 0.15) + (audScore * 0.1);
  const score = Math.round(Math.min(raw * 100, 96));

  const reach       = Math.round(audience * (score / 100) * 1.4);
  const engagement  = Math.round(reach * 0.18);
  const conversions = Math.round(engagement * 0.22);

  // Show results
  const resultsEl = document.getElementById('predictorResults');
  resultsEl.style.display = 'block';

  const scoreColor = score >= 80 ? '#39ff85' : score >= 60 ? '#ffc947' : '#ff6b6b';
  document.getElementById('scoreCircle').style.borderColor = scoreColor;
  document.getElementById('scoreNum').style.color = scoreColor;

  // Animate score
  let current = 0;
  const interval = setInterval(() => {
    current = Math.min(current + 2, score);
    document.getElementById('scoreNum').textContent = current + '%';
    if (current >= score) clearInterval(interval);
  }, 20);

  document.getElementById('resultMetrics').innerHTML = `
    <div style="font-weight:600;margin-bottom:.75rem;font-size:.85rem;color:#94a8c4;text-transform:uppercase;letter-spacing:.08em">Predicted Metrics</div>
    ${makeMetric('👥 Estimated Reach', reach.toLocaleString() + ' people', score)}
    ${makeMetric('💬 Engagement Rate', ((score * 0.18)).toFixed(1) + '%', score * 0.18)}
    ${makeMetric('🎯 Conversions (Signups)', conversions.toLocaleString(), Math.min(conversions/50*100,100))}
    ${makeMetric('💰 ROI Score', (score * 1.4).toFixed(0) + '%', Math.min(score * 1.4, 100))}
  `;

  const tips = score >= 80
    ? ['✅ Strong campaign parameters detected', '🚀 High social media presence boosts reach significantly', '📅 Campaign duration is well optimized']
    : score >= 60
    ? ['⚡ Increase social media following for better reach', '💰 A slightly higher budget could improve by ~15%', '📅 Consider extending duration by 7+ days']
    : ['⚠️ Low budget may limit campaign visibility', '📱 Build social media presence before launch', '🎯 Narrow audience targeting recommended'];

  document.getElementById('resultInsights').innerHTML = `<strong style="color:#f0f6ff">💡 AI Insights:</strong><br/>${tips.map(t => t).join('<br/>')}`;
}

function makeMetric(label, value, pct) {
  const fillWidth = Math.min(Math.round(pct), 100);
  return `
    <div class="metric-row">
      <span>${label}</span>
      <span style="color:#00c9a7;font-weight:600">${value}</span>
    </div>
    <div class="metric-bar"><div class="metric-fill" style="width:${fillWidth}%"></div></div>
  `;
}

// ── Python Pipeline Simulation
function runPipeline() {
  const output = document.getElementById('pipelineOutput');
  const steps  = document.querySelectorAll('.pipe-step');
  const statuses = document.querySelectorAll('.pipe-status');
  const btn = document.querySelector('#python .btn-primary');

  btn.textContent = '⏳ Running Pipeline...';
  btn.disabled = true;
  output.style.display = 'none';

  const log = [];
  const messages = [
    '📥 [10:02:01] Loading volunteer_data.csv... Found 2,418 records',
    '🔍 [10:02:03] Validating fields... 14 duplicates removed, 3 emails fixed',
    '✅ [10:02:05] Data cleaned: 2,404 valid records ready',
    '🧠 [10:02:08] AI skill classification running...',
    '🧠 [10:02:11] Skills mapped: 847 Tech · 612 Content · 389 Design · 556 Other',
    '📊 [10:02:14] Generating weekly report PDF...',
    '📊 [10:02:16] Charts rendered: Volunteer growth, Regional map, Campaign stats',
    '📧 [10:02:18] Sending digest to 12 team leads...',
    '✅ [10:02:20] Pipeline complete! 2,404 records processed · Report saved · Emails sent',
  ];

  let i = 0;
  function nextMsg() {
    if (i < messages.length) {
      log.push(messages[i]);
      output.style.display = 'block';
      output.textContent = log.join('\n');

      // Update step states
      if (i === 0) steps[0].className = 'pipe-step active', statuses[0].textContent = '🔄';
      if (i === 2) steps[0].className = 'pipe-step done', statuses[0].textContent = '✅', steps[1].className = 'pipe-step active', statuses[1].textContent = '🔄';
      if (i === 4) steps[1].className = 'pipe-step done', statuses[1].textContent = '✅', steps[2].className = 'pipe-step active', statuses[2].textContent = '🔄';
      if (i === 5) steps[2].className = 'pipe-step done', statuses[2].textContent = '✅', steps[3].className = 'pipe-step active', statuses[3].textContent = '🔄';
      if (i === 6) steps[3].className = 'pipe-step done', statuses[3].textContent = '✅', steps[4].className = 'pipe-step active', statuses[4].textContent = '🔄';
      if (i === 8) steps[4].className = 'pipe-step done', statuses[4].textContent = '✅';

      i++;
      setTimeout(nextMsg, 700);
    } else {
      btn.textContent = '▶ Run Again';
      btn.disabled = false;
    }
  }
  nextMsg();
}
