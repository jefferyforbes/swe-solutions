const state = {
    tasks: []
}

const view = state => `
    <section>
        <h2>Tasks</h2>
        <ul>
            ${state.tasks.map(task => `<li>${task.text}</li>`).join("")}
        </ul>
    <section>
    <section>
            <form onsubmit="app.run('add', this); return false;">
            <input name="text" placeholder="Add a task" />
            <button>Add</button>
        </form>
    </section>
`
const update = {
    add: (state, form) => {
        const data = new FormData(form)
        const task = {
            id: window.crypto.getRandomValues(new Uint32Array(2)).join(""),
            text: data.get('text'),
            status: 0
        }
        state.tasks.push(task)
        return state
    }
}


app.start('app', state, view, update)
