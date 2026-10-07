import { createIntl, createIntlCache } from 'react-intl';
import { describe, expect, it } from 'vitest';

import messages from '../../intl/messages/nb_NO.json';
import { ValideringInput } from './types';
import { lagValideringsområder, valider } from './valider';

const intl = createIntl({ locale: 'nb', defaultLocale: 'nb', messages }, createIntlCache());
const FEILMELDING =
    'Du kan ikke bruke flerbarnsdager før fødsel. Velg perioder som starter tidligst på fødselsdatoen, eller termindatoen hvis barnet ikke er født.';

const lagInput = (overstyringer: Partial<ValideringInput> = {}): ValideringInput => ({
    formValues: { forelder: 'FAR_MEDMOR', ønskerFlerbarnsdager: true, kontoTypeFarMedmor: 'FELLESPERIODE' },
    perioder: [{ fom: '2024-06-17', tom: '2024-06-18' }],
    uttakPerioder: [],
    familiehendelsedato: '2024-06-17',
    familiesituasjon: 'fødsel',
    termindato: undefined,
    foreldreInfo: {
        søker: 'FAR_MEDMOR',
        rettighetType: 'BEGGE_RETT',
        erMedmorDelAvSøknaden: false,
        navnPåForeldre: { mor: 'Mor', farMedmor: 'Far' },
    },
    erEndringssøknad: false,
    ...overstyringer,
});

describe('validering av flerbarnsdager før fødsel', () => {
    describe.each(['FAR_MEDMOR', 'BEGGE'] as const)('med %s valgt', (forelder) => {
        it.each([
            {
                navn: 'helt før fødsel',
                perioder: [{ fom: '2024-06-13', tom: '2024-06-14' }],
                forventet: FEILMELDING,
            },
            {
                navn: 'én periode som krysser fødsel',
                perioder: [{ fom: '2024-06-14', tom: '2024-06-18' }],
                forventet: FEILMELDING,
            },
            {
                navn: 'flere perioder der den siste starter før fødsel',
                perioder: [
                    { fom: '2024-06-18', tom: '2024-06-19' },
                    { fom: '2024-06-14', tom: '2024-06-14' },
                ],
                forventet: FEILMELDING,
            },
            {
                navn: 'på fødselsdatoen',
                perioder: [{ fom: '2024-06-17', tom: '2024-06-17' }],
                forventet: null,
            },
            {
                navn: 'etter fødsel',
                perioder: [{ fom: '2024-06-18', tom: '2024-06-19' }],
                forventet: null,
            },
        ])('$navn', ({ perioder, forventet }) => {
            expect(
                valider(
                    lagInput({
                        formValues: {
                            forelder,
                            ønskerFlerbarnsdager: true,
                            kontoTypeMor: 'MØDREKVOTE',
                            kontoTypeFarMedmor: 'FELLESPERIODE',
                            samtidigUttaksprosentMor: '100',
                            samtidigUttaksprosentFarMedmor: '100',
                            skalDuKombinereArbeidOgUttakMor: false,
                            skalDuKombinereArbeidOgUttakFarMedmor: false,
                        },
                        perioder,
                    }),
                    intl,
                ),
            ).toBe(forventet);
        });

        it.each([false, undefined])('avviser ikke uttak før fødsel med flerbarnsdager=%s', (ønskerFlerbarnsdager) => {
            expect(
                valider(
                    lagInput({
                        formValues: { forelder, ønskerFlerbarnsdager, kontoTypeFarMedmor: 'FEDREKVOTE' },
                        perioder: [{ fom: '2024-06-03', tom: '2024-06-14' }],
                    }),
                    intl,
                ),
            ).toBeNull();
        });

        it('avviser et skjult flerbarnsdagsvalg etter at datoene endres', () => {
            const input = lagInput({ formValues: { forelder, ønskerFlerbarnsdager: true } });

            expect(valider(input, intl)).toBeNull();
            expect(valider({ ...input, perioder: [{ fom: '2024-06-14', tom: '2024-06-18' }] }, intl)).toBe(FEILMELDING);
        });

        it('beholder eksisterende validering ved adopsjon', () => {
            expect(
                valider(
                    lagInput({
                        formValues: { forelder, ønskerFlerbarnsdager: true },
                        familiesituasjon: 'adopsjon',
                        perioder: [{ fom: '2024-06-14', tom: '2024-06-14' }],
                    }),
                    intl,
                ),
            ).toBeNull();
        });
    });

    it('beholder mors uttak før fødsel', () => {
        expect(
            valider(
                lagInput({
                    formValues: { forelder: 'MOR', ønskerFlerbarnsdager: true },
                    perioder: [{ fom: '2024-06-14', tom: '2024-06-14' }],
                }),
                intl,
            ),
        ).toBeNull();
    });

    it('bruker fødselsdatoen selv om termindatoen er tidligere', () => {
        expect(
            valider(
                lagInput({
                    termindato: '2024-06-10',
                    perioder: [{ fom: '2024-06-14', tom: '2024-06-14' }],
                }),
                intl,
            ),
        ).toBe(FEILMELDING);
    });

    it('tillater flerbarnsdager fra fødsel selv om termindatoen er senere', () => {
        expect(valider(lagInput({ termindato: '2024-06-24' }), intl)).toBeNull();
    });

    it('viser datofeilen før andre feil i samtidig uttak', () => {
        expect(
            valider(
                lagInput({
                    perioder: [{ fom: '2024-06-14', tom: '2024-06-18' }],
                    formValues: {
                        forelder: 'BEGGE',
                        ønskerFlerbarnsdager: true,
                        kontoTypeMor: 'MØDREKVOTE',
                        kontoTypeFarMedmor: 'FELLESPERIODE',
                        samtidigUttaksprosentMor: '50',
                        samtidigUttaksprosentFarMedmor: '50',
                        skalDuKombinereArbeidOgUttakMor: false,
                        skalDuKombinereArbeidOgUttakFarMedmor: false,
                    },
                }),
                intl,
            ),
        ).toBe(FEILMELDING);
    });

    it('dokumenterer regelen først i Storybook-katalogen', () => {
        const [område] = lagValideringsområder(intl);

        expect(område.id).toBe('flerbarnsdagerFørFødsel');
        expect(område.regler[0]?.feilmelding).toBe(FEILMELDING);
    });
});
