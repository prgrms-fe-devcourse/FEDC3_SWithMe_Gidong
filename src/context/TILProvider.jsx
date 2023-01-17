import { useReducer, createContext, useContext } from 'react';
import { useCallback } from 'react';
import { getPostListByChannel } from '@/api/post';

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

const TILProvider = ({ children, handleCreateTIL }) => {
  const [tils, dispatch] = useReducer(reducer, []);

  const onShowTILByGroup = useCallback(async (channelId, offset, limit) => {
    const payload = await getPostListByChannel(channelId, offset, limit);
    dispatch({ type: 'SHOW_TILS', payload });
  }, []);

  const onCreateTIL = useCallback(
    async (formData) => {
      const payload = await handleCreateTIL(formData);
      dispatch({ type: 'ADD_TIL', payload });
    },
    [handleCreateTIL],
  );

  return <TILContext.Provider value={{ tils, onShowTILByGroup, onCreateTIL }}>{children}</TILContext.Provider>;
};

export default TILProvider;
