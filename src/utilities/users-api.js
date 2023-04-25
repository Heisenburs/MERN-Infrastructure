//** The users-service.js module will need to make AJAX requests to the Express server (axios) */

import { getToken } from "./users-service";

const BASE_URL = '/api/users';

//****** Sign Up Function
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

//****** Log In Function
export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

//****** Check Token Function
export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`)
}

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }

  // grabs token from localStorage
const token = getToken();

// set the token with an Authorization header & sends it to the backend
if (token) {
  options.headers = options.headers || {};
  options.headers.Authorization = `Bearer ${token}`;
}

  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}







//********* OLD REPETITIVE WAY */
// export async function signUp(userData) {
//    const BASE_URL = '/api/users';

//    const res = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},

//     body: JSON.stringify(userData)
//    });

//    //? Check if request was successful
//    if (res.ok) {
//     return res.json(); //JWT Token
//      } else {
//       throw new Error('Invalid Sign Up')
//      }
//    }

//    export async function login(credentialData) {
//     const BASE_URL = '/api/users';

//     const res = await fetch(`${BASE_URL}/login`, {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},

//       body: JSON.stringify(credentialData)
//     })

//     if (res.ok) {
//       return res.json(); //JWT Token ?
//     } else {
//       throw new Error('Invalid Log In')
//     }

//    }

