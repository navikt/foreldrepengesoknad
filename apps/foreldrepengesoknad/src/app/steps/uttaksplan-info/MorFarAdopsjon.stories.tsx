import { AnnenForelder, BarnType, Dekningsgrad } from '@navikt/fp-common';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import dayjs from 'dayjs';

import { ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import Søker from 'app/context/types/Søker';
import SøknadRoutes from 'app/routes/routes';
import { RequestStatus } from 'app/types/RequestState';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { MemoryRouter } from 'react-router-dom';
import _søkerinfoFarSøker from 'storybook/storyData/sokerinfo/søkerinfoFarSøker.json';
import _søkerinfoMorSøker from 'storybook/storyData/sokerinfo/søkerinfoMorSøker.json';
import stønadskonto100 from 'storybook/storyData/stonadskontoer/stønadskonto100.json';
import stønadskonto80 from 'storybook/storyData/stonadskontoer/stønadskonto80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import AxiosMock from 'storybook/utils/AxiosMock';
import UttaksplanInfo from './UttaksplanInfo';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import { initAmplitude } from '@navikt/fp-metrics';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfoFarSøker = _søkerinfoFarSøker as any;
const søkerinfoMorSøker = _søkerinfoMorSøker as any;

export default {
    title: 'steps/uttaksplan-info/MorFarAdopsjon',
    component: UttaksplanInfo,
};

const Template: StoryFn<
    UttaksplanInfoTestData & { dekningsgrad: Dekningsgrad; annenForelder: AnnenForelder; erMor: boolean; søker: Søker }
> = (args) => {
    initAmplitude();
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    };
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: {
                            situasjon: 'adopsjon',
                            rolle: args.erMor ? 'mor' : 'far',
                        },
                        [ContextDataType.OM_BARNET]: {
                            type: BarnType.ADOPTERT_ANNET_BARN,
                            antallBarn: 1,
                            adopsjonsdato: dayjs('2021-03-15').toDate(),
                            adoptertIUtlandet: false,
                            fødselsdatoer: [],
                        },
                        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                            dekningsgrad: args.dekningsgrad,
                        },
                        [ContextDataType.SØKER]: args.søker,
                        [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
                    }}
                >
                    <UttaksplanInfo
                        søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)}
                        erEndringssøknad={false}
                        mellomlagreSøknadOgNaviger={() => Promise.resolve()}
                        avbrytSøknad={() => undefined}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

export const UttaksplanMedAleneomsorgDekningsgrad100 = Template.bind({});
UttaksplanMedAleneomsorgDekningsgrad100.args = {
    stønadskonto100,
    stønadskonto80,
    søkerinfo: søkerinfoMorSøker,
    erMor: true,
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søker: {
        erAleneOmOmsorg: true,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanMedAleneomsorgDekningsgrad80 = Template.bind({});
UttaksplanMedAleneomsorgDekningsgrad80.args = {
    stønadskonto100,
    stønadskonto80,
    søkerinfo: søkerinfoMorSøker,
    erMor: true,
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søker: {
        erAleneOmOmsorg: true,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
};

export const UttaksplanMedDeltUttakDerMorSøker = Template.bind({});
UttaksplanMedDeltUttakDerMorSøker.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    erMor: true,
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'Utvikler',
        fnr: '1212121313',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoMorSøker,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanMedDeltUttakDerFarSøker100 = Template.bind({});
UttaksplanMedDeltUttakDerFarSøker100.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    erMor: false,
    annenForelder: {
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
        fnr: '19047815714',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFarSøker,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanMedDeltUttakDerFarSøker80 = Template.bind({});
UttaksplanMedDeltUttakDerFarSøker80.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    erMor: false,
    annenForelder: {
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
        fnr: '19047815714',
        harRettPåForeldrepengerINorge: true,
        kanIkkeOppgis: false,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFarSøker,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
};
