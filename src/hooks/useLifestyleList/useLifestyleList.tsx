import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
// import { useState } from 'react';

export const INFINITE_LIFESTYLE = 'INFINITE_LIFESTYLE';

// type UseLifestyleListReturn = {
//   bookmarks: Set<number | number[]>;
//   addBookmark: (index: number) => void;
//   removeBookmark: (index: number) => void;
// };

export type LifestyleData = {
  id?: number;
  image_url?: string;
  nickname?: string;
  profile_image_url?: string;
  description?: string;
};

// function useLifestyleList(): UseInfiniteQueryResult<LifestyleData[], Error> & UseLifestyleListReturn {
function useLifestyleList(): UseInfiniteQueryResult<LifestyleData[], Error> {
  // const [bookmarks, setBookmarks] = useState<Set<number | number[]>>(new Set([]));

  // const result = useInfiniteQuery(
  return useInfiniteQuery(
    INFINITE_LIFESTYLE,
    ({ pageParam = 1 }) =>
      fetch(`https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards/page_${pageParam}.json`)
        .then((res) => res.json())
        .catch((err) => new Error(err)),
    {
      getNextPageParam: (lastPage, allPages) => {
        // 백엔드에서 값을 내려줄 때 전체 페이지, 현재 페이지를 주면 여기서 다음 페이지 / 이전 페이지가 있는지를 확인 후 로직을 수행하면 됨
        if (allPages.length < 4) return allPages.length + 1;
        else return false;
      },
      cacheTime: 3 * 60 * 1000,
    },
  ) as UseInfiniteQueryResult<LifestyleData[], Error>;

  // const addBookmark = (index: number) => {
  //   if (bookmarks.has(index)) console.log('이미 추가된 인덱스입니다.');
  //   else setBookmarks((prev) => new Set([...prev, index]));
  // };

  // const removeBookmark = (index: number) => {
  //   if (bookmarks.has(index))
  //     setBookmarks((prev) => {
  //       prev.delete(index);
  //       return new Set([...prev]);
  //     });
  // };

  // return { ...result, bookmarks, addBookmark, removeBookmark };
}

export default useLifestyleList;
