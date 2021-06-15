import styles from './app.module.scss';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { SignUpForm, MembersList } from '@member-club/ui-shared';
import { API_ERRORS, User } from '@member-club/util';
import { palette, color } from '@material-ui/system';
import useFetch from 'use-http';
import { useEffect, useState } from 'react';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [nameValidationError, setNameValidationError] = useState<string>('');
  const [emailValidationError, setEmailValidationError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { get, post, response, loading } = useFetch('/api');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (error) {
      switch (error) {
        case API_ERRORS.USER_IS_EXIST:
          setEmailValidationError(error);
          break;
        case API_ERRORS.EMAIL_NOT_VALID:
          setEmailValidationError(error);
          break;
        case API_ERRORS.NAME_NOT_VALID:
          setNameValidationError(error);
          break;
        default:
          setNameValidationError('');
          setEmailValidationError('');
      }
    }
  }, [error]);

  const fetchUsers = async () => {
    const initialUsers: User[] = await get('/users');
    if (response.ok) setUsers(initialUsers);
  };

  const addUser = async (user: User) => {
    setNameValidationError('');
    setEmailValidationError('');

    const newUser = await post('/users', { ...user });
    if (response?.data?.error) {
      setError(response.data.error);
    }
    if (response.ok) setUsers([...users, newUser]);
  };

  return (
    <div className={styles.app}>
      <Container maxWidth={false}>
        <h1 className={styles.header}>Welcome to the Club!</h1>

        <SignUpForm
          users={users}
          addUser={addUser}
          nameValidationError={nameValidationError}
          emailValidationError={emailValidationError}
        />
        <MembersList users={users} />
      </Container>
    </div>
  );
};

export default App;
