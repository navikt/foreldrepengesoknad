import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';
import AxiosMock from 'storybook/utils/AxiosMock';

import { AnnenForelder as AnnenForelderType, Barn, BarnType } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { SivilstandType, Søker, SøkerBarn, SøkersituasjonFp } from '@navikt/fp-types';

import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

import AnnenForelder from './AnnenForelder';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const søker = {
    fnr: '19047815714',
    fornavn: 'TALENTFULL',
    etternavn: 'MYGG',
    kjønn: 'K',
    fødselsdato: '1978-04-19',
    barn: [
        {
            fnr: '21091981146',
            fødselsdato: '2021-03-15',
            annenForelder: {
                fnr: '12038517080',
                fødselsdato: '1985-03-12',
                fornavn: 'LEALAUS',
                etternavn: 'BÆREPOSE',
            },
            fornavn: 'KLØKTIG',
            etternavn: 'MIDTPUNKT',
            kjønn: 'M',
        },
    ],
} as Søker;

export default {
    title: 'steps/AnnenForelder',
    component: AnnenForelder,
};

interface Props {
    søker: Søker;
    søkersituasjon?: SøkersituasjonFp;
    annenForelder?: AnnenForelderType;
    barn?: Barn;
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
    avbrytSøknad: () => void;
}

const Template: StoryFn<Props> = ({
    søker,
    søkersituasjon = {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barn = {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: undefined,
    },
    annenForelder = {
        kanIkkeOppgis: true,
    },
    gåTilNesteSide,
    mellomlagreSøknadOgNaviger = promiseAction(),
    avbrytSøknad = action('button-click'),
}) => {
    initAmplitude();
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(
            200,
            { data: {} },
            {
                location: '',
            },
        );
        apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
    };
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
            <AxiosMock mock={restMock}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                        [ContextDataType.OM_BARNET]: barn,
                        [ContextDataType.ANNEN_FORELDER]: annenForelder,
                        [ContextDataType.SØKER_DATA]: {
                            // @ts-ignore TODO (TOR) Fiks Søker-typen
                            harHattAnnenInntektSiste10Mnd: undefined,
                            // @ts-ignore TODO (TOR) Fiks Søker-typen
                            harJobbetSomFrilansSiste10Mnd: undefined,
                            // @ts-ignore TODO (TOR) Fiks Søker-typen
                            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
                            // @ts-ignore TODO (TOR) Fiks Søker-typen
                            erAleneOmOmsorg: undefined,
                        },
                    }}
                >
                    <AnnenForelder
                        søker={søker}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
Default.args = {
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: dayjs('2021-03-15').toDate(),
        fnr: ['21091981146'],
    },
    søker,
};

export const SkalOppgiPersonalia = Template.bind({});
SkalOppgiPersonalia.args = {
    annenForelder: {
        kanIkkeOppgis: false,
    },
    søker: {
        ...søker,
        barn: [],
    },
};

export const SkalOppgiPersonaliaNavnMangler = Template.bind({});
SkalOppgiPersonaliaNavnMangler.args = {
    annenForelder: {
        fornavn: 'annen forelder',
        kanIkkeOppgis: false,
    },
    søker: {
        ...søker,
        barn: [],
    },
};

export const SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike = Template.bind({});
SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike.args = {
    annenForelder: {
        fornavn: 'Tom',
        fnr: '123456789',
        kanIkkeOppgis: false,
    },
    søker: {
        ...søker,

        barn: [
            {
                fornavn: 'Ben',
                annenForelder: {
                    fnr: '999999999',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
            },
        ] as SøkerBarn[],
    },
};

export const ForFar = Template.bind({});
ForFar.args = {
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: dayjs('2021-03-15').toDate(),
        fnr: ['21091981146'],
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    søker: {
        ...søker,
        fornavn: 'LEALAUS',
        etternavn: 'BÆREPOSE',
        kjønn: 'M',
        barn: [
            {
                fnr: '21091981146',
                fødselsdato: '2021-03-15',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'TALENTFULL',
                    etternavn: 'MYGG',
                },
                fornavn: 'KLØKTIG',
                etternavn: 'MIDTPUNKT',
                kjønn: 'K',
            },
        ],
    },
};

export const MorUfødtBarn = Template.bind({});
MorUfødtBarn.args = {
    barn: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: dayjs('2023-05-05').toDate(),
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    annenForelder: {
        kanIkkeOppgis: false,
    },
    søker: {
        ...søker,
        barn: [],
    },
};

export const MedmorUfødtBarn = Template.bind({});
MedmorUfødtBarn.args = {
    barn: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: dayjs('2023-05-05').toDate(),
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'medmor',
    },
    annenForelder: {
        kanIkkeOppgis: false,
    },
    søker: {
        ...søker,
        kjønn: 'K',
        barn: [],
    },
};

export const FarUfødtBarn = Template.bind({});
FarUfødtBarn.args = {
    barn: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: dayjs('2023-05-05').toDate(),
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    annenForelder: {
        kanIkkeOppgis: false,
    },
    søker: {
        ...søker,
        fornavn: 'LEALAUS',
        etternavn: 'BÆREPOSE',
        kjønn: 'M',
        barn: [],
    },
};

export const FarGiftUfødtBarn = Template.bind({});
FarGiftUfødtBarn.args = {
    barn: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: dayjs('2023-05-05').toDate(),
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    annenForelder: {
        kanIkkeOppgis: false,
    },
    søker: {
        ...søker,
        fornavn: 'LEALAUS',
        etternavn: 'BÆREPOSE',
        kjønn: 'M',
        barn: [],
        sivilstand: { type: SivilstandType.GIFT },
    },
};
