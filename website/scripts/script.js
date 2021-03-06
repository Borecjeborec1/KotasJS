function openInNewTab(url) {
  window.open(url, '_blank').focus();
}

function sendMail() {
  window.open('mailto:borecjeborec1@seznam.cz');
}

function swap(e) {
  if (!e.className.includes("selected")) {
    document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
    e.classList.add("selected")
    document.querySelectorAll(".swap").forEach(el => el.id == e.innerText.toLowerCase().replace(" ", "") ? el.classList.remove("hidden") : el.className.includes("hidden") ? 0 : el.classList.add("hidden"));
  }
}


function copy(e) {
  console.log(e.parentNode.innerText);
  navigator.clipboard.writeText(e.parentNode.innerText);
  e.className = "fa fa-check";
  setTimeout(() => {
    e.className = "fa fa-copy";
  }, 1000);
}