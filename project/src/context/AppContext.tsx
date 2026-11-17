import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Item, ClaimRequest, User } from '@/types';
import { sampleItems, sampleClaims } from '@/data/sampleData';

interface AppContextValue {
  items: Item[];
  claims: ClaimRequest[];
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
  name: string,
  email: string,
  studentId: string,
  department: string,
  password: string
) => Promise<boolean>;
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'reporterId' | 'reporterName' | 'reporterEmail'>) => void;
  addClaim: (itemId: string, message: string) => void;
  updateClaimStatus: (claimId: string, status: 'approved' | 'rejected') => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const demoUser: User = {
  id: 'usr-001',
  name: 'Sarah Chen',
  email: 'sarah.chen@university.edu',
  studentId: 'CS2021042',
  department: 'Computer Science',
  joinDate: '2026-09-01',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>(sampleItems);
  const [claims, setClaims] = useState<ClaimRequest[]>(sampleClaims);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
  fetch('http://localhost:5000/api/items')
    .then((res) => res.json())
    .then((data) => {
      setItems(data);
    })
    .catch((error) => {
      console.log('Error fetching items:', error);
    });
}, []);


useEffect(() => {
  fetch('http://localhost:5000/api/claims')
    .then((res) => res.json())
    .then((data) => {
      setClaims(data);
    })
    .catch((error) => {
      console.log('Error fetching claims:', error);
    });
}, []);

  const login = useCallback(
  async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login failed');
        return false;
      }

      setCurrentUser(data);
      return true;

    } catch (error) {
      console.log('Login error:', error);
      alert('Cannot connect to server');
      return false;
    }
  },
  []
);
  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const register = useCallback(
  async (
    name: string,
    email: string,
    studentId: string,
    department: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'usr-' + Date.now(),
          name,
          email,
          studentId,
          department,
          joinDate: new Date().toISOString().split('T')[0],
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registration failed');
        return false;
      }

      setCurrentUser(data);
      return true;

    } catch (error) {
      console.log('Registration error:', error);
      alert('Cannot connect to server');
      return false;
    }
  },
  []
);


const addItem = useCallback(
  async (item: Omit<Item, 'id' | 'createdAt' | 'reporterId' | 'reporterName' | 'reporterEmail'>) => {
    const newItem = {
      ...item,
      id: 'itm-' + Date.now(),
      createdAt: new Date().toISOString(),
      reporterId: currentUser?.id ?? 'usr-guest',
      reporterName: currentUser?.name ?? 'Guest User',
      reporterEmail: currentUser?.email ?? 'guest@university.edu',
    };

    try {
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Failed to save item');
      }

      const savedItem = await response.json();
      setItems((prev) => [savedItem, ...prev]);

    } catch (error) {
      console.log('Error adding item:', error);
    }
  },
  [currentUser]
);


  
const addClaim = useCallback(
  async (itemId: string, message: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    const newClaim: ClaimRequest = {
      id: 'clm-' + Date.now(),
      itemId,
      itemName: item.name,
      itemImage: item.images[0],
      claimantName: currentUser?.name ?? 'Guest User',
      claimantEmail: currentUser?.email ?? 'guest@university.edu',
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    try {
      console.log('Sending claim:', newClaim);
      const response = await fetch('http://localhost:5000/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClaim),
      });

      if (!response.ok) {
        throw new Error('Failed to save claim');
      }

      const savedClaim = await response.json();
      console.log('Claim saved:', savedClaim);
      setClaims((prev) => [savedClaim, ...prev]);
    } catch (error) {
      console.log('Error adding claim:', error);
    }
  },
  [items, currentUser]
);


  
const updateClaimStatus = useCallback(
  async (claimId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/claims/${claimId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update claim');
      }

      const updatedClaim = await response.json();

      setClaims((prev) =>
        prev.map((c) => (c.id === claimId ? updatedClaim : c))
      );

    } catch (error) {
      console.log('Error updating claim:', error);
    }
  },
  []
);


  return (
    <AppContext.Provider
      value={{ items, claims, currentUser, login, logout, register, addItem, addClaim, updateClaimStatus }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
