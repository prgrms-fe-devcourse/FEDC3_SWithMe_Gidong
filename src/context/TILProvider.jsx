import { createTIL, deleteTIL, getPostListByChannel, getTIL, updateTIL } from '@/api/post';
import { createContext, useCallback, useContext, useReducer } from 'react';

const TILContext = createContext();
export const useTILContext = () => useContext(TILContext);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_TILS': {
      return action.payload;
    }
    case 'CREATE_TIL': {
      return [...state, action.payload];
    }
    case 'UPDATE_TIL': {
      return [...state.filter((item) => item._id !== action.payload._id), action.payload];
    }
    case 'DELETE_TIL': {
      return state.filter((item) => item._id !== action.payload._id);
    }
    default: {
      console.error('Wrong type');
      break;
    }
  }
};

const TILProvider = ({ children }) => {
  const [tils, dispatch] = useReducer(reducer, []);

  const onShowTILByGroup = useCallback(async (channelId, offset, limit) => {
    const payload = await getPostListByChannel(channelId, offset, limit);
    dispatch({ type: 'SHOW_TILS', payload });
  }, []);

  const onGetTIL = useCallback(async (id) => {
    const payload = await getTIL(id);
    return payload;
  }, []);

  const onCreateTIL = useCallback(async (formData) => {
    const payload = await createTIL(formData);
    dispatch({ type: 'CREATE_TIL', payload });
  }, []);

  const onUpdateTIL = useCallback(async (formData) => {
    const payload = await updateTIL(formData);
    dispatch({ type: 'UPDATE_TIL', payload });
    return payload;
  }, []);

  const onDeleteTIL = useCallback(async (data) => {
    const payload = await deleteTIL(data);
    dispatch({ type: 'DELETE_TIL', payload });
  }, []);

  return (
    <TILContext.Provider value={{ tils, onShowTILByGroup, onCreateTIL, onDeleteTIL, onUpdateTIL, onGetTIL }}>
      {children}
    </TILContext.Provider>
  );
};

export default TILProvider;
