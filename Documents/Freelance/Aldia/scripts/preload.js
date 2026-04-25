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
