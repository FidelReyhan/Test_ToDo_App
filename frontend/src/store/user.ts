import { create } from "zustand";

type User = {
  id: number;
  username: string;
  password: string;
};

type UserStore = {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: number) => void;
  findUser: (username: string, password: string) => User | null;
};

const useUserStore = create<UserStore>()((set, get) => ({
  users: [
    {
      id: 1,
      username: "user1",
      password: "password1",
    },
    {
      id: 2,
      username: "user2",
      password: "password2",
    },
  ],
  addUser: async (user) => {
    const newUser = {
      ...user,
      id: new Date().getTime(), // Generate a unique ID based on timestamp
    };
    set((state) => ({
      users: [...state.users, newUser],
    }));
  },
  removeUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
  findUser: (username, password) => {
    const user = get().users.find(
      (user) => user.username === username && user.password === password
    );
    return user || null;
  },
}));

export { useUserStore };
export type { User };
