import { FC } from 'react'
import styles from './buttons.module.scss';

interface AddProps {
    handleClick: () => void
    width: number,
    height: number
}

const Add: FC<AddProps> = ({ handleClick, width, height }) => {
    return (
        <button
            className={styles.add}
            style={{ width, height }}
            type='button'
            onClick={handleClick}
        >
            <span />
        </button>
    )
}

export default Add