<template>
<div>
  <h3>{{ burger.name }}</h3>
  <img v-bind:src="burger.imageUrl" alt="Burger Image" style="width: 200px;">
  <p>Contains: {{ burger.ingredients.join(', ') }}</p>
  <p>Amount Ordered: {{ this.amountOrdered }}</p>
  <div>
    <button id="decreaseButton" v-on:click="decreaseNr"> - </button>
    <button id="increaseButton" v-on:click="increaseNr"> + </button>
  </div>
</div>

  </template>
  
  <script>
  export default {
    name: 'OneBurger',
    props: {
      burger: Object,
      required: true
    },
    data: function () {
  return {
    amountOrdered: 0
  }

},
  methods: {
  increaseNr: function() {
        this.amountOrdered += 1;
    this.addBurger();
    },
    decreaseNr: function() {
      if (this.amountOrdered > 0) {
    this.amountOrdered-= 1; 
    this.addBurger(); 
    }
  },
  addBurger: function () {

  this.$emit('orderedBurger', { name:   this.burger.name, 
                                amount: this.amountOrdered}
  );
},
  }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
  