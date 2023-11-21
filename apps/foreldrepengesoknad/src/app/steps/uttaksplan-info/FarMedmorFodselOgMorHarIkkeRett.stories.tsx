import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import FarMedmorFødselOgMorHarIkkeRett from 'app/steps/uttaksplan-info/components/scenarios/far-medmor-fødsel-og-mor-har-ikke-rett/FarMedmorFødselOgMorHarIkkeRett';
import { RequestStatus } from 'app/types/RequestState';
import _søkerinfoFarSøker from 'storybook/storyData/uttaksplan/far-medmor-fødsel-mor-har-ikke-rett/søkerinfoFarSøker.json';
import stønadskonto80MorHarIkkeRett from 'storybook/storyData/stonadskontoer/stønadskonto80MorHarIkkeRett.json';
import stønadskonto100MorHarIkkeRett from 'storybook/storyData/stonadskontoer/stønadskonto100MorHarIkkeRett.json';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, FpDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { AnnenForelder, BarnType } from '@navikt/fp-common';
import dayjs from 'dayjs';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfoFarSøker = _søkerinfoFarSøker as any;

export default {
    title: 'steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett',
    component: FarMedmorFødselOgMorHarIkkeRett,
    decorators: [withRouter],
};

const Template: StoryFn<UttaksplanInfoTestData & { annenForelder: AnnenForelder }> = (args) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    };
    return (
        <AxiosMock mock={restMock}>
            <FpDataContext
                initialState={{
                    [FpDataType.SØKERSITUASJON]: {
                        situasjon: 'fødsel',
                        rolle: 'far',
                    },
                    [FpDataType.OM_BARNET]: {
                        type: BarnType.FØDT,
                        fødselsdatoer: [dayjs('2021-07-01').toDate()],
                        antallBarn: 1,
                        termindato: dayjs('2021-07-01').toDate(),
                    },
                    [FpDataType.SØKER]: {
                        erAleneOmOmsorg: false,
                        språkkode: 'nb',
                        harJobbetSomFrilansSiste10Mnd: false,
                        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                        harHattAnnenInntektSiste10Mnd: false,
                    },
                    [FpDataType.ANNEN_FORELDER]: args.annenForelder,
                }}
            >
                <UttaksplanInfo
                    søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)}
                    erEndringssøknad={false}
                    mellomlagreSøknad={() => undefined}
                    avbrytSøknad={() => undefined}
                />
            </FpDataContext>
        </AxiosMock>
    );
};

export const UttaksplanDerMorIkkeHarRettPåForeldrepenger = Template.bind({});
UttaksplanDerMorIkkeHarRettPåForeldrepenger.args = {
    stønadskonto100: stønadskonto100MorHarIkkeRett,
    stønadskonto80: stønadskonto80MorHarIkkeRett,
    søkerinfo: søkerinfoFarSøker,
    annenForelder: {
        etternavn: 'dfg',
        fornavn: 'dsgdfg',
        fnr: '123123123',
        utenlandskFnr: false,
        erUfør: false,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
    },
};

export const UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør = Template.bind({});
UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør.args = {
    stønadskonto100: stønadskonto100MorHarIkkeRett,
    stønadskonto80: stønadskonto80MorHarIkkeRett,
    søkerinfo: søkerinfoFarSøker,
    annenForelder: {
        etternavn: 'dfg',
        fornavn: 'dsgdfg',
        fnr: '123123123',
        utenlandskFnr: false,
        erUfør: true,
        kanIkkeOppgis: false,
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: false,
    },
};
