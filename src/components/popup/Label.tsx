import {FC} from 'react'
import styles from './Label.module.scss';

interface LabelProps {
    className: string
    value: string
    index: number
    setLabels: React.Dispatch<React.SetStateAction<string[]>>
}

const Label: FC<LabelProps> = ({className, value, index, setLabels}) => {
    const removeLabel = () => {
        setLabels(prev => [...prev].filter((_, i) => i !== index))
    }
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setLabels(prev => [...prev].map((item, i) =>{
            if(i === index) {
                item = evt.target.value
            }
            return item;
        }))
    }
    return (
        <div className={styles.wrapper}>
            <input
                required
                className={className}
                type="text"
                name="label"
                value={value}
                minLength={2}
                maxLength={30}
                placeholder='Label'
                style={{
                    width: '90%'
                }}
                onChange={handleChange}
            />
            <button
                className={styles.remove}
                type='button'
                onClick={removeLabel}
            >
                <span />
            </button>
        </div>
    )
}

export default Label