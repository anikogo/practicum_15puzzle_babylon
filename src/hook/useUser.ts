import { useSelector } from 'react-redux';

import makeDataSelector from '../utils/makeDataSelector';

const userSelector = makeDataSelector('user');

export default function useUser() {
  return useSelector(userSelector);
}
