import { createIntl, createIntlCache } from 'react-intl';
import { describe, expect, it } from 'vitest';

import messages from '../../intl/messages/nb_NO.json';
import { lagSamtidigUttakOmråde } from './samtidigUttak';
import { ValideringInput, førsteBrutteValideringsregel } from './types';

const cache = createIntlCache();
const intlMock = createIntl({ locale: 'nb', defaultLocale: 'nb', messages }, cache);

// Måndag. Verneperioden rundt fødsel er då 2024-06-03 til 2024-07-29 — periodane under
// ligg godt utanfor denne, sidan samtidigUttak-området berre gjeld utanfor verneperioden.
const FAMILIEHENDELSESDATO = '2024-06-17';

const lagInput = (overrides: Partial<ValideringInput> = {}): ValideringInput => ({
    formValues: { forelder: 'BEGGE' },
    perioder: [{ fom: '2024-08-05', tom: '2024-08-16' }],
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

/** Returnerer feilmeldinga dersom eit samtidig-uttak-regel er brote, elles undefined. */
const evaluer = (input: ValideringInput): string | undefined => {
    const område = lagSamtidigUttakOmråde(intlMock);
    const kontekst = område.byggKontekst(input);
    if (kontekst === null) {
        return undefined;
    }
    return førsteBrutteValideringsregel(område.regler, kontekst)?.feilmelding;
};

const TO_KVOTER_FEILMELDING = 'Bare en kan ha kvote når dere skal ha mer enn 100 % foreldrepenger til sammen';

describe('samtidigUttak', () => {
    it('skal melde feil når begge brukar eigen kvote (mødrekvote/fedrekvote) samtidig over 100 % kombinert, utan flerbarnsdagar', () => {
        const feil = evaluer(
            lagInput({
                formValues: {
                    forelder: 'BEGGE',
                    kontoTypeMor: 'MØDREKVOTE',
                    kontoTypeFarMedmor: 'FEDREKVOTE',
                    samtidigUttaksprosentMor: '100',
                    samtidigUttaksprosentFarMedmor: '40',
                    skalDuKombinereArbeidOgUttakMor: false,
                    skalDuKombinereArbeidOgUttakFarMedmor: true,
                    stillingsprosentFarMedmor: '60',
                    ønskerFlerbarnsdager: false,
                },
            }),
        );

        expect(feil).toBe(TO_KVOTER_FEILMELDING);
    });

    it('skal ikkje melde feil når begge brukar eigen kvote samtidig over 100 % kombinert, med flerbarnsdagar', () => {
        const feil = evaluer(
            lagInput({
                formValues: {
                    forelder: 'BEGGE',
                    kontoTypeMor: 'MØDREKVOTE',
                    kontoTypeFarMedmor: 'FEDREKVOTE',
                    samtidigUttaksprosentMor: '100',
                    samtidigUttaksprosentFarMedmor: '40',
                    skalDuKombinereArbeidOgUttakMor: false,
                    skalDuKombinereArbeidOgUttakFarMedmor: true,
                    stillingsprosentFarMedmor: '60',
                    ønskerFlerbarnsdager: true,
                },
            }),
        );

        expect(feil).toBeUndefined();
    });
});
