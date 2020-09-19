import React, { useState } from 'react';
import { authService } from '../fbApp';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);

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

    try {
      if (newAccount) {
        // 회원가입
        const data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      } else {
        // 로그인
        const data = await authService.signInWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      }
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
          type="text"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? '회원가입' : '로그인'} />
      </form>
      <div>
        <button>google 로그인</button>
        <button>github 로그인</button>
      </div>
    </>
  );
};

export default Auth;
