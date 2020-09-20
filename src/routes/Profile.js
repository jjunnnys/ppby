import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from '../fbApp';

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  useEffect(() => {
    const getMyPpbys = async () => {
      const ppbys = await dbService
        .collection('ppbys')
        .where('creatorId', '==', userObj.uid)
        .orderBy('createdAt') // 쿼리를 실행할 수 있도록 index를 만들어야 함 (에러창을 보면 주소를 제공함)
        .get();

      console.log(ppbys.docs.map((doc) => doc.data()));
    };

    getMyPpbys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setNewDisplayName(() => value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      console.log(userObj);
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser(); // 유저 정보 새로고침
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="닉네임"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="바꾸기" />
      </form>

      <button type="button" onClick={onLogOutClick}>
        로그아웃
      </button>
    </>
  );
};

export default Profile;
