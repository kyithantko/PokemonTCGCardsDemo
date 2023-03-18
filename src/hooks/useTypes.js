import {useQuery} from 'react-query';
import api from '../utils/api';

const useTypes = () => {
  const fetchTypes = async () => {
    const {data} = await api.get('/types');
    return data;
  };

  return useQuery('types', fetchTypes);
};

export default useTypes;
