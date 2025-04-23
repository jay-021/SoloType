'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import SystemNotification from '@/components/system-notification';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/config';

/*
 * NOTE: Authentication is temporarily disabled
 * The following imports and implementation are preserved for future use
 * Uncomment when ready to implement actual authentication
 *
 * import {
 *   CognitoUserPool,
 *   CognitoUser,
 *   AuthenticationDetails,
 *   CognitoUserAttribute,
 *   type CognitoUserSession,
 * } from "amazon-cognito-identity-js"
 */

// AWS Cognito configuration - preserved for future use
/*
const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "us-east-1_example",
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "example-client-id",
}

// Initialize the Cognito User Pool
const userPool = new CognitoUserPool(poolData)
*/

// User type definition
export interface User {
  id: string;
  username: string;
  email: string;
  rank: 'e' | 'd' | 'c' | 'b' | 'a' | 's';
  level: number;
  xp: number;
  xpToNextLevel: number;
  joinDate: string;
  completedQuests: number;
  isFirstLogin: boolean;
  role: 'player' | 'admin';
}

// Define notification data types
interface SignupNotificationData {
  type: 'signup';
}

interface LoginNotificationData {
  type: 'login';
}

interface LevelUpNotificationData {
  type: 'levelup';
  level: number;
}

interface QuestNotificationData {
  type: 'quest';
  questName: string;
  xpGained: number | string;
  rank: string;
}

// Union type for all notification data
type NotificationData = 
  | SignupNotificationData 
  | LoginNotificationData 
  | LevelUpNotificationData 
  | QuestNotificationData;

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  showNotification: (
    type: 'signup' | 'login' | 'levelup' | 'quest',
    data?: Record<string, unknown>
  ) => void;
  notificationState: {
    show: boolean;
    type: 'signup' | 'login' | 'levelup' | 'quest';
    data?: Record<string, unknown>;
  };
  closeNotification: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationState, setNotificationState] = useState<{
    show: boolean;
    type: 'signup' | 'login' | 'levelup' | 'quest';
    data?: Record<string, unknown>;
  }>({ show: false, type: 'login' });

  // Derived state - no need to maintain separate state
  const isAuthenticated = !!user;

  // Clear error helper
  const clearError = () => setError(null);

  // Check for existing session on mount using Firebase onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setIsLoading(true);

      if (authUser) {
        // User is signed in
        setFirebaseUser(authUser);

        // Create our app's user object from Firebase user
        const userData: User = {
          id: authUser.uid,
          username:
            authUser.displayName || authUser.email?.split('@')[0] || 'Hunter',
          email: authUser.email || '',
          // Default values for new users
          rank: 'e',
          level: 1,
          xp: 0,
          xpToNextLevel: 100,
          joinDate: new Date().toISOString(),
          completedQuests: 0,
          isFirstLogin: false, // Will be updated once we have a database
          role: 'player',
        };

        setUser(userData);
      } else {
        // User is signed out
        setFirebaseUser(null);
        setUser(null);
      }

      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Sign up with Firebase
  const signup = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    clearError();

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the profile to include the username
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      // Show signup notification
      showNotification('signup');
    } catch (err: unknown) {
      console.error('Signup error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to create account. Please try again.'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with Firebase
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    clearError();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Show login notification
      showNotification('login');
    } catch (err: unknown) {
      console.error('Login error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Invalid email or password. Please try again.'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setIsLoading(true);
    clearError();

    try {
      await signInWithPopup(auth, googleProvider);
      // Show login notification
      showNotification('login');
    } catch (err: unknown) {
      console.error('Google sign-in error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to sign in with Google. Please try again.'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout from Firebase
  const logout = () => {
    firebaseSignOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  // Show system notification
  const showNotification = (
    type: 'signup' | 'login' | 'levelup' | 'quest',
    data?: Record<string, unknown>
  ) => {
    setNotificationState({ show: true, type, data });
  };

  // Close notification
  const closeNotification = () => {
    setNotificationState((prev) => ({ ...prev, show: false }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        signInWithGoogle,
        logout,
        showNotification,
        notificationState,
        closeNotification,
        error,
        clearError,
      }}
    >
      {children}
      {notificationState.show && (
        <SystemNotification
          type={notificationState.type}
          data={notificationState.data}
          onClose={closeNotification}
        />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
