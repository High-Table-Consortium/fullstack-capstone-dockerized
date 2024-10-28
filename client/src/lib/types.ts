export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    preferences: {
      theme: 'light' | 'dark' | 'system';
      emailNotifications: boolean;
      language: string;
    };
  }
  
  export interface FavoriteDestination {
    id: string;
    dateAdded: string;
    notes?: string;
  }