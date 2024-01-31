import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';

import _søkerinfoMorSøker from 'storybook/storyData/sokerinfo/søkerinfoMorSøker.json';
import _søkerinfoFarSøker from 'storybook/storyData/sokerinfo/søkerinfoFarSøker.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoDeltUttak100Adopsjon from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100Adopsjon.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak80Adopsjon from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80Adopsjon.json';

import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { AnnenForelder, Barn, BarnType, Dekningsgrad } from '@navikt/fp-common';
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
        dekningsgrad: Dekningsgrad;
    }
> = (args) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    };
    return (
        <AxiosMock mock={restMock}>
            <FpDataContext
                initialState={{
                    [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
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

export const AdopsjonMorSøkerFarHarRettIEOSFør1Okt2021 = Template.bind({});
AdopsjonMorSøkerFarHarRettIEOSFør1Okt2021.args = {
    stønadskonto100: stønadskontoDeltUttak100Adopsjon,
    stønadskonto80: stønadskontoDeltUttak80Adopsjon,
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
        fornavn: 'Eksotisk',
        etternavn: 'EØS',
        fnr: '1111UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
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

export const AdopsjonFarSøkerMorHarRettIEOSFør1Okt2021 = Template.bind({});
AdopsjonFarSøkerMorHarRettIEOSFør1Okt2021.args = {
    stønadskonto100: stønadskontoDeltUttak100Adopsjon,
    stønadskonto80: stønadskontoDeltUttak80Adopsjon,
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
        fornavn: 'Palme',
        etternavn: 'EØS',
        fnr: '2222UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
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

export const FødselFarSøkerMorHarRettIEOSTvillingerEtter1Okt2021 = Template.bind({});
FødselFarSøkerMorHarRettIEOSTvillingerEtter1Okt2021.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
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
        fornavn: 'Palme',
        etternavn: 'EØS',
        fnr: '2222UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
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

export const FødselMorSøkerFarHarRettIEOSPrematurEtterWLB = Template.bind({});
FødselMorSøkerFarHarRettIEOSPrematurEtterWLB.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barn: {
        dokumentasjonAvAleneomsorg: [],
        fødselsdatoer: [dayjs('2022-08-14').toDate()],
        termindato: dayjs('2022-10-14').toDate(),
        antallBarn: 1,
        // @ts-ignore FIX
        adopsjonsdato: undefined,
        adoptertIUtlandet: undefined,
        type: BarnType.FØDT,
    },
    annenForelder: {
        fornavn: 'Espen',
        etternavn: 'EØS',
        fnr: '2222UUUUU',
        harRettPåForeldrepengerINorge: false,
        harRettPåForeldrepengerIEØS: true,
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
