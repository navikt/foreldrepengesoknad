import { createIntl, createIntlCache } from 'react-intl';
import { describe, expect, it } from 'vitest';

import messages from '../../intl/messages/nb_NO.json';
import { lagFarMedmorMaksToUkerRundtFødselOmråde } from './farMedmorMaksToUkerRundtFødsel';
import { ValideringInput, førsteBrutteValideringsregel } from './types';

const cache = createIntlCache();
const intlMock = createIntl({ locale: 'nb', defaultLocale: 'nb', messages }, cache);

// Måndag. Vindauget blir då 2024-06-03 (2 veker før) til 2024-07-29 (6 veker etter).
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
});
