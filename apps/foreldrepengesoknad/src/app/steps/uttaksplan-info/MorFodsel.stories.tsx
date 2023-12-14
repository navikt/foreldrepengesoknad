import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';

import _søkerinfo from 'storybook/storyData/uttaksplan/mor-fødsel/søkerinfo.json';
import stønadskonto100 from 'storybook/storyData/stonadskontoer/stønadskonto100.json';
import stønadskonto80 from 'storybook/storyData/stonadskontoer/stønadskonto80.json';
import stønadskontoPrematurUker100 from 'storybook/storyData/stonadskontoer/stønadskontoPrematurUker100.json';
import stønadskontoPrematurUker80 from 'storybook/storyData/stonadskontoer/stønadskontoPrematurUker80.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoFlerbarnsuker80 from 'storybook/storyData/stonadskontoer/stønadskontoFlerbarnsuker80.json';
import stønadskontoFlerbarnsuker100 from 'storybook/storyData/stonadskontoer/stønadskontoFlerbarnsuker100.json';

import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { AnnenForelder, Barn, BarnType } from '@navikt/fp-common';
import Søker from 'app/context/types/Søker';
import dayjs from 'dayjs';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfo = _søkerinfo as any;

export default {
    title: 'steps/uttaksplan-info/MorFødsel',
    component: UttaksplanInfo,
    decorators: [withRouter],
};

const Template: StoryFn<UttaksplanInfoTestData & { annenForelder: AnnenForelder; barn: Barn; søker: Søker }> = (
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
                        situasjon: 'fødsel',
                        rolle: 'mor',
                    },
                    [ContextDataType.OM_BARNET]: args.barn,
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
    søkerinfo,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
};

export const UttaksplanMedPrematurFødsel = Template.bind({});
UttaksplanMedPrematurFødsel.args = {
    stønadskonto100: stønadskontoPrematurUker100,
    stønadskonto80: stønadskontoPrematurUker80,
    barn: {
        type: BarnType.FØDT,
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
        fødselsdatoer: [dayjs('2021-01-11').toDate()],
        termindato: dayjs('2021-03-11').toDate(),
    },
    annenForelder: {
        kanIkkeOppgis: true,
    },
    søker: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo,
};

export const UttaksplanMedDeltUttak = Template.bind({});
UttaksplanMedDeltUttak.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
    },
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
    søkerinfo,
};

export const UttaksplanMedFlerbarnsukerTvillinger = Template.bind({});
UttaksplanMedFlerbarnsukerTvillinger.args = {
    stønadskonto100: stønadskontoFlerbarnsuker100,
    stønadskonto80: stønadskontoFlerbarnsuker80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 2,
        datoForAleneomsorg: new Date(),
    },
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
    søkerinfo,
};
