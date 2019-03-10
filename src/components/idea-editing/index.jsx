import { TextField } from '@material-ui/core';
import range from 'lodash-es/range';
import React from 'react';

import './style.css';

class IdeaEditing extends React.Component {
  constructor({
    content, impact, ease, confidence,
  }) {
    super();
    this.state = {
      content, impact, ease, confidence,
    };
  }

  render() {
    const {
      content, impact, ease, confidence,
    } = this.state;
    const {
      onUpdate, onCancel, index,
    } = this.props;

    const average = ((impact + ease + confidence) / 3).toFixed(2);

    const getSelectOptions = keyPrefix =>
      range(0, 11).map(value => <option key={`${keyPrefix}_${value}`} value={value}>{value}</option>);

    const onContentChange = (e) => {
      this.setState({ content: e.target.value });
    };

    const onImpactChange = (e) => {
      this.setState({ impact: parseInt(e.target.value, 10) });
    };

    const onEaseChange = (e) => {
      this.setState({ ease: parseInt(e.target.value, 10) });
    };

    const onConfidenceChange = (e) => {
      this.setState({ confidence: parseInt(e.target.value, 10) });
    };

    const onSaveButtonClick = () => {
      onUpdate(index, content, impact, ease, confidence);
    };

    const onCancelButtonClick = () => {
      onCancel(index);
    };

    return (
      <div className="idea__inner">
        <TextField className="idea__content" value={content} onChange={onContentChange} />
        <select className="idea__not-content idea__impact" value={impact} onChange={onImpactChange}>
          {getSelectOptions(impact)}
        </select>
        <select className="idea__not-content idea__ease" value={ease} onChange={onEaseChange}>
          {getSelectOptions(ease)}
        </select>
        <select className="idea__not-content idea__confidence" value={confidence} onChange={onConfidenceChange}>
          {getSelectOptions(confidence)}
        </select>
        <span className="idea__not-content idea__average">{average}</span>
        <button
          className="idea__not-content idea__button idea__confirm-button"
          type="button"
          onClick={onSaveButtonClick}
        />
        <button
          className="idea__not-content idea__button idea__cancel-button"
          type="button"
          onClick={onCancelButtonClick}
        />
      </div>
    );
  }
}

export default IdeaEditing;
