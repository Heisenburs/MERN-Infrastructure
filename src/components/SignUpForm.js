import { signUp } from '../utilities/users-service';
import React from 'react'
import { useState } from 'react'


function SignUpForm({setUser}) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    })

    //? if the passwords don't match, return boolean (true or false)
    const disable = formData.password !== formData.confirm;

    const handleSubmit = async (event) => {
          // Prevent form from being submitted to the server
    event.preventDefault();    
try {
    console.log(formData);
    const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
    }
    //? returns a token with the user info
    const user = await signUp(userData) // users-service
setUser(user);

} catch (error) {
    // an error occured
    setFormData({...formData, error: "Sign Up Failed - Please Try Again"})
}

    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value, error: ''})
    }
  return (
    <div>
        <div className='form-container'>
            <form autoComplete='off' onSubmit={handleSubmit}>

            <label>Name: </label>
            <input type='text' name='name' value={formData.name} onChange={handleChange} required/>

            <label>Email: </label>
            <input type='text' name='email' value={formData.email} onChange={handleChange} required/>

            <label>Password: </label>
            <input type='password' name='password' value={formData.password} onChange={handleChange} required/> 

            <label>Confirm Password: </label>
            <input type='password' name='confirm' value={formData.confirm} onChange={handleChange} required/>    

            <button type='submit' disabled={disable}>SIGN UP!</button>    
            </form>
        </div>

        <p className='error-message'>{formData.error}</p>
    </div>
  )
}

export default SignUpForm