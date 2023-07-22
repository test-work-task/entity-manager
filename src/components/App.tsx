import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../core/hooks/reduxHook';
import { addEntity, editEntity, fetchEntities, setCurentEntityIndex } from '../core/store/slices/entitiesSlice';
import { IEntity } from '../core/interfaces/entity.interface';
import Popup from './popup/Popup';
import Table from './table/Table';
import Add from './buttons/Add';
import Chart from './chart/Chart';

function App() {
  const dispatch = useAppDispatch();
  const entities = useAppSelector(state => state.entities.entities);
  const status = useAppSelector(state => state.entities.status);
  const curentEntityIndex = useAppSelector(state => state.entities.curentEntityIndex)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if(status === null) {
      dispatch(fetchEntities())
    }
  }, [])
  

  const createEntity = async (entity: IEntity) => {
    dispatch(addEntity(entity))
      .then(() => setIsOpen(false))
  };

  const editCurentEntity = (entity: IEntity) => {
    dispatch(editEntity(entity))
      .then(() => resetCurentIndex())
  }

  const resetCurentIndex = () => {
    dispatch(setCurentEntityIndex({ index: null }));
  }

  return (
    <>
      <Table {...{ entities }} />
      <Add
        handleClick={() => setIsOpen(true)}
        width={70}
        height={50}
      />
      <Chart {...{entities}} />
      <Popup
        loading={status === 'loading' ? true: false }
        handleClose={() => setIsOpen(false)}
        title='New Entity'
        handleSubmit={createEntity}
        isOpen={isOpen}
        initialState={{
          name: '',
          coordinate: ['', ''],
          labels: ['']
        }}
      />
      {curentEntityIndex !== null && (
        <Popup
          loading={status === 'loading'}
          title='Edit Entity'
          handleClose={resetCurentIndex}
          handleSubmit={editCurentEntity}
          isOpen={curentEntityIndex !== null}
          initialState={entities[curentEntityIndex]}
        />
      )}
    </>
  );
}

export default App;
