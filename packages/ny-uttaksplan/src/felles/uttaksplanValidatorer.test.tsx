import { renderHook } from '@testing-library/react';
import dayjs from 'dayjs';
import { ComponentProps, ReactNode } from 'react';
import { IntlProvider, createIntl, createIntlCache } from 'react-intl';
import { describe, expect, it } from 'vitest';

import { BarnType, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { UttaksdagenString } from '@navikt/fp-utils';

import { UttaksplanDataProvider } from '../context/UttaksplanDataContext';
import messages from '../intl/messages/nb_NO.json';
import { LeggTilEllerEndrePeriodeFormFormValues } from './LeggTilEllerEndrePeriodeFellesForm';
import {
    kanMisteDagerVedEndringTilFerie,
    prosentValideringGradering,
    useFormSubmitValidator,
    valideringSamtidigUttak,
} from './uttaksplanValidatorer';

const cache = createIntlCache();
const intlMock = createIntl(
    {
        locale: 'nb',
        defaultLocale: 'nb',
        messages,
    },
    cache,
);

describe('prosentValideringGradering', () => {
    it('skal returnere påkrevd-feilmelding når verdi er tom', () => {
        const validator = prosentValideringGradering(intlMock, undefined);
        expect(validator('')).toBe('Du må oppgi stillingsprosenten du skal jobbe');
    });

    it('skal returnere feilmelding når stillingsprosent ikke er et tall', () => {
        const validator = prosentValideringGradering(intlMock, undefined);
        expect(validator('abc')).toBe('Stillingsprosenten må være et tall');
    });

    it('skal returnere feilmelding når tallet ikke er større enn 0', () => {
        const validator = prosentValideringGradering(intlMock, undefined);
        expect(validator('0')).toBe('Stillingsprosenten må være et tall større enn 0');
    });

    it('skal returnere feilmelding når tallet er større enn 100', () => {
        const validator = prosentValideringGradering(intlMock, undefined);
        expect(validator('100')).toBe('Stillingsprosenten må være et tall mindre enn 100');
    });

    it('skal returnere feilmelding når stillingsprosent + samtidiguttaksprosent > 100', () => {
        const validator = prosentValideringGradering(intlMock, '60');
        expect(validator('50')).toBe('Stillingsprosent og samtidig uttak kan ikke utgjøre mer enn 100 % sammenlagt');
    });

    it('skal returnere undefined når verdi er gyldig', () => {
        const validator = prosentValideringGradering(intlMock, '20');
        expect(validator('30')).toBeUndefined();
    });
});

describe('valideringSamtidigUttak', () => {
    it('skal returnere påkrevd-feilmelding når verdi er tom', () => {
        const validator = valideringSamtidigUttak(intlMock, undefined);
        expect(validator('')).toBe('Du må oppgi prosenten med samtidig uttak');
    });

    it('skal returnere feilmelding når stillingsprosent ikke er et tall', () => {
        const validator = valideringSamtidigUttak(intlMock, undefined);
        expect(validator('abc')).toBe('Prosenten må være et tall');
    });

    it('skal returnere feilmelding når tallet ikke er større enn 0', () => {
        const validator = valideringSamtidigUttak(intlMock, undefined);
        expect(validator('0')).toBe('Prosenten må være et tall større enn 0');
    });

    it('sskal returnere feilmelding når tallet er større enn 100', () => {
        const validator = valideringSamtidigUttak(intlMock, undefined);
        expect(validator('101')).toBe('Prosenten må være et tall mindre eller lik 100');
    });

    it('skal returnere feilmelding når stillingsprosent + samtidiguttaksprosent > 100', () => {
        const validator = valideringSamtidigUttak(intlMock, '70');
        expect(validator('40')).toBe('Stillingsprosent og samtidig uttak kan ikke utgjøre mer enn 100 % sammenlagt');
    });

    it('skal returnere undefined når verdi er gyldig', () => {
        const validator = valideringSamtidigUttak(intlMock, '30');
        expect(validator('40')).toBeUndefined();
    });
});

describe('kanMisteDagerVedEndringTilFerie', () => {
    const familiehendelsedato = dayjs().format(ISO_DATE_FORMAT);

    it('skal returnere true dersom noen perioder er innenfor intervallet 6 uker etter familiehendelsedato', () => {
        const perioder = [
            { fom: familiehendelsedato, tom: dayjs(familiehendelsedato).add(10, 'day').format(ISO_DATE_FORMAT) },
        ];
        expect(kanMisteDagerVedEndringTilFerie(perioder, familiehendelsedato)).toBe(true);
    });

    it('skal returnere true dersom noen perioder er innenfor intervallet 3 uker før familiehendelsedato', () => {
        const perioder = [
            {
                fom: dayjs(familiehendelsedato).subtract(10, 'day').format(ISO_DATE_FORMAT),
                tom: dayjs(familiehendelsedato).subtract(5, 'day').format(ISO_DATE_FORMAT),
            },
        ];
        expect(kanMisteDagerVedEndringTilFerie(perioder, familiehendelsedato)).toBe(true);
    });

    it('skal returnere false dersom ingen perioder overlapper intervallene', () => {
        const perioder = [
            {
                fom: dayjs(familiehendelsedato).subtract(30, 'day').format(ISO_DATE_FORMAT),
                tom: dayjs(familiehendelsedato).subtract(25, 'day').format(ISO_DATE_FORMAT),
            },
        ];
        expect(kanMisteDagerVedEndringTilFerie(perioder, familiehendelsedato)).toBe(false);
    });
});

const FAMILIEHENDELSESDATO = '2026-01-20';

const DEFAULT_DATA = {
    foreldreInfo: {
        søker: 'MOR',
        rettighetType: 'BEGGE_RETT',
        erMedmorDelAvSøknaden: false,
        navnPåForeldre: { farMedmor: 'Far Medmor', mor: 'Mor' },
    },
    valgtStønadskonto: {
        kontoer: [
            { konto: 'MØDREKVOTE', dager: 100 },
            { konto: 'FEDREKVOTE', dager: 100 },
            { konto: 'FELLESPERIODE', dager: 100 },
            { konto: 'FORELDREPENGER', dager: 100 },
            { konto: 'FORELDREPENGER_FØR_FØDSEL', dager: 100 },
            { konto: 'AKTIVITETSFRI_KVOTE', dager: 100 },
        ],
        minsteretter: {
            farRundtFødsel: 10,
            toTette: 14,
        },
    },
    barn: {
        type: BarnType.FØDT,
        antallBarn: 1,
        fødselsdatoer: [FAMILIEHENDELSESDATO],
    },
    harAktivitetskravIPeriodeUtenUttak: false,
    uttakPerioder: [],
    children: [],
} satisfies ComponentProps<typeof UttaksplanDataProvider>;

const getWrapper =
    (customData?: Partial<ComponentProps<typeof UttaksplanDataProvider>>) =>
    ({ children }: { children: ReactNode }) => (
        <IntlProvider locale="nb" messages={messages}>
            <UttaksplanDataProvider {...DEFAULT_DATA} {...customData}>
                {children}
            </UttaksplanDataProvider>
        </IntlProvider>
    );

describe('useFormSubmitValidator', () => {
    it('skal returnere feilmelding dersom mor kombinerer arbeid og foreldrepenger de første 6 ukene', () => {
        const { result } = renderHook(() => useFormSubmitValidator(), {
            wrapper: getWrapper(),
        });

        const nyePerioder = [{ fom: FAMILIEHENDELSESDATO, tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(5) }];

        const formValues = {
            skalDuKombinereArbeidOgUttakMor: true,
            kontoTypeMor: 'MØDREKVOTE',
            skalDuKombinereArbeidOgUttakFarMedmor: false,
            forelder: 'MOR',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const valider = result.current;
        const feilmelding = valider(nyePerioder, formValues);

        expect(feilmelding).toBe('Mor kan ikke kombinere foreldrepenger med arbeid de første seks ukene');
    });

    it('skal returnere feilmelding dersom far kombinerer arbeid og mødrekvote de første 6 ukene', () => {
        const { result } = renderHook(() => useFormSubmitValidator(), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'FAR_ELLER_MEDMOR',
                    rettighetType: 'BEGGE_RETT',
                    erMedmorDelAvSøknaden: false,
                    navnPåForeldre: { farMedmor: 'Far Medmor', mor: 'Mor' },
                },
            }),
        });

        const nyePerioder = [{ fom: FAMILIEHENDELSESDATO, tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(5) }];

        const formValues = {
            skalDuKombinereArbeidOgUttakMor: false,
            kontoTypeFarMedmor: 'MØDREKVOTE',
            skalDuKombinereArbeidOgUttakFarMedmor: true,
            forelder: 'FAR_MEDMOR',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const valider = result.current;
        const feilmelding = valider(nyePerioder, formValues);

        expect(feilmelding).toBe('Mor kan ikke kombinere foreldrepenger med arbeid de første seks ukene');
    });

    it('skal returnere feilmelding dersom far/medmor har valgt mer enn 2 uker i intervallet to uker før famDato og seks uker etter', () => {
        const { result } = renderHook(() => useFormSubmitValidator(), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'FAR_ELLER_MEDMOR',
                    rettighetType: 'BEGGE_RETT',
                    erMedmorDelAvSøknaden: false,
                    navnPåForeldre: { farMedmor: 'Far Medmor', mor: 'Mor' },
                },
            }),
        });

        const perioder = [{ fom: FAMILIEHENDELSESDATO, tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(15) }];

        const formValues = {
            skalDuKombinereArbeidOgUttakMor: false,
            kontoTypeMor: 'FEDREKVOTE',
            skalDuKombinereArbeidOgUttakFarMedmor: false,
            forelder: 'FAR_MEDMOR',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const valider = result.current;
        const feilmelding = valider(perioder, formValues);

        expect(feilmelding).toBe(
            'Du kan ikke velge mer enn to uker totalt i perioden to uker før og seks uker etter fødsel/termin',
        );
    });

    it('skal returnere feilmelding dersom far/medmor allerede har valgt dager og prøver å legge til flere i intervallet rundt famdato', () => {
        const { result } = renderHook(() => useFormSubmitValidator(), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'FAR_ELLER_MEDMOR',
                    rettighetType: 'BEGGE_RETT',
                    erMedmorDelAvSøknaden: false,
                    navnPåForeldre: { farMedmor: 'Far Medmor', mor: 'Mor' },
                },
                uttakPerioder: [
                    {
                        fom: FAMILIEHENDELSESDATO,
                        tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(4),
                        forelder: 'FAR_MEDMOR',
                    },
                ],
            }),
        });

        const perioder = [
            {
                fom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(5),
                tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(15),
            },
        ];

        const formValues = {
            skalDuKombinereArbeidOgUttakMor: false,
            kontoTypeMor: 'FEDREKVOTE',
            skalDuKombinereArbeidOgUttakFarMedmor: false,
            forelder: 'FAR_MEDMOR',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const valider = result.current;
        const feilmelding = valider(perioder, formValues);

        expect(feilmelding).toBe(
            'Du kan ikke velge mer enn to uker totalt i perioden to uker før og seks uker etter fødsel/termin',
        );
    });

    it('skal ikke returnere feilmelding dersom antall dager ikke overstiger 10', () => {
        const { result } = renderHook(() => useFormSubmitValidator(), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'FAR_ELLER_MEDMOR',
                    rettighetType: 'BEGGE_RETT',
                    erMedmorDelAvSøknaden: false,
                    navnPåForeldre: { farMedmor: 'Far Medmor', mor: 'Mor' },
                },
                uttakPerioder: [
                    {
                        fom: FAMILIEHENDELSESDATO,
                        tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(4),
                        forelder: 'FAR_MEDMOR',
                    },
                ],
            }),
        });

        const perioder = [
            {
                fom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(5),
                tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(9),
            },
        ];

        const formValues = {
            skalDuKombinereArbeidOgUttakMor: false,
            kontoTypeMor: 'FEDREKVOTE',
            skalDuKombinereArbeidOgUttakFarMedmor: false,
            forelder: 'FAR_MEDMOR',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const valider = result.current;
        const feilmelding = valider(perioder, formValues);

        expect(feilmelding).toBeNull();
    });

    it('skal ikke returnere feilmelding dersom antall graderte dagar ikke overstiger 10', () => {
        const { result } = renderHook(() => useFormSubmitValidator(), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'FAR_ELLER_MEDMOR',
                    rettighetType: 'BEGGE_RETT',
                    erMedmorDelAvSøknaden: false,
                    navnPåForeldre: { farMedmor: 'Far Medmor', mor: 'Mor' },
                },
                uttakPerioder: [
                    {
                        fom: FAMILIEHENDELSESDATO,
                        tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(4),
                        forelder: 'FAR_MEDMOR',
                        gradering: {
                            aktivitet: {
                                type: 'ORDINÆRT_ARBEID',
                                arbeidsgiver: {
                                    id: '123456789',
                                },
                                arbeidsgiverNavn: 'Test AS',
                            },
                            arbeidstidprosent: 50,
                        },
                    },
                ],
            }),
        });

        const perioder = [
            {
                fom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(5),
                tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(20),
            },
        ];

        const formValues = {
            skalDuKombinereArbeidOgUttakMor: false,
            kontoTypeMor: 'FEDREKVOTE',
            skalDuKombinereArbeidOgUttakFarMedmor: true,
            forelder: 'FAR_MEDMOR',
            stillingsprosentFarMedmor: '50',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const valider = result.current;
        const feilmelding = valider(perioder, formValues);

        expect(feilmelding).toBeNull();
    });

    it('skal returnere feilmelding dersom antall graderte dagar overstiger 10', () => {
        const { result } = renderHook(() => useFormSubmitValidator(), {
            wrapper: getWrapper({
                foreldreInfo: {
                    søker: 'FAR_ELLER_MEDMOR',
                    rettighetType: 'BEGGE_RETT',
                    erMedmorDelAvSøknaden: false,
                    navnPåForeldre: { farMedmor: 'Far Medmor', mor: 'Mor' },
                },
                uttakPerioder: [
                    {
                        fom: FAMILIEHENDELSESDATO,
                        tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(4),
                        forelder: 'FAR_MEDMOR',
                        gradering: {
                            aktivitet: {
                                type: 'ORDINÆRT_ARBEID',
                                arbeidsgiver: {
                                    id: '123456789',
                                },
                                arbeidsgiverNavn: 'Test AS',
                            },
                            arbeidstidprosent: 50,
                        },
                    },
                ],
            }),
        });

        const perioder = [
            {
                fom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(5),
                tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(23),
            },
        ];

        const formValues = {
            skalDuKombinereArbeidOgUttakMor: false,
            kontoTypeMor: 'FEDREKVOTE',
            skalDuKombinereArbeidOgUttakFarMedmor: true,
            forelder: 'FAR_MEDMOR',
            stillingsprosentFarMedmor: '50',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const valider = result.current;
        const feilmelding = valider(perioder, formValues);

        expect(feilmelding).toBe(
            'Du kan ikke velge mer enn to uker totalt i perioden to uker før og seks uker etter fødsel/termin',
        );
    });

    it('skal returnere null dersom ingen feilmeldinger oppstår', () => {
        const { result } = renderHook(() => useFormSubmitValidator(), {
            wrapper: getWrapper(),
        });

        const perioder = [
            {
                fom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(10),
                tom: UttaksdagenString(FAMILIEHENDELSESDATO).leggTil(15),
            },
        ];

        const formValues = {
            skalDuKombinereArbeidOgUttakMor: false,
            kontoTypeMor: 'FEDREKVOTE',
            skalDuKombinereArbeidOgUttakFarMedmor: false,
            forelder: 'FAR_MEDMOR',
        } satisfies LeggTilEllerEndrePeriodeFormFormValues;

        const valider = result.current;
        const feilmelding = valider(perioder, formValues);

        expect(feilmelding).toBeNull();
    });
});
