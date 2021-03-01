import React, { ReactElement } from 'react';
import styled from 'styled-components';

import LifestyleCard from '~src/components/LifestyleCard';

import useLifestyleList from '~src/hooks/useLifestyleList';

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

function CardList(): ReactElement {
  const { status, data, bookmarks, addBookmark, removeBookmark } = useLifestyleList();

  const handleBookmarkButton = (index: number) => {
    if (bookmarks.has(index)) removeBookmark(index);
    else addBookmark(index);
    alert(bookmarks.size);
  };

  return (
    <>
      <CardListBlock>
        {status === 'loading' ? (
          <LoadingBlock>로딩중...</LoadingBlock>
        ) : status === 'success' ? (
          data.pages.map((page) =>
            page.map((d, index) => (
              <LifestyleCard
                key={d.id}
                imageUrl={d.image_url}
                nickname={d.nickname}
                profileImageUrl={d.profile_image_url}
                isBookmarked={bookmarks.has(index)}
                onClick={() => handleBookmarkButton(index)}
              />
            )),
          )
        ) : (
          <ErrorBlock>요청을 처리하는 도중에 오류가 발생했어요!</ErrorBlock>
        )}
      </CardListBlock>
    </>
  );
}

export default CardList;