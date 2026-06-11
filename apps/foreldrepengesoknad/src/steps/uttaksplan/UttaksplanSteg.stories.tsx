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
import {
    Barn,
    Dekningsgrad,
    FpPersonopplysningerDto_fpoversikt,
    SøkersituasjonFp,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
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
    fordeling?: Fordeling;
    valgtEksisterendeSaksnr?: string;
    uttaksplan?: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    kommerFraPlanlegger?: boolean;
} & ComponentProps<typeof UttaksplanSteg>;

const meta = {
    title: 'steps/UttaksplanSteg',
    component: UttaksplanSteg,
    decorators: [withQueryClient],
    args: {
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
        erEndringssøknad: false,
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
        erEndringssøknad,
        valgtEksisterendeSaksnr,
        uttaksplan,
        kommerFraPlanlegger,
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
                        [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: valgtEksisterendeSaksnr,
                        [ContextDataType.UTTAKSPLAN]: uttaksplan,
                        [ContextDataType.KOMMER_FRA_PLANLEGGER]: kommerFraPlanlegger,
                    }}
                >
                    <UttaksplanSteg
                        søkerInfo={søkerInfo}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                        erEndringssøknad={erEndringssøknad}
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

// Story der far med begge rett melder at han ønsker å starte på termin.
// Forslaget skal kun inneholde to uker med uttak (fedrekvote simultant med mødrekvote),
// ikke gjenstående fedrekvote plassert langt frem i tid.
export const FødselFarBeggeHarRettStarterPåTermin: Story = {
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
        søkerInfo: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-07-01',
        },
        annenForelder: {
            fnr: '26499118626',
            fornavn: 'Olga',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
            harRettPåForeldrepengerINorge: true,
        },
        dekningsgrad: '100',
        fordeling: {
            oppstartAvForeldrepengerValg: OppstartValg.FAMILIEHENDELSESDATO,
        },
    },
};

const INNVILGET_RESULTAT = {
    innvilget: true,
    trekkerDager: true,
    trekkerMinsterett: false,
    årsak: 'ANNET',
} as const;

// Plan lastet fra en eksisterende, ikke-vedtatt sak: alle periodene har resultat (kommer fra gjeldende vedtak).
const INNVILGET_PLAN_FRA_EKSISTERENDE_SAK: UttakPeriode_fpoversikt[] = [
    {
        fom: '2024-06-10',
        tom: '2024-06-28',
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
        flerbarnsdager: false,
        resultat: INNVILGET_RESULTAT,
    },
    {
        fom: '2024-07-01',
        tom: '2024-09-20',
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        flerbarnsdager: false,
        resultat: INNVILGET_RESULTAT,
    },
];

/**
 * TFP-6962: Bruker har en eksisterende sak (uten vedtak) og søker på nytt med ny sats før vedtak.
 * Dette er en ny førstegangssøknad (erEndringssøknad=false), men VALGT_EKSISTERENDE_SAKSNR er satt
 * og planen er forhåndsutfylt med innvilgede perioder (resultat satt). Brukeren skal kunne gå videre
 * uten å få feilmeldingen "Du må gjøre en endring for å kunne søke om endring".
 */
export const NySøknadFørVedtakMedEksisterendeSak: Story = {
    parameters: FødselMorOgFarBeggeHarRett.parameters,
    args: {
        ...FødselMorOgFarBeggeHarRett.args,
        erEndringssøknad: false,
        valgtEksisterendeSaksnr: '123456789',
        uttaksplan: INNVILGET_PLAN_FRA_EKSISTERENDE_SAK,
    },
};

// Søknad overført frå planleggeren: uttaksplanen ligg i context, men fordeling manglar (planleggeren
// sender ikkje med fordeling). Brukast for å verifisere at "Tilbakestill plan" hentar opp den overførte
// planen igjen etter "Fjern alt".
const planleggerUttaksplan = [
    {
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
        fom: '2024-06-10',
        tom: '2024-06-28',
        flerbarnsdager: false,
    },
    {
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        fom: '2024-07-01',
        tom: '2024-09-06',
        flerbarnsdager: false,
    },
    {
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        fom: '2024-09-09',
        tom: '2024-11-15',
        flerbarnsdager: false,
    },
    {
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
        fom: '2024-11-18',
        tom: '2025-01-24',
        flerbarnsdager: false,
    },
] satisfies UttakPeriode_fpoversikt[];

export const FødselMorOgFarBeggeHarRettOverførtFraPlanlegger: Story = {
    parameters: FødselMorOgFarBeggeHarRett.parameters,
    args: {
        ...FødselMorOgFarBeggeHarRett.args,
        fordeling: undefined,
        uttaksplan: planleggerUttaksplan,
        kommerFraPlanlegger: true,
    },
};
