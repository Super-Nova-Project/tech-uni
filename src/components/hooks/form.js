import {useState} from 'react';

const useForm = (callback) => {
    const [values, setValues] = useState({});

    const handleSubmit = (e) => {
        // after submitting my form
        e.preventDefault();
        e.target.reset();
        callback(values);
    }

    const handleChange = (e) => {
        // updating the state 
        // for field name that I am changing on add/update 
        // with the new value
        setValues({...values, [e.target.name]: e.target.value});
    }
    return [handleSubmit, handleChange, values];
}

export default useForm;