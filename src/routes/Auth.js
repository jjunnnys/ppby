import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const onSubmit = (e) => {
    e.preventDefault();
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
        <input type="submit" value="로그인" />
      </form>
      <div>
        <button>google 로그인</button>
        <button>github 로그인</button>
      </div>
    </>
  );
};

export default Auth;
