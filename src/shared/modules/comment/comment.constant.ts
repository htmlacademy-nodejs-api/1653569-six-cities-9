export const DEFAULT_COMMENT_COUNT = 50;

export const CommentRoute = {
  ROOT: '/',
} as const;

export const CommentValidation = {
  comment: {
    minLength: 5,
    maxLength: 1024
  },
  rating: {
    min: 1,
    max: 5,
  }
};
