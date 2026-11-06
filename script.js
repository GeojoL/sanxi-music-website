const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', '打开导航');
}));

// 商务合作邮箱弹窗
const mailModal = document.getElementById('mailModal');
const mailCta = document.getElementById('contactCta');
const mailCopy = document.getElementById('mailCopy');
const mailClose = mailModal.querySelector('.mail-modal-x');
const mailText = mailModal.querySelector('.mail-modal-email').textContent.trim();
let mailLastFocus = null;
let mailCopyTimer = null;
function openMail() {
  mailLastFocus = document.activeElement;
  mailModal.hidden = false;
  document.body.style.overflow = 'hidden';
  mailClose.focus();
}
function closeMail() {
  mailModal.hidden = true;
  document.body.style.overflow = '';
  if (mailLastFocus) mailLastFocus.focus();
}
mailCta.addEventListener('click', openMail);
mailModal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeMail));
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!mailModal.hidden) { closeMail(); return; }
  if (nav.classList.contains('open')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开导航');
  }
});
mailModal.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusables = [mailClose, mailCopy];
  const idx = focusables.indexOf(document.activeElement);
  e.preventDefault();
  const next = e.shiftKey
    ? (idx <= 0 ? focusables.length - 1 : idx - 1)
    : (idx === -1 || idx === focusables.length - 1 ? 0 : idx + 1);
  focusables[next].focus();
});
mailCopy.addEventListener('click', async () => {
  let ok = false;
  try {
    await navigator.clipboard.writeText(mailText);
    ok = true;
  } catch (_) {
    const ta = document.createElement('textarea');
    ta.value = mailText;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ok = document.execCommand('copy');
    ta.remove();
  }
  mailCopy.textContent = ok ? '已复制 ✓' : '请手动复制';
  clearTimeout(mailCopyTimer);
  mailCopyTimer = setTimeout(() => { mailCopy.textContent = '复制邮箱'; }, 2000);
});
