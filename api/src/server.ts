import express, { response } from 'express';
import cors from 'cors';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  cpf: number;
  age: number;
  gender: string;
  email: string;
  phone: number;
  schooling?: string;
}

let customers: Customer[] = [
  {
    id: 1,
    firstName: 'Caio',
    lastName: 'Soares',
    cpf: 11111111111,
    age: 33,
    gender: 'M',
    email: 'caio@teste.com',
    phone: 11991225544,
  },
  {
    id: 2,
    firstName: 'Marcela',
    lastName: 'Carvalho',
    cpf: 22222222222,
    age: 20,
    gender: 'F',
    email: 'marcela@teste.com',
    phone: 11991335788,
  },
  {
    id: 3,
    firstName: 'Thais',
    lastName: 'Souza',
    cpf: 33333333333,
    age: 27,
    gender: 'F',
    email: 'thais@teste.com',
    phone: 11991784455,
  }
];

const app = express();

app.use(cors());
app.use(express.json());

app.get('/customers', (req, res) => {
  res.json(customers);
})

app.get('/customers/:id', (req, res) => {
  const { id } = req.params;

  const userFiltered = customers.find( user => Number(id) === user.id)

  res.json(userFiltered);
})


app.post('/customers', (req, res) => {
  let userData = req.body;
  try {
    userData = {
      id: customers.length < 1 ? 1 : customers[customers.length - 1].id + 1,
      ...userData,
    }

    customers.push(userData)
    res.status(204);
  } catch (err) {
    console.log(err);
  }

  console.log(customers)
})

app.delete('/remove/:id', (req, res) => {
  const { id } = req.params;

  const customerIndex = customers.findIndex(customer => Number(id) === customer.id);
  console.log(customerIndex);

  customers.splice(customerIndex, 1);
  console.log(customers)
  return res.json('Usuário removido');
})

app.put('/save/:id', (req, res) => {
  const { id } = req.params;
  const body: Customer = req.body;

  const customerIndex = customers.findIndex(customer => Number(id) === customer.id)

  const customer = {
    id: Number(id),
    firstName: body.firstName,
    lastName: body.lastName,
    cpf: body.cpf,
    age: body.age,
    gender: body.gender,
    email: body.email,
    phone: body.phone,
    schooling: body.schooling
  }

  customers[customerIndex] = customer;

  return res.json('Usuário atualizado');
})


app.listen(8000, () => {
  console.log('🚀 Server started on port 8000!');
});
