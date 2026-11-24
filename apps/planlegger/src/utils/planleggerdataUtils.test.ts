import { ContextDataType } from 'appData/PlanleggerDataContext';
import { HvemPlanleggerType } from 'types/HvemPlanlegger';

import { compressToUrl } from '@navikt/fp-utils';

import { lesPlanleggerdataFraUrl } from './planleggerdataUtils';

const tilUrl = (verdi: unknown) => compressToUrl(JSON.stringify(verdi));

describe('lesPlanleggerdataFraUrl', () => {
    it('skal gi ny plan uten melding når lenken ikke har data', () => {
        expect(lesPlanleggerdataFraUrl(null)).toEqual({ data: undefined, lenkeErUgyldig: false });
    });

    it('skal lese gyldige data fra lenken', () => {
        const data = {
            [ContextDataType.HVEM_PLANLEGGER]: { type: HvemPlanleggerType.MOR_OG_FAR, navnPåMor: 'Helga' },
            [ContextDataType.OM_BARNET]: {
                erFødsel: true,
                antallBarn: '1',
                erBarnetFødt: false,
                termindato: '2026-06-01',
            },
            [ContextDataType.HVOR_MYE]: { lønnSøker1: '1000' },
            [ContextDataType.UTTAKSPLAN]: [
                { fom: '2026-06-01', tom: '2026-06-12', søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE' } },
            ],
        };

        expect(lesPlanleggerdataFraUrl(tilUrl(data))).toEqual({ data, lenkeErUgyldig: false });
    });

    it('skal gjøre om uttaksplan i gammelt flatt format', () => {
        const resultat = lesPlanleggerdataFraUrl(
            tilUrl({
                [ContextDataType.UTTAKSPLAN]: [
                    { fom: '2026-06-01', tom: '2026-06-12', forelder: 'MOR', kontoType: 'MØDREKVOTE' },
                ],
            }),
        );

        expect(resultat.lenkeErUgyldig).toBe(false);
        expect(resultat.data?.[ContextDataType.UTTAKSPLAN]).toEqual([
            {
                fom: '2026-06-01',
                tom: '2026-06-12',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: undefined },
            },
        ]);
    });

    it('skal gi ny plan med melding når lenken ikke kan dekodes', () => {
        expect(lesPlanleggerdataFraUrl('%%%ikke-gyldig%%%')).toEqual({ data: undefined, lenkeErUgyldig: true });
    });

    it.each([
        ['null', null],
        ['liste', []],
        ['tekst', 'tekst'],
        ['uttaksplan som objekt', { [ContextDataType.UTTAKSPLAN]: {} }],
        ['periode som er null', { [ContextDataType.UTTAKSPLAN]: [null] }],
        ['periode uten datoer', { [ContextDataType.UTTAKSPLAN]: [{ forelder: 'MOR' }] }],
        ['ukjent hvem planlegger', { [ContextDataType.HVEM_PLANLEGGER]: { type: 'ukjent' } }],
        [
            'navn som ikke er tekst',
            { [ContextDataType.HVEM_PLANLEGGER]: { type: HvemPlanleggerType.MOR_OG_FAR, navnPåMor: 123 } },
        ],
        ['om barnet som tekst', { [ContextDataType.OM_BARNET]: 'barn' }],
        ['arbeidssituasjon som null', { [ContextDataType.ARBEIDSSITUASJON]: null }],
        ['fordeling som liste', { [ContextDataType.FORDELING]: [] }],
    ])('skal gi ny plan med melding når lenken har gyldig JSON med feil form: %s', (_, verdi) => {
        expect(lesPlanleggerdataFraUrl(tilUrl(verdi))).toEqual({ data: undefined, lenkeErUgyldig: true });
    });
});
