document.addEventListener("DOMContentLoaded", () => {
  const datetime = document.getElementById("datetime");
  setInterval(() => {
    datetime.innerText = new Date().toLocaleString();
  }, 1000);
});
