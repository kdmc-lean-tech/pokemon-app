import { createReducer, on, Action } from '@ngrx/store';
import { UserChat } from 'src/app/models/user.model';
import { resetUsers, setSocketUser, setUsers } from '../actions/chat.actions';
import { ChatState } from '../models/chat.model';

const initialState: ChatState = {
  users: [],
  page: 1
};

// tslint:disable-next-line: variable-name
const _chatReducer = createReducer(initialState,
  on(setUsers, (state, { users, page }) => {
    const results = insertNewSocketUsers([...state.users], users);
    return {
      ...state,
      users: results,
      page
    };
  }),
  on(resetUsers, (state) => {
    return {
      ...state,
      page: 1,
      users: [],
    }
  }),
  on(setSocketUser, (state, { user }) => {
    const users = insertNewSocketUser(user, [...state.users]);
    return {
      ...state,
      users
    }
  })
);

export function chatReducer(state: ChatState, action: Action) {
  return _chatReducer(state, action);
}

const insertNewSocketUsers = (users: UserChat[], newUsers: UserChat[]): UserChat[] => {
  const result = filteredArr([...users, ...newUsers]);
  return result;
}

const filteredArr = (arr: UserChat[]): UserChat[] => arr.reduce((acc, current) => {
  const x = acc.find(item => JSON.stringify(item) === JSON.stringify(current));
  if (!x) {
    return acc.concat([current]);
  } else {
    return acc;
  }
}, []);

const insertNewSocketUser = (
  user: UserChat,
  usersState: UserChat[]
) => {
  const userToSearch = usersState.find(u => u._id === user._id);
  if (userToSearch) {
    const index = usersState.indexOf(userToSearch);
    const userToSet: UserChat = {
      _id: user._id,
      name: user.name,
      avatar: userToSearch.avatar,
      totalMessages: user.totalMessages,
      online: user.online 
    }
    usersState.splice(index, 1, userToSet);
  } else {
    usersState.push(user);
  }
  return usersState;
}
