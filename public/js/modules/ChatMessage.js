// the export statement means that everything inside the curly braces 
// will be made public when you import this file into another via the import statement

export default {


    template: `
        <p class="new-message" :class="{ 'my-message' : matchedID }">
            <span>{{ msg.message.name }} :</span>
            {{ msg.message.content }}
        </p>
    `,

    data: {
        socketID: "",
        nickname: "",
        message: "",
        
        messages: []
     },
 
     methods: {
         // emit a message event to the server so that it can in 
         // turn send this to anyone who's connected
         dispatchMessage() {
             console.log('handle emit message');
 
             // the double pipe || is an "or" operator
             // if the first value is set, use it. else use whatever comes after the "or" operator
             socket.emit('chat_message', {
                 name: this.nickname, //|| "anonymous"
                 content: this.message,
                 
             })
 
             this.message = "";
         }
     },
     mounted: function() {
         console.log('vue is done mounting');
     },
 
     components: {
         newmessage: ChatMessage
     }
}