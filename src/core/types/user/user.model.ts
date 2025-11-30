export interface UserResponse {
  id: number | null;
  username: string;
  email: string;
  enabled: boolean;
  roles: string[];
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string | null;
  provider: string;
  hasPassword: boolean;
  profileImageUrl: string | null;
  usernameNextChange: string | null;
  emailNextChange: string | null;
}

