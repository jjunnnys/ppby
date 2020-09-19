import React, { useState } from 'react';

const Home = () => {
  const [ppby, setPpby] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setPpby(() => e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="무슨 생각을 하시나요?"
        maxLength={120}
        value={ppby}
        onChange={onChange}
      />
      <input type="submit" value="PPBY" />
    </form>
  );
};

export default Home;
