import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@testing-library/react-hooks';

import useLifestyleList from './useLifestyleList';

import dummyData1 from '~src/__fixtures__/lifestyle1.json';
import dummyData2 from '~src/__fixtures__/lifestyle2.json';
import dummyData3 from '~src/__fixtures__/lifestyle3.json';

const queryClient = new QueryClient();

const getUrlByPage = (page: number) =>
  `https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards/page_${page}.json`;

beforeAll(() => {
  global.fetch = jest.fn().mockImplementation(
    (page: any) =>
      Promise.resolve({
        json: () => {
          switch (page) {
            case getUrlByPage(1):
              return Promise.resolve(dummyData1);
            case getUrlByPage(2):
              return Promise.resolve(dummyData2);
            case getUrlByPage(3):
              return Promise.resolve(dummyData3);
          }
        },
      }) as any,
  );
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('Feature : 무한스크롤을 위한 lifestyle 데이터 모듈화, 추상화 Hook', () => {
  const makeWrapper = (): React.FunctionComponent => ({ children }: { children?: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const sleep = (seconds: number) => new Promise((r) => setTimeout(r, seconds * 1000));

  describe('Scenario : 모듈화한 lifestyle 데이터를 관리할 수 있다.', () => {
    test('lifestyle 데이터를 읽을 수 있다', async () => {
      const { result } = renderHook(() => useLifestyleList(), {
        wrapper: makeWrapper(),
      });

      expect(result.current.status).toEqual('loading');

      await sleep(1.5);

      expect(result.current.status).toEqual('success');
      expect(result.current.data.pages.length).toBeTruthy();
    });

    test('다음 페이지의 데이터들을 가져올 수 있다.', async () => {
      const { result } = renderHook(() => useLifestyleList(), {
        wrapper: makeWrapper(),
      });

      const page1 = result.current.data.pages;
      expect(result.current.status).toEqual('success');
      expect(result.current.data.pages.length).toBeTruthy();

      act(() => {
        result.current.fetchNextPage({ pageParam: result.current.data.pages.length + 1 });
      });

      await sleep(1.5);
      const page2 = result.current.data.pages;
      expect(page1.length < page2.length).toBeTruthy();
    });
  });

  // describe('Scenario : 북마크 추가, 제거 기능으로 북마크한 데이터들을 관리 할 수 있다.', () => {
  //   test(`
  //     Given : 인덱스로 북마크 데이터를 추가 or 제거 할 수 있다.
  //     When : addBookmark 매서드로 인덱스 값을 실행 할 수 있다.
  //     Then : 북마크 데이터에 해당 인덱스 값이 추가 or 제거된다.
  //   `, async () => {
  //     const { result } = renderHook(() => useLifestyleList(), {
  //       wrapper: makeWrapper(),
  //     });

  //     await sleep(1.5);

  //     expect(result.current.status).toEqual('success');
  //     expect(result.current.data.pages.length).toBeTruthy();

  //     act(() => {
  //       result.current.addBookmark(0);
  //       result.current.addBookmark(1);
  //       result.current.addBookmark(2);
  //     });
  //     expect(result.current.bookmarks.has(0)).toBeTruthy();
  //     expect(result.current.bookmarks.has(1)).toBeTruthy();
  //     expect(result.current.bookmarks.has(2)).toBeTruthy();

  //     act(() => {
  //       result.current.removeBookmark(0);
  //     });
  //     expect(result.current.bookmarks.has(0)).toBeFalsy();
  //     expect(result.current.bookmarks.has(1)).toBeTruthy();
  //     expect(result.current.bookmarks.has(2)).toBeTruthy();
  //   });
  // });
});
