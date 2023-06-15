<template>
  <div class="not-found-container">
    <div class="not-found-box">
      <h1 class="not-found-text">404</h1>
      <p class="not-found-subtext">Not Found</p>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "NotFound",
};
</script>
  
<style>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Color degradado pastel de morado */
}

.not-found-box {
  width: 900px;
  height: 600px;
  background: linear-gradient(to bottom, #e0c9f7, #a660ff);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.not-found-text {
  font-size: 264px;
  font-weight: bolder;
  color: #ffffff;
  /* Color morado */
  margin-bottom: 16px;
}

.not-found-subtext {
  font-size: 50px;
  color: #ffffff;
  /* Color morado más claro */
  font-weight: bolder;
}
</style>