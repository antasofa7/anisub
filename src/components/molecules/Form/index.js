import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Input from '../../atoms/Input';
import {colors, fonts} from '../../../utils';
import {useNavigation} from '@react-navigation/native';

const Form = props => {
  const {
    title,
    email,
    onChangeEmail,
    password,
    onChangePassword,
    onSubmit,
    loading,
    error,
  } = props;
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.label}>Email</Text>
      <View style={styles.input}>
        <Input
          value={email}
          onChangeText={onChangeEmail}
          placeholder="Please input your email"
          keyboardType="email-address"
        />
      </View>
      {error.email ? <Text style={styles.error}>{error.email}</Text> : null}
      {title !== 'Reset' && (
        <>
          <Text style={styles.label}>Password</Text>
          <View style={styles.input}>
            <Input
              value={password}
              onChangeText={onChangePassword}
              placeholder="Please input your password"
              secureTextEntry={true}
            />
          </View>
          {error.password ? (
            <Text style={styles.error}>{error.password}</Text>
          ) : null}
        </>
      )}
      {title === 'Login' && (
        <TouchableOpacity
          style={styles.forgot}
          onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.btnSubmit} onPress={onSubmit}>
        <Text style={styles.title}>
          {loading ? <ActivityIndicator /> : title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation.goBack()}>
        <Text style={styles.titleBack}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.sora.regular,
    fontSize: 14,
    color: colors.onBackground,
    textAlign: 'left',
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.onPrimary,
    paddingHorizontal: 10,
    marginTop: 12,
    borderRadius: 10,
  },
  btnSubmit: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 30,
    marginTop: 24,
  },
  btnBack: {
    width: '100%',
    padding: 12,
    borderRadius: 30,
    marginTop: 16,
  },
  title: {
    fontFamily: fonts.sora.semiBold,
    fontSize: 16,
    color: colors.onPrimary,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  titleBack: {
    fontFamily: fonts.sora.medium,
    fontSize: 16,
    color: colors.onBackground,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  error: {
    fontFamily: fonts.sora.light,
    fontSize: 12,
    color: colors.red,
    marginVertical: 8,
  },
  forgot: {
    fontFamily: fonts.sora.light,
    fontSize: 12,
    color: colors.primary,
    marginTop: 8,
    textAlign: 'right',
  },
});
