import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Initial demo users for testing
const initialUsers = [
  {
    id: 'usr_001',
    email: 'kadeksamuel@binus.ac.id',
    password: 'password123', // In production, this should be hashed!
    fullName: 'Kadek Samuel',
    binusianId: '2602123456',
    nim: '2602123456',
    program: 'Computer Science',
    role: 'student',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'usr_002',
    email: 'niputu@binus.ac.id',
    password: 'password123',
    fullName: 'Ni Putu Saraswati',
    binusianId: '2602234567',
    nim: '2602234567',
    program: 'Information Systems',
    role: 'student',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'usr_003',
    email: 'andre@binus.ac.id',
    password: 'password123',
    fullName: 'Andre Nugroho',
    binusianId: '2602345678',
    nim: '2602345678',
    program: 'Digital Communication',
    role: 'student',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'usr_004',
    email: 'verena@binus.ac.id',
    password: 'password123',
    fullName: 'Putu Ayu Verena',
    binusianId: '2602456789',
    nim: '2602456789',
    program: 'Interior Design',
    role: 'student',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'admin_001',
    email: 'admin@gaskeunn.com',
    password: 'admin123',
    fullName: 'Admin Gaskeunn',
    binusianId: 'ADMIN001',
    nim: 'ADMIN001',
    program: 'Administration',
    role: 'admin',
    createdAt: '2025-01-01T00:00:00Z'
  }
];

const STORAGE_KEYS = {
  USERS: 'gaskeunn_users',
  CURRENT_USER: 'gaskeunn_current_user'
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize users and load current user from localStorage
  useEffect(() => {
    try {
      // Load users from localStorage or use initial users
      const savedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        setUsers(initialUsers);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
      }

      // Load current user from localStorage
      const savedCurrentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (savedCurrentUser) {
        setCurrentUser(JSON.parse(savedCurrentUser));
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
      setUsers(initialUsers);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save users to localStorage whenever it changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
  }, [users]);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  // Login function
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Don't include password in current user state
    const { password: _, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
    
    return userWithoutPassword;
  };

  // Register function
  const register = (userData) => {
    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser = {
      id: `usr_${Date.now()}`,
      email: userData.email,
      password: userData.password, // In production, hash this!
      fullName: userData.fullName,
      binusianId: userData.binusianId,
      nim: userData.nim,
      program: userData.program,
      role: 'student',
      createdAt: new Date().toISOString()
    };

    // Add to users array
    setUsers(prev => [...prev, newUser]);

    // Auto login after register
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);

    return userWithoutPassword;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  // Update user profile
  const updateProfile = (updates) => {
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    // Update in users array
    setUsers(prev => prev.map(user => 
      user.id === currentUser.id 
        ? { ...user, ...updates }
        : user
    ));

    // Update current user
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);

    return updatedUser;
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return currentUser !== null;
  };

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  // Get user by ID
  const getUserById = (userId) => {
    return users.find(u => u.id === userId);
  };

  // Get user by email
  const getUserByEmail = (email) => {
    return users.find(u => u.email === email);
  };

  // Reset password (for demo purposes)
  const resetPassword = (email, newPassword) => {
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUsers = [...users];
    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      password: newPassword
    };

    setUsers(updatedUsers);
    return true;
  };

  const value = {
    currentUser,
    users,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
    isAdmin,
    getUserById,
    getUserByEmail,
    resetPassword
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;