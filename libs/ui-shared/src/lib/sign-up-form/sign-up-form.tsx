import styles from './sign-up-form.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';

import { User } from '@member-club/util';

/* eslint-disable-next-line */
export interface SignUpFormProps {
  nameValidationError: string;
  emailValidationError: string;
  users: User[];
  addUser: (user: User) => Promise<void>;
}

export const SignUpForm = ({
  nameValidationError = '',
  emailValidationError = '',
  users,
  addUser
}: SignUpFormProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const clear = () => {
    setName('');
    setEmail('');
  };

  useEffect(() => {
    clear();
  }, [users])

  return (
    <div className={styles.signup}>
      <div className={styles.newMember}>New member</div>
      <form className={styles.form} noValidate autoComplete="off">
        <TextField
          label="Name"
          variant="outlined"
          error={Boolean(nameValidationError)}
          helperText={nameValidationError}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          error={Boolean(emailValidationError)}
          helperText={emailValidationError}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.buttons}>
          <Button variant="contained" color="primary" type='button' disabled={!name || !email} onClick={() => {
            addUser({ name, email });
          }}>
            Add
          </Button>
          <Button variant="contained" color="secondary" type='button' onClick={clear}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
