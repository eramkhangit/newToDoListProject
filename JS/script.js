//  -------------- Select items ---------
const form = document.querySelector(".form")
const alertMessage = document.querySelector(".alert-message")
const submitBtn = document.querySelector(".submit-btn")
const userInputField = document.querySelector("#input")
const container = document.querySelector(".task-container")
const list = document.querySelector(".task-list")

//------- Edit Option -------------------
let editElement;
let editFlag = false;
let editID = "";
let importantList

// // ------------ Handle localStorage --------
const getLocalStorage = () => {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

const addToLocalStorage = (id, value) => {
    const createdLists = { id, value }
    let details = getLocalStorage()
    details.push(createdLists)
    localStorage.setItem("list", JSON.stringify(details))
}

const editLocalStorage = (id, value) => {
    let lists = getLocalStorage();
    const editedLists = lists.map((list) => {
        if (list.id === Number(id)) {
            list.value = value;
        }
        return list;
    })
    localStorage.setItem("list", JSON.stringify(editedLists))
}

const removeFromLocalStorage = (id) => {
    const details = getLocalStorage();
    updatedDetails = details.filter(listDetail => {
        if (listDetail.id !== Number(id)) {
            return listDetail;
        }
    })
    localStorage.setItem("list", JSON.stringify(updatedDetails))
}

// --------- Reload lists ---------
const setUpLists = () => {
    let lists = getLocalStorage()
    if (lists.length > 0) {
        lists.forEach((list) => {
            reloadCreatedLists(list.id, list.value)
        })
        container.classList.add("show-container")
    }
}

const reloadCreatedLists = (id, value) => {
    const element = document.createElement('article')
    let attr = document.createAttribute('data-id')
    attr.value = id
    element.setAttributeNode(attr)
    element.classList.add("tasks")
    element.innerHTML += `
    <p class="title">${value}</p>
    <div class="btn-container">
      <!-- edit btn -->
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <!-- delete btn -->
      <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
          </button>
        </div>`

    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn')

    // -------- add event listener to buttons ----
    deleteBtn.addEventListener('click', deleteList)
    editBtn.addEventListener('click', editList)

    list.appendChild(element)
}

// ------------ Add task into list --------
const addTask = (event) => {
    event.preventDefault()
    const value = userInputField.value
    const id = parseInt(Math.random() * 100 + 1)

    if (value !== "" && !editFlag) {
        const element = document.createElement('article')
        let attr = document.createAttribute('data-id')
        attr.value = id
        element.setAttributeNode(attr)
        element.classList.add("tasks")
        element.innerHTML += `
        <p class="title">${value}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`

        const deleteBtn = element.querySelector('.delete-btn')
        const editBtn = element.querySelector('.edit-btn')

        // -------- add event listener to buttons ----
        deleteBtn.addEventListener('click', deleteList)
        editBtn.addEventListener('click', editList)

        list.appendChild(element)

        displayAlert("Task added to the list", "success")
        container.classList.add('show-container')
       
        setBackToDefault()
        addToLocalStorage(id, value)
    }
    else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("Value changed", "success")

        editLocalStorage(editID, value)
        setBackToDefault()
    }
    else {
        displayAlert("Please enter task", "danger")
    }
}

// ------ Display Alert Message ----------
const displayAlert = (text, action) => {
    alertMessage.textContent = text
    alertMessage.classList.add(`alert-${action}`)
    // ---------- remove alert message -----
    setTimeout(() => {
        alertMessage.textContent = ""
        alertMessage.classList.remove(`alert-${action}`)
    }, 1000)
}

// -------- Set Back to default ----------
const setBackToDefault = () => {
    userInputField.value = ""
    editFlag = false
    editID = ""
    submitBtn.textContent = "Add"
}

// --------------- EventListeners ----------
form.addEventListener("submit", addTask)
window.addEventListener("DOMContentLoaded", setUpLists)