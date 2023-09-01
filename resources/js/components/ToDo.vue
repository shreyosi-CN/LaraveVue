<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">To Do List</div>

                <div class="card-body">
                    <div class="input-group">
                        <input type="text" placeholder="Todo.." v-model="todo_input" class="form-control" arial-label="todo" arial-describedby="todo">
                        <div class="input-group-append">

                            <button v-if="!edit_todo_id" v-on:click="saveTodo()" type="button" class="btn btn-info">Add</button>
                            <button v-else="" v-on:click="updateTodo()" type="button" class="btn btn-info">Update</button>

                        </div>

                    </div>
                    <button type="button" class="btn btn-sm btn-success" v-on:click="resetTodo()">Reset</button>

                    <table class="table table-bordered mt-4">
                        <thead>
                            <th>Sl. No.</th>
                            <th>Name</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            <tr v-for="(todo,index) in todos" :key="index">
                                <td>{{++index}}</td>
                                <td>{{ todo.name }}</td>
                                <td><button type="button" class="btn btn-sm btn-danger" v-on:click="deleteTodo(--index)">Delete</button>
                                    <button type="button" class="btn btn-sm btn-info" v-on:click="editTodo(--index)">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            todos: [],
            todo_input: '',
            api: 'http://127.0.0.1:8000/api/todo',
            edit_todo_id:'',
            edit_index:''
        }
    },
    mounted() {

        console.log('Component mounted.')
        //get the todo details
        this.axios.get(this.api).then(res => {
            this.todos = res.data;
        })

    },
    methods: {
        saveTodo() {
            if (this.todo_input.length > 0) {
                this.axios.post(this.api, {
                    'name': this.todo_input
                }).then(res => {
                    this.todos.push(res.data);
                    this.todo_input = '';
                })
            }
        },

        deleteTodo(index) {
            this.axios.delete(this.api + '/' + this.todos[index].id).then(res => {
                this.todos.splice(index, 1);
            })
        },
        editTodo(index) {
        this.todo_input = this.todos[index].name;
        this.edit_todo_id = this.todos[index].id;
        this.edit_index = index;

        // this.axios.delete(this.api + '/' + this.todos[index].id).then(res => {
        //     this.todos.splice(index, 1);
        // })
    },
    resetTodo()
    {
        this.todo_input = '';
        this.edit_todo_id='';
        this.edit_index='';

    },
    updateTodo() {
            if (this.todo_input.length > 0) {
                this.axios.put(this.api+ '/' + this.todos[this.edit_index].id, {
                    'name': this.todo_input
                }).then(res => {
                    this.todos[this.edit_index].name = res.data.name;
                    this.todo_input = '';
                })
            }
        }
    }

    
}
</script>
