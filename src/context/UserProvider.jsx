import { postUserSignUp } from '@/api/userSign';
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_USERS': {
      return action.payload;
    }
    case 'CREATE_USER': {
      return { value: [...state.value, action.payload], ...state.isLoading };
    }
    default: {
      console.error('Wrong type');
      break;
    }
  }
};

const UserProvider = ({ children, initialUsers }) => {
  const [users, dispatch] = useReducer(reducer, initialUsers);

  useEffect(() => {
    dispatch({ type: 'INIT_USERS', payload: initialUsers || [] });
  }, [initialUsers]);

  const onCreateUser = useCallback(async (data) => {
    const payload = await postUserSignUp(data);
    dispatch({ type: 'CREATE_USER', payload });
  }, []);

  return <UserContext.Provider value={{ users: users.value, onCreateUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
