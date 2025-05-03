import {create} from 'zustand';
import { fetchSpeciesData, fetchSeaUrchinData ,fetchKelpData ,fetchDiveSites} from '../api';

const useSpeciesStore = create((set) => ({
  data: {},
  fetchData: async (species) => {
    let result = [];
    if (species === 'kelp') {
      result = await fetchKelpData();
    } else if (species==='sea-urchin'){
        result = await fetchSeaUrchinData();
    }else if (species==='dive-sites'){
        result = await fetchDiveSites();
    }
    else {
      result = await fetchSpeciesData(species);
    }

    set((state) => ({
      data: {
        ...state.data,
        [species]: result
      }
    }));
  }
}));

export default useSpeciesStore;