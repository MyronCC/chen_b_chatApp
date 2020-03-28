const socket = io();

export default {
    template: `
            <div class="loginDiv">
                <h1 class="display-4">Chat App!</h1>
                <form @submit.prevent="login">
                    <div class="form-row align-items-center">
                        <div class="col-md-3 my-1">
                            <label class="sr-only" for="inlineFormInputName">Name</label>
                            <input v-model="input.username" type="text" placeholder="username" name="username" required>
                        </div>

                        <div class="col-md-3 my-1">
                            <label class="sr-only" for="inlineFormPassword">Name</label>
                            <input v-model="input.password" type="password" placeholder="password" name="password" required>
                        </div>

                        <div class="col-auto my-1">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                    </div>
                </form>            
            </div>
     `,

    data() {
        return {
            input: {
                username: "",
                password: ""
            },

        }
    },

    methods: {
        login() {
            //console.log(this.$parent.mockAccount.username);
            // debugger;
            if(this.input.username == this.mockAccount.username && this.input.password != this.mockAccount.username){
                this.$emit("authenticated", true);
                
                   
                
            } else {
                console.error("wrong information");
            }
        }
    }}
