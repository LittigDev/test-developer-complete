import React, { useEffect, useState, FormEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { Header, Form, Error, CustomersList } from './styles';
import { ListContext } from '../../context/ListContext';

const Customers: React.FC = () => {
  const  { usersList, stateUserList, setachCustomer } = useContext(ListContext)

  const [searchCustomer, setSearchCustomer] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    usersList();
  }, [usersList]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!searchCustomer) {
      setInputError('Digite o nome/sobrenome do cliente');
      return;
    }

    try {
      const filtered = stateUserList.filter(users => {
        return users.firstName.toLowerCase().includes(searchCustomer.toLowerCase()) ||
          users.lastName.toLowerCase().includes(searchCustomer.toLowerCase());
      })

      if(filtered.length < 1) {
        setInputError('Usuário não encontrado');
        return;
      } else {
        setachCustomer(filtered);
        setSearchCustomer('');
      }

      setInputError('');
    } catch (err) {
      setInputError('Usuário não encontrado');
    }
  }

  return (
    <>
      <Header>
        <h1>Lista de clientes:</h1>
        <Link to="/addcostumers">
          Cadastrar Cliente
        </Link>
        {/* <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link> */}
      </Header>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
          placeholder="Pesquisar cliente pelo nome/sobrenome"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <CustomersList>
        {stateUserList.map((customer) => (
          <Link key={customer.id} to={`/customers/${customer.id}`}>
            <div>
              <strong>{customer.firstName} {customer.lastName}</strong>
              <p>{customer.email}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </CustomersList>
    </>
  );
};

export default Customers;
