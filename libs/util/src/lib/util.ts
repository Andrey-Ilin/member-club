export interface User {
  name: string;
  email: string;
  dateOfJoin?: number;
  id?: number;
}

export interface Row {
  id: number;
  number: number;
  name: string;
  email: string;
  dateOfJoin: string;
}

const users: User[] = [{
  name: 'Bruce Willis',
  email: 'bruce.willis@test.com',
  dateOfJoin: 1623675417920,
  id: 1
}, {
  name: 'Donald Trump',
  email: 'donald.trump@test.com',
  dateOfJoin: 1623675418920,
  id: 2
}, {
  name: 'Mick Jagger',
  email: 'mick.jagger@test.com',
  dateOfJoin: 1623675419920,
  id: 3
}];

export function getUsers(): User[] {
  return [...users];
}

export function addUser(user: User): User {
  const dateOfJoin = new Date()
  user.id = Math.ceil(Math.random()*1000000);
  user.dateOfJoin = dateOfJoin.getTime();
  users.push(user);
  return user;
}

export function isExist(email: string): boolean {
  const result = users.findIndex((user) => user.email === email) >= 0;
  console.log('RESULT: ',result)
  return result;
}

export function mapUsersToRows(users: User[]): Row[] {
  return users.map((u: User, i: number) => {
    const date: Date = new Date(u.dateOfJoin as number);
    const rowDate: string = date.toLocaleDateString("en-US");
    const row: Row = {
      id: u.id as number,
      number: i+1,
      name: u.name,
      email: u.email,
      dateOfJoin: rowDate
    }
    return row;
   })
}

export const userPattern = /^[a-zA-Z0-9_-]{4,16}$/;
export const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export enum API_ERRORS {
  EMAIL_NOT_VALID = 'Email not valid',
  NAME_NOT_VALID = 'Name not valid',
  USER_IS_EXIST = 'User is exist'
}

export function isUsernameValid(name: string): boolean {
  return userPattern.test(name.toLowerCase());
}

export function isEmailValid(email: string): boolean {
  return emailPattern.test(email.toLowerCase());
}

