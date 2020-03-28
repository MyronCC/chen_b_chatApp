// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";
import Login from "./modules/Login.js";
(() => {
const socket = io();

// the packet is whatever data we send through with the connect event
// from the server

// this is data destructuring. Go look it up on MDN
function setUserId({sID}) {
    // debugger;
    console.log(sID);
    vm.socketID = sID;
}

function showDisconnectMessage() {
    console.log('a user disconnected');
}

function appendMessage(message) {
    vm.messages.push(message);
}

let router = new VueRouter({
    routes: [
        { path: '/', redirect: { name: "login" } },
        { path: '/login', name: "login", component: Login },
        { path: '/chat', name: "users", component:ChatMessage },
      ]
});
const vm = new Vue({

        data: {
          authenticated: false,
          administrator: false,
    
          mockAccount: {
            username: "user",
            password: "password"
          },
    
          
    chatData: {
       socketID: "",
       nickname: "",
       message: "",
       
       messages: []
    },
},

    methods: {
        setAuthenticated(status, data) {
          this.authenticated = status;
          // handle implicit type coercion(bad, bad part of js)
          // turn our admin 1 or 0 back into a number
          this.administrator = parseInt(data.isadmin);
          this.user = data;
        
        },
  
        logout() {
          // delete local session
  
          // push user back to login page
          this.$router.push({ path: "/login" });
          this.authenticated = false;
          this.administrator = false;
        }
      },
  
      router: router
}) .$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);
})();
