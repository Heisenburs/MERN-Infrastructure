//** We will use a src/utilities/users-service.js module to organize functions used to sign-up, log in, log out, etc. */

//* SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

//* handleSubmit <--> [signUp]-users-service <--> [signUp]-users-api <--> internet <--> server.js(Express)


import * as usersApi from './users-api'

//* GET Token Function
export function getToken() {
    const token = localStorage.getItem('token')
    if(!token) return null

    const payload = JSON.parse(atob(token.split('.')[1]))
    console.log(payload);

    // if token is expired
    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        return null
    }
 
    // token is valid
    return token;
}

//* GET User
export function getUser() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

//* SignUp Function
export async function signUp(userData) {
    //? Delegate the network request code to the users-api.js API module which will ultimately return a JSON Web Token (JWT)
    // console.log('[From SignUp function]', userData);
    const token = await usersApi.signUp(userData);

    //? saves token to the local storage
    localStorage.setItem('token', token)
    return getUser();
}

//* Login Function
export async function login(credentialData) {
    const token = await usersApi.login(credentialData);

    localStorage.setItem('token', token)
    return getUser();
}

//* LogOut Function
export async function logOut() {
    localStorage.removeItem('token')
}

//* Check Token Function
export async function checkToken() {
return usersApi.checkToken().then(dateStr => new Date(dateStr))

}