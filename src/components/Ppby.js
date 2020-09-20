import React, { useState } from 'react';
import { dbService, storageService } from '../fbApp';

const Ppby = ({ ppby, isOwner }) => {
  const [checkEdit, setCheckEdit] = useState(false);
  const [editing, setEditing] = useState(ppby.text);

  const onDelete = async () => {
    const ok = window.confirm('정말로 삭제 하시겠습니까?');

    if (ok) {
      await dbService.doc(`ppbys/${ppby.id}`).delete();
      await storageService.refFromURL(ppby.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setCheckEdit((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();

    await dbService.doc(`ppbys/${ppby.id}`).update({
      text: editing,
    });

    setCheckEdit((prev) => !prev);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setEditing(() => value);
  };

  return (
    <div>
      {checkEdit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="수정할 글 작성"
              value={editing}
              onChange={onChange}
              required
            />
            <input type="submit" />
          </form>
          <button type="button" onClick={toggleEditing}>
            취소
          </button>
        </>
      ) : (
        <>
          <h4>{ppby.text}</h4>
          {ppby.attachmentUrl && (
            <img
              src={ppby.attachmentUrl}
              width="50px"
              height="50px"
              alt={ppby.text}
            />
          )}
          {isOwner && (
            <>
              <button type="button" onClick={onDelete}>
                삭제
              </button>
              <button type="button" onClick={toggleEditing}>
                수정
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Ppby;
