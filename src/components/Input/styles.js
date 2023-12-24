import { StyleSheet } from 'react-native';

const InputStyles = StyleSheet.create({
  input: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'transparent',
  },
  buttonText: { color: '#646464' },
});

const OTPInputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontSize: 20,
    width: '15%',
    height: 50,
  },
  errorText: {
    color: 'red',
  },
});

export default InputStyles;
export { OTPInputStyles };
