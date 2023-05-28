import NetInfo, {
  NetInfoCellularGeneration,
  NetInfoStateType,
} from '@react-native-community/netinfo';


  componentDidMount() {
 
    this.checkConnection(version);
  }


checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.type === NetInfoStateType.none) {
        this.showErrorInternetAlert('İnternet Bağlantınızı Kontrol Ediniz');
        this.setState({spinner: false});
      } else if (state.type === NetInfoStateType.wifi) {
        this.showErrorInternetAlert('Wifi Bağlantınızı Kapatınız');
        this.setState({spinner: false});
      } else if (state.type === NetInfoStateType.cellular) {
        switch (state.details.cellularGeneration) {
          case NetInfoCellularGeneration['2g']:
            this.showErrorInternetAlert('Bağlantınız Çok Yavaş (2g)');
            break;
          case NetInfoCellularGeneration['3g']:
          case NetInfoCellularGeneration['4g']:
            break;
          default:
            this.showErrorInternetAlert(
              'Bağlantınız Çok Yavaş (' +
                state.details.cellularGeneration +
                ')',
            );
        }
      } else {
        this.showErrorInternetAlert(
          'Sadece 3g-4.5g ile Bağlantı Kurabilirsiniz.',
        );
      }
    });
  };