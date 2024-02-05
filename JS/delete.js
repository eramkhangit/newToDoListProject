// ----------- Delete List (Correct)---------------
const deleteList = (event) => {
    const element = event.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    list.removeChild(element)

    if (list.children.length === 0) {
        container.classList.remove("show-container")
    }
    displayAlert("List removed", "danger")
    setBackToDefault()
    // -------- Remove from local storage --------
    removeFromLocalStorage(id)
}