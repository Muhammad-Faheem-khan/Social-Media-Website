'use strict'
import * as userDataHandling from "./userDataHandling.js"
// getting DOM Elements of login page 
const userId = document.querySelector('.userId')
const password = document.getElementById('password')
const loginElement = document.querySelector('.login-btn')
const loginText = document.querySelector('.login-text')

loginElement.addEventListener('click', loginUser)

// function to validate user 
function loginUser(e) {
    const usersArray = userDataHandling.getAllUsers()
    const currentUser = usersArray.find((user => user.email == userId.value))
    if (currentUser) {
        if (currentUser.password == password.value) {
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser))
            loginText.innerText = 'Log in with you credentials that you enetered during sign up'
            loginText.classList.remove('error-text')
            userId.classList.remove('is-invalid')
            userId.classList.add('is-valid')
            password.classList.add('is-valid')
            password.classList.remove('is-invalid')

        } else {
            e.preventDefault()
            loginText.innerText = 'Invalid userID or password'
            userId.classList.remove('is-invalid')
            password.classList.add('is-invalid')
            loginText.classList.add('error-text')
        }
    } else {
        e.preventDefault()
        loginText.innerText = 'Enter userID or password'
        loginText.classList.add('error-text')
        userId.classList.add('is-invalid')
        password.classList.add('is-invalid')
    }
}


