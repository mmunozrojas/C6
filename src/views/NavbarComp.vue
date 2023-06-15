<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <i class="fa fa-robot text-white"></i>
        <span class="typer-container">
          <span id="typer"></span>
        </span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="fa fa-home text-white"></i> Home
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComp",
  mounted() {
    const typerElement = document.getElementById("typer");
    const text = "Games Opinion";
    let index = 0;

    const type = () => {
      if (index < text.length) {
        typerElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 100);
      } else {
        // Todas las letras se han mostrado
        setTimeout(restartAnimation, 2000); // Esperar 1 segundo y reiniciar la animación
      }
    };

    const restartAnimation = () => {
      typerElement.innerHTML = ""; // Limpiar el contenido para reiniciar la animación
      index = 0; // Reiniciar el índice
      type(); // Iniciar la animación nuevamente
    };

    type();
  },
};
</script>

<style scoped>
.navbar-nav .nav-link {
  font-family: 'Roboto', sans-serif;
}
.navbar {
  width: 100%;
}

.navbar-brand {
  margin-right: auto;
}

.navbar-nav {
  margin-left: auto;
}

.typer-container {
  margin-left: 5px; /* Aplicar margen al contenedor del typer */
}

.typer {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.navbar {
  background-image: url('https://media.tenor.com/ANdF3u0UwU0AAAAC/blue-lights-neon.gif');
  background-size: auto;
  background-repeat: repeat-x;
  background-position: center;
  animation: backgroundAnimation 10s linear infinite;
  padding-left: 50px; /* Margen izquierdo */
  padding-right: 50px; /* Margen derecho */
}

.navbar-nav .nav-link i.fa.fa-house {
  margin-right: 5px;
}

@media (max-width: 991.98px) {
  .navbar {
    padding-left: 10px;
    padding-right: 10px;
  }

  .navbar-toggler {
    padding: 0.25rem 0.5rem;
    font-size: 1.25rem;
  }

  .navbar-brand i {
    font-size: 1.2rem;
  }

  .typer-container {
    display: none;
  }
}
</style>





