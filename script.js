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
const MAIL = 's@sxwhsz.com';
const mailModal = document.getElementById('mailModal');
const mailCta = document.getElementById('contactCta');
const mailCopy = document.getElementById('mailCopy');
function openMail() {
  mailModal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeMail() {
  mailModal.hidden = true;
  document.body.style.overflow = '';
}
mailCta.addEventListener('click', openMail);
mailModal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeMail));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !mailModal.hidden) closeMail();
});
mailCopy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(MAIL);
  } catch (_) {
    const ta = document.createElement('textarea');
    ta.value = MAIL;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  mailCopy.textContent = '已复制 ✓';
  setTimeout(() => { mailCopy.textContent = '复制邮箱'; }, 1600);
});
