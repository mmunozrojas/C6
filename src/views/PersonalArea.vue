<template>
  <div class="personal-area">
    <h2 class="welcome-heading" v-if="!showAccount">Bienvenido@ {{ fullName }} a tu área personal</h2>
    <p v-if="!showAccount">¡Aquí podrás administrar tu cuenta y configurar tus preferencias!</p>
    <button v-if="!showInputs && !showAccount" @click="showInputs = true" class="rounded">Ingresar Datos</button>
    <div class="form-section" v-if="showInputs && !showAccount">
      <div class="input-container">
        <input type="text" v-model="firstName" placeholder="Nombre" class="styled-input" />
        <input type="text" v-model="lastName" placeholder="Apellido" class="styled-input" />
      </div>
      <div class="button-container">
        <button @click="submitForm" class="rounded">Guardar</button>
      </div>
    </div>
    <div class="account-section" v-if="showAccount" :class="{ 'fade-in': showAccount }">
      <div class="user-info">
        <div class="user-icon">
          <img src="@/assets/megaman-user.png" alt="User Icon" class="user-icon-img" /> <!-- Imagen personalizada -->
        </div>
        <div class="welcome-message">
          <p>Bienvenid@</p>
          <p>{{ firstName }} {{ lastName }}</p>
        </div>
      </div>
      <div class="content">
        <h2>Resumen de tu cuenta</h2>
        <p v-if="juegoLike" class="professional-text">Le diste me gusta al juego "{{ juegoLike }}"</p>
        <div v-if="juegoLikeImage" class="juego-like-image">
          <img :src="juegoLikeImage" :alt="juegoLike" class="game-image" style="width: 30%;" />
        </div>
        <div class="coins-section">
          <p>Deseas comprar coins para este juego?</p>
          <div class="coins-input-container">
            <input type="number" v-model="coinsToAdd" placeholder="Cantidad de coins" class="styled-input" />
            <button @click="addCoins" class="add-coins-button" :disabled="totalCoins >= maxCoins">Agregar Coins</button>
          </div>
          <div class="coins-bar-container">
            <div class="coins-bar">
              <div class="filled-bar" :style="{ width: fillPercentage, backgroundColor: fillBarColor }"></div>
            </div>
          </div>
          <p>Total de coins: {{ totalCoins }}</p>
          <img :src="require('@/assets/coin1.png')" alt="Moneda" class="coin-icon" />
          <p class="max-coins-alert" v-if="totalCoins >= maxCoins">Has alcanzado el límite máximo de 50 monedas.</p>
        </div>
        <achievement-bar :percentage="fillPercentage" :achievements="achievements" :rewards="rewards"></achievement-bar>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import AchievementBar from '@/components/AchievementBar.vue';

export default {
  name: 'PersonalArea',
  data() {
    return {
      showInputs: false,
      showAccount: false,
      firstName: '',
      lastName: '',
      juegoLike: '',
      juegoLikeImage: '', // Variable para almacenar la URL de la imagen del juego
      coinsToAdd: '',
      totalCoins: 0,
      maxCoins: 50 // Valor máximo de monedas para la barra
    };
  },
  components: {
    AchievementBar
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    fillPercentage() {
      return `${(this.totalCoins / this.maxCoins) * 100}%`;
    },
    fillBarColor() {
      if (this.totalCoins <= 20) {
        return 'green'; // Color verde si los coins son menor o igual a 20
      } else if (this.totalCoins <= 30) {
        return 'yellow'; // Color amarillo si los coins están entre 21 y 30
      } else {
        return 'red'; // Color rojo si los coins son mayores a 30
      }
    }
  },
  methods: {
    submitForm() {
      if (this.firstName && this.lastName) {
        this.showInputs = false;
        this.showAccount = true;
      } else {
        alert('Por favor, ingrese su nombre y apellido');
      }
    },
    addCoins() {
      if (this.coinsToAdd) {
        const newTotalCoins = this.totalCoins + parseInt(this.coinsToAdd);
        if (newTotalCoins > this.maxCoins) {
          Swal.fire({
            icon: 'warning',
            title: 'Límite alcanzado',
            text: 'No puedes agregar monedas por encima del límite máximo de 50.',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.totalCoins = newTotalCoins <= this.maxCoins ? newTotalCoins : this.totalCoins;
              this.coinsToAdd = '';
            } else {
              this.coinsToAdd = '';
            }
          });
        } else {
          this.totalCoins = newTotalCoins;
          this.coinsToAdd = '';
        }
      }
    }
  },
  mounted() {
    this.juegoLike = this.$route.params.juegoLike;
    this.juegoLikeImage = this.$route.params.juegoLikeImage;
  }
};
</script>



<style>
.personal-area {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.welcome-heading {
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
}

.coin-icon {
  width: 50px;
  height: 50px;
  margin-left: 5px;
  margin-bottom: 15px;
}

.form-section,
.account-section {
  width: 100%;
}

.account-section {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user-info {
  background: linear-gradient(to bottom, black, rgb(83, 82, 82));
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
  /* Cambio de 80% a 20% */
  text-align: center;
  height: 100vh;
  min-width: 150px;
}

.user-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.content {
  background-color: white;
  padding: 20px;
  width: 85%;
  /* Cambio de 100% a 80% */
  text-align: center;
  height: 100vh;
}

h2 {
  margin-bottom: 10px;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

input {
  margin-right: 10px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.user-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90px;
  /* Ancho máximo de 70px */
  margin-bottom: 10px;
}

.user-icon-img {
  width: 100%;
  height: auto;
  max-width: 100%;
  transition: transform 0.5s ease;
  /* Asegura que la imagen no supere el ancho máximo */
}

.user-icon-img:hover {
  transform: scale(1.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.7s ease forwards;
}

.styled-input {
  /* Otros estilos */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-left: 5px;
}

.coins-section {
  margin-top: 20px;
  text-align: center;
}

.coins-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.add-coins-button {
  background-color: gold;
  color: rgb(0, 0, 0);
  font-weight: bold;
  border: 2px solid rgb(208, 214, 199);
  /* Agrega un borde sólido con el color deseado */
  border-radius: 10px;
  padding: 3px 3px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* Agrega una sombra al botón */
  margin-left: 5px;
}

.add-coins-button:hover {
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.add-coins-button:active {
  background-color: darkgoldenrod;
}

.add-coins-button:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}

.coins-bar-container {
  width: 300px;
  height: 20px;
  background-color: lightgray;
  border-radius: 10px;
  margin: 0 auto;
  /* Centrar horizontalmente */
  overflow: hidden;
}

.coins-bar {
  height: 100%;
}

.filled-bar {
  height: 100%;
  transition: width 0.3s;
}

.green {
  background-color: green;
}

.yellow {
  background-color: yellow;
}

.red {
  background-color: red;
}

.rounded {
  border-radius: 10px;
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  transition: background-color 0.3s, color 0.3s;
}

.rounded:hover {
  background-color: black;
  color: white;
}

.professional-text {
  background-color: black;
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
}

.professional-text:hover {
  background-color: #333;
}

.game-image {
  width: 30%;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s ease;
  border: solid 2px chocolate;
}

.max-coins-alert {
  font-weight: bolder;
}

@media (max-width: 991.98px) {
  .user-info {
    display: none;
  }
}
</style>





  
  
  