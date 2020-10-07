import React, { useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'

const Form = () => {
    // User State
    const[user, setUser] = useState ({
        name: '',
        email: '',
        password: '',
        terms: false
    })

    //Button state
    const[buttonOff, setButtonOff]=useState(true)
    
    //setPost State
    const[post, setPost] = useState([])
    
    
    //onChange function
    const inputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.type==='checkbox' ? e.target.checked : e.target.value})
    }
    
    //onSubmit function
    const formSubmit = (e) => {
        e.preventDefault()
        axios.post("https://reqres.in/api/users" , user)
        .then(response => {
            console.log("response", response)
            setPost(response.data)
            setUser({
                name: '',
                email: '',
                password: '',
                terms: false
            })
        }).catch((err) => console.log(err.response))
    }   
    

    console.log('userState' , user)
    return (
        <form onSubmit={formSubmit}>
            <label htmlFor='name'>Name
                <input
                    id='name'
                    type='text'
                    name='name'
                    value={user.name}
                    onChange={inputChange}
                />
            </label>
            <label htmlFor='email'>Email
                <input
                    id='email'
                    type='email'
                    name='email'
                    value={user.email}
                    onChange={inputChange}
                />
            </label>
            <label htmlFor='password'>Password
                <input
                    id='password'
                    type='password'
                    name='password'
                    value={user.password}
                    onChange={inputChange}
                />
            </label>
            <label htmlFor='terms' className="terms">
                <input
                    type='checkbox'
                    id='terms'
                    name='terms'
                    checked={user.terms}
                    onChange={inputChange}
                />Terms & Conditions
            </label>
            <button type="submit">
                Submit
            </button>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </form>
    )
}

export default Form
