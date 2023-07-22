import { FC } from 'react';
import { IEntity } from '../../core/interfaces/entity.interface';
import Column from './Column';
import styles from './Table.module.scss';
import logo from '../../assets/images/logo.png';

interface TableProps {
  entities: IEntity[]
}

const Table: FC<TableProps> = ({entities}) => {
  return (
    <div className={styles.grid}>
      <div className={styles.label}>
        <img className={styles.logo} src={logo} alt='logo' />
      </div>
      <div className={styles.label}>Name</div>
      <div className={styles.label}>Coordinate</div>
      <div className={styles.label}>Labels</div>
      {entities && entities.map((entity, index) => (
        <Column
          key={entity._id}
          entity={entity}
          index={index}
        />
      ))}
    </div>
  );
};

export default Table;