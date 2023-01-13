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
      // pass
      break;
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

  return <TILContext.Provider value={{ tils, onShowTILByGroup }}>{children}</TILContext.Provider>;
};

export default TILProvider;
