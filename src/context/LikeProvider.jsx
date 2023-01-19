import { createLike, deleteLike } from '@/api/like';
import { createContext, useCallback, useContext, useReducer } from 'react';

const LikeContext = createContext();
export const useLikeContext = () => useContext(LikeContext);

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_LIKES': {
      return action.payload;
    }
    case 'CREATE_LIKE': {
      return [...state, action.payload];
    }
    case 'DELETE_LIKE': {
      return state.filter((item) => item._id !== action.payload._id);
    }
    default: {
      console.error('Wrong type');
      break;
    }
  }
};

const LikeProvider = ({ children }) => {
  const [likes, dispatch] = useReducer(reducer, []);

  const onInitLike = useCallback((initialLikes = []) => {
    dispatch({ type: 'INIT_LIKES', payload: initialLikes });
  }, []);

  const onCreateLike = useCallback(async (data) => {
    const payload = await createLike(data);
    dispatch({ type: 'CREATE_LIKE', payload });
    return payload;
  }, []);

  const onDeleteLike = useCallback(async (data) => {
    const payload = await deleteLike(data);
    dispatch({ type: 'DELETE_LIKE', payload });
    return payload;
  }, []);

  return (
    <LikeContext.Provider value={{ likes, onInitLike, onCreateLike, onDeleteLike }}>{children}</LikeContext.Provider>
  );
};

export default LikeProvider;
