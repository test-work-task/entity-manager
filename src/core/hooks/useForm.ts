import { useState } from 'react'
import { IFormValues } from '../interfaces/form-values.interface';

export function useForm(inputValues = {} as IFormValues) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}