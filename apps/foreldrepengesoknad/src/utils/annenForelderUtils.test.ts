import { FellesUttaksplanDto, UttakPeriodeDto } from '@navikt/fp-types';

import { annenPartHarInnvilgetUttak, annenPartHarPlan, annenPartHarVedtak } from './annenForelderUtils';

const lagPlan = (perioder: UttakPeriodeDto[]): FellesUttaksplanDto => ({
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

    it('skal ikkje snevre inn false-greina til null | undefined', () => {
        const hentPlan = (): FellesUttaksplanDto | null | undefined => lagPlan([søkersVedtaksperiode]);
        const plan = hentPlan();
        expect(annenPartHarVedtak(plan)).toBe(false);
        if (annenPartHarVedtak(plan)) {
            expectTypeOf(plan).toExtend<FellesUttaksplanDto>();
        } else {
            expectTypeOf(plan).toEqualTypeOf<FellesUttaksplanDto | null | undefined>();
        }
    });
});

describe('annenPartHarPlan', () => {
    it('skal gi false når det ikke finnes noen plan eller bare søkerens perioder', () => {
        expect(annenPartHarPlan(undefined)).toBe(false);
        expect(annenPartHarPlan(lagPlan([søkersVedtaksperiode]))).toBe(false);
    });

    it('skal gi true når annen part har søkt, med eller uten vedtak', () => {
        expect(annenPartHarPlan(lagPlan([annenPartsSøknadsperiode]))).toBe(true);
        expect(annenPartHarPlan(lagPlan([annenPartsVedtaksperiode(true)]))).toBe(true);
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
