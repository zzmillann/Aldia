// Aldia Global Preloader
if (sessionStorage.getItem("aldiaPreloaderShown")) {
  // Si ya se ha visto la animación en esta sesión, ocultar y destruir instantáneamente
  const preloader = document.getElementById("aldiaPreloader");
  if (preloader) {
    preloader.style.display = "none"; // Evita micro-flashes en el render
    document.addEventListener("DOMContentLoaded", () => preloader.remove());
  }
} else {
  // Si es la primera vez, ejecutar flujo de carga normal
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("preload-active");
  });

  window.addEventListener("load", () => {
    // Aseguramos que la animación de "botar" dure sus 1.4s completos
    setTimeout(() => {
      const preloader = document.getElementById("aldiaPreloader");
      if (preloader) {
        preloader.classList.add("preload-finish");
        document.body.classList.remove("preload-active");
        
        // Registrar que ya se vio la animación en esta sesión
        sessionStorage.setItem("aldiaPreloaderShown", "true");
        
        // Eliminar el nodo DOM tras la transición
        setTimeout(() => {
          preloader.remove();
        }, 1000);
      }
    }, 1800); 
  });
}

// Smart Iframe Loader (Lazy Load on Focus)
document.addEventListener("DOMContentLoaded", () => {
  const lazyIframes = document.querySelectorAll(".lazy-iframe");

  if ("IntersectionObserver" in window) {
    const iframeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          if (iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute("data-src"); // Evitar recargas innecesarias
          }
          iframeObserver.unobserve(iframe);
        }
      });
    }, {
      rootMargin: "0px" // Carga exactamente al entrar en pantalla
    });

    lazyIframes.forEach((iframe) => iframeObserver.observe(iframe));
  } else {
    // Fallback para navegadores antiguos
    lazyIframes.forEach((iframe) => {
      if (iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
      }
    });
  }
});
