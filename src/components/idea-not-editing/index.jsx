import React from 'react';

import './style.css';

const IdeaNotEditing = ({
  content, impact, ease, confidence, onEdit, onDelete, index,
}) => {
  const average = ((impact + ease + confidence) / 3).toFixed(2);

  const onEditButtonClick = () => {
    onEdit(index);
  };

  const onDeleteButtonClick = () => {
    onDelete(index);
  };

  return (
    <div className="idea__inner">
      <span className="idea__content">{content}</span>
      <span className="idea__not-content idea__impact">{impact}</span>
      <span className="idea__not-content idea__ease">{ease}</span>
      <span className="idea__not-content idea__confidence">{confidence}</span>
      <span className="idea__not-content idea__average">{average}</span>
      <button
        className="idea__not-content idea__button idea__edit-button"
        type="button"
        onClick={onEditButtonClick}
      />
      <button
        className="idea__not-content idea__button idea__delete-button"
        type="button"
        onClick={onDeleteButtonClick}
      />
    </div>
  );
};

export default IdeaNotEditing;
