import * as express from 'express';
import { getUsers, addUser, isExist, User, API_ERRORS, isUsernameValid, isEmailValid } from '@member-club/util';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/users', (req, res) => {
  res.send(getUsers());
});

app.post('/api/users', (req, res) => {
  if (isExist(req.body.email)) {
    res.status(400).send({ error: API_ERRORS.USER_IS_EXIST });
  } else if (!isUsernameValid(req.body.name)) {
    res.status(400).send({ error: API_ERRORS.NAME_NOT_VALID });
  } else if (!isEmailValid(req.body.email)) {
    res.status(400).send({ error: API_ERRORS.EMAIL_NOT_VALID });
  } else {
    res.send(addUser(req.body));
  }
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
