import { useReducer, useEffect, createContext, useContext, useState } from 'react';
import { setItem, getItem } from '@/utils/storage';

const GroupContext = createContext();
export const useGroupContext = () => useContext(GroupContext);

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_GROUPS': {
      return action.payload;
    }
    case 'ADD_GROUP': {
      // pass
      break;
    }
    case 'UPDATE_GROUP': {
      // pass
      break;
    }
    case 'DELETE_GROUP': {
      // pass
      break;
    }
    default: {
      console.error('Wrong type');
      break;
    }
  }
};

const GroupProvider = ({ children, initialGroups }) => {
  const [groups, dispatch] = useReducer(reducer, initialGroups);
  const [openedGroupId, setOpenedGroupId] = useState(getItem('openedGroupId'));

  useEffect(() => {
    dispatch({ type: 'INIT_GROUPS', payload: initialGroups || [] });
  }, [initialGroups]);

  useEffect(() => {
    setItem('openedGroupId', openedGroupId);
  }, [openedGroupId]);

  return <GroupContext.Provider value={{ groups, openedGroupId, setOpenedGroupId }}>{children}</GroupContext.Provider>;
};

export default GroupProvider;
