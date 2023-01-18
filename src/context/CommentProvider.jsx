import { createComment, deleteComment } from '@/api/comment';
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
    case 'DELETE_COMMENT': {
      return state.filter((item) => item._id !== action.payload._id);
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
    return payload;
  }, []);

  const onDeleteComment = useCallback(async (data) => {
    const payload = await deleteComment(data);
    dispatch({ type: 'DELETE_COMMENT', payload });
  }, []);

  const onUpdateComment = useCallback(async (data, id) => {
    let payload = await deleteComment(id);
    dispatch({ type: 'DELETE_COMMENT', payload });

    payload = await createComment(data);
    dispatch({ type: 'CREATE_COMMENT', payload });
  }, []);

  return (
    <CommentContext.Provider value={{ comments, onInitComment, onCreateComment, onDeleteComment, onUpdateComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
