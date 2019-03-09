import {
  Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText,
} from '@material-ui/core';
import cloneDeep from 'lodash-es/cloneDeep';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';

import addIdeaIcon from '../../../assets/btn_addanidea.png';
import gotIdeasIcon from '../../../assets/bulb.png';
import {
  createIdea, updateIdea, deleteIdea,
} from '../../api';
import { unsetState, setState } from '../../state';
import Idea from '../idea';
import './style.css';

const Ideas = ({
  ideas, user, ideaPageReady, ideaToDelete,
}) => {
  const hasIdeaToDelete = ideaToDelete !== undefined;

  const addIdea = () => {
    const ideasClone = cloneDeep(ideas);
    ideasClone.unshift({
      id: '',
      content: '',
      impact: 10,
      ease: 10,
      confidence: 10,
      editing: true,
    });
    setState('ideas', ideasClone);
  };

  const onUpdate = async (index, content, impact, ease, confidence) => {
    const ideasClone = cloneDeep(ideas);
    const idea = ideasClone[index];
    const { id } = idea;
    let response;
    if (id) {
      response = await updateIdea(id, content, impact, ease, confidence);
    } else {
      response = await createIdea(content, impact, ease, confidence);
    }
    ideasClone[index] = response;
    delete response.average_score;
    delete response.created_at;
    response.editing = false;
    setState('ideas', ideasClone);
  };

  const onCancel = (index) => {
    const ideasClone = cloneDeep(ideas);
    const idea = ideasClone[index];
    const { id } = idea;
    if (id) {
      idea.editing = false;
    } else {
      ideasClone.splice(index, 1);
    }
    setState('ideas', ideasClone);
  };

  const onEdit = (index) => {
    const ideasClone = cloneDeep(ideas);
    const idea = ideasClone[index];
    idea.editing = true;
    setState('ideas', ideasClone);
  };

  const onDelete = (index) => {
    setState('ideaToDelete', index);
  };

  const onDeleteConfirm = async () => {
    const ideasClone = cloneDeep(ideas);
    const idea = ideasClone[ideaToDelete];
    const { id } = idea;
    await deleteIdea(id);
    ideasClone.splice(ideaToDelete, 1);
    setState('ideas', ideasClone);
    unsetState('ideaToDelete');
  };

  const onDeleteCancel = () => {
    unsetState('ideaToDelete');
  };

  const ideasComponents = (ideas || []).map((idea, i) => (
    <Idea
      key={i}
      index={i}
      content={idea.content}
      impact={idea.impact}
      ease={idea.ease}
      confidence={idea.confidence}
      editing={idea.editing}
      onUpdate={onUpdate}
      onCancel={onCancel}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ));

  return (
    <div className="ideas">
      {user ? (
        <Container>
          <Row>
            <Col sm={{ span: 11 }}>
              <h2>My Ideas</h2>
            </Col>
            <Col sm={{ span: 1 }}>
              <button className="ideas__add-button" onClick={addIdea} type="button" disabled={!ideaPageReady}>
                <img src={addIdeaIcon} alt="Add" />
              </button>
            </Col>
          </Row>
          <hr />
          {
            ideasComponents.length ? (
              <Row>
                <Col sm={{ span: 12 }}>
                  <ul>
                    <li className="idea__table-header">
                      <div className="idea__inner">
                        <span className="idea__content" />
                        <span className="idea__not-content idea__impact">Impact</span>
                        <span className="idea__not-content idea__ease">Ease</span>
                        <span className="idea__not-content idea__confidence">Confidence</span>
                        <span className="idea__not-content idea__average">Avg.</span>
                        <span className="idea__not-content" />
                        <span className="idea__not-content" />
                      </div>
                    </li>
                    {ideasComponents}
                  </ul>
                </Col>
              </Row>
            ) : (
              <div className="ideas__center-container">
                <div className="ideas__center">
                  <img className="ideas__center-image" src={gotIdeasIcon} alt="Got Ideas?" />
                  <span className="ideas__center-text">Got Ideas?</span>
                </div>
              </div>
            )
          }
          <Dialog open={hasIdeaToDelete}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This idea will be permanently deleted.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onDeleteCancel} color="primary">
                CANCEL
              </Button>
              <Button onClick={onDeleteConfirm} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      ) : (
        <Redirect to="/signin" />
      )}
    </div>
  );
};

export default withRouter(connect(({
  user, ideas, ideaPageReady, ideaToDelete,
}) => ({
  user, ideas, ideaPageReady, ideaToDelete,
}))(Ideas));
