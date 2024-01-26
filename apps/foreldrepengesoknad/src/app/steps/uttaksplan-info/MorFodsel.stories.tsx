import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';

import _søkerinfo from 'storybook/storyData/uttaksplan/mor-fødsel/søkerinfo.json';
import stønadskonto100 from 'storybook/storyData/stonadskontoer/stønadskonto100.json';
import stønadskonto80 from 'storybook/storyData/stonadskontoer/stønadskonto80.json';
import stønadskontoDeltUttak80WLB from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80WLB.json';
import stønadskontoDeltUttak100WLB from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100WLB.json';
import stønadskontoDeltUttak100PrematurWLB from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100PrematurWLB.json';
import stønadskontoFlerbarnsuker80 from 'storybook/storyData/stonadskontoer/stønadskontoFlerbarnsuker80.json';
import stønadskontoFlerbarnsuker100 from 'storybook/storyData/stonadskontoer/stønadskontoFlerbarnsuker100.json';

import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { AnnenForelder, Barn, BarnType, Dekningsgrad } from '@navikt/fp-common';
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

const Template: StoryFn<
    UttaksplanInfoTestData & { dekningsgrad: Dekningsgrad; annenForelder: AnnenForelder; barn: Barn; søker: Søker }
> = (args) => {
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
                    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                        dekningsgrad: args.dekningsgrad,
                    },
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

export const MorAleneomsorgDekningsgrad100Før1Okt2021 = Template.bind({});
MorAleneomsorgDekningsgrad100Før1Okt2021.args = {
    stønadskonto100,
    stønadskonto80,
    søkerinfo,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
    },
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

export const MorAleneomsorgDekningsgrad80Før1Okt2021 = Template.bind({});
MorAleneomsorgDekningsgrad80Før1Okt2021.args = {
    stønadskonto100,
    stønadskonto80,
    søkerinfo,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
    },
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

export const MorAleneomsorgPrematurFødsel = Template.bind({});
MorAleneomsorgPrematurFødsel.args = {
    stønadskonto100,
    stønadskonto80,
    søkerinfo,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2023-01-25').toDate()],
        termindato: dayjs('2023-04-01').toDate(),
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
    },
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
export const MorDeltUttakPrematurFødselDekningsgrad100 = Template.bind({});
MorDeltUttakPrematurFødselDekningsgrad100.args = {
    stønadskonto100: stønadskontoDeltUttak100PrematurWLB,
    stønadskonto80: stønadskontoDeltUttak100PrematurWLB,
    barn: {
        type: BarnType.FØDT,
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [dayjs('2023-01-11').toDate()],
        termindato: dayjs('2023-03-11').toDate(),
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const MorDeltUttakDekningsgrad100EtterWLB = Template.bind({});
MorDeltUttakDekningsgrad100EtterWLB.args = {
    stønadskonto100: stønadskontoDeltUttak100WLB,
    stønadskonto80: stønadskontoDeltUttak80WLB,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-12-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const MorDeltUttakTvillingerDekningsgrad100FørWLB = Template.bind({});
MorDeltUttakTvillingerDekningsgrad100FørWLB.args = {
    stønadskonto100: stønadskontoFlerbarnsuker100,
    stønadskonto80: stønadskontoFlerbarnsuker80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-07-15').toDate()],
        antallBarn: 2,
        datoForAleneomsorg: new Date(),
        dokumentasjonAvAleneomsorg: [],
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};
