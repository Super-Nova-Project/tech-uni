import {useState} from 'react';
import signUp from '../../features/reducers/signUp';
import { useDispatch } from 'react-redux';

const useForm = (callback) => {
    const [values, setValues] = useState({});

    const handleSubmit = (e) => {
        // after submitting my form
        e.preventDefault();
        console.log('inside')
        callback(values);
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }
    return [handleSubmit, handleChange, values];
}

export default useForm;