type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar?: string;
  password?: string;
};

type Action<T> = {
  type: string;
  payload: T;
};

type Reducer<T> = (state: T, action: Action<T>) => T;

type LeaderboardApiResponse = {
  data: User & { score: number };
}[];
