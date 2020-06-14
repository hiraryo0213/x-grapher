import { atomFamily, selectorFamily, useRecoilValue } from 'recoil';
import { Covid19CommunityMobilityReports, Prefectures } from '~/data';
import TimeUtilities from '~/utilities/time';
import { currentDateState } from './currentDate';
import { currentGraphSourceState } from './currentGraphSource';

export const prefectureGraphDataState = atomFamily({
  key: 'prefectureGraphData',
  default: async (code: Prefectures.Constants.Codes) => {
    const json = await Covid19CommunityMobilityReports.getJson();

    return {
      name: Prefectures.Constants.Names[code].ja,
      // ...json[code].filter((row) => row.date === TimeUtilities.parseISOYYYYMMDDString(currentDate))[0],
      data: json[code],
    };
  },
});

export const selectedPrefectureGraphDataState = selectorFamily({
  key: 'selectedPrefecuterGraphData',
  get: (code: Prefectures.Constants.Codes) => async ({ get }) => {
    const { data } = get(prefectureGraphDataState(code));
    const currentDate = get(currentDateState);
    const currentGraphSource = get(currentGraphSourceState);

    return {
      name: Prefectures.Constants.Names[code].ja,
      // value: data[currentGraphSource],
      value: data.filter((row) => row.date === TimeUtilities.parseISOYYYYMMDDString(currentDate))[0][
        currentGraphSource
      ],
    };
  },
});
