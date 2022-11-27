import update from 'immutability-helper';
import type {FC} from 'react';
import {useCallback, useState} from 'react';

import {Draggable} from './Draggable';

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

export const Container: FC = () => {
  {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: 'Write a cool JS library',
      },
      {
        id: 2,
        text: 'Make it generic enough',
      },
      {
        id: 3,
        text: 'Write README',
      },
      {
        id: 4,
        text: 'Create some examples',
      },
      {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      },
      {
        id: 6,
        text: '???',
      },
      {
        id: 7,
        text: 'PROFIT',
      },
    ]);

    const move = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })
      );
    }, []);

    return (
      <>
        <div
          className={`max-w-[20rem] w-full border-2 p-2 flex flex-col gap-2`}
        >
          {cards.map((card: {id: number; text: string}, index: number) => {
            return (
              <Draggable key={card.id} index={index} id={card.id} move={move}>
                <div className="min-h-[10rem] border-2 p-2">
                  <h3 className="font-bold text-lg">{card.text}</h3>
                  <p className="break-words line-clamp-5 font-noto">
                    ジョバンニもカムパネルラもいっしょに行けるのだああぼくはそのひとのために、僕のお母さんのために祈っているのでした。そしてカムパネルラもまた、そんなにして何か思い出そうとして戻ろうとしましたら、向こうの鼠いろの切符を出しました。さそりは一生けん命で甲板の格子になったみじかい芝草の中にかくれたようでした。それはだんだんはっきりして、そっちの方へ歩き出しました。そしてこれからなんでもいつでも私のとこへ行くんですジョバンニは、走ってその渚に行ってすっかりとまりました。
                  </p>
                </div>
              </Draggable>
            );
          })}
        </div>
      </>
    );
  }
};
