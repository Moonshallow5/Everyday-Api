<template>
<v-container>
    <h2 class="text-h5 mb-5 poppins">Your Todo's</h2>
    <hr />


            <v-row justify="end" >
        <v-col cols="auto">
            <v-btn style="text-transform: none;" @click="openDialog()">Add new</v-btn>
        </v-col>
    </v-row>
            <v-dialog v-model="dialog">

                <v-card>
                    <v-card-title>{{ editMode ? "Edit Todo" : "Add New Todo" }}</v-card-title>
                    <v-card-text>
                        <v-text-field v-model="newTodo.title" label="Title"></v-text-field>
                        <v-textarea v-model="newTodo.description" label="Description"></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="green" @click="saveTodo()">Save</v-btn>
                        <v-btn color="red" @click="dialog = false">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
        </v-dialog>

        <v-row class="mt-4">
      <v-col v-for="todo in todos" :key="todo.id" cols="12" md="6">
        <v-card>
          <v-card-title>{{ todo.title }}</v-card-title>
          <v-card-text>{{ todo.description }}</v-card-text>
          <v-card-actions>
            <v-btn color="blue" @click="openDialog(todo)">Edit</v-btn>
            <v-btn color="red" @click="deleteTodo(todo.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
        
      </v-col>
    </v-row>

    <v-col cols="auto">
            Your Pending Tasks:<v-btn @click="ml_speak" class="ml-3" > Talk</v-btn>
            </v-col>

    <div class="mt-3">
    <h2>🧠 Your Daily Task Summary</h2>
    <p v-if="loading">Click the LLM summarise button :)</p>
    <p v-else>{{ summary }}</p>
  </div>
            


</v-container>


</template>

<script>
import axios from 'axios';

export default{
    name:'todo',
    data(){
        return{
            todos:[],
            editMode: false,
            loading:true,

            dialog:false,
            title:'',
            description:'',
            newTodo: {id: null, title: "", description: "" },
            summary:'',
        }
    },
    methods:{
        async fetchTodo(){
            const response = await axios.get("https://everyday-api-backend.onrender.com/todos");
            this.todos = response.data;

        },

        async ml_speak(){
            const res = await fetch('https://everyday-api-backend.onrender.com/summary');
             const data = await res.json();
            this.summary= data.summary;
            console.log(this.summary)
            this.loading=false
            responsiveVoice.speak(this.summary, "UK English Male", { rate: 1.5 });

        },
        openDialog(todo = null) {
      if (todo) {
        this.editMode = true;
        this.newTodo = { ...todo }; // Clone the todo for editing
      } else {
        this.editMode = false;
        this.newTodo = { id: null, title: "", description: "" };
      }
      this.dialog = true;
    },

    async saveTodo() {
      try {
            if (this.editMode) {
            await axios.put(`https://everyday-api-backend.onrender.com/todos/${this.newTodo.id}`, {
                title: this.newTodo.title,
                description: this.newTodo.description
            });
        } else {
          const response = await axios.post("https://everyday-api-backend.onrender.com/todos", {
            title: this.newTodo.title,
            description: this.newTodo.description
          });
          this.todos.push(response.data);
        }
        this.dialog = false;
        this.fetchTodo();
      } catch (error) {
        console.error("Error saving todo:", error);
      }
    },
       
      async deleteTodo(id) {
      try {
        await axios.delete(`https://everyday-api-backend.onrender.com/todos/${id}`);
        this.fetchTodo();
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
    
        

    },

    mounted(){
        this.fetchTodo()


    }
    

}


</script>