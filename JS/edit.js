// ------------ Edit List --------------------
const editList = (event) => {
    const element = event.currentTarget.parentElement.parentElement;
    editElement = event.currentTarget.parentElement.previousElementSibling;
    userInputField.value = editElement.textContent
    editFlag = true
    editID = element.dataset.id
    submitBtn.textContent = "Edit"
}
