import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface ListContextData {
  stateUserList: Customer[];
  usersList(): Promise<void>;
  createUser(data: object): Promise<void>;
  removeUser(data: number): Promise<void>;
  saveUser(id: number, user: object): Promise<void>
  setachCustomer(filtered: Customer[]): Promise<void>
}

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

export const ListContext = createContext<ListContextData>({} as ListContextData);

export const ListProvider: React.FC = ({ children  }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const usersList = useCallback(async () => {
    const response = await api.get('customers');
    setCustomers(response.data);
    return response.data;
  }, [])

  const createUser = useCallback(async (data) => {
    const response = await api.post('customers', data);
    console.log(response.data)
    return;
  }, [])

  const removeUser = useCallback(async (id) => {
    const response = await api.delete(`/remove/${id}`)
    console.log(response)
    return;
  }, [])

  const saveUser = useCallback(async (id, user) => {
    const response = await api.put(`/save/${id}`, user);
    console.log(response);
    return;
  }, []);

  const setachCustomer = useCallback(async (filtered) => {
    setCustomers(filtered);
    return;
  }, [])

  return (
    <ListContext.Provider
      value={
        {
          stateUserList: customers,
          usersList,
          createUser,
          removeUser,
          saveUser,
          setachCustomer
        }
      }
    >
      {children}
    </ListContext.Provider>
  );
};


