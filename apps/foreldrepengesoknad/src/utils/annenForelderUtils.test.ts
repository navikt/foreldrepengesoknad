import { AnnenForelderOppgitt } from 'types/AnnenForelder';

import { BarnType } from '@navikt/fp-constants';
import { FellesUttaksplanDto, UfødtBarn, UttakPeriodeDto } from '@navikt/fp-types';

import {
    annenPartHarInnvilgetUttak,
    finnAnnenPartsPlan,
    finnAnnenPartsPlanSomPasserSøknaden,
} from './annenForelderUtils';

const lagPlan = (perioder: UttakPeriodeDto[]): FellesUttaksplanDto => ({
    annenPartRedigerbar: true,
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    perioder,
});

const resultat = (innvilget: boolean) => ({
    innvilget,
    trekkerDager: true,
    trekkerMinsterett: false,
    årsak: 'ANNET' as const,
});

const søkersVedtaksperiode: UttakPeriodeDto = {
    fom: '2024-01-01',
    tom: '2024-01-31',
    søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false, resultat: resultat(true) },
};

const annenPartsSøknadsperiode: UttakPeriodeDto = {
    fom: '2024-02-01',
    tom: '2024-02-29',
    annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
};

const annenPartsVedtaksperiode = (innvilget: boolean): UttakPeriodeDto => ({
    ...annenPartsSøknadsperiode,
    annenPart: { ...annenPartsSøknadsperiode.annenPart!, resultat: resultat(innvilget) },
});

describe('finnAnnenPartsPlan', () => {
    it('skal gi undefined når det ikke finnes noen plan eller bare søkerens perioder', () => {
        expect(finnAnnenPartsPlan(undefined)).toBeUndefined();
        expect(finnAnnenPartsPlan(null)).toBeUndefined();
        expect(finnAnnenPartsPlan(lagPlan([søkersVedtaksperiode]))).toBeUndefined();
    });

    it('skal gi planen når annen part har søkt, med eller uten vedtak', () => {
        for (const periode of [
            annenPartsSøknadsperiode,
            annenPartsVedtaksperiode(true),
            annenPartsVedtaksperiode(false),
        ]) {
            const plan = lagPlan([periode]);
            expect(finnAnnenPartsPlan(plan)).toBe(plan);
        }
    });
});

describe('annenPartHarInnvilgetUttak', () => {
    it('skal gi false når det ikke finnes noen plan eller bare søkerens perioder', () => {
        expect(annenPartHarInnvilgetUttak(undefined)).toBe(false);
        expect(annenPartHarInnvilgetUttak(lagPlan([søkersVedtaksperiode]))).toBe(false);
    });

    it('skal gi false når annen part bare har avslåtte perioder', () => {
        expect(annenPartHarInnvilgetUttak(lagPlan([søkersVedtaksperiode, annenPartsVedtaksperiode(false)]))).toBe(
            false,
        );
    });

    it('skal gi true når annen part har en ubehandlet søknad', () => {
        expect(annenPartHarInnvilgetUttak(lagPlan([annenPartsSøknadsperiode]))).toBe(true);
    });

    it('skal gi true når annen part har minst én innvilget periode', () => {
        expect(annenPartHarInnvilgetUttak(lagPlan([annenPartsVedtaksperiode(true)]))).toBe(true);
    });
});

describe('finnAnnenPartsPlanSomPasserSøknaden', () => {
    const annenForelder: AnnenForelderOppgitt = {
        kanIkkeOppgis: false,
        fornavn: 'Hans',
        etternavn: 'Olsen',
        fnr: '12345678910',
        erAleneOmOmsorg: false,
        harRettPåForeldrepengerINorge: true,
    };
    const barn: UfødtBarn = { type: BarnType.UFØDT, antallBarn: 1, termindato: '2024-01-15' };
    const vedtak = { ...lagPlan([annenPartsVedtaksperiode(true)]), termindato: '2024-01-15' };

    it('skal gi annen parts vedtak ved delt uttak og lik termindato', () => {
        expect(finnAnnenPartsPlanSomPasserSøknaden(vedtak, { dekningsgrad: '80', annenForelder, barn })).toBe(vedtak);
    });

    it('skal ikke gi annen parts vedtak når søkeren har aleneomsorg', () => {
        expect(
            finnAnnenPartsPlanSomPasserSøknaden(vedtak, {
                annenForelder: { ...annenForelder, erAleneOmOmsorg: true },
                barn,
            }),
        ).toBeUndefined();
    });

    it('skal ikke gi annen parts vedtak når annen part ikke har rett', () => {
        expect(
            finnAnnenPartsPlanSomPasserSøknaden(vedtak, {
                annenForelder: { ...annenForelder, harRettPåForeldrepengerINorge: false },
                barn,
            }),
        ).toBeUndefined();
    });

    it('skal ikke gi annen parts vedtak når søkeren oppgir en annen termindato', () => {
        expect(
            finnAnnenPartsPlanSomPasserSøknaden(vedtak, {
                annenForelder,
                barn: { ...barn, termindato: '2024-01-22' },
            }),
        ).toBeUndefined();
    });

    it('skal ikke gi annen parts ubehandlede plan når søkeren velger en annen dekningsgrad', () => {
        const plan = lagPlan([annenPartsSøknadsperiode]);
        expect(finnAnnenPartsPlanSomPasserSøknaden(plan, { dekningsgrad: '80', annenForelder, barn })).toBeUndefined();
        expect(finnAnnenPartsPlanSomPasserSøknaden(plan, { dekningsgrad: '100', annenForelder, barn })).toBe(plan);
    });
});
