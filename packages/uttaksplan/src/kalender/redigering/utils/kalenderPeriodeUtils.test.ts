import { describe, expect, it } from 'vitest';

import { PeriodeDto_fpoversikt } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';

import { finnValgtePerioder } from './kalenderPeriodeUtils';

describe('finnValgtePerioder', () => {
    it('skal ikke slå sammen foreldrepenger uten og med aktivitetskrav til én periode (kun far har rett)', () => {
        const utenAktivitetskrav: PeriodeDto_fpoversikt = {
            fom: '2024-01-01',
            tom: '2024-01-05',
            søker: {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: 'IKKE_OPPGITT',
                flerbarnsdager: false,
            },
        };
        const medAktivitetskrav: PeriodeDto_fpoversikt = {
            fom: '2024-01-08',
            tom: '2024-01-12',
            søker: {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FORELDREPENGER',
                morsAktivitet: undefined,
                flerbarnsdager: false,
            },
        };

        const valgtePerioder: CalendarPeriod[] = [{ fom: '2024-01-01', tom: '2024-01-12', color: 'BLUE', srText: '' }];

        const resultat = finnValgtePerioder(valgtePerioder, [utenAktivitetskrav, medAktivitetskrav]);

        expect(resultat).toHaveLength(2);
        const aktivitetsfri = resultat.find((p) => p.søker?.morsAktivitet === 'IKKE_OPPGITT');
        const medKrav = resultat.find((p) => p.søker?.morsAktivitet === undefined);
        expect(aktivitetsfri?.valgteDagerIPeriode).toBe(5);
        expect(medKrav?.valgteDagerIPeriode).toBe(5);
    });
});
