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
      
      <div v-for="burger in burgers" 
      v-bind:key="burger.name">
      <h3>{{ burger.name }}</h3>
      <img v-bind:src="burger.imageUrl" alt="Burger Image" style="width: 200px;">
      <p>Contains: {{ burger.ingredients.join(', ') }}</p>
</div>

      </div>
    </section>  


<section  class="section2"> 
    <p>
    <h2>Customer information</h2>
    <p>This is where you provide necessary information</p>
    <p>
        <label for="name">Full name</label><br>
        <input type="text" id="name" name="fn" required="required" placeholder="First- and last name">
    </p>
    <p><label for="email">E-mail</label><br>
        <input type="email" id="email" name="em" required="required" placeholder="E-mail address">
    </p>
    <p>
        <label for="street">Street</label><br>
        <input type="text" id="street" name="ln" placeholder="Street name">
    </p>
    <p>
        <label for="house">House/apt no</label><br>
        <input type="text" id="house" name="ln" placeholder="House or apt no">
    </p>
    <p> 
        <label for="radiobutton">Gender</label><br>
        <input type="radio" id="radiobutton" name="rb" checked="checked" placeholder="Do not wish to provide">
        <label for="radiobutton">Do not wish to provide</label><br>
        <input type="radio" id="radiobutton" name="rb" placeholder="Male">
        <label for="radiobutton">Male</label><br>
        <input type="radio" id="radiobutton" name="rb" placeholder="Female">
        <label for="radiobutton">Female</label><br>
        
        
    </p>
    <p>
        <label for="recipient">Select payment method</label><br>

        <select id="recipient" name="rcp" required="required">
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

function MenuItem(name, imageUrl, ingredients) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.ingredients = ingredients;
}

const burgerMenu = menu.map(item => new MenuItem(item.name, item.imageUrl, item.ingredients));  

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
        yourVariable: 'Välj en burgare'
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
    sendOrder: function() {
      alert("Order placed!");
      const orderDetails =
       }
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
    padding: 10px 20px 10px 20px;
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
display: flex;
  justify-content: space-around; 
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