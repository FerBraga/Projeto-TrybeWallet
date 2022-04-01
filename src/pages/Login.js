import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userInfo } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      isEnterBtnDisable: true,
    };
  }

  handleClick = (event) => {
    const { history, dispatchLogin } = this.props;
    const { email } = this.state;
    event.preventDefault();
    dispatchLogin(email);
    history.push('/carteira');
  }

   handleInput = ({ target: { name, value } }) => {
     this.setState({
       [name]: value,
     }, this.validation);
   }

   validation = () => {
     const { senha } = this.state;
     const minSix = 6;
     const senhaMin = senha.length >= minSix;
     if (this.validateEmail() && senhaMin) {
       this.setState({ isEnterBtnDisable: false });
     } else {
       this.setState({ isEnterBtnDisable: true });
     }
   }

   validateEmail() {
     const { email } = this.state;
     const re = /\S+@\S+\.\S+/;
     if (re.test(email)) {
       return true;
     }
   }

   render() {
     const { email, senha, isEnterBtnDisable } = this.state;
     return (
       <>
         <h1>Login</h1>
         <input
           name="email"
           data-testid="email-input"
           type="text"
           placeholder="insira seu e-mail"
           onChange={ this.handleInput }
           value={ email }
         />
         <br />
         <br />
         <input
           name="senha"
           data-testid="password-input"
           type="text"
           placeholder="insira sua senha"
           onChange={ this.handleInput }
           value={ senha }
         />
         <br />
         <br />
         <button
           disabled={ isEnterBtnDisable }
           type="button"
           onClick={ this.handleClick }
         >
           Entrar
         </button>
       </>
     );
   }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (state) => dispatch(userInfo(state)),
});

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
