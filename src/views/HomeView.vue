<template>
  <main>
    <header>
      <h1>Welcome to BurgerOnline</h1>
    </header>
    <div id="map" v-on:click="addOrder">
      click here
    </div>

    <section>
      <h2>Select burger</h2>
      <p>This is where you execute burger selection</p>

      <div class="wrapper">
      <Burger v-for="burger in burgers" v-bind:burger="burger"
      v-bind:key="burger.name"
      v-on:orderedBurger="addToOrder($event)"/> 
    </div>
  
    </section>  


<section  class="section2"> 
    <p>
    <h2>Customer information</h2>
    <p>This is where you provide necessary information</p>
    <p>
        <label for="name">Full name</label><br> 
        <input type="text" id="name" v-model="name" required="required" placeholder="First- and last name">
    </p>
    <p><label for="email">E-mail</label><br>
        <input type="email" id="email" v-model="email" required="required" placeholder="E-mail address">
    </p>
    <p>
        <label for="street">Street</label><br>
        <input type="text" id="street" v-model="street" required="required" placeholder="Street name">
    </p>
    <p>
        <label for="house">House/apt no</label><br>
        <input type="text" id="house" v-model="house" required="required" placeholder="House or apt no">
    </p>
    <p> 
        <label for="radiobuttons">Gender</label><br>
        <input type="radio" id="blank" value="blank" v-model="rb">
        <label for="blank">Do not wish to provide</label><br>
        <input type="radio" id="male" value="male" v-model="rb">
        <label for="male">Male</label><br>
        <input type="radio" id="female" value="female" v-model="rb">
        <label for="female">Female</label><br>
    </p>
    <p>
        <label for="payment">Select payment method</label><br>
        {{ Payment }}
        <select id="payment" v-model="payment">
          <option disabled value="">Please select one</option>
          <option>Credit card</option>
          <option>Debit card</option>
          <option>Swish</option>
        </select>
  

     </p>
    </p>

</section>
<div id="orders">
<button type="submit" v-on:click="sendOrder()">
    <img src="https://w7.pngwing.com/pngs/601/52/png-transparent-paper-plane-airplane-paper-plane-aeroplane-angle-furniture-rectangle-thumbnail.png" alt="Span" title="Send" style="width: 14px;">
    Place order
  </button>
</div>

</main>
<hr>
<footer>
    End notes
</footer>  

</template>

<script>
import Burger from '../components/OneBurger.vue'
import io from 'socket.io-client'
import menu from '../assets/menu.json'

const socket = io();

function MenuItem(name, imageUrl, ingredients, amountOrdered) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.ingredients = ingredients;
  this.amountOrdered=amountOrdered;
}

const burgerMenu = menu.map(item => new MenuItem(item.name, item.imageUrl, item.ingredients, 0));  


/* burgerMenu = [new MenuItem('Original burger', 'orginalburger.png', ['meat', 'vegetables', 'bread']), 
  new MenuItem('Chicken burger', 'chickenburger.png', ['chicken', 'vegetables', 'bread']),
  new MenuItem('Halloumi burger', 'halloumiburger.png', ['halloumi', 'vegetables', 'bread'])]; */

export default {
  name: 'HomeView',
  components: {
    Burger
  },
  data: function () {
    return {
      burgers: burgerMenu,
      amountOrdered:0,
      orderedBurgers:{}

    }

  },
  methods: {
    getOrderNumber: function () {
      return Math.floor(Math.random()*100000);
    },
    addOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      socket.emit("addOrder", { orderId: this.getOrderNumber(),
                                details: { x: event.clientX - 10 - offset.x,
                                           y: event.clientY - 10 - offset.y },
                                orderItems: ["Beans", "Curry"]
                              }
                 );
    },
    addToOrder: function (event) {
  this.orderedBurgers[event.name] = event.amount;
    },

    sendOrder: function() {
      alert("Order placed!");
      const orderDetails = [
      this.name,
      this.email,
      this.street,
      this.house,
      this.rb,
      this.payment,
      JSON.stringify(this.orderedBurgers)
      ]
      console.log(orderDetails)
       },

}}
</script>

<style>
  #map {
    width: 300px;
    height: 300px;
    background-color: red;
  }
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap");

body {
    font-family: "Poppins", sans-serif;
    font-size: 12pt;
    background: rgb(255,101,247);
    background: linear-gradient(0deg, rgba(255,101,247,1) 33%, rgba(253,131,45,1) 100%);

    
}
.classname {
    color: #ff5500;
 }
 
 #idname {
    text-transform: uppercase;
 }
 .section2{
    color:  rgb(24, 24, 24);;
    background-color: rgba(253,131,45,1);
    border: none;
 }
 button:hover {
    background-color: rgb(12, 119, 0);
 }
 section {
    padding: 10px 0px 10px 20px;
    margin: 10px;
    border: 2px dotted #ff9900;
 }
 button {
    margin: 2em;
 }
 div{ margin: 10px 20px 10px 20px;}

 header{
background: url("https://static.thatsup.co/content/img/place/t/u/tugg-burgers-7.jpg");
overflow: hidden;
background-size: cover;
height: 200px;
width: 100%;
}

header h1{
   margin-top: 80px;
   text-align: center;
   top: 0;
   left: 0;
   color:antiquewhite;


}

.very-good{
   color:green;
}
.master{
   color: green;
   font-weight: bold;
}



.wrapper {
   display: grid;
   grid-gap: 50px;
   grid-template-columns:33% 33% 33%;
   color: rgb(24, 24, 24);
   padding-right: 50px;
}

@media screen and (max-width: 800px) {
   .wrapper {
      display: grid;
      grid-gap: 50px;
      grid-template-columns:20% 20% 20%;
      margin: 0, 0, 0, -50px;
   }
}  
</style>