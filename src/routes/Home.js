import React, { useState } from 'react';
import { dbService } from '../fbApp';

const Home = () => {
  const [ppby, setPpby] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await dbService.collection('ppby').add({
      text: ppby,
      createdAt: Date.now(),
    });

    setPpby('');
    console.log(result);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setPpby(() => value);
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
