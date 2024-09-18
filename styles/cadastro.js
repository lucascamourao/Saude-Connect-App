const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#0e0d0d',
    },
    input: {
      width: width * 0.8,
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    reactLogo: {
      width: 300,
      height: 150,
      resizeMode: 'contain',
      marginBottom: 30,
    },
    buttonContainer: {
      width: width * 0.8,
      height: 50,
      backgroundColor: '#007BFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    signupText: {
      marginTop: 20,
      fontSize: 16,
    },
    linkText: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
    formContainer: {
      width: width * 0.8,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    inputHalf: {
      width: '48%',
    },
  });
  
  export default styles;