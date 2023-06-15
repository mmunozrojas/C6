<template>
    <div class="achievement-bar">
      <div class="achievement-item yellow">
        <div class="achievement-category">Porcentaje de finalización de juegos</div>
      </div>
      <div class="achievement-item green">
        <div class="achievement-category">Logros en el juego</div>
      </div>
      <div class="achievement-item skyblue">
        <div class="achievement-category">Recompensas</div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .achievement-bar {
    display: flex;
    justify-content: center;
    height: 150px;
  }
  
  .achievement-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    padding: 5px;
    width: 300px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    color: aliceblue; /* Agrega transición al hover */
  }
  
  .achievement-item:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra más notoria al hacer hover */
    transform: scale(1.05); /* Efecto de zoom al hacer hover */
  }
  
  .achievement-progress {
    width: 100px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
  }
  
  .yellow {
    background-color: rgb(140, 0, 255);
  }
  
  .green {
    background-color: green;
  }
  
  .skyblue {
    background-color: skyblue;
  }
  
  .achievement-category {
    font-weight: bold;
    margin-top: 5px;
  }
  </style>
  