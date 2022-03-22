import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts, responsiveHeight} from '../../../utils';
import Form from '../../molecules/Form';
import {connect} from 'react-redux';
import {loginUser} from '../../../actions/AuthAction';

const Login = props => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [Error, setError] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const _login = async _ => {
    const findErrors = validate();
    console.log('error', Object.values(findErrors));

    if (Object.values(findErrors).some(message => message !== '')) {
      setError(findErrors);
    } else {
      if (props.loginError) {
        let newErrors = {};
        switch (props.loginError) {
          case 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).':
            newErrors.email = 'Email not registered';
            break;
          case 'Firebase: The email address is badly formatted. (auth/invalid-email).':
            newErrors.email = 'Invalid email';
            break;
          case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
            newErrors.password = 'Password should be at least 6 characters';
            break;
          case 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).':
            newErrors.password = 'The password is invalid';
            break;
          default:
            newErrors.email = 'There is an error. Please try again';
            break;
        }

        setError(newErrors);
      }

      await props.dispatch(loginUser(form));
    }
  };

  //   console.log('errorLogin', Error);
  //   console.log('success', props.loginResults);
  //   console.log('loading', props.loginLoading);
  //   console.log('form', form);

  const onPressHandleProps = value => {
    props.handleProps(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please login to personalize this app</Text>
      <Form
        title="Login"
        loading={props.loginLoading}
        email={form.email}
        error={Error}
        onChangeEmail={email => setForm({...form, email})}
        password={form.password}
        onChangePassword={password => setForm({...form, password})}
        onSubmit={() => _login()}
      />
      <TouchableOpacity
        style={styles.register}
        onPress={() => onPressHandleProps('toRegister')}>
        <Text style={styles.registerTitle}>Don't have an account?</Text>
        <Text style={styles.registerTitleActive}> Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResults: state.AuthReducer.loginResults,
  loginError: state.AuthReducer.loginError,
});

export default connect(mapStateToProps, null)(Login);

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(60),
    marginBottom: 50,
  },
  text: {
    fontFamily: fonts.sora.medium,
    fontSize: 16,
    color: colors.onBackground,
    marginBottom: 16,
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
