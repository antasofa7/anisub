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
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={styles.title}>
          {loading ? <ActivityIndicator /> : title}
        </Text>
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
  },
  input: {
    backgroundColor: colors.onPrimary,
    paddingHorizontal: 10,
    marginTop: 12,
    borderRadius: 10,
  },
  btn: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 30,
    marginTop: 24,
  },
  title: {
    fontFamily: fonts.sora.semiBold,
    fontSize: 16,
    color: colors.onPrimary,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  error: {
    fontFamily: fonts.sora.light,
    fontSize: 12,
    color: '#FF0000',
    marginVertical: 8,
  },
});