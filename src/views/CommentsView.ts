import Comments from '../app/models/Comments';

export default {
  render(comment: Comments) {
    return {
      name: comment.name,
      comment: comment.comment,
      colorIcon: comment.colorIcon,
    };
  },

  renderMany(comments: Comments[]) {
    return comments.map((comment) => this.render(comment));
  },
};
