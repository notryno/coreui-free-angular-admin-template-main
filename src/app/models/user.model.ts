export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: number;
  profilePictureFile: File;
  profilePicture: string;
}
