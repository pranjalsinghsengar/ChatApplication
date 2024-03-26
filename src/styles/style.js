import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    marginTop: 0,
  },
  flex: {
    display: 'flex',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyLeft: {
    justifyContent: 'left',
  },
  justifyRight: {
    justifyContent: 'right',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  itemsRight: {
    alignItems: 'right',
  },
  itemsLeft: {
    alignItems: 'left',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
});
