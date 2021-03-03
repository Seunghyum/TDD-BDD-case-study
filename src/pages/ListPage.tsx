import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '~src/components/Container';
import BookmarksContainer from '~src/containers/BookmarksContainer';
import LifestyleCardListContainer from '~src/containers/LifestyleCardListContainer';

const CardListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 0 -10px;
`;

const ListPage: React.FC = () => {
  const [isOnlyBookmarks, setIsOnlyBookmarks] = useState(false);

  const handleBookmarkFilter = () => {
    setIsOnlyBookmarks((prev) => !prev);
  };

  return (
    <Container>
      <button onClick={handleBookmarkFilter}>북마크만</button>
      <CardListBlock>{isOnlyBookmarks ? <BookmarksContainer /> : <LifestyleCardListContainer />}</CardListBlock>
    </Container>
  );
};

export default ListPage;
