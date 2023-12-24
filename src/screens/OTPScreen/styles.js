import { StyleSheet } from 'react-native';

const OTPScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  title: {
    color: '#444',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    color: '#444',
    fontSize: 14,
    marginBottom: 20,
  },
  verifyButton: {
    width: '50%',
  },
  wrapper: {
    flexDirection: 'row',
  },
  resendText: {
    color: '#888',
  },
  resendButton: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  resendButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OTPScreenStyles;
