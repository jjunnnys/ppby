import React, { useState } from 'react';
import { authService, firebaseInstance } from '../fbApp';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const errorMessage = {
    'auth/weak-password': '비밀번호는 6 자 이상이어야 합니다',
    'auth/invalid-email': '이메일 주소 형식이 잘못되었습니다',
    'auth/email-already-in-use': '이미 사용 중인 이메일입니다',
    'auth/wrong-password': '비밀번호가 틀렸습니다',
    'auth/user-not-found': '등록되지 않은 계정입니다',
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data;

    try {
      if (newAccount) {
        // 회원가입
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // 로그인
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
      setError(() => error.code);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialLogIn = async (e) => {
    const {
      target: { name },
    } = e;

    let provider;

    try {
      if (name === 'google') {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name === 'github') {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      const data = await authService.signInWithPopup(provider);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? '회원가입' : '로그인'} />
      </form>
      <span onClick={toggleAccount}>{newAccount ? '회원가입' : '로그인'}</span>
      <div>{errorMessage[error]}</div>
      <div>
        <button type="button" name="google" onClick={onSocialLogIn}>
          google 로그인
        </button>
        <button type="button" name="" onClick={onSocialLogIn}>
          github 로그인
        </button>
      </div>
    </>
  );
};

export default Auth;
