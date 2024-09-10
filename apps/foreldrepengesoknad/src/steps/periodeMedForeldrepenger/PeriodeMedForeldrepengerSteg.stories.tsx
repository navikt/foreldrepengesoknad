import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { FpApiDataContext } from 'api/context/FpApiDataContext';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import SøknadRoutes from 'appData/routes';
import MockAdapter from 'axios-mock-adapter';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AnnenPartVedtakDTO } from 'types/AnnenPartVedtakDTO';

import { AxiosMock } from '@navikt/fp-api';
import { AnnenForelder, Barn, BarnType, DekningsgradDTO, SaksperiodeDTO } from '@navikt/fp-common';
import { StønadskontoType } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import {
    SøkersituasjonFp,
    TilgjengeligeStønadskontoer,
    TilgjengeligeStønadskontoerForDekningsgrad,
} from '@navikt/fp-types';

import PeriodeMedForeldrepengerSteg from './PeriodeMedForeldrepengerSteg';

const UTTAKSPLAN_ANNEN_URL = '/rest/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = `/rest/konto`;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const STØNADSKONTO_100 = {
    kontoer: [
        {
            konto: StønadskontoType.Mødrekvote,
            dager: 75,
        },
        {
            konto: StønadskontoType.Fedrekvote,
            dager: 75,
        },
        {
            konto: StønadskontoType.Fellesperiode,
            dager: 80,
        },
        {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15,
        },
    ],
    minsteretter: {
        farRundtFødsel: 0,
        toTette: 0,
    },
} as TilgjengeligeStønadskontoerForDekningsgrad;

const STØNADSKONTO_80 = {
    kontoer: [
        {
            konto: StønadskontoType.Mødrekvote,
            dager: 95,
        },
        {
            konto: StønadskontoType.Fedrekvote,
            dager: 95,
        },
        {
            konto: StønadskontoType.Fellesperiode,
            dager: 90,
        },
        {
            konto: StønadskontoType.ForeldrepengerFørFødsel,
            dager: 15,
        },
    ],
    minsteretter: {
        farRundtFødsel: 0,
        toTette: 0,
    },
} as TilgjengeligeStønadskontoerForDekningsgrad;

const uttaksperiode = {
    fom: '2022-12-07',
    tom: '2022-12-07',
    kontoType: 'MØDREKVOTE',
    resultat: {
        innvilget: true,
        trekkerMinsterett: false,
        trekkerDager: true,
        årsak: 'ANNET',
    },
    morsAktivitet: 'ARBEID',
    gradering: {
        arbeidstidprosent: 55,
        aktivitet: {
            type: 'FRILANS',
            arbeidsgiver: {
                id: 'string',
                type: 'PRIVAT',
            },
        },
    },
    samtidigUttak: 50,
    flerbarnsdager: true,
} as SaksperiodeDTO;

const fellesProps = {
    arbeidsforhold: [],
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click'),
};

type StoryArgs = {
    søkersituasjon: SøkersituasjonFp;
    annenForelder: AnnenForelder;
    barnet: Barn;
    stønadskonto: TilgjengeligeStønadskontoer;
    annenPartVedtak?: AnnenPartVedtakDTO;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof PeriodeMedForeldrepengerSteg>;

const meta = {
    title: 'steps/PeriodeMedForeldrepengerSteg',
    component: PeriodeMedForeldrepengerSteg,
    render: ({ gåTilNesteSide, søkersituasjon, annenForelder, barnet, stønadskonto, annenPartVedtak, ...rest }) => {
        initAmplitude();
        const restMock = (apiMock: MockAdapter) => {
            apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
            apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, stønadskonto);
        };
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.PERIODE_MED_FORELDREPENGER]}>
                <AxiosMock mock={restMock}>
                    <FpApiDataContext>
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
                            }}
                        >
                            <PeriodeMedForeldrepengerSteg {...rest} />
                        </FpDataContext>
                    </FpApiDataContext>
                </AxiosMock>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FarEllerMedmorAleneomsorgFødsel: Story = {
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2022-03-01'],
            antallBarn: 1,
            termindato: '2022-03-24',
        },
        annenForelder: {
            kanIkkeOppgis: true,
        },
        stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
    },
};

export const FarEllerMedmorFødselOgMorHarIkkeRett: Story = {
    args: {
        ...FarEllerMedmorAleneomsorgFødsel.args,
        annenForelder: {
            etternavn: 'dfg',
            fornavn: 'dfg',
            fnr: '02068629902',
            utenlandskFnr: false,
            kanIkkeOppgis: false,
            harRettPåForeldrepengerINorge: false,
            erInformertOmSøknaden: false,
            erAleneOmOmsorg: false,
        },
        stønadskonto: {
            '100': {
                ...STØNADSKONTO_100,
                kontoer: [
                    {
                        konto: StønadskontoType.Foreldrepenger,
                        dager: 200,
                    },
                ],
            },
            '80': {
                ...STØNADSKONTO_80,
                kontoer: [
                    {
                        konto: StønadskontoType.Foreldrepenger,
                        dager: 250,
                    },
                ],
            },
        },
    },
};

export const FarEllerMedmorFødselBeggeHarRett: Story = {
    args: {
        ...FarEllerMedmorAleneomsorgFødsel.args,
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2022-03-24',
        },
        annenForelder: {
            etternavn: 'Pettersen',
            fornavn: 'Helga',
            fnr: '02458945678',
            utenlandskFnr: false,
            kanIkkeOppgis: false,
            harRettPåForeldrepengerINorge: true,
            erInformertOmSøknaden: true,
            erAleneOmOmsorg: false,
        },
    },
};

export const FarEllerMedmorFødselBeggeHarRettTerminFør1Juli2024: Story = {
    args: {
        ...FarEllerMedmorFødselBeggeHarRett.args,
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-06-30',
        },
    },
};

export const MorFødselBeggeHarRettFødselFør1Juli2024: Story = {
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-06-30'],
            termindato: '2024-06-30',
        },
        annenForelder: {
            etternavn: 'Pettersen',
            fornavn: 'Hans',
            fnr: '02458945678',
            utenlandskFnr: false,
            kanIkkeOppgis: false,
            harRettPåForeldrepengerINorge: true,
            erInformertOmSøknaden: true,
            erAleneOmOmsorg: false,
        },
        stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
    },
};

export const MorBeggeHarRettAdopsjonEtter1Juli2024: Story = {
    args: {
        ...MorFødselBeggeHarRettFødselFør1Juli2024.args,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn: 1,
            adopsjonsdato: '2024-07-01',
            fødselsdatoer: ['2024-07-01'],
        },
    },
};

export const MorSøkerAdopsjonMedAleneomsorg: Story = {
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            antallBarn: 1,
            adopsjonsdato: '2021-03-15',
            adoptertIUtlandet: false,
            fødselsdatoer: [],
        },
        annenForelder: {
            kanIkkeOppgis: true,
        },
        stønadskonto: {
            '100': {
                ...STØNADSKONTO_100,
                kontoer: [
                    {
                        konto: StønadskontoType.Foreldrepenger,
                        dager: 230,
                    },
                    {
                        konto: StønadskontoType.ForeldrepengerFørFødsel,
                        dager: 15,
                    },
                ],
            },
            '80': {
                ...STØNADSKONTO_80,
                kontoer: [
                    {
                        konto: StønadskontoType.Foreldrepenger,
                        dager: 280,
                    },
                    {
                        konto: StønadskontoType.ForeldrepengerFørFødsel,
                        dager: 15,
                    },
                ],
            },
        },
    },
};

export const MorSøkerAdopsjonMedDeltUttak: Story = {
    args: {
        ...MorSøkerAdopsjonMedAleneomsorg.args,
        annenForelder: {
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
    },
};

export const FarSøkerAdopsjonMedDeltUttak: Story = {
    args: {
        ...MorSøkerAdopsjonMedDeltUttak.args,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
    },
};

export const MorSøkerAdopsjonDerFarHarRettIEOS: Story = {
    args: {
        ...MorSøkerAdopsjonMedAleneomsorg.args,
        annenForelder: {
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
    },
};

export const MorSøkerFodselDerFarHarRettIEOS: Story = {
    args: {
        ...MorSøkerAdopsjonMedAleneomsorg.args,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            fødselsdatoer: ['2022-06-14'],
            termindato: '2022-08-14',
            antallBarn: 1,
            // @ts-ignore FIX
            adopsjonsdato: undefined,
            adoptertIUtlandet: undefined,
            type: BarnType.FØDT,
        },
        annenForelder: {
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
    },
};

export const MorAleneomsorgFødsel: Story = {
    args: {
        ...MorSøkerAdopsjonMedAleneomsorg.args,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-03-15'],
            antallBarn: 1,
        },
    },
};

export const MorFødselDeltUttakPrematurFødsel: Story = {
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2021-01-11'],
            termindato: '2021-03-11',
        },
        annenForelder: {
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
        stønadskonto: {
            '100': { ...STØNADSKONTO_100, tillegg: { prematur: 43, flerbarn: 0 } },
            '80': { ...STØNADSKONTO_80, tillegg: { prematur: 43, flerbarn: 0 } },
        },
    },
};

export const MorAleneomsorgPrematurFødsel: Story = {
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2021-01-11'],
            termindato: '2021-03-11',
        },
        annenForelder: {
            kanIkkeOppgis: true,
        },
        stønadskonto: {
            '100': {
                ...STØNADSKONTO_100,
                kontoer: [
                    {
                        konto: StønadskontoType.Foreldrepenger,
                        dager: 273,
                    },
                    {
                        konto: StønadskontoType.ForeldrepengerFørFødsel,
                        dager: 15,
                    },
                ],
                tillegg: { prematur: 43, flerbarn: 0 },
            },
            '80': {
                ...STØNADSKONTO_80,
                kontoer: [
                    {
                        konto: StønadskontoType.Foreldrepenger,
                        dager: 323,
                    },
                    {
                        konto: StønadskontoType.ForeldrepengerFørFødsel,
                        dager: 15,
                    },
                ],
                tillegg: { prematur: 43, flerbarn: 0 },
            },
        },
    },
};

export const MorFødselDeltUttak: Story = {
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-03-15'],
            antallBarn: 1,
        },
        annenForelder: {
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
        stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
    },
};

export const MorFødselMedTvillingFlerbarnsuker: Story = {
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-03-15'],
            antallBarn: 2,
        },
        annenForelder: {
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
        stønadskonto: {
            '100': {
                ...STØNADSKONTO_100,
                kontoer: [
                    {
                        konto: StønadskontoType.Mødrekvote,
                        dager: 75,
                    },
                    {
                        konto: StønadskontoType.Fedrekvote,
                        dager: 75,
                    },
                    {
                        konto: StønadskontoType.Fellesperiode,
                        dager: 165,
                    },
                    {
                        konto: StønadskontoType.ForeldrepengerFørFødsel,
                        dager: 15,
                    },
                ],
                tillegg: { prematur: 0, flerbarn: 85 },
            },
            '80': {
                ...STØNADSKONTO_80,
                kontoer: [
                    {
                        konto: StønadskontoType.Mødrekvote,
                        dager: 95,
                    },
                    {
                        konto: StønadskontoType.Fedrekvote,
                        dager: 95,
                    },
                    {
                        konto: StønadskontoType.Foreldrepenger,
                        dager: 195,
                    },
                    {
                        konto: StønadskontoType.ForeldrepengerFørFødsel,
                        dager: 15,
                    },
                ],
                tillegg: { prematur: 0, flerbarn: 105 },
            },
        },
    },
};

export const MorFødselAleneomsorgMedTrillingFlerbarnsuker: Story = {
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-03-15'],
            antallBarn: 3,
        },
        annenForelder: {
            kanIkkeOppgis: true,
        },

        stønadskonto: {
            '100': {
                ...STØNADSKONTO_100,
                kontoer: [
                    {
                        konto: StønadskontoType.Mødrekvote,
                        dager: 75,
                    },
                    {
                        konto: StønadskontoType.Fedrekvote,
                        dager: 75,
                    },
                    {
                        konto: StønadskontoType.Fellesperiode,
                        dager: 165,
                    },
                    {
                        konto: StønadskontoType.ForeldrepengerFørFødsel,
                        dager: 15,
                    },
                ],
                tillegg: { prematur: 0, flerbarn: 230 },
            },
            '80': {
                ...STØNADSKONTO_80,
                kontoer: [
                    {
                        konto: StønadskontoType.Mødrekvote,
                        dager: 95,
                    },
                    {
                        konto: StønadskontoType.Fedrekvote,
                        dager: 95,
                    },
                    {
                        konto: StønadskontoType.Fellesperiode,
                        dager: 195,
                    },
                    {
                        konto: StønadskontoType.ForeldrepengerFørFødsel,
                        dager: 15,
                    },
                ],
                tillegg: { prematur: 0, flerbarn: 280 },
            },
        },
    },
};

export const FarEllerMedmorSøkerOgMorHarLagetUttaksplan: Story = {
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-03-15'],
            antallBarn: 2,
        },
        annenForelder: {
            fornavn: 'Helga',
            etternavn: 'Utvikler',
            fnr: '12117212090',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
        annenPartVedtak: {
            perioder: [uttaksperiode],
            dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT,
        },
        stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
    },
};

export const FarMedMorMedTermin1Juli2024: Story = {
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.UFØDT,
            termindato: '2024-07-01',
            antallBarn: 1,
        },
        annenForelder: {
            fornavn: 'Helga',
            etternavn: 'Utvikler',
            fnr: '12117212090',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
        stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
    },
};

export const MorMedTermin1Juli2024OgFarsSøknad: Story = {
    args: {
        ...fellesProps,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.UFØDT,
            termindato: '2024-07-01',
            antallBarn: 1,
        },
        annenForelder: {
            fornavn: 'Espen',
            etternavn: 'Utvikler',
            fnr: '12117212090',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
            erAleneOmOmsorg: false,
        },
        annenPartVedtak: {
            perioder: [uttaksperiode],
            dekningsgrad: DekningsgradDTO.ÅTTI_PROSENT,
        },
        stønadskonto: { '100': STØNADSKONTO_100, '80': STØNADSKONTO_80 },
    },
};
