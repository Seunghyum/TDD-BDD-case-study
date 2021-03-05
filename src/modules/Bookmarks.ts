import { LifestyleData } from '~src/hooks/useLifestyleList';

class Bookmarks {
  data: LifestyleData[];
  bookmarks: Set<number | number[]>;
  constructor() {
    this.data = [];
    this.bookmarks = new Set([]);
  }

  addBookmark(object: LifestyleData) {
    if (this.bookmarks.has(object.id)) console.log('이미 추가된 인덱스입니다.');
    else {
      this.bookmarks = new Set([...this.bookmarks, object.id]);
      this.data.push(object);
    }
  }

  removeBookmark(id: number) {
    if (this.bookmarks.has(id)) {
      this.bookmarks.delete(id);
      this.bookmarks = new Set([...this.bookmarks]);
      this.data.splice(
        this.data.findIndex((d) => d.id === id),
        1,
      );
      this.data = [...this.data];
    }
  }
}

export default new Bookmarks();
