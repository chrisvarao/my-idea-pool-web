import React from 'react';

import IdeaEditing from '../idea-editing';
import IdeaNotEditing from '../idea-not-editing';
import './style.css';

const Idea = ({
  onUpdate, onCancel, onEdit, onDelete, index, content, impact, ease, confidence, editing,
}) => (
  <li className="idea">
    {editing ? (
      <IdeaEditing
        index={index}
        content={content}
        impact={impact}
        ease={ease}
        confidence={confidence}
        onUpdate={onUpdate}
        onCancel={onCancel}
      />
    ) : (
      <IdeaNotEditing
        index={index}
        content={content}
        impact={impact}
        ease={ease}
        confidence={confidence}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )}
  </li>
);

export default Idea;
