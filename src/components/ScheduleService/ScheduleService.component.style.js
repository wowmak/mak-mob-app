import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ff4d4d',
  },
  childcontainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ff4d4d',
  },
  heading:{
    color: 'blue',
    fontSize: 18,
    marginBottom: 7,
    fontWeight: '600'
  }
});