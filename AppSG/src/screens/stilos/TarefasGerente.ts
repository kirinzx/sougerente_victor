import {StyleSheet} from 'react-native';

const stilos = StyleSheet.create({
  page: {
    backgroundColor: '#CB8D00',
    flex: 1,
  },

  icons: {
    width: 22,
    height: 22,
  },

  blockLoja: {
    backgroundColor: '#CB8D00',
    height: 28,
    borderRadius: 30,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  textLimite: {
    backgroundColor: 'white',
    width: 20,
    height: 28,
    borderRadius: 30,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  textRepet: {
    fontSize: 27,
    fontFamily: 'OpenSans-ExtraBold',
    color: '#CB8D00',
    marginRight: 6,
    marginTop: -3,
  },

  textTitleObs: {
    marginLeft: 15,
    marginTop: -20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },

  textObs: {
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  cardExtentedLeft: {
    marginTop: -5,
    marginLeft: 8,
    width: '95%',
    height: 90,
    backgroundColor: '#DFDFDE',
    color: 'black',
    borderRadius: 20,
  },

  task: {
    color: 'black',
    justifyContent: 'center',
    marginTop: 5,
  },

  textCardSelect: {
    backgroundColor: '#39AF31',
    borderColor: 'white',
    borderWidth: 1,
    width: 100,
    height: 28,
    borderRadius: 30,
    marginRight: 7,
    marginLeft: 10,
    marginTop: -1,
    alignItems: 'center',
  },

  btnCancel: {
    backgroundColor: '#eb4034',
    borderColor: 'white',
    borderWidth: 1,
    width: 100,
    height: 28,
    borderRadius: 30,
    marginRight: 7,
    marginLeft: 10,
    marginTop: -1,
    alignItems: 'center',
  },

  iconeModalPic: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    width: 45,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
  },

  btnConfirm: {
    backgroundColor: '#39AF31',
    borderColor: 'white',
    borderWidth: 1,
    width: 100,
    height: 28,
    borderRadius: 30,
    marginRight: 7,
    marginLeft: 10,
    marginTop: -1,
    alignItems: 'center',
  },

  textRnd: {
    fontSize: 17,
    fontFamily: 'OpenSans-Bold',
    color: 'black',
  },

  titleTask: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-ExtraBold',
    textAlign: 'left',
    marginLeft: 20,
  },

  shadowProp: {
    shadowColor: '#757575',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },

  paddingD: {
    paddingHorizontal: 5,
    marginLeft: 3,
  },

  centeredView: {
    backgroundColor: '#000000AA',
    height: '100%',
    paddingTop: 60,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    height: '40%',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  inputModal: {
    fontSize: 18,
    padding: 10,
    marginLeft: '5%',
    backgroundColor: '#f5f5f5',
    marginTop: 15,
    borderRadius: 20,
    width: '90%',
    height: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  btnPic: {
    position: 'absolute',
    bottom: 20,
    left: 125,
    width: 70,
    height: 70,
    backgroundColor: '#FFF',
    borderRadius: 50,
  },

  iconPic: {
    top: '8%',
    left: '7%',
    borderWidth: 2,
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  swapPic: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(115, 115, 115,0.7)',
    borderRadius: 50,
  },
});

export default stilos;
