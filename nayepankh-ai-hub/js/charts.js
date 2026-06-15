// NayePankh AI Hub — Charts Module
// Volunteer Growth, Campaign, Fundraising, Regional charts

document.addEventListener('DOMContentLoaded', function () {
  // Chart.js defaults
  Chart.defaults.color = '#94a8c4';
  Chart.defaults.font.family = 'Inter, sans-serif';
  Chart.defaults.plugins.legend.labels.boxWidth = 12;

  const teal   = '#00c9a7';
  const green  = '#39ff85';
  const gold   = '#ffc947';
  const purple = '#a855f7';
  const blue   = '#3b82f6';

  // Gradient helper
  function makeGrad(ctx, color1, color2) {
    const g = ctx.createLinearGradient(0, 0, 0, 250);
    g.addColorStop(0, color1);
    g.addColorStop(1, color2);
    return g;
  }

  // ── Volunteer Growth Line Chart
  const vCtx = document.getElementById('volunteerChart');
  if (vCtx) {
    const ctx = vCtx.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Volunteers',
          data: [820, 950, 1100, 1250, 1380, 1490, 1620, 1780, 1920, 2050, 2200, 2418],
          borderColor: teal,
          backgroundColor: makeGrad(ctx, 'rgba(0,201,167,0.3)', 'rgba(0,201,167,0.01)'),
          fill: true,
          tension: 0.45,
          pointBackgroundColor: teal,
          pointRadius: 4,
          borderWidth: 2.5
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94a8c4' } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94a8c4' } }
        }
      }
    });
  }

  // ── Campaign Categories Doughnut
  const cCtx = document.getElementById('campaignChart');
  if (cCtx) {
    new Chart(cCtx.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Education', 'Fundraising', 'Awareness', 'Skill Dev', 'Recruitment'],
        datasets: [{
          data: [38, 24, 18, 12, 8],
          backgroundColor: [teal, gold, purple, blue, green],
          borderColor: '#0d1b2a',
          borderWidth: 3,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        cutout: '65%',
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a8c4', padding: 12 } }
        }
      }
    });
  }

  // ── Monthly Fundraising Bar Chart
  const fCtx = document.getElementById('fundChart');
  if (fCtx) {
    const ctx = fCtx.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Funds (₹)',
          data: [42000, 55000, 67000, 48000, 73000, 82000, 69000, 91000, 85000, 108000, 95000, 124000],
          backgroundColor: makeGrad(ctx, 'rgba(255,201,71,0.85)', 'rgba(255,201,71,0.2)'),
          borderColor: gold,
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94a8c4', font: { size: 10 } } },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: {
              color: '#94a8c4',
              callback: v => '₹' + (v >= 1000 ? (v/1000).toFixed(0) + 'k' : v)
            }
          }
        }
      }
    });
  }

  // ── Regional Distribution Horizontal Bar
  const rCtx = document.getElementById('regionChart');
  if (rCtx) {
    new Chart(rCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Maharashtra', 'Delhi NCR', 'Karnataka', 'UP', 'West Bengal', 'Tamil Nadu', 'Others'],
        datasets: [{
          label: 'Volunteers',
          data: [520, 410, 340, 280, 230, 190, 448],
          backgroundColor: [teal, purple, gold, blue, green, '#f87171', '#94a8c4'],
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94a8c4' } },
          y: { grid: { display: false }, ticks: { color: '#94a8c4' } }
        }
      }
    });
  }

  // ── Animate counter numbers
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    let count = 0;
    const step = target / 80;
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = Math.floor(count).toLocaleString();
      if (count >= target) clearInterval(timer);
    }, 20);
  });
});
