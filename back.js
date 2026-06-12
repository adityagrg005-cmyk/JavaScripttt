const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let currentSection = 'home';
    sections.forEach(section => {
        if (window.scrollY + 110 >= section.offsetTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        const target = link.getAttribute('href');
        link.classList.toggle('active', target === `#${currentSection}`);
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

function runVarDemo() {
    const out = document.getElementById('varOutput');
    const greet = name => `Hello, ${name}! Welcome to web development.`;
    const grade = s => s >= 90 ? 'A' : s >= 80 ? 'B' : 'C';
    out.textContent = `> ${greet('Sanjog Thapa')}\n> Grade for 85: ${grade(85)}\n> Age: 22, Course: CET138`;
    out.classList.add('visible');
}
function runObjDemo() {
    const out = document.getElementById('objOutput');
    const technologies = ['HTML', 'CSS', 'JavaScript', 'Bootstrap'];
    const student = {
        name: 'Sanjog Thapa', college: 'ISMT College',
        skills: technologies,
        introduce() { return `I'm ${this.name} from ${this.college}`; }
    };
    out.textContent = `> ${student.introduce()}\n> Skills: ${student.skills.join(', ')}\n> Total skills: ${student.skills.length}`;
    out.classList.add('visible');
}

function domChangeText() {
    document.getElementById('domTitle').innerHTML = '<strong>Changed Title!</strong>';
}
function domChangeColor() {
    const el = document.getElementById('domTitle');
    el.style.color = '#f7df1e';
    el.style.textShadow = '0 0 12px rgba(247,223,30,0.5)';
}
function domReset() {
    const el = document.getElementById('domTitle');
    el.innerHTML = 'Original Title';
    el.style.color = '';
    el.style.textShadow = '';
}
function createElement() {
    const container = document.getElementById('dynamicContainer');
    const div = document.createElement('div');
    div.className = 'alert-success-custom';
    div.innerHTML = '<strong>✓ Success!</strong> New element created dynamically.';
    container.appendChild(div);
    setTimeout(() => { if (div.parentNode) div.remove(); }, 3000);
}
function removeAll() {
    document.getElementById('dynamicContainer').innerHTML = '';
}

let clicks = 0;
document.getElementById('clickBtn').addEventListener('click', function () {
    clicks++;
    document.getElementById('clickCount').textContent = clicks;
    const hue = (clicks * 37) % 360;
    this.style.background = `linear-gradient(135deg, hsl(${hue},60%,25%), hsl(${hue},60%,15%))`;
});

function submitForm() {
    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const msg = document.getElementById('formMsg');
    if (name.length < 2) { msg.textContent = '✗ Name must be at least 2 characters.'; msg.className = 'form-msg err'; return; }
    if (!email.includes('@')) { msg.textContent = '✗ Please enter a valid email address.'; msg.className = 'form-msg err'; return; }
    msg.textContent = `✓ Form submitted! Hello, ${name}!`; msg.className = 'form-msg ok';
    setTimeout(() => { msg.textContent = ''; document.getElementById('formName').value = ''; document.getElementById('formEmail').value = ''; }, 2500);
}

let calcExpr = '', calcResult = '0';
function calcInput(val) {
    if (val === 'C') { calcExpr = ''; calcResult = '0'; }
    else {
        const ops = ['+', '-', '*', '/'];
        const lastIsOp = ops.includes(calcExpr.slice(-1));
        if (ops.includes(val) && lastIsOp) calcExpr = calcExpr.slice(0, -1);
        calcExpr += val;
        try { calcResult = String(eval(calcExpr)); } catch (e) { calcResult = calcExpr; }
    }
    document.getElementById('calcExpr').textContent = calcExpr;
    document.getElementById('calcVal').textContent = calcResult;
}
function calcBackspace() {
    calcExpr = calcExpr.slice(0, -1);
    try { calcResult = calcExpr ? String(eval(calcExpr)) : '0'; } catch (e) { calcResult = calcExpr || '0'; }
    document.getElementById('calcExpr').textContent = calcExpr;
    document.getElementById('calcVal').textContent = calcResult;
}
function calcEquals() {
    try {
        const res = eval(calcExpr);
        document.getElementById('calcExpr').textContent = calcExpr + ' =';
        calcResult = String(res);
        document.getElementById('calcVal').textContent = calcResult;
        calcExpr = calcResult;
    } catch (e) { document.getElementById('calcVal').textContent = 'Error'; calcExpr = ''; }
}

let todos = [];
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (!text) return;
    todos.push({ id: Date.now(), text, done: false });
    input.value = '';
    renderTodos();
}
function toggleTodo(id) {
    todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    renderTodos();
}
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}
function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = todos.map(t => `
    <li class="todo-item${t.done ? ' done' : ''}">
      <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTodo(${t.id})"/>
      <span>${t.text}</span>
      <button class="todo-del" onclick="deleteTodo(${t.id})" title="Delete">✕</button>
    </li>`).join('');
    document.getElementById('todoCount').textContent = todos.length;
}

function setColor(hex, name) {
    const box = document.getElementById('colorBox');
    box.style.background = hex;
    box.style.color = ['#f7df1e', '#00d4aa', '#06b6d4'].includes(hex) ? '#1a1a2e' : '#fff';
    box.textContent = `Background is now ${name}!`;
}
function randomColor() {
    const r = () => Math.floor(Math.random() * 200 + 30);
    const hex = `#${r().toString(16).padStart(2, '0')}${r().toString(16).padStart(2, '0')}${r().toString(16).padStart(2, '0')}`;
    setColor(hex, hex);
}

function analyzeText() {
    const text = document.getElementById('analyzerText').value;
    document.getElementById('statChars').textContent = text.length;
    document.getElementById('statWords').textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
    document.getElementById('statLines').textContent = text ? text.split('\n').length : 0;
}
