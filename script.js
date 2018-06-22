userData = {
    groups:[
        {
        id:1,
        title:'Mat',
        phrases:[{id:1, title:'rema 1000'}, {id:2, title:'bunn'}],
        nextPid:3
        },
        {
        id:2,
        title:'Uteliv',
        phrases:[{id:1, title:'narvesen'}, {id:2, title:'bar'}],
        nextPid:3
        }
    ],
    nextGid:3
}

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
        <h3>{{ group.title }}</h3>
        <button v-on:click="$emit('remove')">Del</button>
        <form v-on:submit.prevent="addPhrase">
            <input v-model="newPhrase" placeholder="Ny søkefrase">
        </form>
        <ul>
            <li
                is="phrase"
                v-for="(todo, index) in group.phrases"
                v-bind:key="todo.id"
                v-bind:title="todo.title"
                v-on:remove="group.phrases.splice(index, 1)"
            ></li>
        </ul>
        </div>
      `,
    data: function () {
        return {
            nextId: 3,
            newPhrase: ''

    }},
    methods: {
        addPhrase: function () {
            this.group.phrases.push({
                id: this.nextId++,
                title: this.newPhrase
            })
            this.newPhrase = ''
        }
    },
    props:['group']
})

new Vue({
    el: '#groups',
    data:{
        groups: userData.groups,
        nextGId: userData.nextGid,
        newGroup: ''
    },
    methods: {
        addGroup: function () {
            this.groups.push({
                id: this.nextGId++,
                title: this.newGroup,
                phrases: [],
                nextPid:1
            })
            this.newGroup = ''
        }
    },
})