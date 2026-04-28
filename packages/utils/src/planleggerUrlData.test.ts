import { describe, expect, it } from 'vitest';

import {
    PLANLEGGER_DATA_QUERY_PARAM,
    appendPlanleggerDataToUrl,
    decodePlanleggerData,
    encodePlanleggerData,
    readPlanleggerDataFromQuery,
} from './planleggerUrlData';

describe('planleggerUrlData', () => {
    const sample = {
        hvemPlanlegger: { type: 'morOgFar', navnPåMor: 'Åse', navnPåFar: 'Bjørn' },
        omBarnet: { erFødsel: true, antallBarn: 1 },
    };

    it('encodePlanleggerData og decodePlanleggerData er inverse', () => {
        const encoded = encodePlanleggerData(sample);
        expect(decodePlanleggerData(encoded)).toEqual(sample);
    });

    it('decodePlanleggerData returnerer null for ugyldig input', () => {
        expect(decodePlanleggerData('!!ikke-base64!!')).toBeNull();
        expect(decodePlanleggerData(encodePlanleggerData('foo').slice(0, 2))).toBeNull();
    });

    it('appendPlanleggerDataToUrl legger til query-parameter på URL uten eksisterende query', () => {
        const url = appendPlanleggerDataToUrl('https://nav.no/start/soknad-foreldrepenger', sample);
        expect(url).toContain(`?${PLANLEGGER_DATA_QUERY_PARAM}=`);
        expect(readPlanleggerDataFromQuery(new URL(url).search)).toEqual(sample);
    });

    it('appendPlanleggerDataToUrl bevarer eksisterende query-parametere', () => {
        const url = appendPlanleggerDataToUrl('https://nav.no/x?lang=nb', sample);
        expect(url).toContain('lang=nb');
        expect(url).toContain(`&${PLANLEGGER_DATA_QUERY_PARAM}=`);
        expect(readPlanleggerDataFromQuery(new URL(url).search)).toEqual(sample);
    });

    it('readPlanleggerDataFromQuery returnerer null når parameter mangler', () => {
        expect(readPlanleggerDataFromQuery('')).toBeNull();
        expect(readPlanleggerDataFromQuery('?annet=verdi')).toBeNull();
    });
});
