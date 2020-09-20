import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from '../fbApp';

const Profile = ({ userObj }) => {
  const history = useHistory();

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

  return (
    <>
      <button type="button" onClick={onLogOutClick}>
        로그아웃
      </button>
    </>
  );
};

export default Profile;
