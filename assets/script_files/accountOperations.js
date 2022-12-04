import * as accounthandling from './userDataHandling.js'
window.handleLogout = handleLogout
window.handleDelete = handleDelete

function handleLogout(e) {
    window.location.replace('../../index.html');
    sessionStorage.clear()
}
function handleDelete(e) {
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    accounthandling.deleteUserData(currentUser.id)
    window.location.replace('../../index.html');
    sessionStorage.clear()

}