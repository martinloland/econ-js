groups = [
    {
    id:1,
    title:'Mat',
    phrases:[{id:1, title:'rema 1000'}, {id:2, title:'bunn'}]},
    {
    id:2,
    title:'Uteliv',
    phrases:[{id:1, title:'narvesen'}, {id:2, title:'bar'}]
    }
]

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
                v-for="(todo, index) in phrases"
                v-bind:key="todo.id"
                v-bind:title="todo.title"
                v-on:remove="phrases.splice(index, 1)"
            ></li>
        </ul>
        </div>
      `,
    data: function () {
        return {
            nextId: 3,
            newTodoText: ''

    }},
    methods: {
        addNewTodo: function () {
            this.phrases.push({
                id: this.nextId++,
                title: this.newTodoText
            })
            this.newTodoText = ''
        }
    },
    props:['title', 'key', 'phrases']
})

new Vue({
    el: '#groups',
    data:{groups:groups}
})