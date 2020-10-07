import React, { useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'

const Form = () => {



    return (
        <form>
            <lable htmlFor='name'>Name
                <input
                    id='name'
                    type='text'
                    name='name'
                />
            </lable>
            <lable htmlFor='email'>Email
                <input
                    id='email'
                    type='email'
                    name='email'
                />
            </lable>
            <lable htmlFor='password'>Password
                <input
                    id='password'
                    type='password'
                    name='password'
                />
            </lable>
            <label htmlFor='terms' className="terms">Terms & Conditions
                <input
                    type='checkbox'
                    id='terms'
                    name='terms'
                />
            </label>
            <button type="submit">
                Submit
            </button>
        </form>
    )
}

export default Form
