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
  created_at: Date;
  date_of_birth: Date;
  email: string;
  first_name: string;
  id: number;
  is_deleted: false;
  last_name: string;
  role: string;
  updated_at: Date;
  username: string;
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
