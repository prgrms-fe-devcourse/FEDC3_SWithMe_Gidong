import { createTIL, getPostListByChannel } from '@/api/post';
import { createContext, useCallback, useContext, useReducer } from 'react';

const TILContext = createContext();
export const useTILContext = () => useContext(TILContext);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_TILS': {
      return action.payload;
    }
    case 'ADD_TIL': {
      return [...state, action.payload];
    }
    case 'UPDATE_TIL': {
      // pass
      break;
    }
    case 'DELETE_TIL': {
      // pass
      break;
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

  const onCreateTIL = useCallback(async (formData) => {
    const payload = await createTIL(formData);
    dispatch({ type: 'ADD_TIL', payload });
  }, []);

  return <TILContext.Provider value={{ tils, onShowTILByGroup, onCreateTIL }}>{children}</TILContext.Provider>;
};

export default TILProvider;
