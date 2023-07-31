interface User {
  name: string;
  userId: string;
  email: string;
  friends: string[];
}

interface SearchType {
  userId: string;
  found: boolean;
}

interface FriendType {
  friendId: string;
  friendName: string;
}
