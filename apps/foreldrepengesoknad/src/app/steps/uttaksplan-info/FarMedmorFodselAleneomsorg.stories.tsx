import dayjs from 'dayjs';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import { BarnType, Dekningsgrad } from '@navikt/fp-common';
import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';
import _søkerinfo from 'storybook/storyData/uttaksplan/far-medmor-fødsel-aleneomsorg/søkerinfo.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
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
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
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
                        fødselsdatoer: [dayjs('2022-03-01').toDate()],
                        antallBarn: 1,
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
                        etternavn: 'dfg',
                        fornavn: 'dfg',
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

export const UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad100 = Template.bind({});
UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad100.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export const UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad80 = Template.bind({});
UttaksplanInfoFarMedmorFødselAleneomsorgDekningsgrad80.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    søkerinfo,
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
};
