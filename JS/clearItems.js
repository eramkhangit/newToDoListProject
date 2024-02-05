const clearBtn = document.querySelector(".clear-btn")

// --------- Clear Lists -----------------
const clearLists = () => {
    const taskLists = document.querySelectorAll(".tasks")
    if (taskLists.length > 0) {
        taskLists.forEach((li) => {
            const listId = li.dataset.id
            li.remove(listId)
            // ------- Remove from Local storage----------
            removeFromLocalStorage(listId)
        })
    }
    container.classList.remove("show-container")
    displayAlert("Empty List", "danger")
    setBackToDefault()
}

clearBtn.addEventListener("click", clearLists)