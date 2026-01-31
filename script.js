const avatarInput = document.getElementById("avatarInput");
const nameInput = document.getElementById("nameInput");
const taglineInput = document.getElementById("taglineInput");
const footerInput = document.getElementById("footerInput");

const previewAvatar = document.getElementById("previewAvatar");
const previewName = document.getElementById("previewName");
const previewTagline = document.getElementById("previewTagline");
const previewFooter = document.getElementById("previewFooter");
const previewLinks = document.getElementById("previewLinks");

const socialType = document.getElementById("socialType");
const socialUrl = document.getElementById("socialUrl");
const addSocial = document.getElementById("addSocial");
const exportBtn = document.getElementById("exportBtn");

const icons = {
  instagram: "fab fa-instagram",
  tiktok: "fab fa-tiktok",
  github: "fab fa-github",
  discord: "fab fa-discord",
  youtube: "fab fa-youtube",
  whatsapp: "fab fa-whatsapp",
  telegram: "fab fa-telegram"
};

/* LIVE UPDATE */
nameInput.oninput = () => previewName.innerText = nameInput.value;
taglineInput.oninput = () => previewTagline.innerText = taglineInput.value;
footerInput.oninput = () => previewFooter.innerText = footerInput.value;

/* AVATAR BASE64 */
avatarInput.onchange = () => {
  const file = avatarInput.files[0];
  if (!file) return;
  const r = new FileReader();
  r.onload = () => {
    previewAvatar.style.backgroundImage = `url(${r.result})`;
    previewAvatar.dataset.img = r.result;
  };
  r.readAsDataURL(file);
};

/* ADD SOCIAL */
addSocial.onclick = () => {
  if (!socialUrl.value) return;
  const a = document.createElement("a");
  a.href = socialUrl.value;
  a.target = "_blank";
  a.innerHTML = `<i class="${icons[socialType.value]}"></i>${socialType.value}`;
  previewLinks.appendChild(a);
  socialUrl.value = "";
};

/* EXPORT – CLONE PREVIEW (INI KUNCI) */
exportBtn.onclick = () => {
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet"
 href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>${document.querySelector("style")?.innerHTML || ""}</style>
</head>
<body style="background:#000;display:flex;justify-content:center;align-items:center;height:100vh">
${document.querySelector(".card").outerHTML}
</body>
</html>
`;
  const blob = new Blob([html], {type:"text/html"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "linktree.html";
  a.click();
};
