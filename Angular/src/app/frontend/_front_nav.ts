export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: any;
  title?: boolean;
  children?: any;
  variant?: string;
  attributes?: object;
  divider?: boolean;
  class?: string;
  label?: any;
  wrapper?: any;
}

export const navItems: NavData[] = [
  {
    name: 'Login',
    url: '/login',
  },
  {
	name: 'Sign Up',
	url: '/register',
   },
   {
	name: 'Profile',
	url: '/profile',
   }
];
