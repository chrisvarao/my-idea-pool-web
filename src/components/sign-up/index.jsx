import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { signup } from '../../api';


class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '', password: '', name: '',
    };
  }

  render() {
    const { user } = this.props;
    const { email, password, name } = this.state;

    const onSubmit = (e) => {
      e.preventDefault();
      signup(email, password, name);
    };

    const onEmailChange = (e) => {
      this.setState({ email: e.target.value });
    };

    const onPasswordChange = (e) => {
      this.setState({ password: e.target.value });
    };

    const onNameChange = (e) => {
      this.setState({ name: e.target.value });
    };

    return (
      <div>
        {user ? (
          <Redirect to={{ pathname: '/ideas' }} />
        ) : (
          <div className="user-container">
            <form onSubmit={onSubmit}>
              <Container fluid>
                <Row>
                  <Col sm={{ span: 4, offset: 4 }}>
                    <h1>Sign Up</h1>
                  </Col>
                </Row>
                <Row>
                  <Col sm={{ span: 4, offset: 4 }}>
                    <div className="user-input-field-container">
                      <TextField
                        className="user-input-field"
                        value={name}
                        onChange={onNameChange}
                        placeholder="Name"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={{ span: 4, offset: 4 }}>
                    <div className="user-input-field-container">
                      <TextField
                        className="user-input-field"
                        value={email}
                        onChange={onEmailChange}
                        placeholder="Email"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={{ span: 4, offset: 4 }}>
                    <div className="user-input-field-container">
                      <TextField
                        className="user-input-field"
                        value={password}
                        onChange={onPasswordChange}
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={{ span: 4, offset: 4 }}>
                    <Container fluid>
                      <Row>
                        <Col sm={{ span: 3 }}>
                          <Button
                            className="user-button"
                            role="button"
                            type="submit"
                            onClick={onSubmit}
                          >
                            LOG IN
                          </Button>
                        </Col>
                        <Col className="user-link" sm={{ span: 9 }}>
                          Already have an account?&nbsp;
                          <Link to="/signin">
                            SIGN UP
                          </Link>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ user, globalerror }) => ({ user, error: globalerror }))(SignUp);
