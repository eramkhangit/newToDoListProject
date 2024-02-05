// ------------ Handle localStorage --------
// const getLocalStorage = () => {
//     return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
// }

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