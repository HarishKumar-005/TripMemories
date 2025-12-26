window.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  const video = document.getElementById("memoryVideo");
  const hint = document.getElementById("hint");

  scene.addEventListener("loaded", async () => {
    const system = scene.systems["mindar-image-system"];

    // Explicitly start MindAR AFTER scene is ready
    await system.start();

    // Listen for global AR errors (e.g. camera permission denied)
    scene.addEventListener("arError", (event) => {
      console.error("MindAR failed to start", event);
      hint.textContent = "Camera failed to start. Please check permissions.";
      hint.style.color = "red";
      hint.style.opacity = 1;
    });

    const target = document.getElementById("imageTarget");

    target.addEventListener("targetFound", () => {
      video.currentTime = 0;
      video.play().then(() => {
        hint.textContent = "Tap for sound ❤️";
      }).catch(() => {});
    });

    target.addEventListener("targetLost", () => {
      video.pause();
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
