import React, { useCallback, useRef, useContext, useEffect, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useHistory, useRouteMatch } from 'react-router-dom'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container, Header } from './styles';
import { ListContext } from '../../context/ListContext';
import { FiEdit, FiTrash, FiUserPlus, FiArrowLeft, FiXCircle } from 'react-icons/fi';

import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErrors';
import api from '../../services/api';

interface UserId {
  id: string
}

interface CustomerProps {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  cpf: number;
  email: string;
  phone: number;
  schooling?: string;
}

const Customer: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { createUser, removeUser, saveUser } = useContext(ListContext);
  const [user, setUser] = useState<CustomerProps>()
  const [edit, setEdit] = useState(false)

  const { params } = useRouteMatch<UserId>();

  useEffect(() => {
   api.get(`/customers/${params.id}`).then(response => {
    if(!!response.data) {
      setUser(response.data);
    } return;
   });
  }, [params.id, setUser]);

  const handleSubmit = useCallback(async (data: CustomerProps) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        firstName: Yup.string().required('Nome é obrigatório'),
        lastName: Yup.string().required('Sobrenome é obrigatório'),
        age: Yup.string().required('Idade é obrigatório').matches(/^[0-9]+$/, 'Insira uma idade válida'),
        gender: Yup.string().required('Gênero é obrigatório'),
        cpf: Yup.string().required('CPF é obrigatório').matches(/^[0-9]+$/, 'Insira um CPF válido sem caracteres'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail é obrigatório'),
        phone: Yup.string().required('Telefone é obrigatório').matches(/^[0-9]+$/, 'Insira um Telefone válido sem caracteres'),
        schooling: Yup.string()
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        age: Number(data.age),
        gender: data.gender,
        cpf: Number(data.cpf),
        email: data.email,
        phone: Number(data.phone),
        schooling: data.schooling
      }

      let idUser = Number(params.id);

      if(idUser !== 0) {
        saveUser( idUser, user)
      } else {
        createUser(user);
      }


      history.push('/');
    } catch(err) {
      console.log(err);
      const errors = getValidationErros(err);
      formRef.current?.setErrors(errors);
    }
  }, [createUser, history, saveUser, params.id]);

  const handleEditData = useCallback(() => {
    setEdit(!edit);
  }, [edit])

  const handleRemoveUser = useCallback((id) => {
    removeUser(id);
    history.push('/');
  }, [removeUser, history]);

  console.log(edit);

  return (
    <Container>
      { user ?
          <>
            <Header>
              <h1>Dados Usuário</h1>
              <Button onClick={handleEditData}>{edit ? <FiXCircle size={20}/> : <FiEdit size={20}/>}</Button>
              { !edit &&
                <>
                  <Button onClick={() => handleRemoveUser(params.id)}><FiTrash size={20}/></Button>
                  <Button onClick={() => {history.push('/')}}>
                    <FiArrowLeft size={20}/>
                  </Button>
                </>
              }
            </Header>
            <Form
              initialData={{
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                gender: user.gender,
                cpf: user.cpf,
                email: user.email,
                phone: user.phone,
                schooling: user.schooling
              }}
              ref={formRef} onSubmit={handleSubmit}
            >
              <Input name="firstName" placeholder="Nome"         readOnly={!edit} disabled={!edit} />
              <Input name="lastName"  placeholder="Sobrenome"    readOnly={!edit} disabled={!edit} />
              <Input name="age"       placeholder="Idade"        readOnly={!edit} disabled={!edit} />
              <Input name="gender"    placeholder="Gênero"       readOnly={!edit} disabled={!edit} />
              <Input name="cpf"       placeholder="CPF"          readOnly={!edit} disabled={!edit} />
              <Input name="email"     placeholder="E-mail"       readOnly={!edit} disabled={!edit} />
              <Input name="phone"     placeholder="Telefone"     readOnly={!edit} disabled={!edit} />
              <Input name="schooling" placeholder="Escolaridade" readOnly={!edit} disabled={!edit} />
              { edit &&
                <Button type="submit">
                  Salvar
                </Button>
              }
            </Form>
          </>
        :
          <>
            <Header>
              <h1>Formulário de Cadastro</h1>
              <Button onClick={() => {history.push('/')}}>
                <FiArrowLeft size={20}/>
              </Button>
            </Header>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="firstName" placeholder="Nome"          />
              <Input name="lastName"  placeholder="Sobrenome"     />
              <Input name="age"       placeholder="Idade"         />
              <Input name="gender"    placeholder="Gênero"        />
              <Input name="cpf"       placeholder="CPF"           />
              <Input name="email"     placeholder="E-mail"        />
              <Input name="phone"     placeholder="Telefone"      />
              <Input name="schooling" placeholder="Escolaridade"  />
              <Button type="submit">
                Cadastrar
                <FiUserPlus size={20}/>
              </Button>
            </Form>
          </>
      }
    </Container>
  );
}

export default Customer;
