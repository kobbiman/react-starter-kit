import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';
import { compose } from 'recompose';
import styled from 'styled-components';
import cx from 'classnames';
import { logoutUser } from 'actions/users';

const Wrapper = styled.div`
  margin-top: 50px;
`;

export class Header extends React.Component {
  renderAuthButton = () => {
    if (this.props.authenticated && this.props.user) {
      const { logoutUser, user }  = this.props;

      return (
        <div>
          <a className="ui yellow image label">
            <img src={require('images/avatars/avatar_seetha.png')} />
            {user.email}
            <div className="detail" onClick={logoutUser}>
              <i className="sign out icon" />
            </div>
          </a>
        </div>
      );
    }

    return (
      <Link to="/auth/login" className="item" activeClassName="active">
        Login / Register
      </Link>
    );
  }

  render() {
    return (
      <Wrapper>
        <div className="ui grey secondary pointing menu">
          <IndexLink to="/" className="item" activeClassName="active">
            Home
          </IndexLink>
          <Link to="about" className="item" activeClassName="active">
            About
          </Link>
          {this.props.authenticated && <Link to="dashboard" className="item" activeClassName="active">
            Dashboard
          </Link>}

          <div className="right menu">
            {this.renderAuthButton()}
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // Pick pieces of application state needed by <Header /> component
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    // Pick actions needed by <Header /> component
    logoutUser,
  }, dispatch),
  dispatch,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Header);
