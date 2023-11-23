import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';

import _søkerinfoMorSøker from 'storybook/storyData/sokerinfo/søkerinfoMorSøker.json';
import _søkerinfoFarSøker from 'storybook/storyData/sokerinfo/søkerinfoFarSøker.json';
import stønadskonto100 from 'storybook/storyData/stonadskontoer/stønadskonto100.json';
import stønadskonto80 from 'storybook/storyData/stonadskontoer/stønadskonto80.json';

import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, FpDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { AnnenForelder, Barn, BarnType } from '@navikt/fp-common';
import Søker from 'app/context/types/Søker';
import dayjs from 'dayjs';
import { SøkersituasjonFp } from '@navikt/fp-types';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfoMorSøker = _søkerinfoMorSøker as any;
const søkerinfoFarSøker = _søkerinfoFarSøker as any;

export default {
    title: 'steps/uttaksplan-info/MorFarAnnenForelderHarRettIEØS',
    component: UttaksplanInfo,
    decorators: [withRouter],
};

const Template: StoryFn<
    UttaksplanInfoTestData & {
        søkersituasjon: SøkersituasjonFp;
        annenForelder: AnnenForelder;
        barn: Barn;
        søker: Søker;
    }
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
                    [FpDataType.SØKERSITUASJON]: args.søkersituasjon,
                    [FpDataType.OM_BARNET]: args.barn,
                    [FpDataType.SØKER]: args.søker,
                    [FpDataType.ANNEN_FORELDER]: args.annenForelder,
                }}
            >
                <UttaksplanInfo
                    søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)}
                    erEndringssøknad={false}
                    mellomlagreSøknad={() => Promise.resolve()}
                    avbrytSøknad={() => undefined}
                />
            </FpDataContext>
        </AxiosMock>
    );
};

export const UttaksplanAdopsjonMorSøkerFarHarRettIEOS = Template.bind({});
UttaksplanAdopsjonMorSøkerFarHarRettIEOS.args = {
    stønadskonto100,
    stønadskonto80,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
    barn: {
        antallBarn: 1,
        type: BarnType.ADOPTERT_ANNET_BARN,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: [],
    },
    annenForelder: {
        fornavn: 'Far',
        etternavn: 'EØS',
        fnr: '1111UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    søker: {
        språkkode: 'nb',
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoMorSøker,
};

export const UttaksplanAdopsjonFarSøkerMorHarRettIEOS = Template.bind({});
UttaksplanAdopsjonFarSøkerMorHarRettIEOS.args = {
    stønadskonto100,
    stønadskonto80,
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'far',
    },
    barn: {
        antallBarn: 1,
        type: BarnType.ADOPTERT_ANNET_BARN,
        adopsjonsdato: dayjs('2021-03-15').toDate(),
        adoptertIUtlandet: false,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [],
        omsorgsovertakelse: [],
    },
    annenForelder: {
        fornavn: 'Mor',
        etternavn: 'EØS',
        fnr: '2222UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    søker: {
        språkkode: 'nb',
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFarSøker,
};

export const UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger = Template.bind({});
UttaksplanFødselFarSøkerMorHarRettIEOSTvillinger.args = {
    stønadskonto100,
    stønadskonto80,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barn: {
        type: BarnType.ADOPTERT_ANNET_BARN,
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [dayjs('2022-06-14').toDate(), dayjs('2022-06-14').toDate()],
        antallBarn: 2,
        // @ts-ignore FIX
        adopsjonsdato: undefined,
        adoptertIUtlandet: undefined,
    },
    annenForelder: {
        fornavn: 'Mor',
        etternavn: 'EØS',
        fnr: '2222UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    søker: {
        språkkode: 'nb',
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFarSøker,
};

export const UttaksplanFødselMorSøkerFarHarRettIEOSPrematur = Template.bind({});
UttaksplanFødselMorSøkerFarHarRettIEOSPrematur.args = {
    stønadskonto100,
    stønadskonto80,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barn: {
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [dayjs('2022-06-14').toDate()],
        termindato: dayjs('2022-08-14').toDate(),
        antallBarn: 1,
        // @ts-ignore FIX
        adopsjonsdato: undefined,
        adoptertIUtlandet: undefined,
        type: BarnType.FØDT,
    },
    annenForelder: {
        fornavn: 'Mor',
        etternavn: 'EØS',
        fnr: '2222UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
        kanIkkeOppgis: false,
    },
    søker: {
        språkkode: 'nb',
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false,
    },
    søkerinfo: søkerinfoFarSøker,
};
