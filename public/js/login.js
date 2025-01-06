document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const correo = document.getElementById("inputcorreo").value;
  const contraseña = document.getElementById("inputcontraseña").value;

  console.log("Enviando datos:", { correo, contraseña }); // Verifica los datos enviados

  const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contraseña }),
  });

  const data = await response.json();
  console.log("Respuesta del servidor:", data); // Verifica la respuesta del servidor

  if (data.success) {
    // Almacenar el token en localStorage
    localStorage.setItem("token", data.token);
    console.log("Token almacenado:", localStorage.getItem("token")); // Verifica el token almacenado
    redirectToBlog();
  } else {
    alert(data.message);
  }
  
});

// Manejador para redirigir a la página de blog
const redirectToBlog = async () => {
  const token = localStorage.getItem("token");
  console.log("Token antes de redirigir:", token);

  if (!token) {
      console.error("Token no disponible, redirigiendo a login");
      window.location.href = "/login";
      return;
  }

  // Redirige a la ruta protegida
  window.location.href = "/blog";
};
