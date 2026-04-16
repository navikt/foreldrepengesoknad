import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'api/queries';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { AnnenForelder } from 'types/AnnenForelder';
import { FellesperiodeFordelingValg, Fordeling, OppstartValg } from 'types/Fordeling';

import { BarnType } from '@navikt/fp-constants';
import { Barn, Dekningsgrad, FpPersonopplysningerDto_fpoversikt, SøkersituasjonFp } from '@navikt/fp-types';
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

import { UttaksplanSteg } from './UttaksplanSteg';

const søkerInfoKvinne = {
    fnr: '26499118626',
    navn: {
        fornavn: 'Olga',
        etternavn: 'Utvikler',
    },
    kjønn: 'K',
    fødselsdato: '1988-04-19',
    erGift: false,
    barn: [],
    arbeidsforhold: [],
} satisfies FpPersonopplysningerDto_fpoversikt;

const søkerInfoMann = {
    fnr: '20479134988',
    navn: {
        fornavn: 'Olav',
        etternavn: 'Utvikler',
    },
    kjønn: 'M',
    fødselsdato: '1988-04-19',
    erGift: false,
    barn: [],
    arbeidsforhold: [],
} satisfies FpPersonopplysningerDto_fpoversikt;

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
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    dekningsgrad: Dekningsgrad;
    fordeling: Fordeling;
} & ComponentProps<typeof UttaksplanSteg>;

const meta = {
    title: 'steps/UttaksplanSteg',
    component: UttaksplanSteg,
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
        fordeling,
    }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN]}>
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
                        [ContextDataType.FORDELING]: fordeling,
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: dekningsgrad,
                    }}
                >
                    <UttaksplanSteg
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
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 204 })),
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
        søkerInfo: søkerInfoKvinne,
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
        fordeling: {
            oppstartAvForeldrepengerValg: OppstartValg.TRE_UKER_FØR_FØDSEL,
            antallDagerFellesperiodeTilSøker: '0',
            antallUkerFellesperiodeTilSøker: '12',
            fordelingValg: FellesperiodeFordelingValg.VIL_VELGE,
        },
    },
};

export const FødselMorOgFarKunMorHarRett: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 204 })),
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
        søkerInfo: søkerInfoKvinne,
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
        fordeling: {
            oppstartAvForeldrepengerValg: OppstartValg.TRE_UKER_FØR_FØDSEL,
        },
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
        fordeling: {
            oppstartAvForeldrepengerValg: OppstartValg.TRE_UKER_FØR_FØDSEL,
        },
    },
};

export const FødselMorOgMedmorKunMedmorHarRettMorUfør: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 204 })),
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
        søkerInfo: søkerInfoKvinne,
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
        fordeling: {
            oppstartAvForeldrepengerValg: OppstartValg.FAMILIEHENDELSESDATO,
        },
    },
};

export const FødselBareFarSøkerAleneOmOmsorg: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 204 })),
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
        søkerInfo: søkerInfoMann,
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
        fordeling: {
            oppstartAvForeldrepengerValg: OppstartValg.DATO_FOR_ALENEOMSORG,
        },
    },
};

export const AdopsjonMorOgFarBeggeHarRett: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 204 })),
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
        søkerInfo: søkerInfoKvinne,
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
        fordeling: {
            oppstartAvForeldrepengerValg: OppstartValg.FAMILIEHENDELSESDATO,
            antallDagerFellesperiodeTilSøker: '0',
            antallUkerFellesperiodeTilSøker: '12',
            fordelingValg: FellesperiodeFordelingValg.VIL_VELGE,
        },
    },
};

export const AdopsjonMorOgFarKunMorHarRett: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 204 })),
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
        søkerInfo: søkerInfoKvinne,
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
        fordeling: {
            oppstartAvForeldrepengerValg: OppstartValg.FAMILIEHENDELSESDATO,
        },
    },
};

export const AdopsjonMorOgFarKunFarHarRettMorErUfør: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () => new HttpResponse(null, { status: 204 })),
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
        søkerInfo: søkerInfoMann,
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
        fordeling: {
            oppstartAvForeldrepengerValg: OppstartValg.FAMILIEHENDELSESDATO,
        },
    },
};

export const AdopsjonMorOgMedmorBeggeHarRett: Story = {
    parameters: AdopsjonMorOgFarBeggeHarRett.parameters,
    args: {
        ...AdopsjonMorOgFarBeggeHarRett.args,
        søkerInfo: søkerInfoKvinne,
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
        fordeling: {
            oppstartAvForeldrepengerValg: OppstartValg.FAMILIEHENDELSESDATO,
            antallDagerFellesperiodeTilSøker: '0',
            antallUkerFellesperiodeTilSøker: '12',
            fordelingValg: FellesperiodeFordelingValg.VIL_VELGE,
        },
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
        søkerInfo: søkerInfoMann,
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

// Story som reproduserer buggen der annen part har et vedtak med tomme perioder (perioder: []).
// API returnerer en gyldig AnnenPartSak, men uten perioder. Dette resulterte tidligere i en tom uttaksplan.
export const FødselMorOgFarBeggeHarRettAnnenPartTomtVedtak: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.annenPartVedtak, () =>
                    HttpResponse.json({
                        antallBarn: 1,
                        dekningsgrad: 'HUNDRE',
                        perioder: [],
                    }),
                ),
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
        ...FødselMorOgFarBeggeHarRett.args,
    },
};
