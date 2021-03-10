import React from 'react';

import LifestyleCard from '~src/components/LifestyleCard';
import { LifestyleData } from '~src/hooks/useLifestyleList';
import Bookmarks from '~src/modules/Bookmarks';

const BookmarksContainer: React.FC = () => {
  const handleBookmarkButton = (ld: LifestyleData) => {
    if (Bookmarks.bookmarks.has(ld.id)) Bookmarks.removeBookmark(ld.id);
    else Bookmarks.addBookmark(ld);
    alert(Bookmarks.bookmarks.size);
  };

  return (
    <>
      {Bookmarks.data.map((d) => (
        <LifestyleCard
          key={d.id}
          imageUrl={d.image_url}
          nickname={d.nickname}
          profileImageUrl={d.profile_image_url}
          isBookmarked={Bookmarks.bookmarks.has(d.id)}
          onClick={() => handleBookmarkButton(d)}
        />
      ))}
    </>
  );
};

export default BookmarksContainer;
