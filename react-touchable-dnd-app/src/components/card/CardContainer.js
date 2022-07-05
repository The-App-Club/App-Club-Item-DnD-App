import { useState, useCallback } from 'react';
import { CardItem } from './CardItem';
import update from 'immutability-helper';
import styled from '@emotion/styled';
import data from '../../assets/data.json';

const StyledCardContainer = styled.div`
  width: 400px;
`;

const CardContainer = () => {
  const [cards, setCards] = useState(data.itemDataList);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );

  return (
    <StyledCardContainer>
      {cards.map((card, index) => {
        return (
          <CardItem
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
          />
        );
      })}
    </StyledCardContainer>
  );
};

export { CardContainer };
