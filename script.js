const avatarInput = document.getElementById("avatarInput");
const avatar = document.getElementById("avatar");
const nameInput = document.getElementById("nameInput");
const nameText = document.getElementById("name");
const taglineInput = document.getElementById("taglineInput");
const taglineText = document.getElementById("tagline");
const footerEmoji = document.getElementById("footerEmoji");
const footer = document.getElementById("footer");

const socialType = document.getElementById("socialType");
const socialUrl = document.getElementById("socialUrl");
const addSocial = document.getElementById("addSocial");
const socials = document.getElementById("socials");

const exportBtn = document.getElementById("exportBtn");

// AVATAR (FIX EXPORT)
avatarInput.addEventListener("change", () => {
  const file = avatarInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    avatar.style.backgroundImage = `url(${reader.result})`;
    avatar.dataset.img = reader.result;
  };
  reader.readAsDataURL(file);
});

// LIVE UPDATE
nameInput.addEventListener("input", () => {
  nameText.textContent = nameInput.value || "Your Name";
});

taglineInput.addEventListener("input", () => {
  taglineText.textContent = taglineInput.value || "Tagline";
});

footerEmoji.addEventListener("input", () => {
  footer.textContent = footerEmoji.value;
});

// ADD SOCIAL
addSocial.addEventListener("click", () => {
  if (!socialUrl.value) return;

  const iconMap = {
    instagram: "fab fa-instagram",
    tiktok: "fab fa-tiktok",
    github: "fab fa-github"
  };

  const a = document.createElement("a");
  a.href = socialUrl.value;
  a.target = "_blank";
  a.innerHTML = `<i class="${iconMap[socialType.value]}"></i> ${socialType.value}`;

  socials.appendChild(a);
  socialUrl.value = "";
});

// EXPORT
exportBtn.addEventListener("click", () => {
  const avatarImg = avatar.dataset.img || "";

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>${document.querySelector("style")?.innerHTML || ""}</style>
</head>
<body>
${document.getElementById("card").outerHTML.replace(
  'class="avatar"',
  `class="avatar" style="background-image:url('${avatarImg}')"`
)}
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "profile.html";
  a.click();
});
