document.addEventListener("DOMContentLoaded", function() {
    
    // write your magic here
    // 1. get elements form, list, input
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    // todos elements: {text: string, completed: bool}
    
    // you can use the for loop instead of map
    /* for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        addTodo(todo);
    } */

    todos.map(todo => addTodo(todo));

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const text = input.value;
        input.value = '';

        todos.push({ text: text, done: false });
        localStorage.setItem('todos', JSON.stringify(todos));

        addTodo({ text: text, done: false });
    });

    function addTodo(item) {
        // create html elements for display
        const listItem = document.createElement('li');
        listItem.classList.add('flex', 'items-center', 'space-x-2', 'my-2');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        checkbox.classList.add('form-checkbox', 'h-5', 'w-5');
        checkbox.addEventListener('change', function() {
            item.done = !item.done; //destructive change
            label.classList.toggle('line-through');
            localStorage.setItem('todos', JSON.stringify(todos));
        });

        const label = document.createElement('label');
        label.textContent = item.text;
    
        label.classList.add('text-gray-800', 'py-2', 'px-3', 'rounded', 'bg-gray-200', 'w-full');
        // el completed -> strike-through
        if (item.completed) {
            label.classList.add('line-through');
        }
   

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('bg-red-500', 'text-white', 'rounded', 'p-1', 'ml-2');
        deleteBtn.addEventListener('click', function() {
            todoList.removeChild(listItem);
            const index = todos.indexOf(item);
            todos.splice(index, 1); // todos[:index] + todos[index+1:]
            localStorage.setItem('todos', JSON.stringify(todos));
        });

        // add to <li>
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(deleteBtn);
        // add to <ul> 
        todoList.appendChild(listItem);
    }
});


