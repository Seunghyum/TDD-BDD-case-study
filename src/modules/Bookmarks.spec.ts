import Bookmarks from './Bookmarks';

describe('feature: 북마크 관리 ', () => {
  test('북마크 추가', () => {
    const testData = [
      {
        id: 1,
        nickname: 'test1',
      },
      {
        id: 2,
        nickname: 'test2',
      },
    ];
    testData.forEach(({ id, nickname }) => {
      Bookmarks.addBookmark({
        id,
        nickname,
      });
    });

    expect(Bookmarks.data.length).toEqual(2);
  });

  test('북마크 삭제', () => {
    Bookmarks.removeBookmark(1);

    expect(Bookmarks.data[0].id).toEqual(2);
  });
});
