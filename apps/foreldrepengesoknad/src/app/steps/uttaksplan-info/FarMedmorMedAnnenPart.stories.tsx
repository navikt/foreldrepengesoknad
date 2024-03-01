import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import { MemoryRouter } from 'react-router-dom';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import stønadskontoDeltUttak100Tvillinger from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100Tvillinger.json';
import AxiosMock from 'storybook/utils/AxiosMock';

import { Barn, BarnType, Dekningsgrad, DekningsgradDTO, SaksperiodeDTO } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { Søkerinfo } from '@navikt/fp-types';

import { ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import { RequestStatus } from 'app/types/RequestState';

import UttaksplanInfo from './UttaksplanInfo';
import UttaksplanInfoTestData from './uttaksplanInfoTestData';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = '/konto';

const søkerinfo = {
    søker: {
        fnr: '19047815714',
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
        kjønn: 'M',
        fødselsdato: '1978-04-19',
        barn: [
            {
                fnr: '21091981146',
                fødselsdato: '2021-03-15',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'KLØKTIG',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
        ],
    },
} as Søkerinfo;

const uttaksperiodeFedrekvote = {
    fom: '2022-12-07',
    tom: '2022-12-27',
    kontoType: 'FEDREKVOTE',
    overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
    resultat: {
        innvilget: true,
        trekkerMinsterett: false,
        trekkerDager: true,
        årsak: 'ANNET',
    },
} as SaksperiodeDTO;

const uttaksperiodeFellesperiode = {
    fom: '2022-12-07',
    tom: '2023-01-07',
    kontoType: 'FELLESPERIODE',
    resultat: {
        innvilget: true,
        trekkerMinsterett: false,
        trekkerDager: true,
        årsak: 'ANNET',
    },
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
};

const Template: StoryFn<UttaksplanInfoTestData & { barn: Barn; dekningsgrad: Dekningsgrad }> = (args) => {
    initAmplitude();
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(
            200,
            {
                perioder: args.uttaksplanAnnenPart,
                dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT,
            } as AnnenPartVedtakDTO,
            RequestStatus.FINISHED,
        );
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    };
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
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
                        [ContextDataType.SØKER_DATA]: {
                            harJobbetSomFrilansSiste10Mnd: false,
                            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                            harHattAnnenInntektSiste10Mnd: false,
                        },
                        [ContextDataType.ANNEN_FORELDER]: {
                            erAleneOmOmsorg: false,
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
                        søker={søkerinfo.søker}
                        erEndringssøknad={false}
                        mellomlagreSøknadOgNaviger={() => Promise.resolve()}
                        avbrytSøknad={() => undefined}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
    );
};

export const FarSøkerEtterMorFør1Okt2021 = Template.bind({});
FarSøkerEtterMorFør1Okt2021.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2021-06-14'],
        antallBarn: 1,
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    uttaksplanAnnenPart: [uttaksperiodeFellesperiode],
};

export const FarSøkerEtterMorEtter1Okt2021 = Template.bind({});
FarSøkerEtterMorEtter1Okt2021.args = {
    stønadskonto100: stønadskontoDeltUttak100,
    stønadskonto80: stønadskontoDeltUttak80,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2022-09-14'],
        antallBarn: 1,
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    uttaksplanAnnenPart: [uttaksperiodeFellesperiode],
};

export const FarSøkerEtterMorTrillinger = Template.bind({});
FarSøkerEtterMorTrillinger.args = {
    stønadskonto100: stønadskontoDeltUttak100Tvillinger,
    stønadskonto80: stønadskontoDeltUttak100Tvillinger,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2022-09-14'],
        antallBarn: 3,
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    uttaksplanAnnenPart: [uttaksperiodeFellesperiode],
};

export const FarSøkerEtterMorDerMorHarTattUtFarsKvote = Template.bind({});
FarSøkerEtterMorDerMorHarTattUtFarsKvote.args = {
    stønadskonto100: stønadskontoDeltUttak100Tvillinger,
    stønadskonto80: stønadskontoDeltUttak100Tvillinger,
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: ['2022-09-14'],
        antallBarn: 1,
    },
    søkerinfo,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    uttaksplanAnnenPart: [uttaksperiodeFedrekvote],
};
