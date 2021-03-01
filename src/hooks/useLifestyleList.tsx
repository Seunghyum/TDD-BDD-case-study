import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { useState } from 'react';

export const INFINITE_LIFESTYLE = 'INFINITE_LIFESTYLE';

type UseLifestyleListReturn = {
  bookmarks: Set<number | number[]>;
  addBookmark: (index: number) => void;
  removeBookmark: (index: number) => void;
};

type LifestyleData = {
  id?: number;
  image_url?: string;
  nickname?: string;
  profile_image_url?: string;
  description?: string;
};

function useLifestyleList(): UseInfiniteQueryResult<LifestyleData[], Error> & UseLifestyleListReturn {
  const [bookmarks, setBookmarks] = useState<Set<number | number[]>>(new Set([]));

  const result = useInfiniteQuery(
    INFINITE_LIFESTYLE,
    (key, nextPageOffset = 1) =>
      fetch(`https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards/page_${nextPageOffset}.json`)
        .then((res) => res.json())
        .catch((err) => new Error(err)),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    },
  ) as UseInfiniteQueryResult<LifestyleData[], Error>;

  const addBookmark = (index: number) => {
    if (bookmarks.has(index)) console.log('이미 추가된 인덱스입니다.');
    else setBookmarks((prev) => new Set([...prev, index]));
  };

  const removeBookmark = (index: number) => {
    if (bookmarks.has(index))
      setBookmarks((prev) => {
        prev.delete(index);
        return new Set([...prev]);
      });
  };

  return { ...result, bookmarks, addBookmark, removeBookmark };
}

export default useLifestyleList;
