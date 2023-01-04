import { useState } from 'react'
import {omit} from 'lodash'
function useRegisterForm(callback) {

    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        event.persist()
        let name = event.target.name
        let val = event.target.value
        validate(event,name,val);
        

        setValues({
            ...values,
            [name]: val
        })

        console.log(`values -> ${JSON.stringify(values)}`)
        console.log(`errors -> ${JSON.stringify(errors)}`)
    }

    const handleSubmit = (event) => {
        if(event) event.preventDefault()
   
        if(Object.keys(errors).length === 0 && Object.keys(values).length !== 0){
            callback()
        }else{
            console.log('There is an Error')
        }

    }

    const validate = (event, name, value) => {
        switch (name) {
            case 'firstname':
                if(!new RegExp(/^[a-zA-Z]+$ /,'i').test(value)){
                    setErrors({
                        ...errors,
                        firstname:'not a valid firstname'
                    })
                }else{
                    let newObj = omit(errors, 'firstname')
                    setErrors(newObj)
                }
                break
            case 'lastname':
                if(!new RegExp(/^[a-zA-Z]+$/,'i').test(value)){
                    setErrors({
                        ...errors,
                        firstname:'not a valid lastname'
                    })
                }else{
                    let newObj = omit(errors, 'lastname')
                    setErrors(newObj)
                }
                break
            case 'email':
                if(!new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value)){
                    setErrors({
                        ...errors,
                        email:'not a valid email address'
                    })
                }else{
                    let newObj = omit(errors, 'email')
                    setErrors(newObj)
                }
                break
            case 'password':
                if(!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)){
                    setErrors({
                        ...errors,
                        password:'Password should contains atleast 8 charaters and containing uppercase,lowercase and numberss'
                    })
                }else{
                    let newObj = omit(errors, 'password')
                    setErrors(newObj)
                }
                break
            case 'confirmPassword':
                if(value !== values.password){
                    setErrors({
                        ...errors,
                        confirmPassword:'passwords do not match'
                    })
                }else{
                    let newObj = omit(errors, 'confirmPassword')
                    setErrors(newObj)
                }
                break
            default:
                break
        }
    }

    return {
        values,
        errors,
        handleChange,
        handleSubmit
    }


}

export default useRegisterForm