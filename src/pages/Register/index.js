import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import Form from '../../components/molecules/Form';
import {colors, fonts, responsiveHeight} from '../../utils';
import {registerUser} from '../../actions/AuthAction';
import {connect} from 'react-redux';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: '',
        password: '',
      },
      errors: {},
    };
  }

  componentDidUpdate(prevProps) {
    const {registerResults} = this.props;
    if (registerResults && prevProps.registerResults !== registerResults) {
      this.props.navigation.navigate('Profile');
    }
  }

  validate = () => {
    const {form} = this.state;
    let newErrors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  _login = async _ => {
    const {form} = this.state;
    const findErrors = this.validate();
    console.log('errors', Object.values(findErrors));

    if (Object.values(findErrors).some(message => message !== '')) {
      this.setState({errors: findErrors});
    } else {
      if (this.props.registerError) {
        let newErrors = {};
        switch (this.props.registerError) {
          case 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).':
            newErrors.email = 'Email already in use';
            break;
          case 'Firebase: The email address is badly formatted. (auth/invalid-email).':
            newErrors.email = 'Invalid email';
            break;
          case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
            newErrors.password = 'Password should be at least 6 characters';
            break;
          default:
            newErrors.email = 'There is an error. Please try again';
            break;
        }

        this.setState({errors: newErrors});
      }

      await this.props.dispatch(registerUser(form));
    }
  };

  render() {
    const {form, errors} = this.state;
    const {registerLoading, navigation} = this.props;
    console.log('form', form);
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please fill this form to register</Text>
        <Form
          title="Register"
          loading={registerLoading}
          email={form.email}
          error={errors}
          onChangeEmail={email => this.setState({form: {...form, email}})}
          password={form.password}
          onChangePassword={password =>
            this.setState({form: {...form, password}})
          }
          onSubmit={() => this._login()}
        />
        <TouchableOpacity
          style={styles.register}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerTitle}>Already have an account?</Text>
          <Text style={styles.registerTitleActive}> Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  registerLoading: state.AuthReducer.registerLoading,
  registerResults: state.AuthReducer.registerResults,
  registerError: state.AuthReducer.registerError,
});

export default connect(mapStateToProps, null)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: responsiveHeight(60),
    paddingHorizontal: 16,
    backgroundColor: colors.background,
  },
  text: {
    fontFamily: fonts.sora.medium,
    fontSize: 16,
    color: colors.onBackground,
    marginBottom: 32,
  },
  register: {
    flexDirection: 'row',
    color: colors.onBackground,
    marginTop: 16,
  },
  registerTitle: {
    fontFamily: fonts.sora.regular,
    fontSize: 14,
    color: colors.onBackground,
  },
  registerTitleActive: {
    fontFamily: fonts.sora.semiBold,
    fontSize: 14,
    color: colors.primary,
  },
});
