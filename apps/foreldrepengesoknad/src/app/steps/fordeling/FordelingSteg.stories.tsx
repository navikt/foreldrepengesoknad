import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import AxiosMock from 'storybook/utils/AxiosMock';

import { AnnenForelder, Barn, BarnType, Dekningsgrad, DekningsgradDTO, SaksperiodeDTO } from '@navikt/fp-common';
import { StønadskontoType } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { Arbeidsforhold, Søker, SøkersituasjonFp, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

import { FpApiDataContext } from 'app/api/context/FpApiDataContext';
import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';

import FordelingSteg from './FordelingSteg';

const UTTAKSPLAN_ANNEN_URL = '/rest/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = `/rest/konto`;

const vedtakFar = {
    dekningsgrad: 'HUNDRE' as DekningsgradDTO,
    perioder: [
        {
            fom: '2024-02-07',
            tom: '2024-02-19',
            kontoType: 'MØDREKVOTE',
            overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
        },
        {
            fom: '2024-06-11',
            tom: '2024-06-30',
            kontoType: 'FELLESPERIODE',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
        },
    ] as SaksperiodeDTO[],
};

const vedtakMor = {
    dekningsgrad: 'HUNDRE' as DekningsgradDTO,
    perioder: [
        {
            fom: '2024-07-07',
            tom: '2024-07-24',
            kontoType: 'FEDREKVOTE',
            overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
        },
        {
            fom: '2024-08-11',
            tom: '2024-08-12',
            kontoType: 'FELLESPERIODE',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
        },
    ] as SaksperiodeDTO[],
};

const søkerInfoKvinne = {
    fnr: '19047815714',
    fornavn: 'Hanne',
    etternavn: 'Mygg',
    kjønn: 'K',
    fødselsdato: '1978-04-19',
} as Søker;

const søkerInfoMann = {
    fnr: '19047815715',
    fornavn: 'Hans',
    etternavn: 'Mygg',
    kjønn: 'M',
    fødselsdato: '1972-06-07',
} as Søker;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    avbrytSøknad: () => void;
    gåTilNesteSide: (action: Action) => void;
    søkersituasjon: SøkersituasjonFp;
    annenForelder: AnnenForelder;
    barnet: Barn;
    stønadskonto100: TilgjengeligeStønadskontoerForDekningsgrad;
    stønadskonto80: TilgjengeligeStønadskontoerForDekningsgrad;
    erAleneOmOmsorg?: boolean;
    annenPartVedtak?: AnnenPartVedtakDTO;
    søker: Søker;
    dekningsgrad: Dekningsgrad;
    arbeidsforhold: Arbeidsforhold[];
} & ComponentProps<typeof FordelingSteg>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    avbrytSøknad = action('button-click'),
    gåTilNesteSide,
    søker,
    søkersituasjon,
    annenForelder,
    barnet,
    stønadskonto100,
    stønadskonto80,
    annenPartVedtak,
    dekningsgrad,
    arbeidsforhold = [],
}: StoryArgs) => {
    initAmplitude();

    const stønadskonto100Input =
        stønadskonto100 || ({ kontoer: {}, minsteretter: {} } as TilgjengeligeStønadskontoerForDekningsgrad);

    const stønadskonto80Input =
        stønadskonto80 || ({ kontoer: {}, minsteretter: {} } as TilgjengeligeStønadskontoerForDekningsgrad);

    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, annenPartVedtak);
        apiMock.onPost(STØNADSKONTO_URL).replyOnce(200, {
            '80': stønadskonto80Input,
            '100': stønadskonto100Input,
        });
    };

    return (
        <MemoryRouter initialEntries={[SøknadRoutes.FORDELING]}>
            <AxiosMock mock={restMock}>
                <FpApiDataContext>
                    <FpDataContext
                        onDispatch={gåTilNesteSide}
                        initialState={{
                            [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                            [ContextDataType.OM_BARNET]: barnet,
                            [ContextDataType.SØKER_DATA]: {
                                harJobbetSomFrilansSiste10Mnd: false,
                                harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                                harHattAnnenInntektSiste10Mnd: false,
                            },
                            [ContextDataType.ANNEN_FORELDER]: annenForelder,
                            [ContextDataType.PERIODE_MED_FORELDREPENGER]: { dekningsgrad },
                        }}
                    >
                        <FordelingSteg
                            arbeidsforhold={arbeidsforhold}
                            søker={søker}
                            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                            avbrytSøknad={avbrytSøknad}
                        />
                    </FpDataContext>
                </FpApiDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

const meta = {
    title: 'steps/FordelingSteg',
    component: FordelingSteg,
    render: customRenderer,
} satisfies Meta<StoryArgs>;
export default meta;

//ALENEOMSORG

export const MorAleneomsorgDekning80EttBarnFør1Okt2021: Story = {
    args: {
        søker: søkerInfoKvinne,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-09-21'],
            antallBarn: 1,
            termindato: '2021-09-24',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            kanIkkeOppgis: false,
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2021-09-21',
        },
        stønadskonto100: undefined,
        stønadskonto80: {
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
            minsteretter: {
                farRundtFødsel: 0,
                toTette: 0,
            },
        },
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    },
};

export const MorAleneomsorgEttBarnPrematurFødsel: Story = {
    args: {
        søker: søkerInfoKvinne,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-09-21'],
            antallBarn: 1,
            termindato: '2023-12-20',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2023-09-21',
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 294,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
            minsteretter: {
                farRundtFødsel: 10,
                toTette: 0,
            },
            tillegg: {
                prematur: 64,
                flerbarn: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const MorAleneomsorgAdopsjonTrillinger: Story = {
    args: {
        søker: søkerInfoKvinne,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_STEBARN,
            fødselsdatoer: ['2024-02-21'],
            antallBarn: 3,
            adopsjonsdato: '2024-02-21',
        },
        annenForelder: {
            kanIkkeOppgis: true,
        },
        stønadskonto80: undefined,
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 460,
                },
            ],
            minsteretter: {
                farRundtFødsel: 0,
                toTette: 0,
            },
        },
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const FarMedmorAleneomsorgFødtTvillinger: Story = {
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-09-21'],
            antallBarn: 2,
            termindato: '2023-09-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2023-09-23',
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 385,
                },
            ],
            minsteretter: {
                farRundtFødsel: 10,
                toTette: 0,
            },
        },

        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const FarMedmorAleneomsorgFødtFireBarnFør1Okt2021: Story = {
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-09-21'],
            antallBarn: 4,
            termindato: '2021-09-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2021-09-21',
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 460,
                },
            ],
            minsteretter: {
                farRundtFødsel: 0,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const FarMedmorAleneomsorgFødtTreBarnFørWLB: Story = {
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2022-07-21'],
            antallBarn: 3,
            termindato: '2022-07-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2022-09-21',
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 460,
                },
            ],
            minsteretter: {
                farRundtFødsel: 0,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const FarMedmorAleneomsorgEttBarnTerminEtterWLB: Story = {
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 3,
            termindato: '2024-07-21',
        },
        annenForelder: {
            erAleneOmOmsorg: true,
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            datoForAleneomsorg: '2024-09-21',
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 230,
                },
            ],
            minsteretter: {
                farRundtFødsel: 10,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const FarMedmorAleneomsorgPrematurtFødtBarn: Story = {
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-01-21'],
            termindato: '2024-04-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2024-01-21',
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 273,
                },
            ],
            minsteretter: {
                farRundtFødsel: 0,
                toTette: 0,
            },
            tillegg: {
                prematur: 64,
                flerbarn: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const FarMedmorAleneomsorgAdopsjonFireBarn: Story = {
    args: {
        søker: søkerInfoMann,
        erAleneOmOmsorg: true,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            fødselsdatoer: ['2021-08-21'],
            antallBarn: 4,
            adopsjonsdato: '2021-08-23',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            erAleneOmOmsorg: true,
            datoForAleneomsorg: '2024-01-21',
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 460,
                },
            ],
            minsteretter: {
                farRundtFødsel: 0,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

//DELT UTTAK
export const MorDeltUttakEttBarnPrematurFødsel: Story = {
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2023-09-21'],
            antallBarn: 1,
            termindato: '2023-12-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
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
                    dager: 100,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
            minsteretter: {
                farRundtFødsel: 10,
                toTette: 0,
            },
            tillegg: {
                prematur: 65,
                flerbarn: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const MorDeltUttakEttBarnTermin: Story = {
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-06-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
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
                farRundtFødsel: 10,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const MorDeltUttakTvillingerFødt: Story = {
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 2,
            fødselsdatoer: ['2024-02-21'],
            termindato: '2024-02-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
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
            minsteretter: {
                farRundtFødsel: 10,
                toTette: 0,
            },
            tillegg: {
                prematur: 0,
                flerbarn: 85,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const MorDeltUttakFarSøkteMorsKvoteOgFellesperiode: Story = {
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-07-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
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
                farRundtFødsel: 10,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        annenPartVedtak: vedtakFar,
    },
};

export const FarMedmorSøkerDeltUttakEttBarnFødtFør1Okt2021: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2021-07-21'],
            termindato: '2021-07-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
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
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const FarMedmorSøkerDeltUttakTrillingerFødtFørWLB: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 3,
            fødselsdatoer: ['2022-07-21'],
            termindato: '2022-07-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
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
                    dager: 370,
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
            tillegg: {
                prematur: 0,
                flerbarn: 230,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const FarMedmorSøkerDeltUttakFireBarnTerminEtterWLB: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 4,
            termindato: '2024-07-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
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
                    dager: 370,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
            minsteretter: {
                farRundtFødsel: 10,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const FarMedmorSøkerDeltUttakEttBarnFødtPrematurt: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-02-21'],
            termindato: '2024-05-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
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
                    dager: 100,
                },
                {
                    konto: StønadskontoType.ForeldrepengerFørFødsel,
                    dager: 15,
                },
            ],
            minsteretter: {
                farRundtFødsel: 10,
                toTette: 0,
            },
            tillegg: {
                flerbarn: 0,
                prematur: 64,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const FarSøkerDerMorHarTattUtFedrekvoteOgFellesperiode: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-02-21'],
            termindato: '2024-02-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
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
                farRundtFødsel: 10,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        annenPartVedtak: vedtakMor,
    },
};

export const FarSøkerAdopsjonToBarn: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn: 2,
            fødselsdatoer: ['2024-02-21'],
            adopsjonsdato: '2024-02-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
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
            ],
            minsteretter: {
                farRundtFødsel: 0,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const MorSøkerAdopsjonTreBarnFraUtlandetFør1Okt2021Dekningsgrad80: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            antallBarn: 3,
            fødselsdatoer: ['2021-02-21'],
            adopsjonsdato: '2021-02-21',
            ankomstdato: '2021-05-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: undefined,
        stønadskonto80: {
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
                    dager: 370,
                },
            ],
            minsteretter: {
                farRundtFødsel: 0,
                toTette: 0,
            },
        },
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    },
};

//DELT UTTAK EØS

export const MorSøkerFarHarRettIEØSTerminDekningsgrad80: Story = {
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-07-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            harOppholdtSegIEØS: true,
            harRettPåForeldrepengerIEØS: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: undefined,
        stønadskonto80: {
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
                farRundtFødsel: 10,
                toTette: 0,
            },
        },
        dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    },
};

export const FarMedmorSøkerMorHarRettIEØSAdopsjon: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn: 1,
            adopsjonsdato: '2024-02-21',
            fødselsdatoer: ['2024-02-21'],
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            harOppholdtSegIEØS: true,
            harRettPåForeldrepengerIEØS: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
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
            ],
            minsteretter: {
                farRundtFødsel: 0,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

//KUN EN HAR RETT

export const BareMorHarRettTermin: Story = {
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2024-07-21',
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 230,
                },
            ],
            minsteretter: {
                farRundtFødsel: 15,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const BareMorHarRettAdopsjon: Story = {
    args: {
        søker: søkerInfoKvinne,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barnet: {
            type: BarnType.ADOPTERT_ANNET_BARN,
            antallBarn: 1,
            adopsjonsdato: '2022-08-21',
            fødselsdatoer: ['2022-01-01'],
        },
        annenForelder: {
            fornavn: 'Hans',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 230,
                },
            ],
            minsteretter: {
                farRundtFødsel: 0,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const BareFarHarRettOgMorErUførTermin4Barn: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.UFØDT,
            antallBarn: 4,
            termindato: '2024-07-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            kanIkkeOppgis: false,
            erMorUfør: true,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 155,
                },
                {
                    konto: StønadskontoType.AktivitetsfriKvote,
                    dager: 375,
                },
            ],
            minsteretter: {
                farRundtFødsel: 10,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const BareFarHarRettOgMorErIkkeUførFødtBarn: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-01-21'],
            termindato: '2024-01-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            kanIkkeOppgis: false,
            erMorUfør: false,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 210,
                },
                {
                    konto: StønadskontoType.AktivitetsfriKvote,
                    dager: 40,
                },
            ],
            minsteretter: {
                farRundtFødsel: 10,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const BareFarHarRettTvillingerFødtFør1Okt2021: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.FØDT,
            antallBarn: 2,
            fødselsdatoer: ['2021-07-21'],
            termindato: '2021-07-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            kanIkkeOppgis: false,
            erMorUfør: true,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 285,
                },
            ],
            minsteretter: {
                farRundtFødsel: 0,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};

export const BareFarHarRettAdopsjonMorErUfør: Story = {
    args: {
        søker: søkerInfoMann,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'far',
        },
        barnet: {
            type: BarnType.ADOPTERT_STEBARN,
            antallBarn: 1,
            fødselsdatoer: ['2024-02-21'],
            adopsjonsdato: '2024-02-21',
        },
        annenForelder: {
            fornavn: 'Hanne',
            etternavn: 'Utvikler',
            fnr: '1212121313',
            harRettPåForeldrepengerINorge: false,
            erMorUfør: true,
            kanIkkeOppgis: false,
        },
        stønadskonto100: {
            kontoer: [
                {
                    konto: StønadskontoType.Foreldrepenger,
                    dager: 125,
                },
                {
                    konto: StønadskontoType.AktivitetsfriKvote,
                    dager: 75,
                },
            ],
            minsteretter: {
                farRundtFødsel: 10,
                toTette: 0,
            },
        },
        stønadskonto80: undefined,
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    },
};
