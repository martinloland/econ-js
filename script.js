Vue.component('phrase', {
    template: `
    <li>
      {{ title }}
      <button v-on:click="$emit(\'remove\')">Remove</button>
    </li>
  `,
    props: ['title']
})

Vue.component('group', {
    template: `
        <div>
        <h3>{{ title }}</h3>
        <form v-on:submit.prevent="addNewTodo">
            <input
                    v-model="newTodoText"
                    id="new-todo"
                    placeholder="legg til søkfrase"
            >
        </form>
        <ul>
            <li
                is="phrase"
                v-for="(todo, index) in searches"
                v-bind:key="todo.id"
                v-bind:title="todo.title"
                v-on:remove="searches.splice(index, 1)"
            ></li>
        </ul>
        </div>
      `,
    data: function () {
        return {
            searches: [{id:1, title:'rema 1000'}, {id:2, title:'bunn'}],
            nextId: 3,
            newTodoText: ''

    }},
    methods: {
        addNewTodo: function () {
            this.searches.push({
                id: this.nextId++,
                title: this.newTodoText
            })
            this.newTodoText = ''
        }
    },
    props:['title']
})

new Vue({
    el: '#todo-list-example'
})