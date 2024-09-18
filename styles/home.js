const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: '#fff',
    },
    searchBar: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 2,
      marginBottom: 10,
      paddingHorizontal: 8,
    },
    meuMapa: {
      height: 178,
      width: width * 0.9,
      alignSelf: 'center',
      marginTop: 10,
      resizeMode: 'contain',
    },
    list: {
      flexGrow: 1,
      marginVertical: 10,
    },
    reactLogo: {
      height: 178,
      width: 290,
      alignSelf: 'center',
      marginBottom: 10,
    },
    listItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginBottom: 10, 
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 16,
      marginVertical: 5,
    },
    detailsButton: {
      backgroundColor: '#3498db',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginRight: 10, 
    },
    detailsButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    routeButton: {
      backgroundColor: '#2ecc71',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    routeButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    emptyMessage: {
      textAlign: 'center',
      fontSize: 16,
      color: 'gray',
    },
    footerMessage: {
      textAlign: 'center',
      fontSize: 16,
      color: 'gray',
    },
  });
  
  export default styles;