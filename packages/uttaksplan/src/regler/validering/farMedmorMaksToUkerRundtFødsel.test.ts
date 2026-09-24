import { createIntl, createIntlCache } from 'react-intl';
import { describe, expect, it } from 'vitest';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import messages from '../../intl/messages/nb_NO.json';
import { lagFarMedmorMaksToUkerRundtFødselOmråde } from './farMedmorMaksToUkerRundtFødsel';
import { ValideringInput, førsteBrutteValideringsregel } from './types';

const cache = createIntlCache();
const intlMock = createIntl({ locale: 'nb', defaultLocale: 'nb', messages }, cache);

// Mandag. Intervallet har uttaksdager fra 3. juni til og med 26. juli.
const FAMILIEHENDELSESDATO = '2024-06-17';

const lagInput = (overrides: Partial<ValideringInput> = {}): ValideringInput => ({
    formValues: { forelder: 'BEGGE' },
    perioder: [],
    uttakPerioder: [],
    familiehendelsedato: FAMILIEHENDELSESDATO,
    familiesituasjon: 'fødsel',
    termindato: undefined,
    foreldreInfo: {
        søker: 'FAR_MEDMOR',
        rettighetType: 'BEGGE_RETT',
        erMedmorDelAvSøknaden: false,
        navnPåForeldre: { mor: 'Mor', farMedmor: 'Far' },
    },
    erEndringssøknad: false,
    ...overrides,
});

/** Returnerer feilmeldinga dersom 2-vekersregelen er brote, elles undefined. */
const evaluer = (input: ValideringInput): string | undefined => {
    const område = lagFarMedmorMaksToUkerRundtFødselOmråde(intlMock);
    const kontekst = område.byggKontekst(input);
    if (kontekst === null) {
        return undefined;
    }
    return førsteBrutteValideringsregel(område.regler, kontekst)?.feilmelding;
};

const FEILMELDING = 'Du kan ikke velge mer enn to uker totalt i perioden to uker før og seks uker etter fødsel/termin';

const lagFarPeriode = (overrides: Partial<UttakPeriode_fpoversikt> = {}): UttakPeriode_fpoversikt => ({
    fom: '2024-06-17',
    tom: '2024-06-28',
    forelder: 'FAR_MEDMOR',
    kontoType: 'FEDREKVOTE',
    flerbarnsdager: false,
    samtidigUttak: 100,
    ...overrides,
});

describe('farMedmorMaksToUkerRundtFødsel', () => {
    it('skal melde feil når far/medmor tar fullt uttak i tre uker (15 uttaksdagar) i vindauget', () => {
        const feil = evaluer(lagInput({ perioder: [{ fom: '2024-06-17', tom: '2024-07-05' }] }));

        expect(feil).toBe(FEILMELDING);
    });

    it('skal ikkje melde feil ved nøyaktig 10 uttaksdagar, sidan grensa er "opptil 10 dagar"', () => {
        const feil = evaluer(lagInput({ perioder: [{ fom: '2024-06-17', tom: '2024-06-28' }] }));

        expect(feil).toBeUndefined();
    });

    // Trekket frå kvoten er uttaksprosenten (100 % - stillingsprosent), ikkje stillingsprosenten.
    // Jobbar far 20 %, brukar han 80 % av dagane: 30 dagar * 0,8 = 24 trekkdagar.
    it('skal melde feil når far/medmor jobbar 20 % i seks veker, sidan det gir 24 trekkdagar', () => {
        const feil = evaluer(
            lagInput({
                perioder: [{ fom: '2024-06-17', tom: '2024-07-26' }],
                formValues: { forelder: 'BEGGE', stillingsprosentFarMedmor: '20' },
            }),
        );

        expect(feil).toBe(FEILMELDING);
    });

    // Motsett veg: jobbar far 80 %, brukar han berre 20 % av dagane: 15 dagar * 0,2 = 3 trekkdagar.
    it('skal ikkje melde feil når far/medmor jobbar 80 % i tre veker, sidan det berre gir 3 trekkdagar', () => {
        const feil = evaluer(
            lagInput({
                perioder: [{ fom: '2024-06-17', tom: '2024-07-05' }],
                formValues: { forelder: 'BEGGE', stillingsprosentFarMedmor: '80' },
            }),
        );

        expect(feil).toBeUndefined();
    });

    // 13 uttaksdagar * 0,8 = 10,4 trekkdagar. Skal ikkje rundast ned til 10 og sleppa gjennom.
    it('skal melde feil ved 10,4 trekkdagar, som er meir enn dei 10 dagane som er tillatne', () => {
        const feil = evaluer(
            lagInput({
                perioder: [{ fom: '2024-06-17', tom: '2024-07-03' }],
                formValues: { forelder: 'BEGGE', stillingsprosentFarMedmor: '20' },
            }),
        );

        expect(feil).toBe(FEILMELDING);
    });

    it('skal ikkje gjelda ved adopsjon', () => {
        const feil = evaluer(
            lagInput({
                perioder: [{ fom: '2024-06-17', tom: '2024-07-05' }],
                familiesituasjon: 'adopsjon',
            }),
        );

        expect(feil).toBeUndefined();
    });

    it('skal ikkje gjelda når berre éin har rett', () => {
        const feil = evaluer(
            lagInput({
                perioder: [{ fom: '2024-06-17', tom: '2024-07-05' }],
                foreldreInfo: {
                    søker: 'FAR_MEDMOR',
                    rettighetType: 'BARE_SØKER_RETT',
                    erMedmorDelAvSøknaden: false,
                    navnPåForeldre: { mor: 'Mor', farMedmor: 'Far' },
                },
            }),
        );

        expect(feil).toBeUndefined();
    });

    it('skal ikkje gjelda for overført mødrekvote', () => {
        const feil = evaluer(
            lagInput({
                perioder: [{ fom: '2024-06-17', tom: '2024-07-05' }],
                formValues: { forelder: 'BEGGE', kontoTypeFarMedmor: 'MØDREKVOTE' },
            }),
        );

        expect(feil).toBeUndefined();
    });

    it('skal ikkje gjelda når flerbarnsdagar er valt', () => {
        const feil = evaluer(
            lagInput({
                perioder: [{ fom: '2024-06-17', tom: '2024-07-05' }],
                formValues: { forelder: 'BEGGE', ønskerFlerbarnsdager: true },
            }),
        );

        expect(feil).toBeUndefined();
    });

    it('skal ikkje gjelda for periodar heilt utanfor vindauget', () => {
        const feil = evaluer(lagInput({ perioder: [{ fom: '2024-09-02', tom: '2024-09-20' }] }));

        expect(feil).toBeUndefined();
    });

    describe.each([false, true])('datogrenser med erEndringssøknad=%s', (erEndringssøknad) => {
        it.each([
            { familiehendelsedato: '2024-06-24', termindato: '2024-06-17', førsteDag: '2024-06-03' },
            { familiehendelsedato: '2024-06-17', termindato: '2024-06-24', førsteDag: '2024-06-03' },
            { familiehendelsedato: '2024-06-17', termindato: undefined, førsteDag: '2024-06-03' },
            { familiehendelsedato: '2024-06-16', termindato: '2024-06-23', førsteDag: '2024-06-03' },
        ])('teller fra $førsteDag ved fødsel $familiehendelsedato og termin $termindato', (datoer) => {
            const feil = evaluer(
                lagInput({
                    ...datoer,
                    erEndringssøknad,
                    uttakPerioder: [lagFarPeriode({ fom: datoer.førsteDag, tom: datoer.førsteDag })],
                    perioder: [{ fom: '2024-06-24', tom: '2024-07-05' }],
                }),
            );

            expect(feil).toBe(FEILMELDING);
        });

        it('teller ikke eksisterende dager før starten av intervallet', () => {
            expect(
                evaluer(
                    lagInput({
                        erEndringssøknad,
                        termindato: '2024-06-24',
                        uttakPerioder: [lagFarPeriode({ fom: '2024-05-31', tom: '2024-05-31' })],
                        perioder: [{ fom: '2024-06-17', tom: '2024-06-28' }],
                    }),
                ),
            ).toBeUndefined();
        });

        it('teller siste uttaksdag i uke seks, selv ved fødsel før termin', () => {
            expect(
                evaluer(
                    lagInput({
                        erEndringssøknad,
                        termindato: '2024-07-01',
                        uttakPerioder: [lagFarPeriode()],
                        perioder: [{ fom: '2024-07-26', tom: '2024-07-26' }],
                    }),
                ),
            ).toBe(FEILMELDING);
        });

        it.each(['2024-06-15', '2024-06-16', '2024-06-17'])(
            'teller ikke uke syv ved fødsel %s, selv om terminen er senere',
            (familiehendelsedato) => {
                expect(
                    evaluer(
                        lagInput({
                            erEndringssøknad,
                            familiehendelsedato,
                            termindato: '2024-07-01',
                            uttakPerioder: [lagFarPeriode()],
                            perioder: [{ fom: '2024-07-29', tom: '2024-08-02' }],
                        }),
                    ),
                ).toBeUndefined();
            },
        );

        it('teller ikke en eksisterende periode i uke syv mot en ny periode rundt fødsel', () => {
            expect(
                evaluer(
                    lagInput({
                        erEndringssøknad,
                        termindato: '2024-07-01',
                        uttakPerioder: [lagFarPeriode({ fom: '2024-07-29', tom: '2024-08-02' })],
                        perioder: [{ fom: '2024-06-17', tom: '2024-06-28' }],
                    }),
                ),
            ).toBeUndefined();
        });

        it.each([
            { fom: '2024-07-30', forventet: FEILMELDING },
            { fom: '2024-07-31', forventet: undefined },
        ])('avgrenser seks uker også ved fødsel midt i uken: $fom', ({ fom, forventet }) => {
            expect(
                evaluer(
                    lagInput({
                        erEndringssøknad,
                        familiehendelsedato: '2024-06-19',
                        termindato: '2024-06-26',
                        uttakPerioder: [lagFarPeriode({ fom: '2024-06-24', tom: '2024-07-05' })],
                        perioder: [{ fom, tom: fom }],
                    }),
                ),
            ).toBe(forventet);
        });

        it('teller bare dagene innenfor intervallet når perioden fortsetter inn i uke syv', () => {
            expect(
                evaluer(
                    lagInput({
                        erEndringssøknad,
                        uttakPerioder: [lagFarPeriode({ fom: '2024-06-17', tom: '2024-06-21' })],
                        perioder: [{ fom: '2024-07-22', tom: '2024-08-02' }],
                    }),
                ),
            ).toBeUndefined();
        });
    });

    it.each([
        {
            navn: 'flerbarnsdager fra fellesperioden',
            periode: { kontoType: 'FELLESPERIODE', flerbarnsdager: true },
        },
        { navn: 'flerbarnsdager fra fedrekvoten', periode: { flerbarnsdager: true } },
        { navn: 'mors innleggelse', periode: { morsAktivitet: 'INNLAGT', samtidigUttak: undefined } },
        { navn: 'mors sykdom', periode: { morsAktivitet: 'TRENGER_HJELP', samtidigUttak: undefined } },
        { navn: 'overført mødrekvote', periode: { kontoType: 'MØDREKVOTE', samtidigUttak: undefined } },
    ] satisfies Array<{ navn: string; periode: Partial<UttakPeriode_fpoversikt> }>)(
        'holder eksisterende uttak ved $navn utenfor de to ukene',
        ({ periode }) => {
            expect(
                evaluer(
                    lagInput({
                        uttakPerioder: [lagFarPeriode(periode)],
                        perioder: [{ fom: '2024-07-01', tom: '2024-07-12' }],
                    }),
                ),
            ).toBeUndefined();
        },
    );

    it.each([
        { forelder: 'BEGGE', ønskerFlerbarnsdager: true, kontoTypeFarMedmor: 'FELLESPERIODE' },
        { forelder: 'FAR_MEDMOR', morsAktivitet: 'INNLAGT', kontoTypeFarMedmor: 'FEDREKVOTE' },
        { forelder: 'FAR_MEDMOR', morsAktivitet: 'TRENGER_HJELP', kontoTypeFarMedmor: 'FEDREKVOTE' },
        { forelder: 'FAR_MEDMOR', kontoTypeFarMedmor: 'MØDREKVOTE' },
    ] satisfies Array<ValideringInput['formValues']>)(
        'tillater unntaksuttak etter at de to ukene er brukt: %o',
        (formValues) => {
            expect(
                evaluer(
                    lagInput({
                        formValues,
                        uttakPerioder: [lagFarPeriode()],
                        perioder: [{ fom: '2024-07-01', tom: '2024-07-12' }],
                    }),
                ),
            ).toBeUndefined();
        },
    );

    it('teller fortsatt vanlige fedrekvotedager når planen også inneholder unntaksuttak', () => {
        expect(
            evaluer(
                lagInput({
                    uttakPerioder: [
                        lagFarPeriode({ flerbarnsdager: true }),
                        lagFarPeriode({ fom: '2024-07-01', tom: '2024-07-12' }),
                    ],
                    perioder: [{ fom: '2024-07-15', tom: '2024-07-15' }],
                }),
            ),
        ).toBe(FEILMELDING);
    });

    it.each([undefined, 'ARBEID', 'IKKE_OPPGITT'] satisfies Array<UttakPeriode_fpoversikt['morsAktivitet']>)(
        'teller vanlig fedrekvote uten registrert samtidigUttak, morsAktivitet=%s',
        (morsAktivitet) => {
            expect(
                evaluer(
                    lagInput({
                        uttakPerioder: [lagFarPeriode({ samtidigUttak: undefined, morsAktivitet })],
                        perioder: [{ fom: '2024-07-01', tom: '2024-07-01' }],
                    }),
                ),
            ).toBe(FEILMELDING);
        },
    );

    it('teller ikke mors perioder', () => {
        expect(
            evaluer(
                lagInput({
                    uttakPerioder: [lagFarPeriode({ forelder: 'MOR', kontoType: 'MØDREKVOTE' })],
                    perioder: [{ fom: '2024-07-01', tom: '2024-07-12' }],
                }),
            ),
        ).toBeUndefined();
    });

    it('teller ikke samme dager to ganger når en periode redigeres', () => {
        expect(
            evaluer(
                lagInput({
                    uttakPerioder: [lagFarPeriode()],
                    perioder: [{ fom: '2024-06-24', tom: '2024-06-28' }],
                }),
            ),
        ).toBeUndefined();
    });

    it('teller dagene som står igjen når en del av en eksisterende periode erstattes', () => {
        expect(
            evaluer(
                lagInput({
                    uttakPerioder: [lagFarPeriode()],
                    perioder: [{ fom: '2024-06-24', tom: '2024-07-01' }],
                }),
            ),
        ).toBe(FEILMELDING);
    });

    it('teller med dager som endres fra flerbarnsdager til vanlig fedrekvote', () => {
        expect(
            evaluer(
                lagInput({
                    uttakPerioder: [
                        lagFarPeriode({ flerbarnsdager: true }),
                        lagFarPeriode({ fom: '2024-07-01', tom: '2024-07-12' }),
                    ],
                    perioder: [{ fom: '2024-06-17', tom: '2024-06-17' }],
                }),
            ),
        ).toBe(FEILMELDING);
    });

    it('summerer flere markerte perioder', () => {
        expect(
            evaluer(
                lagInput({
                    perioder: [
                        { fom: '2024-06-17', tom: '2024-06-21' },
                        { fom: '2024-07-01', tom: '2024-07-08' },
                    ],
                }),
            ),
        ).toBe(FEILMELDING);
    });

    it('teller graderte dager likt for nye og eksisterende perioder', () => {
        expect(
            evaluer(
                lagInput({
                    uttakPerioder: [
                        lagFarPeriode({
                            samtidigUttak: 50,
                            gradering: { arbeidstidprosent: 50 },
                        }),
                    ],
                    perioder: [{ fom: '2024-07-01', tom: '2024-07-12' }],
                    formValues: { forelder: 'BEGGE', stillingsprosentFarMedmor: '50' },
                }),
            ),
        ).toBeUndefined();
    });

    it('bruker desimalkomma i stillingsprosent uten å runde ned arbeidsandelen', () => {
        expect(
            evaluer(
                lagInput({
                    perioder: [{ fom: '2024-06-17', tom: '2024-07-22' }],
                    formValues: { forelder: 'BEGGE', stillingsprosentFarMedmor: '61,6' },
                }),
            ),
        ).toBeUndefined();
    });
});
