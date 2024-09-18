const styles = StyleSheet.create({
    headerImage: {
      flex: 1,
      height: 200,
      width: 400,
      alignSelf: 'center',
    },
    titleContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    userContainer: {
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    userInfoCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      padding: 15,
      borderRadius: 10,
      width: width * 0.9,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
    },
    info: {
      fontSize: 18,
      marginLeft: 10,
      fontWeight: 'bold',
    },
    emptyMessage: {
      textAlign: 'center',
      fontSize: 16,
      color: 'gray',
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#d9534f',
      padding: 10,
      borderRadius: 8,
      marginTop: 20,
      width: width * 0.4,
      justifyContent: 'center',
    },
    logoutButtonText: {
      color: 'white',
      marginLeft: 5,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default styles;