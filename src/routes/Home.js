import React, { useEffect, useState } from 'react';
import { dbService } from '../fbApp';

const Home = () => {
  const [ppby, setPpby] = useState('');
  const [ppbys, setPpbys] = useState([]);

  useEffect(() => {
    const getPpbys = async () => {
      const result = await dbService.collection('ppbys').get();

      result.forEach((doc) => {
        const dbPpbyObject = {
          ...doc.data(),
          id: doc.id,
        };

        setPpbys((prev) => [dbPpbyObject, ...prev]); // 함수형 업데이트 시 파라미터로 이전 값을 조회할 수 있음
      });
    };
    getPpbys();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await dbService.collection('ppbys').add({
      text: ppby,
      createdAt: Date.now(),
    });

    setPpby(() => '');
    console.log(result);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setPpby(() => value);
  };

  return (
    <>
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
      <div>
        {ppbys.map((v) => (
          <div key={v.id}>
            <h4>{v.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
