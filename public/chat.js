const chatEl = document.getElementById('chat');
const formEl = document.getElementById('form');
const inputEl = document.getElementById('input');
const sendBtn = document.getElementById('send');

const messages = [];

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 簡易Markdown変換(太字・見出し・区切り線・改行のみ対応)
function renderMarkdown(text) {
  return escapeHtml(text)
    .replace(/^### (.*)$/gm, '<strong>$1</strong>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function appendMessage(role, text) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = renderMarkdown(text);
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
  return div;
}

function setMessageText(div, text) {
  div.innerHTML = renderMarkdown(text);
}

function autoResize() {
  inputEl.style.height = 'auto';
  inputEl.style.height = `${inputEl.scrollHeight}px`;
}
inputEl.addEventListener('input', autoResize);

inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    formEl.requestSubmit();
  }
});

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;

  inputEl.value = '';
  autoResize();
  sendBtn.disabled = true;

  messages.push({ role: 'user', content: text });
  appendMessage('user', text);
  const pending = appendMessage('assistant', '…考え中');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();

    if (!res.ok) {
      setMessageText(pending, `エラー: ${data.error || '不明なエラー'}`);
      return;
    }

    messages.push({ role: 'assistant', content: data.reply });
    setMessageText(pending, data.reply);
  } catch (err) {
    setMessageText(pending, '通信エラーが発生しました。');
  } finally {
    sendBtn.disabled = false;
    inputEl.focus();
  }
});
