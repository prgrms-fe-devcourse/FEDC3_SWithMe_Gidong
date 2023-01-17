import { useReducer, useEffect, createContext, useContext, useState, useCallback } from 'react';
import { setItem, getItem } from '@/utils/storage';

const GroupContext = createContext();
export const useGroupContext = () => useContext(GroupContext);

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_GROUPS': {
      return action.payload;
    }
    case 'CREATE_GROUP': {
      return { value: [...state.value, action.payload], ...state.isLoading };
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

const GroupProvider = ({ children, initialGroups, handleCreateGroup }) => {
  const [groups, dispatch] = useReducer(reducer, initialGroups);
  const [openedGroupId, setOpenedGroupId] = useState(getItem('openedGroupId'));

  useEffect(() => {
    dispatch({ type: 'INIT_GROUPS', payload: initialGroups || [] });
  }, [initialGroups]);

  useEffect(() => {
    setItem('openedGroupId', openedGroupId);
  }, [openedGroupId]);

  const onCreateGroup = useCallback(
    async (data) => {
      const payload = await handleCreateGroup(data);
      dispatch({ type: 'CREATE_GROUP', payload });
    },
    [handleCreateGroup],
  );

  return (
    <GroupContext.Provider value={{ groups, openedGroupId, setOpenedGroupId, onCreateGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;
