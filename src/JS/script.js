const add = document.querySelector('.add')
const ul = document.querySelector('ul')
const text = document.querySelector('.text-input')
const deleteAll = document.querySelector('.delete-all')
const divInsert = document.querySelector('.divInsert')
let taskInput
let editTask
let label
let checkbox
let buttons
let deleteButton

var arrayTasks = JSON.parse(localStorage.getItem('theList')) || []

add.addEventListener('click', createItems)
text.addEventListener('keypress', event => {
    if(event.key == 'Enter') {
        createItems()
    }
})

function createItems() {
    if (text.value == '') {
        window.alert('Type something')
    } else {
        ul.innerHTML = ""

        arrayTasks.push({'task': text.value, 'status': ''})

        arrayTasks.forEach((item, index) => {
            showTask(item.task, item.status, index)
        })
    }

    text.value = ''
    text.focus()
}

function showTask(text, stat, i) {

    const li = document.createElement('li')
    li.classList.add(`task${i}`) //unique class

    label = document.createElement('label')
    li.appendChild(label)

    checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = stat
    checkbox.classList.add('input-task')
    //checkbox.setAttribute(stat, stat)
    checkbox.addEventListener('click', checkStatus)
    
    let count = 0
    function checkStatus() {
        count++
        li.classList.toggle('check')
        arrayTasks[i].status = stat

        if (count%2==0 || stat=='checked') {
            arrayTasks[i].status = ''
            
        } else {
            arrayTasks[i].status = 'checked'
        }
    }

    //in order to keep check style when added new tasks:
    if (stat == 'checked'){
        li.classList.add('check')
    } else {
        li.classList.remove('check')
    }
    
    label.appendChild(checkbox)

    taskInput = document.createElement('input')
    taskInput.type = 'text'
    taskInput.classList.add('text')
    taskInput.setAttribute('readonly', 'readonly')
    taskInput.value = text
    label.appendChild(taskInput)

    buttons = document.createElement('div')
    buttons.classList.add('buttons')
    li.appendChild(buttons)

    editTask = document.createElement('button')
    editTask.classList.add('edit')
    const ionIcon = document.createElement('ion-icon')
    ionIcon.setAttribute('name', 'pencil-outline')
    editTask.appendChild(ionIcon)

    
    editTask.addEventListener('click', (e) => {
        const Element = e.target.closest("button") //select the clicked button, not the last one 
        const parentElement = e.target.closest("li") //select the clicked li
        const Label = parentElement.firstElementChild
        const textEdit = Label.lastElementChild // text type input (otherwise will be selected the last one also)

        if (textEdit.hasAttribute('readonly')){
            textEdit.removeAttribute('readonly')
            textEdit.focus()
            Element.innerHTML = `<ion-icon name="save-outline"></ion-icon>`
        } else {
            textEdit.setAttribute('readonly', 'readonly')
            Element.innerHTML = `<ion-icon name="pencil-outline"></ion-icon>`
        }

        arrayTasks[i].task = textEdit.value //update the array -> edited texts are saved
    })

    buttons.appendChild(editTask)

    deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    const ionIcon2 = document.createElement('ion-icon')
    ionIcon2.setAttribute('name', 'close-circle-outline')
    deleteButton.appendChild(ionIcon2)

    deleteButton.addEventListener('click', (e) => {
        const task = e.target.closest('li')
        const deleted = e.view.arrayTasks.splice(i, 1)
        task.remove()
    })
    buttons.appendChild(deleteButton)

    ul.appendChild(li)
}

deleteAll.addEventListener('click', () => {
    arrayTasks = []
    ul.innerHTML = ""
})

ul.addEventListener('change', () => {
    localStorage.setItem('theList', JSON.stringify(arrayTasks))
})