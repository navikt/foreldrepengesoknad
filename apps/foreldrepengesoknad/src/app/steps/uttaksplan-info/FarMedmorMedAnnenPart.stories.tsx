import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import { RequestStatus } from 'app/types/RequestState';
import _søkerinfo from 'storybook/storyData/uttaksplan/far-medmor-fødsel-begge-har-rett/søkerinfo.json';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';
import UttaksplanInfo from './UttaksplanInfo';
import { FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { Barn, BarnType, Dekningsgrad, DekningsgradDTO, SaksperiodeDTO } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfo = _søkerinfo as any;

const uttaksperiode = {
    fom: '2022-12-07',
    tom: '2022-12-07',
    kontoType: 'MØDREKVOTE',
    resultat: {
        innvilget: true,
        trekkerMinsterett: false,
        trekkerDager: true,
        årsak: 'ANNET',
    },
    morsAktivitet: 'ARBEID',
    gradering: {
        arbeidstidprosent: 55,
        aktivitet: {
            type: 'FRILANS',
            arbeidsgiver: {
                id: 'string',
                type: 'PRIVAT',
            },
        },
    },
    samtidigUttak: 50,
    flerbarnsdager: true,
} as SaksperiodeDTO;

export default {
    title: 'steps/uttaksplan-info/FarMedmorMedAnnenPart',
    component: UttaksplanInfo,
    decorators: [withRouter],
};

const Template: StoryFn<UttaksplanInfoTestData & { barn: Barn; dekningsgrad: Dekningsgrad }> = (args) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(
            200,
            {
                perioder: [uttaksperiode],
                dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT,
            } as AnnenPartVedtakDTO,
            RequestStatus.FINISHED,
        );
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
                    [ContextDataType.OM_BARNET]: args.barn,
                    [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
                        dekningsgrad: args.dekningsgrad,
                    },
                    [ContextDataType.SØKER]: {
                        erAleneOmOmsorg: false,
                        harJobbetSomFrilansSiste10Mnd: false,
                        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                        harHattAnnenInntektSiste10Mnd: false,
                    },
                    [ContextDataType.ANNEN_FORELDER]: {
                        etternavn: 'Pettersen',
                        fornavn: 'Helga',
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

export const UttaksplanInfoAnnenPart = Template.bind({});
UttaksplanInfoAnnenPart.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-06-14').toDate()],
        antallBarn: 1,
        dokumentasjonAvAleneomsorg: [],
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};
