import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import dayjs from 'dayjs';
import { AnnenForelder, BarnType } from '@navikt/fp-common';

import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';
import _søkerinfoMorSøker from 'storybook/storyData/sokerinfo/søkerinfoMorSøker.json';
import _søkerinfoFarSøker from 'storybook/storyData/sokerinfo/søkerinfoFarSøker.json';
import stønadskonto100 from 'storybook/storyData/stonadskontoer/stønadskonto100.json';
import stønadskonto80 from 'storybook/storyData/stonadskontoer/stønadskonto80.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import Søker from 'app/context/types/Søker';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfoFarSøker = _søkerinfoFarSøker as any;
const søkerinfoMorSøker = _søkerinfoMorSøker as any;

export default {
    title: 'steps/uttaksplan-info/MorFarAdopsjon',
    component: UttaksplanInfo,
    decorators: [withRouter],
};

const Template: StoryFn<UttaksplanInfoTestData & { annenForelder: AnnenForelder; erMor: boolean; søker: Søker }> = (
    args,
) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    };
    return (
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
    );
};

export const UttaksplanMedAleneomsorg = Template.bind({});
UttaksplanMedAleneomsorg.args = {
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
};

export const UttaksplanMedDeltUttakDerFarSøker = Template.bind({});
UttaksplanMedDeltUttakDerFarSøker.args = {
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
};
