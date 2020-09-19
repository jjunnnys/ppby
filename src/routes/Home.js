import React, { useEffect, useState } from 'react';
import { dbService } from '../fbApp';

const Home = ({ userObj }) => {
  const [ppby, setPpby] = useState('');
  const [ppbys, setPpbys] = useState([]);

  useEffect(() => {
    try {
      // 어떤 DB에서의 변화든 알려줌
      const dbSnapshot = async () => {
        // reac, delete, update 등 모두 포함
        await dbService.collection('ppbys').onSnapshot((snapshot) => {
          console.log('변경');
          // snapshot에도 document를 불러올 수 있음 (기존 get(), forEach방식 없애도 됨)
          // 이 방법이 리렌더링을 방지함
          const ppbyArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(ppbyArray);

          setPpbys(ppbyArray);
        });
      };

      dbSnapshot();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await dbService.collection('ppbys').add({
      text: ppby,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
