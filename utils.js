import { Dimensions } from 'react-native';
import { SmallDeviceDimensions } from './constants/default-style';

export const isSmallDevice = () => {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    return (height > width && width <= SmallDeviceDimensions.width)
        || (height < width && height <= SmallDeviceDimensions.width)
};