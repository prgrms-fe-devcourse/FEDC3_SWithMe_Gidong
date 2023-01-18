import { getItem, setItem } from '@/utils/storage';
import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';

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
      return {
        ...state,
        value: state.value.map((group) => (group._id === action.payload._id ? action.payload : group)),
      };
    }
    case 'DELETE_GROUP': {
      return { value: state.value.filter((item) => item._id !== action.payload._id), ...state.isLoading };
    }
    default: {
      console.error('Wrong type');
      break;
    }
  }
};

const GroupProvider = ({ children, initialGroups, handleCreateGroup, handleUpdateGroup, handleDeleteGroup }) => {
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

  const onUpdateGroup = useCallback(
    async (data) => {
      const payload = await handleUpdateGroup(data);
      dispatch({ type: 'UPDATE_GROUP', payload });
      return payload;
    },
    [handleCreateGroup],
  );

  const onDeleteGroup = useCallback(
    async (data) => {
      const payload = await handleDeleteGroup(data);
      dispatch({ type: 'DELETE_GROUP', payload });
    },
    [handleDeleteGroup],
  );

  return (
    <GroupContext.Provider
      value={{ groups, openedGroupId, setOpenedGroupId, onCreateGroup, onUpdateGroup, onDeleteGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;
