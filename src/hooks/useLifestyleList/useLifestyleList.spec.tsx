import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@testing-library/react-hooks';

import useLifestyleList from './useLifestyleList';

import dummyData1 from './fixtures/dummy1.json';
import dummyData2 from './fixtures/dummy2.json';

const unmockedFetch = global.fetch;
const queryClient = new QueryClient();

beforeAll(() => {
  global.fetch = (page: any) =>
    Promise.resolve({
      json: () => {
        switch (page) {
          case 1:
            return Promise.resolve(dummyData1);
          case 2:
            return Promise.resolve(dummyData2);
        }
      },
    }) as Promise<Response>;
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe('Feature : lifestyle 데이터 모듈화, 추상화', () => {
  const makeWrapper = (): React.FunctionComponent => ({ children }: { children?: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const sleep = (seconds: number) => new Promise((r) => setTimeout(r, seconds * 1000));

  test('Scenario : 모듈화한 lifestyle 데이터를 가져올 수 있다', async () => {
    const { result } = renderHook(() => useLifestyleList(), {
      wrapper: makeWrapper(),
    });

    expect(result.current.status).toEqual('loading');

    await sleep(1.5);

    expect(result.current.status).toEqual('success');
    expect(result.current.data.pages.length).toBeTruthy();
  });

  describe('Scenario : 북마크 추가, 제거 기능으로 북마크한 데이터들을 관리 할 수 있다.', () => {
    test(`
      Given : 인덱스로 북마크 데이터를 추가 or 제거 할 수 있다.
      When : addBookmark 매서드로 인덱스 값을 실행 할 수 있다.
      Then : 북마크 데이터에 해당 인덱스 값이 추가 or 제거된다.
    `, async () => {
      const { result } = renderHook(() => useLifestyleList(), {
        wrapper: makeWrapper(),
      });

      await sleep(1.5);

      expect(result.current.status).toEqual('success');
      expect(result.current.data.pages.length).toBeTruthy();

      act(() => {
        result.current.addBookmark(0);
        result.current.addBookmark(1);
        result.current.addBookmark(2);
      });
      expect(result.current.bookmarks.has(0)).toBeTruthy();
      expect(result.current.bookmarks.has(1)).toBeTruthy();
      expect(result.current.bookmarks.has(2)).toBeTruthy();

      act(() => {
        result.current.removeBookmark(0);
      });
      expect(result.current.bookmarks.has(0)).toBeFalsy();
      expect(result.current.bookmarks.has(1)).toBeTruthy();
      expect(result.current.bookmarks.has(2)).toBeTruthy();
    });
  });
});
