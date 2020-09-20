import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import Ppby from '../components/Ppby';
import { dbService, storageService } from '../fbApp';

const Home = ({ userObj }) => {
  const [ppby, setPpby] = useState('');
  const [ppbys, setPpbys] = useState([]);
  const [attachment, setAttachment] = useState('');

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
    let attachmentUrl = '';

    if (attachment !== '') {
      const attachmentRef = await storageService
        .ref()
        .child(`${userObj.uid}/${nanoid()}`); // 파일에 대한 ref를 가진다. (유저 id로 폴더를 만든다.)
      const res = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await res.ref.getDownloadURL();
    }

    const formData = {
      text: ppby,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection('ppbys').add(formData);

    setPpby(() => '');
    setAttachment(() => '');
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setPpby(() => value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttachment(() => result);
    };

    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment(() => null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="PPBY" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="사진" />
            <button type="button" onClick={onClearAttachment}>
              취소
            </button>
          </div>
        )}
      </form>
      <div>
        {ppbys.map((v) => (
          <Ppby key={v.id} ppby={v} isOwner={v.creatorId === userObj.uid} />
        ))}
      </div>
    </>
  );
};

export default Home;
