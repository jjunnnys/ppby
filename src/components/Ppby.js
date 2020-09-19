import React from 'react';

const Ppby = ({ ppby, isOwner }) => {
  return (
    <div>
      <h4>{ppby.text}</h4>
      {isOwner && (
        <>
          <button type="button">삭제</button>
          <button type="button">수정</button>
        </>
      )}
    </div>
  );
};

export default Ppby;
