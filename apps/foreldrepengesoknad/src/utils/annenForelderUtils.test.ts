import { FellesUttaksplanDto_fpoversikt, UttakPeriodeDto_fpoversikt } from '@navikt/fp-types';

import { annenPartHarInnvilgetUttak, annenPartHarVedtak } from './annenForelderUtils';

const lagPlan = (perioder: UttakPeriodeDto_fpoversikt[]): FellesUttaksplanDto_fpoversikt => ({
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

const søkersVedtaksperiode: UttakPeriodeDto_fpoversikt = {
    fom: '2024-01-01',
    tom: '2024-01-31',
    søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false, resultat: resultat(true) },
};

const annenPartsSøknadsperiode: UttakPeriodeDto_fpoversikt = {
    fom: '2024-02-01',
    tom: '2024-02-29',
    annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
};

const annenPartsVedtaksperiode = (innvilget: boolean): UttakPeriodeDto_fpoversikt => ({
    ...annenPartsSøknadsperiode,
    annenPart: { ...annenPartsSøknadsperiode.annenPart!, resultat: resultat(innvilget) },
});

describe('annenPartHarVedtak', () => {
    it('skal gi false når det ikkje finst nokon plan', () => {
        expect(annenPartHarVedtak(undefined)).toBe(false);
        expect(annenPartHarVedtak(null)).toBe(false);
    });

    it('skal gi false når berre søkjaren har vedtak', () => {
        expect(annenPartHarVedtak(lagPlan([søkersVedtaksperiode]))).toBe(false);
    });

    it('skal gi false når annan part berre har ein ubehandla søknad', () => {
        expect(annenPartHarVedtak(lagPlan([annenPartsSøknadsperiode]))).toBe(false);
    });

    it('skal gi true når annan part har vedtaksperiodar, også avslåtte', () => {
        expect(annenPartHarVedtak(lagPlan([annenPartsVedtaksperiode(false)]))).toBe(true);
    });
});

describe('annenPartHarInnvilgetUttak', () => {
    it('skal gi false når annan part berre har avslåtte periodar', () => {
        expect(annenPartHarInnvilgetUttak(lagPlan([søkersVedtaksperiode, annenPartsVedtaksperiode(false)]))).toBe(
            false,
        );
    });

    it('skal gi true når annan part har minst éin innvilga periode', () => {
        expect(annenPartHarInnvilgetUttak(lagPlan([annenPartsVedtaksperiode(true)]))).toBe(true);
    });
});
