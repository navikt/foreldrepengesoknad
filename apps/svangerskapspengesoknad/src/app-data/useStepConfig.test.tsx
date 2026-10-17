import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';
import { EksternArbeidsforholdDto_fpoversikt, FRILANS_ID } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import nbMessages from '../intl/nb_NO.json';
import { ContextDataMap, ContextDataType, SvpDataContext } from './SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from './routes';
import { useStepConfig } from './useStepConfig';

const ARBEIDSGIVER_ID = '975326209';

const arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[] = [
    {
        arbeidsgiverId: ARBEIDSGIVER_ID,
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2025-01-01',
        stillingsprosent: 100,
    },
];

const renderStepConfig = (initialState: ContextDataMap) =>
    renderHook(() => useStepConfig({ arbeidsforhold, harRegistrertNæring: false }), {
        wrapper: ({ children }: { children: ReactNode }) => (
            <IntlProvider locale="nb" messagesGroupedByLocale={{ nb: nbMessages }}>
                <MemoryRouter initialEntries={[SøknadRoute.OPPSUMMERING]}>
                    <SvpDataContext initialState={initialState}>{children}</SvpDataContext>
                </MemoryRouter>
            </IntlProvider>
        ),
    });

describe('useStepConfig', () => {
    it('skal ignorere foreldede valgte arbeidsforhold når søker kun har ett aktivt arbeid', () => {
        const { result } = renderStepConfig({
            [ContextDataType.OM_BARNET]: { erBarnetFødt: false, fødselsdato: undefined, termindato: '2026-12-01' },
            [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                harHattArbeidIUtlandet: false,
                harJobbetSomFrilans: false,
                harJobbetSomSelvstendigNæringsdrivende: false,
            },
            [ContextDataType.VALGTE_ARBEIDSFORHOLD]: [ARBEIDSGIVER_ID, FRILANS_ID],
        });

        const stegIder = result.current.map((steg) => steg.id);
        expect(stegIder).not.toContain(SøknadRoute.VELG_ARBEID);
        expect(stegIder).toContain(addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, ARBEIDSGIVER_ID));
        expect(stegIder).not.toContain(addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, FRILANS_ID));
    });

    it('skal filtrere bort valgte arbeidsforhold som ikke lenger er gyldige', () => {
        const { result } = renderStepConfig({
            [ContextDataType.OM_BARNET]: { erBarnetFødt: false, fødselsdato: undefined, termindato: '2026-12-01' },
            [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                harHattArbeidIUtlandet: false,
                harJobbetSomFrilans: true,
                harJobbetSomSelvstendigNæringsdrivende: false,
            },
            [ContextDataType.VALGTE_ARBEIDSFORHOLD]: [ARBEIDSGIVER_ID, FRILANS_ID, EGEN_NÆRING_ID, '123456789'],
        });

        const stegIder = result.current.map((steg) => steg.id);
        expect(stegIder).toContain(SøknadRoute.VELG_ARBEID);
        expect(stegIder).toContain(addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, ARBEIDSGIVER_ID));
        expect(stegIder).toContain(addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, FRILANS_ID));
        expect(stegIder).not.toContain(addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, EGEN_NÆRING_ID));
        expect(stegIder).not.toContain(addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, '123456789'));
    });
});
