window.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  const video = document.getElementById("memoryVideo");
  const hint = document.getElementById("hint");

  scene.addEventListener("loaded", () => {
    // Listen for global AR errors (e.g. camera permission denied)
    scene.addEventListener("arError", (event) => {
      console.error("MindAR failed to start", event);
      hint.textContent = "Camera failed to start. Please check permissions.";
      hint.style.color = "red";
      hint.style.opacity = 1;
    });

    const target = document.getElementById("imageTarget");
    const videoEntity = document.querySelector("a-video");

    target.addEventListener("targetFound", () => {
      video.currentTime = 0;
      video.play().then(() => {
        hint.textContent = "Tap for sound ❤️";
        // Trigger fade-in animation
        videoEntity.setAttribute("animation", "property: material.opacity; from: 0; to: 1; dur: 1000; easing: easeOutQuad");
      }).catch(() => { });
    });

    target.addEventListener("targetLost", () => {
      video.pause();
      // Reset opacity for next detection
      videoEntity.setAttribute("material", "opacity", 0);
      videoEntity.removeAttribute("animation");
    });
  });

  // Enable audio on first user interaction
  document.body.addEventListener("click", () => {
    if (video.muted) {
      video.muted = false;
      hint.style.opacity = 0;
    }
  }, { once: true });
});
