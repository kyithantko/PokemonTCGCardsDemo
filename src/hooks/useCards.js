import {useInfiniteQuery} from 'react-query';
import api from '../utils/api';

const useCards = () => {
  const fetchCards = async ({pageParam = 1}) => {
    const pageSize = 12;
    const {data} = await api.get(
      `/cards?page=${pageParam}&pageSize=${pageSize}`,
    );
    return data;
  };

  return useInfiniteQuery('cards', fetchCards, {
    getNextPageParam: lastPage => {
      return lastPage.page + 1;
    },
  });
};

export default useCards;
