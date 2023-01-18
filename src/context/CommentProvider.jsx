import { createComment } from '@/api/comment';
import { createContext, useCallback, useContext, useReducer } from 'react';

const CommentContext = createContext();
export const useCommentContext = () => useContext(CommentContext);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_COMMENTS': {
      return action.payload;
    }
    case 'CREATE_COMMENT': {
      return [...state, action.payload];
    }
    default: {
      console.error('Wrong type');
      break;
    }
  }
};

const CommentProvider = ({ children }) => {
  const [comments, dispatch] = useReducer(reducer, []);

  const onInitComment = useCallback((initialComments = []) => {
    dispatch({ type: 'SHOW_COMMENTS', payload: initialComments });
  }, []);

  const onCreateComment = useCallback(async (data) => {
    const payload = await createComment(data);
    dispatch({ type: 'CREATE_COMMENT', payload });
  }, []);

  return (
    <CommentContext.Provider value={{ comments, onInitComment, onCreateComment }}>{children}</CommentContext.Provider>
  );
};

export default CommentProvider;
