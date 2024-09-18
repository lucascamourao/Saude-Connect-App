const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 16,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 20,
    },
    info: {
      fontSize: 18,
      color: '#34495e',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2980b9',
      marginTop: 20,
      marginBottom: 10,
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
    },
    avaliacaoCard: {
      backgroundColor: '#ecf0f1',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    avaliacaoNota: {
      fontSize: 20,
      color: '#000000', 
    },
    avaliacaoDescricao: {
      fontSize: 17, 
      color: '#000000',
    },
    emptyMessage: {
      fontSize: 16,
      textAlign: 'center',
      color: 'gray',
    },
    errorText: {
      fontSize: 18,
      color: 'red',
      textAlign: 'center',
    },
  });
  
  export default styles;