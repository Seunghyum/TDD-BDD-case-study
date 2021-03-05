import React from 'react';
import styled from 'styled-components';

import LifestyleCard from '~src/components/LifestyleCard';

import useIntersectionObserver from '~src/hooks/useIntersectionObserver';
import useLifestyleList, { LifestyleData } from '~src/hooks/useLifestyleList';

import Bookmarks from '~src/modules/Bookmarks';

const CardListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 0 -10px;
`;

const LoadingBlock = styled.div`
  width: 100%;
  text-align: center;
  padding: 80px 0;
`;

const ErrorBlock = styled.div`
  width: 100%;
  text-align: center;
  padding: 80px 0;
`;

const CardList: React.FC = () => {
  const { status, data, fetchNextPage, hasNextPage } = useLifestyleList();

  const handleBookmarkButton = (ld: LifestyleData) => {
    if (Bookmarks.bookmarks.has(ld.id)) Bookmarks.removeBookmark(ld.id);
    else Bookmarks.addBookmark(ld);
    alert(Bookmarks.bookmarks.size);
  };

  const loadMoreRef = React.useRef();

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <>
      {status === 'loading' ? (
        <LoadingBlock>로딩중...</LoadingBlock>
      ) : status === 'success' ? (
        <CardListBlock data-testid="infinite-scroll-container">
          {data.pages.map((page) =>
            page.map((d) => (
              <LifestyleCard
                key={d.id}
                imageUrl={d.image_url}
                nickname={d.nickname}
                profileImageUrl={d.profile_image_url}
                isBookmarked={Bookmarks.bookmarks.has(d.id)}
                onClick={() => handleBookmarkButton(d)}
              />
            )),
          )}
        </CardListBlock>
      ) : (
        <ErrorBlock>요청을 처리하는 도중에 오류가 발생했어요!</ErrorBlock>
      )}
      <div ref={loadMoreRef}></div>
    </>
  );
};

export default CardList;
