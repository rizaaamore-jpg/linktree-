const nameInput = document.getElementById('nameInput');
const taglineInput = document.getElementById('taglineInput');
const footerInput = document.getElementById('footerInput');
const themeColor = document.getElementById('themeColor');
const icons = {
  instagram: `<svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24"><path d="M12 2v13.5a3.5 3.5 0 1 1-3-3.46V9a6.5 6.5 0 1 0 6.5 6.5V7.7a7.7 7.7 0 0 0 4.5 1.3V6.1A5.6 5.6 0 0 1 15.9 2z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24"><path d="M23 7.5s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1C16.9 3.7 12 3.7 12 3.7h0s-4.9 0-8.1.4c-.4.1-1.3.1-2.1 1C1.2 5.8 1 7.5 1 7.5S.8 9.5.8 11.6v.8c0 2.1.2 4.1.2 4.1s.2 1.7.8 2.4c.8.9 1.9.9 2.4 1 1.7.2 7.8.4 7.8.4s4.9 0 8.1-.4c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.4.8-2.4s.2-2 .2-4.1v-.8c0-2.1-.2-4.1-.2-4.1zM9.8 15.3V8.7l6.4 3.3z"/></svg>`,
  github: `<svg viewBox="0 0 24 24"><path d="M12 .5A12 12 0 0 0 0 12.8c0 5.4 3.4 10 8.2 11.6.6.1.8-.3.8-.6v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.8-1.8 1.6-2.3-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.4-2.3 1.1-3.1-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 .1a10.4 10.4 0 0 1 5.4 0c2.1-.4 3-.1 3-.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3.1 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1 .8 2v3c0 .3.2.7.8.6A12.1 12.1 0 0 0 24 12.8 12 12 0 0 0 12 .5z"/></svg>`
};

function addSocial(){
  const type = socialType.value;
  const url = socialUrl.value;
  if(!url) return;

  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.innerHTML = icons[type];

  socials.appendChild(a);
  socialUrl.value = "";
}

nameInput.oninput = () => {
  name.textContent = nameInput.value || 'Your Name';
};

taglineInput.oninput = () => {
  tagline.textContent = taglineInput.value || 'Your tagline here';
};

footerInput.oninput = () => {
  footer.textContent = footerInput.value || '✨';
};

themeColor.oninput = () => {
  document.querySelectorAll('.links a').forEach(a => {
    a.style.background = themeColor.value;
  });
};

avatarInput.onchange = e => {
  const file = e.target.files[0];
  if(!file) return;
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  avatar.innerHTML = '';
  avatar.appendChild(img);
};

function addLink(){
  const t = linkText.value;
  const u = linkUrl.value;
  if(!t || !u) return;

  const a = document.createElement('a');
  a.href = u;
  a.textContent = t;
  a.target = '_blank';
  a.style.background = themeColor.value;

  links.appendChild(a);
  linkText.value = '';
  linkUrl.value = '';
}

function addSocial(){
  const t = socialText.value;
  if(!t) return;
  const s = document.createElement('span');
  s.textContent = t;
  socials.appendChild(s);
  socialText.value = '';
}

function exportHTML(){
  const html = '<!DOCTYPE html>' + document.documentElement.outerHTML;
  const blob = new Blob([html], {type:'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'linktree.html';
  a.click();
}
