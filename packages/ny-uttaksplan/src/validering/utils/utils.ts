import { uniqBy } from 'lodash';
import { IntlShape } from 'react-intl';

import { RegelAvvik } from '../../types/regelTypes';
import { guid } from '../../utils/guid';

const overstyresAvFilter = (avvik: RegelAvvik, _idx: number, alleAvvik: RegelAvvik[]): boolean => {
    return (
        avvik.regel.overstyresAvRegel === undefined &&
        alleAvvik.some((b2) => b2.regel.key === avvik.regel.overstyresAvRegel) === false
    );
};

const overstyrerAndreFilter = (avvik: RegelAvvik, _idx: number, alleAvvik: RegelAvvik[]): boolean => {
    const overstyresAvAndre = alleAvvik.some((rb) =>
        rb.regel.overstyrerRegler
            ? rb.regel.overstyrerRegler.some((rbo) => {
                  return rbo === avvik.regel.key;
              })
            : false,
    );
    return overstyresAvAndre === false;
};

export const trimRelaterteRegelAvvik = (avvik: RegelAvvik[], grupperAvvik: boolean): RegelAvvik[] => {
    return grupperAvvik
        ? uniqBy(avvik.filter(overstyresAvFilter).filter(overstyrerAndreFilter), (a) => {
              return a.regel.slåsSammenVedOppsummering ? a.regel.key : guid();
          })
        : avvik.filter(overstyresAvFilter).filter(overstyrerAndreFilter);
};

export const intlHasKey = (intl: IntlShape, key: string) => {
    // @ts-ignore Fiksar ikkje dynamisk kode sidan denne pakka fjernast snart
    return intl.messages[key] !== undefined;
};
