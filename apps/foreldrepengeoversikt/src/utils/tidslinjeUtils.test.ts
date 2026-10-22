import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { FellesUttaksplanDto, UttakDto } from '@navikt/fp-types';

import { Foreldrepengesak } from '../types/Sak.ts';
import { Tidslinjehendelse2 } from '../types/Tidslinjehendelse.ts';
import {
    finnesDetFremtidigeTidslinjehendelser,
    getAlleTidslinjehendelser,
    getTidligstBehandlingsDatoForTidligSøknad,
} from './tidslinjeUtils.ts';

const lagHendelse = (
    opprettet: string,
    utvidetTidslinjeHendelseType: Tidslinjehendelse2['utvidetTidslinjeHendelseType'] = 'FØRSTEGANGSSØKNAD',
): Tidslinjehendelse2 => ({
    opprettet,
    utvidetTidslinjeHendelseType,
    aktørType: 'BRUKER',
    dokumenter: [],
});

describe('finnesDetFremtidigeTidslinjehendelser', () => {
    it('skal returnere false når alle hendelser er tilbake i tid', () => {
        const hendelser = [
            lagHendelse(dayjs().subtract(2, 'y').toISOString()),
            lagHendelse(dayjs().subtract(1, 'y').toISOString()),
        ];

        expect(finnesDetFremtidigeTidslinjehendelser(hendelser)).toBe(false);
    });

    it('skal returnere true når minst én hendelse er frem i tid, f.eks. barnet fyller 3 år', () => {
        const hendelser = [
            lagHendelse(dayjs().subtract(1, 'y').toISOString()),
            lagHendelse(dayjs().add(1, 'y').toISOString(), 'BARNET_TRE_ÅR'),
        ];

        expect(finnesDetFremtidigeTidslinjehendelser(hendelser)).toBe(true);
    });

    it('skal returnere false for tom liste', () => {
        expect(finnesDetFremtidigeTidslinjehendelser([])).toBe(false);
    });
});

const lagUttak = (innvilget?: boolean): UttakDto => ({
    flerbarnsdager: false,
    forelder: 'MOR',
    kontoType: 'MØDREKVOTE',
    resultat:
        innvilget === undefined
            ? undefined
            : { innvilget, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
});

const lagPlan = (perioder: FellesUttaksplanDto['perioder']): FellesUttaksplanDto => ({
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    perioder,
});

const fpSak = {
    ytelse: 'FORELDREPENGER',
    saksnummer: '1',
    sakAvsluttet: false,
    kanSøkeOmEndring: true,
    sakTilhørerMor: true,
    gjelderAdopsjon: false,
    morUføretrygd: false,
    rettighetType: 'BEGGE_RETT',
    forelder: 'MOR',
    oppdatertTidspunkt: '2024-01-01',
    familiehendelse: { fødselsdato: '2024-01-01', antallBarn: 1 },
    gjeldendeVedtak: { perioder: [] },
} satisfies Foreldrepengesak;

describe('getTidligstBehandlingsDatoForTidligSøknad', () => {
    it('skal bruke søkerens tidligste periode i felles uttaksplan og se bort fra annen parts perioder', () => {
        const plan = lagPlan([
            { fom: '2026-03-02', tom: '2026-03-13', søker: lagUttak() },
            { fom: '2026-01-05', tom: '2026-02-27', annenPart: lagUttak() },
            { fom: '2026-02-02', tom: '2026-02-27', søker: lagUttak() },
        ]);

        expect(getTidligstBehandlingsDatoForTidligSøknad(fpSak, plan)).toBe('2026-01-05');
    });

    it('skal returnere undefined når felles uttaksplan mangler', () => {
        expect(getTidligstBehandlingsDatoForTidligSøknad(fpSak, undefined)).toBeUndefined();
    });
});

describe('getAlleTidslinjehendelser - avslått foreldrepengesøknad', () => {
    const barnFraSak = { alleBarnaLever: true, fornavn: undefined, fødselsdatoer: ['2024-01-01'] };

    const harBarnetTreÅrHendelse = (sak: Foreldrepengesak, fellesUttaksplan: FellesUttaksplanDto | undefined) =>
        getAlleTidslinjehendelser({
            tidslinjeHendelserBackend: [],
            sak,
            barnFraSak,
            fellesUttaksplan,
            intl: {} as IntlShape,
        }).some((h) => h.utvidetTidslinjeHendelseType === 'BARNET_TRE_ÅR');

    it('skal ikke vise 3-årshendelse når alle søkerens vedtatte perioder er avslått', () => {
        const plan = lagPlan([
            { fom: '2024-01-01', tom: '2024-02-01', søker: lagUttak(false) },
            { fom: '2024-02-02', tom: '2024-03-01', annenPart: lagUttak(true) },
        ]);
        expect(harBarnetTreÅrHendelse(fpSak, plan)).toBe(false);
    });

    it('skal vise 3-årshendelse når minst én av søkerens vedtatte perioder er innvilget', () => {
        const plan = lagPlan([
            { fom: '2024-01-01', tom: '2024-02-01', søker: lagUttak(false) },
            { fom: '2024-02-02', tom: '2024-03-01', søker: lagUttak(true) },
        ]);
        expect(harBarnetTreÅrHendelse(fpSak, plan)).toBe(true);
    });

    it('skal ikke regne søknaden som avslått uten vedtak, uten søkerperioder eller før planen er lastet', () => {
        const plan = lagPlan([{ fom: '2024-01-01', tom: '2024-02-01', søker: lagUttak(false) }]);
        const planUtenSøker = lagPlan([{ fom: '2024-01-01', tom: '2024-02-01', annenPart: lagUttak(true) }]);
        expect(harBarnetTreÅrHendelse({ ...fpSak, gjeldendeVedtak: undefined }, plan)).toBe(true);
        expect(harBarnetTreÅrHendelse(fpSak, planUtenSøker)).toBe(true);
        expect(harBarnetTreÅrHendelse(fpSak, undefined)).toBe(true);
    });
});
