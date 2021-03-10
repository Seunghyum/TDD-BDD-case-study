import React, { useState } from 'react';

import Container from '~src/components/Container';
import BookmarksContainer from '~src/containers/BookmarksContainer';
import LifestyleCardListContainer from '~src/containers/LifestyleCardListContainer';

const ListPage: React.FC = () => {
  const [isOnlyBookmarks, setIsOnlyBookmarks] = useState(false);

  const handleBookmarkFilter = () => {
    setIsOnlyBookmarks((prev) => !prev);
  };

  return (
    <Container>
      <button onClick={handleBookmarkFilter}>북마크만</button>
      {isOnlyBookmarks ? <BookmarksContainer /> : <LifestyleCardListContainer />}
    </Container>
  );
};

export default ListPage;
