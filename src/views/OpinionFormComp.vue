<template>
  <div class="opinion-form">
    <h4>Deja tu opinión para el juego: {{ gameName }}</h4>
    <form @submit.prevent="submitOpinion">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="name" required class="styled-input">
      </div>
      <div class="form-group">
        <label for="opinion">Opinión:</label>
        <textarea id="opinion" v-model="opinion" required class="styled-input"></textarea>
      </div>
      <button type="submit">Agregar opinión</button>
    </form>

    <h4 class="mt-3">Opiniones sobre este juego</h4>
    <div v-if="opinions.length === 0" class="alert alert-info">No hay opiniones para mostrar.</div>
    <div v-else>
      <div class="opinions-list">
        <div v-for="opinion in opinions" :key="opinion.id" class="opinion">
          <p><strong>Nombre: </strong>{{ opinion.name }}</p>
          <p><strong>Opinión: </strong>{{ opinion.text }}</p>
          <div class="opinion-actions">
            <button @click="editarOpinion(opinion)" class="btn btn-success btn-ed">Editar</button>
            <button @click="eliminarOpinion(opinion.id)" class="btn btn-info btn-el">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="editingOpinionId">
      <h2>Editar Comentario</h2>
      <div class="form-group">
        <label for="editOpinion">Opinión:</label>
        <textarea id="editOpinion" v-model="editedOpinion" required></textarea>
      </div>
      <div class="modal-actions">
        <button @click="cancelEdit" class="btn btn-success btn-ed">Cancelar</button>
        <button @click="saveEdit" class="btn btn-info btn-el">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpinionFormComp',
  data() {
    return {
      gameName: '',
      name: '',
      opinion: '',
      opinions: [],
      editingOpinionId: '',
      editedOpinion: ''
    };
  },
  created() {
    this.gameName = this.$route.params.gameName;
  },
  methods: {
    submitOpinion() {
      const newOpinion = {
        name: this.name,
        text: this.opinion,
        id: Date.now()
      };
      this.opinions.push(newOpinion);
      this.name = '';
      this.opinion = '';
    },
    editarOpinion(opinion) {
      this.editingOpinionId = opinion.id;
      this.editedOpinion = opinion.text;
    },
    cancelEdit() {
      this.editingOpinionId = '';
      this.editedOpinion = '';
    },
    saveEdit() {
      const opinion = this.opinions.find(opinion => opinion.id === this.editingOpinionId);
      if (opinion) {
        opinion.text = this.editedOpinion;
      }
      this.cancelEdit();
    },
    eliminarOpinion(id) {
      const opinionIndex = this.opinions.findIndex(opinion => opinion.id === id);
      if (opinionIndex !== -1) {
        this.opinions.splice(opinionIndex, 1);
      }
    },
    getAnimationClass(opinionId) {
      const lastIndex = this.opinions.length - 1;
      if (opinionId === this.opinions[0].id) {
        return 'fade-enter';
      } else if (opinionId === this.opinions[lastIndex].id) {
        return 'fade-leave-active';
      } else {
        return '';
      }
    }
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.opinion-form {
  margin-top: 20px;
}

.opinion-form h2 {
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 5px;
}

button[type="submit"] {
  padding: 5px 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-weight: bold;
}

.opinion {
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 10px;
  border: solid 2px chocolate;
}

.opinion p {
  margin: 0;
}

.opinion-actions {
  margin-top: 10px;
}

.btn-ed {
  margin-right: 5px;
  border-radius: 5px;
}

.btn-el {
  margin-right: 5px;
  border-radius: 5px;
}

.styled-input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s;
}

.styled-input:focus {
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.fade-enter {
  animation: fadeIn 0.5s;
}

.fade-leave-active {
  animation: fadeOut 0.5s;
}
</style>


  