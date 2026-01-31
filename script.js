const nameInput = document.getElementById('nameInput');
const taglineInput = document.getElementById('taglineInput');
const footerInput = document.getElementById('footerInput');
const themeColor = document.getElementById('themeColor');

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
