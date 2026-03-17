(function () {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const toast = document.getElementById("toast");

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("is-on");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove("is-on"), 1800);
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Invite copied.");
      return true;
    } catch (_) {
      showToast("Copy failed. Select and copy manually.");
      return false;
    }
  }

  document.addEventListener("click", (e) => {
    const target = e.target instanceof Element ? e.target : null;
    if (!target) return;

    const copyBtn = target.closest("[data-copy]");
    if (copyBtn) {
      const text = copyBtn.getAttribute("data-copy") || "";
      if (text) copyToClipboard(text);
      return;
    }

    const modalBtn = target.closest("[data-modal-img]");
    if (modalBtn) {
      const src = modalBtn.getAttribute("data-modal-img");
      if (!src || !modal || !modalImg) return;
      modalImg.src = src;
      modalImg.alt = "Diagram preview";
      if (typeof modal.showModal === "function") modal.showModal();
      return;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.open) modal.close();
  });
})();

