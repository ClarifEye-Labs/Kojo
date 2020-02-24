import { colors, dimens } from "../constants";

const commonStyling = {
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor : colors.offWhite
  },
  backButtonStyling:{
    position: 'absolute',
    top: 50,
    left: 25
  },
  crossStyle:{
    position: 'absolute',
    top: dimens.crossTop,
    right: dimens.crossRight
  }
}

export default commonStyling