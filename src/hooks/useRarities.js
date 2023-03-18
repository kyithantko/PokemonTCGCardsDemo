import {useQuery} from 'react-query';
import api from '../utils/api';

const useRarities = () => {
  const fetchRarities = async () => {
    const {data} = await api.get('/rarities');
    return data;
  };

  return useQuery('rarities', fetchRarities);
};

export default useRarities;
