import React, { useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'

const Form = () => {
    // User State
    const[user, setUser] = useState ({
        name: '',
        email: '',
        password: '',
        terms: false,
    })

    //Button state
    const[buttonOff, setButtonOff]=useState(true)
      
    //Errors State
    const [errors, setErrors]=useState({
        name: '',
        email: '',
        password: '',
        terms: '', 
    })


    
    //onChange function
    const inputChange = (e) => {
        e.persist();
        lineSchema(e)
        setUser({...user, [e.target.name]: e.target.type==='checkbox' ? e.target.checked : e.target.value})
    }

     //setPost State - just to have the display come out at the bottom.  Not really needed.
    const[post, setPost] = useState([])   

    //onSubmit function
    const formSubmit = (e) => {
        e.preventDefault()
        axios.post("https://reqres.in/api/users" , user)
        .then(response => {
            console.log("response", response)
            setPost(response.data)// again, not really needed
            setUser({
                name: '',
                email: '',
                password: '',
                terms: false,
            })
        }).catch((err) => console.log(err.response))
    }  
    
    //  all yup coding below
    const schema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        email: yup.string("Must be a valid email").required("Must include email address"),
        password: yup.string().min(5).max(10).required("Must have a valid password"),
        terms: yup.boolean().oneOf([true], "Please agree to T&Cs")
    })

    useEffect(() => {
        schema.isValid(user).then((valid) => {
            setButtonOff(!valid)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const lineSchema = (e) => {
        yup.reach(schema, e.target.name)
        .validate(e.target.type==='checkbox' ? e.target.checked : e.target.value)
        .then((valid) => {
            setErrors({...errors, [e.target.name]: ''})
        }).catch((err) => {
            setErrors({...errors, [e.target.name]: err.errors[0]})
        })
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
                    data-cy="name"
                    onChange={inputChange}
                    placeholder="Enter First & Last Name"
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlFor='email'>Email
                <input
                    id='email'
                    type='email'
                    name='email'
                    data-cy="email"
                    value={user.email}
                    onChange={inputChange}
                    placeholder="Valid Email Address"
                />
                {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
            </label>
            <label htmlFor='password'>Password
                <input
                    id='password'
                    type='password'
                    name='password'
                    data-cy="password"
                    value={user.password}
                    onChange={inputChange}
                    placeholder="min 5 / max 10"
                />
                {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
            </label>
            <label htmlFor='terms' className="terms">
                <input
                    type='checkbox'
                    id='terms'
                    name='terms'
                    data-cy='terms'
                    checked={user.terms}
                    onChange={inputChange}
                />Terms & Conditions
                {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null}
            </label>
            <button type="submit" disabled={buttonOff} data-cy='submit'>
                Submit
            </button>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </form>
    )
}

export default Form
