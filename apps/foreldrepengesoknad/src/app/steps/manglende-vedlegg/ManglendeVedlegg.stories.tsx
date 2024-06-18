import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';

import { getAxiosInstance } from '@navikt/fp-api';
import { AnnenForelder, Barn, BarnType } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { Situasjon, Søkerinfo } from '@navikt/fp-types';

import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

import ManglendeVedlegg from './ManglendeVedlegg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultSøkerinfo = {
    søker: {
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
            {
                fnr: '31091981146',
                fødselsdato: '2022-08-02',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'SNILT',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
            {
                fnr: '31091981147',
                fødselsdato: '2022-08-02',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'LYST',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
        ],
    },
    arbeidsforhold: [],
} as Søkerinfo;

const defaultAnnenForelder = {
    fornavn: 'Eline',
    etternavn: 'Hagen',
    kanIkkeOppgis: false,
} as AnnenForelder;

const defaultBarn = {
    antallBarn: 1,
    type: BarnType.FØDT,
    fødselsdatoer: ['2024-01-01'],
} as Barn;

export default {
    title: 'steps/ManglendeVedlegg',
    component: ManglendeVedlegg,
};

interface Props {
    søkerInfo: Søkerinfo;
    situasjon?: Situasjon;
    annenForelder: AnnenForelder;
    barn: Barn;
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
}

const Template: StoryFn<Props> = ({
    søkerInfo,
    situasjon = 'fødsel',
    annenForelder = defaultAnnenForelder,
    barn = defaultBarn,
    gåTilNesteSide = action('button-click'),
    mellomlagreSøknadOgNaviger = promiseAction(),
}) => {
    initAmplitude();

    const apiMock = new MockAdapter(getAxiosInstance());
    apiMock.onPost('/rest/storage/foreldrepenger/vedlegg').reply(200); //story
    apiMock.onPost('http://localhost:8888/rest/storage/foreldrepenger/vedlegg').reply(200); //test

    return (
        <MemoryRouter initialEntries={[SøknadRoutes.DOKUMENTASJON]}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.UTTAKSPLAN]: [],
                    [ContextDataType.ANNEN_FORELDER]: annenForelder,
                    [ContextDataType.OM_BARNET]: barn,
                    [ContextDataType.SØKERSITUASJON]: {
                        rolle: 'mor',
                        situasjon: situasjon,
                    },
                }}
            >
                <ManglendeVedlegg
                    søkerInfo={søkerInfo}
                    erEndringssøknad={false}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={action('button-click')}
                />
            </FpDataContext>
        </MemoryRouter>
    );
};

export const Termindatodokumentasjon = Template.bind({});
Termindatodokumentasjon.args = {
    søkerInfo: defaultSøkerinfo,
    barn: {
        antallBarn: 1,
        type: BarnType.UFØDT,
        termindato: '2024-01-01',
    },
};

export const Omsorgsovertakelsedokumentasjon = Template.bind({});
Omsorgsovertakelsedokumentasjon.args = {
    søkerInfo: defaultSøkerinfo,
    situasjon: 'adopsjon',
    barn: {
        antallBarn: 1,
        type: BarnType.ADOPTERT_ANNET_BARN,
        adopsjonsdato: '2023-01-01',
        adoptertIUtlandet: false,
        fødselsdatoer: ['2022-01-01'],
    },
};

export const Aleneomsorgdokumentasjon = Template.bind({});
Aleneomsorgdokumentasjon.args = {
    søkerInfo: defaultSøkerinfo,
    annenForelder: {
        ...defaultAnnenForelder,
        datoForAleneomsorg: '2024-01-01',
    },
};
