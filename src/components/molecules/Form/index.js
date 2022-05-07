import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../../atoms/Input';
import {colors, fonts} from '../../../utils';
import {IconEye, IconEyeClose} from '../../../assets';

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

  const [secure, setSecure] = useState(true);

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
          secureTextEntry={secure}
        />
        {secure ? (
          <IconEye onPress={() => setSecure(false)} />
        ) : (
          <IconEyeClose onPress={() => setSecure(true)} />
        )}
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
    marginTop: 16,
    fontFamily: fonts.sora.regular,
    fontSize: 14,
    color: colors.onBackground,
    textAlign: 'left',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.onPrimary,
    paddingLeft: 10,
    paddingRight: 40,
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
    color: colors.red,
    marginVertical: 8,
  },
});
