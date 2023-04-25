
import { useState } from 'react';
import {login} from '../utilities/users-service';

export default function LoginForm({ setUser }) {
const [credentials, setCredentials] = useState({
  email: '',
  password: ''
});
const [error, setError] = useState('');

//* HANDLECHANGE FUNCTION
function handleChange(evt) {
  setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
  setError('');
}

//* HANDLESUBMIT FUNCTION
async function handleSubmit(evt) {
  // Prevent form from being submitted to the server
  evt.preventDefault();
  try {
    // The promise returned by the signUp service method will resolve to the user object included in the payload of the JSON Web Token (JWT)

    console.log(credentials)
    const credentialData = {
      email: credentials.email,
      password: credentials.password
    }
    console.log(credentialData);

    const user = await login(credentialData);
    console.log(user);
    setUser(user);
  } catch {
    setError('Log In Failed - Try Again');
  }
}

return (
  <div>
    <div className="form-container" onSubmit={handleSubmit}>
      <form autoComplete="off" >
        <label>Email</label>
        <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">LOG IN!</button>
      </form>
    </div>
    <p className="error-message">&nbsp;{error}</p>
  </div>
);
}