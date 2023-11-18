<template>
    <div class="wrapper">
    <h3>{{ burger.name }}</h3>
                        v-bind:src="burger.imageUrl"
                        {{ burger.ingredients }}
                      </div>               
  </template>
  
  <script>
  export default {
    name: 'OneBurger',
    props: {
      burger: Object
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  .wrapper {
   display: grid;
   grid-gap: 50px;
   grid-template-columns:33% 33% 33%;
   color: rgb(24, 24, 24);
   margin: 0, 0, 0, -50px;
}
  
  </style>
  