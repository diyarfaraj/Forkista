export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, titel, author, img) {
    const like = { id, titel, author, img };
    this.likes.push(like);

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    //[2,4,6] splice[1, 1] --> returns 4, and original array is mutated [2,6]
    //[2,4,6] slice[1, 1] --> returns 4, and original array is not mutated [2,4,6]
    this.likes.splice(index, 1);
  }

  isLiked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }
}
