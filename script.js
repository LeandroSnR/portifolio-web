// ===== Menu mobile =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// ===== Ano no footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Efeito de terminal digitando =====
const terminalBody = document.getElementById('terminalBody');

const lines = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'leandro_abilio — instrutor técnico, em transição para ADS' },
  { type: 'cmd', text: 'cat status.txt' },
  { type: 'out', text: 'da química e da indústria para Python, C e tecnologia.' },
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderStatic() {
  terminalBody.innerHTML = lines.map(l => {
    if (l.type === 'cmd') return `<div><span class="prompt">$</span> ${l.text}</div>`;
    return `<div class="out">${l.text}</div>`;
  }).join('');
}

async function typeLine(el, text, speed = 28) {
  for (let i = 0; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    await new Promise(r => setTimeout(r, speed));
  }
}

async function runTerminal() {
  if (prefersReducedMotion) {
    renderStatic();
    return;
  }

  terminalBody.innerHTML = '';

  for (const line of lines) {
    const row = document.createElement('div');

    if (line.type === 'cmd') {
      const prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = '$ ';
      const typed = document.createElement('span');
      row.appendChild(prompt);
      row.appendChild(typed);
      terminalBody.appendChild(row);
      await typeLine(typed, line.text);
      await new Promise(r => setTimeout(r, 250));
    } else {
      row.className = 'out';
      terminalBody.appendChild(row);
      await typeLine(row, line.text, 14);
      await new Promise(r => setTimeout(r, 350));
    }
  }

  const cursorRow = document.createElement('div');
  cursorRow.innerHTML = '<span class="prompt">$</span> <span class="cursor"></span>';
  terminalBody.appendChild(cursorRow);
}

runTerminal();
