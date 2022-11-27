import update from 'immutability-helper';
import type {FC} from 'react';
import {useCallback, useState} from 'react';
import {Draggable} from './Draggable';

export interface Column {
  id: number;
  name: string;
}

export interface ColumnContainerState {
  columns: Column[];
}

export const ColumnContainer: FC = () => {
  const [columns, setColumns] = useState([
    {
      id: 1,
      name: 'todo',
    },
    {
      id: 2,
      name: 'wip',
    },
    {
      id: 3,
      name: 'done',
    },
    {
      id: 4,
      name: 'merged',
    },
  ]);

  const move = useCallback((dragIndex: number, hoverIndex: number) => {
    setColumns((prevCards: Column[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Column],
        ],
      })
    );
  }, []);

  return (
    <div className={`max-w-full w-full border-2 p-2 flex gap-2`}>
      {columns.map((column: {id: number; name: string}, index: number) => {
        return (
          <Draggable key={column.id} index={index} id={column.id} move={move}>
            <div className="min-w-[25%] min-h-[30rem] w-full border-2 p-2">
              <h3 className="font-bold text-lg">{column.name}</h3>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};
