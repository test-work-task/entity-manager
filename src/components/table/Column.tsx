import {FC} from 'react'
import { useAppDispatch } from '../../core/hooks/reduxHook';
import { setCurentEntityIndex } from '../../core/store/slices/entitiesSlice';
import { IEntity } from '../../core/interfaces/entity.interface';
import styles from './Column.module.scss';
import classNames from 'classnames';

interface ColumnProps {
    entity: IEntity
    index: number
}

const Column: FC<ColumnProps> = ({entity, index}) => {
    const dispatch = useAppDispatch();
    const editEntity = () => {
        dispatch(setCurentEntityIndex({index}));
    }

    return (
        <>
            <div className={styles.value}>{index + 1}</div>
            <div className={styles.value}>{entity.name}</div>
            <div className={classNames(styles.value, styles.coordinate)}>
                <div>{`X: ${entity.coordinate[0]}`}</div> 
                <div>{`Y: ${entity.coordinate[1]}`}</div>
            </div>
            <div className={styles.value} style={{paddingRight: 30}}>
                {entity.labels.join(", ")}
                <button type='button' className={styles.edit} onClick={editEntity}/>
            </div>
        </>
    )
}

export default Column