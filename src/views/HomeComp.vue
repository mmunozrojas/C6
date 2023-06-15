<template>
  <div class="home">
    <div class="game-container" v-for="game in games" :key="game.id">
      <div class="game-card">
        <div class="game-image-container">
          <img :src="game.background_image" :alt="game.name" class="game-image" />
        </div>
        <div class="game-details">
          <h3 class="game-title">{{ game.name }}</h3>
          <p class="game-rating">Rating: {{ game.rating }}</p>
          <p class="game-released">Released: {{ game.released }}</p>
          <div class="opinion-container">
            <router-link :to="`/opinion/${game.name}`" class="opinion-button-link styled-button">Opinar</router-link>
            <i class="fa fa-heart heart-icon" @click="redirectToPersonalArea(game.name, game.background_image)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeComp',
  data() {
    return {
      games: []
    };
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    async fetchGames() {
      try {
        const response = await axios.get('https://api.rawg.io/api/games', {
          params: {
            key: '139e80afb24a4088be1b969adccfed93',
            ordering: '-rating',
            page_size: 12
          }
        });
        this.games = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    redirectToPersonalArea(gameName, gameImage) {
      this.$router.push({
        name: 'PersonalArea',
        params: { juegoLike: gameName, juegoLikeImage: gameImage }
      });
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.game-container {
  width: 250px;
  height: 350px;
  margin: 10px;
}

.game-card {
  height: 100%;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.game-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.game-image-container {
  position: relative;
  overflow: hidden;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.game-image:hover {
  transform: scale(1.1);
}

.game-details {
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.game-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.game-rating,
.game-released {
  font-size: 14px;
}

/* Estilos para el botón de opinión */
.opinion-button-link {
  display: inline-block;
  padding: 4px 8px;
  /* background-color: #4caf50;
  color: white; */
  text-decoration: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
}

.opinion-button-link:hover {
  background-color: #45a049;
}

.opinion-button-link:active {
  background-color: #3c903c;
}

.opinion-button-link:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
}

.opinion-container {
  display: flex;
  align-items: center;
}

.heart-icon {
  color: red;
  margin-left: 137px;
  transition: color 0.3s;
  font-size: 22px;
}

.heart-icon:hover {
  color: #3c903c;
  cursor: pointer;
}

.styled-button {
  border-radius: 10px;
  background-color: #4caf50;
  color: white;
  padding: 3px 5px;
  transition: background-color 0.3s, color 0.3s;
  border: solid 2px rgb(80, 76, 76);
}

.styled-button:hover {
  background-color: black;
  color: white;
}

</style>


