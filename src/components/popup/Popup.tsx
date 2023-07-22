import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../core/hooks/reduxHook';
import { useForm } from '../../core/hooks/useForm';
import { IEntity } from '../../core/interfaces/entity.interface';
import styles from './Popup.module.scss';
import Label from './Label';
import Add from '../buttons/Add';
import { deleteEntity } from '../../core/store/slices/entitiesSlice';

interface PopupProps {
  isOpen: boolean
  handleClose: () => void
  handleSubmit: (entity: IEntity) => void
  initialState: IEntity
  title: string
  loading: boolean
}

const Popup: FC<PopupProps> = ({ isOpen, handleClose, handleSubmit, initialState, title, loading }) => {
  const dispatch = useAppDispatch();
  const [labels, setLabels] = useState<string[]>([])
  const { values, handleChange, setValues } = useForm();

  const handleDelete = () => {
    if (!initialState._id) return;
    dispatch(deleteEntity(initialState._id))
    handleClose()
  };

  useEffect(() => {
    setValues({
      name: initialState.name,
      coordinateX: initialState.coordinate[0],
      coordinateY: initialState.coordinate[1],
      label: initialState.labels[0]
    });
    setLabels(initialState.labels.slice(1))
  }, [isOpen])


  const addLabel = () => {
    setLabels([...labels, ''])
  }

  function onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    handleSubmit({
      name: values.name,
      coordinate: [values.coordinateX, values.coordinateY],
      labels: [values.label, ...labels],
      _id: initialState._id
    })
  }
  return (
    <div
      className={classNames(styles.popup, { [styles.open]: isOpen })}
      onClick={handleClose}
    >
      <div
        className={styles.container}
        onClick={(evt) => evt.stopPropagation()}
      >
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.close}>
          <Add
            handleClick={handleClose}
            width={50}
            height={50}
          />
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <p className={styles.label}>Name</p>
          <input
            required
            className={styles.input}
            type="text"
            name="name"
            value={values.name || ''}
            minLength={2}
            maxLength={30}
            placeholder='Name'
            onChange={handleChange}
          />
          <p className={styles.label}>Coordinate</p>
          <div className={styles.coordinate}>
            <input
              required
              className={styles.input}
              type="number"
              name="coordinateX"
              value={values.coordinateX || ''}
              placeholder='Coordinate X'
              onChange={handleChange}
            />
            <input
              required
              className={styles.input}
              type="number"
              name="coordinateY"
              value={values.coordinateY || ''}
              placeholder='Coordinate Y'
              onChange={handleChange}
            />
          </div>
          <p className={styles.label}>Labels</p>
          <input
            required
            className={styles.input}
            type="text"
            name="label"
            value={values.label || ''}
            minLength={2}
            maxLength={30}
            placeholder='Label'
            onChange={handleChange}
          />
          {labels && labels.map((label, index) => (
            <Label
              key={index}
              index={index}
              className={styles.input}
              value={label}
              setLabels={setLabels}
            />
          ))}
          <Add
            handleClick={addLabel}
            width={45}
            height={30}
          />
          <button
            className={classNames(styles.button, { [styles.loading]: loading })}
            disabled={loading}
          >
            Save
          </button>
          {title === 'Edit Entity' && (
            <button
              className={classNames(styles.button, styles.delete)}
              onClick={handleDelete}
              type='button'
            >
              Delete
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default Popup