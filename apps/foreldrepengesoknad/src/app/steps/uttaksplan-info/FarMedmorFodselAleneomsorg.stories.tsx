import dayjs from 'dayjs';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import { BarnType, Dekningsgrad } from '@navikt/fp-common';
import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';
import _søkerinfo from 'storybook/storyData/uttaksplan/far-medmor-fødsel-aleneomsorg/søkerinfo.json';
import stønadskonto80AleneomsorgFar from 'storybook/storyData/stonadskontoer/stønadskonto80AleneomsorgFar.json';
import stønadskonto100AleneomsorgFar from 'storybook/storyData/stonadskontoer/stønadskonto100AleneomsorgFar.json';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import UttaksplanInfo from './UttaksplanInfo';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = 'test/konto';

const søkerinfo = _søkerinfo as any;

export default {
    title: 'steps/uttaksplan-info/FarMedmorFødselAleneomsorg',
    component: UttaksplanInfo,
    decorators: [withRouter],
};

const Template: StoryFn<UttaksplanInfoTestData & { dekningsgrad: Dekningsgrad }> = (args) => {
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
                        rolle: 'far',
                    },
                    [ContextDataType.OM_BARNET]: {
                        type: BarnType.FØDT,
                        fødselsdatoer: args.fødselsdatoer,
                        antallBarn: args.antallBarn,
                        datoForAleneomsorg: dayjs('2022-03-24').toDate(),
                        dokumentasjonAvAleneomsorg: [],
                    },
                    [ContextDataType.SØKER]: {
                        erAleneOmOmsorg: true,
                        harJobbetSomFrilansSiste10Mnd: false,
                        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                        harHattAnnenInntektSiste10Mnd: false,
                    },
                    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                        dekningsgrad: args.dekningsgrad,
                    },
                    [ContextDataType.ANNEN_FORELDER]: {
                        etternavn: 'Hanson',
                        fornavn: 'Hanne',
                        fnr: '02068629902',
                        utenlandskFnr: false,
                        kanIkkeOppgis: false,
                        harRettPåForeldrepengerINorge: true,
                        erInformertOmSøknaden: true,
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

export const FarMedmorFødselAleneomsorgDekningsgrad100 = Template.bind({});
FarMedmorFødselAleneomsorgDekningsgrad100.args = {
    stønadskonto100: stønadskonto100AleneomsorgFar,
    stønadskonto80: stønadskonto80AleneomsorgFar,
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    antallBarn: 1,
    fødselsdatoer: [dayjs('2022-03-01').toDate()],
};

export const FarMedmorFødselAleneomsorgDekningsgrad80 = Template.bind({});
FarMedmorFødselAleneomsorgDekningsgrad80.args = {
    stønadskonto100: stønadskonto100AleneomsorgFar,
    stønadskonto80: stønadskonto80AleneomsorgFar,
    søkerinfo,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    antallBarn: 1,
    fødselsdatoer: [dayjs('2022-03-01').toDate()],
};

export const FarMedmorFødselAleneomsorgFør1Okt2021 = Template.bind({});
FarMedmorFødselAleneomsorgFør1Okt2021.args = {
    stønadskonto100: stønadskonto100AleneomsorgFar,
    stønadskonto80: stønadskonto80AleneomsorgFar,
    søkerinfo,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    antallBarn: 1,
    fødselsdatoer: [dayjs('2021-09-30').toDate()],
};
