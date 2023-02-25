interface IUserLogin {
  username: string;
  password: string;
}

interface IUserRegister {
  username: string;
  first_name?: string;
  last_name?: string;
  date_of_birth: Date;
  email: string;
}

interface IUser {
  id: number;
  username: string;
  email?: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  is_deleted: false;
  role?: string;
  created_at: Date;
  updated_at: Date;
}

interface ICreatePost {
  title: string;
  body: string;
  contents: Array<{
    alt: string;
    src: string;
    content_type: string;
  }>
}

interface IPost {
  id: number,
  user_id: number,
  title: string,
  body: string,
  view: number,
  like: number,
  dislike: number,
  rating: number,
  created_at: date,
  updated_at: date,
  is_deleted: boolean,
  content?: Array<Content>
}

interface Content {
  id: number,
  post_id: number,
  alt: string,
  src: string,
  content_type: string,
  view: number,
  like: number,
  dislike: number,
  rating: number,
  created_at: date,
  updated_at: date,
  is_deleted: boolean,
  post?: Post
}