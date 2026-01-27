import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'api/queries';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { FellesperiodeFordelingValg, OppstartValg } from 'types/Fordeling';

import { AnnenForelder, Barn, BarnType } from '@navikt/fp-common';
import {
    Dekningsgrad,
    PersonDto_fpoversikt,
    PersonMedArbeidsforholdDto_fpoversikt,
    SøkersituasjonFp,
} from '@navikt/fp-types';
import {
    ALENE_OM_OMSORG_80_FARMEDMOR,
    ALENE_OM_OMSORG_100_FARMEDMOR,
    DELT_UTTAK_80,
    DELT_UTTAK_80_ADOPSJON,
    DELT_UTTAK_100,
    DELT_UTTAK_100_ADOPSJON,
    IKKE_DELT_UTTAK_80_ADOPSJON_MOR,
    IKKE_DELT_UTTAK_80_FARMEDMOR_MOR_UFØR,
    IKKE_DELT_UTTAK_80_MOR,
    IKKE_DELT_UTTAK_100_ADOPSJON_MOR,
    IKKE_DELT_UTTAK_100_FARMEDMOR_MOR_UFØR,
    IKKE_DELT_UTTAK_100_MOR,
    MINSTERETTER,
    withQueryClient,
} from '@navikt/fp-utils-test';

import { UttaksplanStegNy } from './UttaksplanStegNy';

const søkerInfoKvinne = {
    fnr: '26499118626',
    navn: {
        fornavn: 'Olga',
        etternavn: 'Utvikler',
    },
    kjønn: 'K',
    fødselsdato: '1988-04-19',
    barn: [],
} satisfies PersonDto_fpoversikt;

const søkerInfoMann = {
    fnr: '20479134988',
    navn: {
        fornavn: 'Olav',
        etternavn: 'Utvikler',
    },
    kjønn: 'M',
    fødselsdato: '1988-04-19',
    barn: [],
} satisfies PersonDto_fpoversikt;

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    avbrytSøknad: () => void;
    gåTilNesteSide?: (action: Action) => void;
    søkersituasjon: SøkersituasjonFp;
    annenForelder: AnnenForelder;
    barnet: Barn;
    søkerInfo: PersonMedArbeidsforholdDto_fpoversikt;
    dekningsgrad: Dekningsgrad;
} & ComponentProps<typeof UttaksplanStegNy>;

const meta = {
    title: 'steps/UttaksplanStegNy',
    component: UttaksplanStegNy,
    decorators: [withQueryClient],
    args: {
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
    render: ({
        søkerInfo,
        mellomlagreSøknadOgNaviger,
        avbrytSøknad,
        gåTilNesteSide,
        søkersituasjon,
        annenForelder,
        barnet,
        dekningsgrad,
    }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.FORDELING]}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                        [ContextDataType.OM_BARNET]: barnet,
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                            harHattAndreInntektskilder: false,
                            harJobbetSomFrilans: false,
                            harJobbetSomSelvstendigNæringsdrivende: false,
                        },
                        [ContextDataType.ANNEN_FORELDER]: annenForelder,
                        [ContextDataType.FORDELING]: {
                            fordelingValg: FellesperiodeFordelingValg.ALT,
                            antallDagerFellesperiodeTilSøker: '100',
                            antallUkerFellesperiodeTilSøker: '40',
                            oppstartAvForeldrepengerValg: OppstartValg.ANKOMSTDATO_NORGE,
                        },
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: dekningsgrad,
                    }}
                >
                    <UttaksplanStegNy
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                </FpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FødselMorOgFarBeggeHarRett: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': {
                            kontoer: DELT_UTTAK_80,
                            minsteretter: MINSTERETTER,
                        },
                        '100': {
                            kontoer: DELT_UTTAK_100,
                            minsteretter: MINSTERETTER,
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søkerInfo: { person: søkerInfoKvinne, arbeidsforhold: [] },
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-07-01'],
            antallBarn: 1,
            termindato: '2024-07-01',
        },
        annenForelder: {
            fnr: '04430589186',
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: true,
        },
        dekningsgrad: '100',
    },
};

export const FødselMorOgFarKunMorHarRett: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': {
                            kontoer: IKKE_DELT_UTTAK_80_MOR,
                            minsteretter: MINSTERETTER,
                        },
                        '100': {
                            kontoer: IKKE_DELT_UTTAK_100_MOR,
                            minsteretter: MINSTERETTER,
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        ...FødselMorOgFarBeggeHarRett.args,
        søkerInfo: { person: søkerInfoKvinne, arbeidsforhold: [] },
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-07-01'],
            antallBarn: 1,
            termindato: '2024-07-01',
        },
        annenForelder: {
            fnr: '04430589186',
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: false,
            harOppholdtSegIEØS: false,
        },
        dekningsgrad: '100',
    },
};

export const FødselMorOgMedmorBeggeHarRett: Story = {
    parameters: FødselMorOgFarBeggeHarRett.parameters,
    args: {
        ...FødselMorOgFarBeggeHarRett.args,
        annenForelder: {
            fnr: '31430574828',
            fornavn: 'Trude',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: true,
            harRettPåForeldrepengerIEØS: true,
            harOppholdtSegIEØS: false,
        },
    },
};

export const FødselMorOgMedmorKunMorHarRett: Story = {
    parameters: FødselMorOgFarKunMorHarRett.parameters,
    args: {
        ...FødselMorOgFarKunMorHarRett.args,
        annenForelder: {
            fnr: '31430574828',
            fornavn: 'Trude',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: false,
            harOppholdtSegIEØS: false,
        },
    },
};

export const FødselMorOgMedmorKunMedmorHarRettMorUfør: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': {
                            kontoer: IKKE_DELT_UTTAK_80_FARMEDMOR_MOR_UFØR,
                            minsteretter: MINSTERETTER,
                        },
                        '100': {
                            kontoer: IKKE_DELT_UTTAK_100_FARMEDMOR_MOR_UFØR,
                            minsteretter: MINSTERETTER,
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søkerInfo: { person: søkerInfoKvinne, arbeidsforhold: [] },
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'medmor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2024-07-01'],
            antallBarn: 1,
            termindato: '2024-07-01',
        },
        annenForelder: {
            fnr: '31430574828',
            fornavn: 'Trude',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: false,
            erMorUfør: true,
        },
        dekningsgrad: '100',
    },
};

export const FødselBareFarSøkerAleneOmOmsorg: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '80': {
                            kontoer: ALENE_OM_OMSORG_80_FARMEDMOR,
                            minsteretter: MINSTERETTER,
                        },
                        '100': {
                            kontoer: ALENE_OM_OMSORG_100_FARMEDMOR,
                            minsteretter: MINSTERETTER,
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        ...FødselMorOgFarBeggeHarRett.args,
        søkerInfo: { person: søkerInfoMann, arbeidsforhold: [] },
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        annenForelder: {
            fnr: '31430574828',
            fornavn: 'Trude',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: true,
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: false,
            harOppholdtSegIEØS: false,
        },
    },
};

export const AdopsjonMorOgFarBeggeHarRett: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '100': {
                            kontoer: DELT_UTTAK_100_ADOPSJON,
                            minsteretter: MINSTERETTER,
                        },
                        '80': {
                            kontoer: DELT_UTTAK_80_ADOPSJON,
                            minsteretter: MINSTERETTER,
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søkerInfo: { person: søkerInfoKvinne, arbeidsforhold: [] },
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2022-07-01'],
            antallBarn: 1,
            adopsjonsdato: '2024-07-01',
        },
        annenForelder: {
            fnr: '04430589186',
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: true,
        },
        dekningsgrad: '100',
    },
};

export const AdopsjonMorOgFarKunMorHarRett: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '100': {
                            kontoer: IKKE_DELT_UTTAK_100_ADOPSJON_MOR,
                            minsteretter: MINSTERETTER,
                        },
                        '80': {
                            kontoer: IKKE_DELT_UTTAK_80_ADOPSJON_MOR,
                            minsteretter: MINSTERETTER,
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søkerInfo: { person: søkerInfoKvinne, arbeidsforhold: [] },
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2022-07-01'],
            antallBarn: 1,
            adopsjonsdato: '2024-07-01',
        },
        annenForelder: {
            fnr: '04430589186',
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: false,
        },
        dekningsgrad: '100',
    },
};

export const AdopsjonMorOgFarKunFarHarRettMorErUfør: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 200 })),
                http.post(API_URLS.konto, () =>
                    HttpResponse.json({
                        '100': {
                            kontoer: IKKE_DELT_UTTAK_100_FARMEDMOR_MOR_UFØR,
                            minsteretter: MINSTERETTER,
                        },
                        '80': {
                            kontoer: IKKE_DELT_UTTAK_80_FARMEDMOR_MOR_UFØR,
                            minsteretter: MINSTERETTER,
                        },
                    }),
                ),
            ],
        },
    },
    args: {
        søkerInfo: { person: søkerInfoMann, arbeidsforhold: [] },
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2022-07-01'],
            antallBarn: 1,
            adopsjonsdato: '2024-07-01',
        },
        annenForelder: {
            fnr: '31430574828',
            fornavn: 'Trude',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: false,
            erMorUfør: true,
        },
        dekningsgrad: '100',
    },
};

export const AdopsjonMorOgMedmorBeggeHarRett: Story = {
    parameters: AdopsjonMorOgFarBeggeHarRett.parameters,
    args: {
        ...AdopsjonMorOgFarBeggeHarRett.args,
        søkerInfo: { person: søkerInfoKvinne, arbeidsforhold: [] },
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2022-07-01'],
            antallBarn: 1,
            adopsjonsdato: '2024-07-01',
        },
        annenForelder: {
            fnr: '31430574828',
            fornavn: 'Trude',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: true,
        },
        dekningsgrad: '100',
    },
};

export const AdopsjonMorOgMedmorKunMorHarRett: Story = {
    parameters: AdopsjonMorOgFarKunMorHarRett.parameters,
    args: {
        ...AdopsjonMorOgFarKunMorHarRett.args,
        annenForelder: {
            fnr: '31430574828',
            fornavn: 'Trude',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: false,
        },
    },
};

export const AdopsjonMorOgMedmorKunMedmorHarRettMorErUfør: Story = {
    parameters: AdopsjonMorOgFarKunFarHarRettMorErUfør.parameters,
    args: {
        ...AdopsjonMorOgFarKunFarHarRettMorErUfør.args,
        annenForelder: {
            fnr: '31430574828',
            fornavn: 'Trude',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: false,
            erMorUfør: true,
        },
    },
};

export const AdopsjonBareFarSøkerAleneOmOmsorg: Story = {
    parameters: AdopsjonMorOgFarKunMorHarRett.parameters,
    args: {
        ...AdopsjonMorOgFarKunMorHarRett.args,
        søkerInfo: { person: søkerInfoMann, arbeidsforhold: [] },
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
        annenForelder: {
            fnr: '31430574828',
            fornavn: 'Trude',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: true,
            harRettPåForeldrepengerINorge: false,
        },
    },
};
