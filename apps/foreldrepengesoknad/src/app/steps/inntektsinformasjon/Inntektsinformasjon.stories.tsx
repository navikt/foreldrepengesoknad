import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import _context from 'storybook/storyData/soknad/soknadMedEttBarn.json';
import _søkerinfo from 'storybook/storyData/sokerinfo/søkerinfoKvinneMedEttBarn.json';
import Inntektsinformasjon from './Inntektsinformasjon';
import { FpDataContext, FpDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { BarnType } from '@navikt/fp-common';

const søkerinfo = _søkerinfo as any;

export default {
    title: 'steps/Inntektsinformasjon',
    component: Inntektsinformasjon,
    decorators: [withRouter],
};

interface Props {
    søkerinfo: SøkerinfoDTO;
}

const Template: StoryFn<Props> = ({ søkerinfo }) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage/vedlegg').reply(
            200,
            { data: {} },
            {
                location: '',
            },
        );
        apiMock.onPost('/storage').reply(200, undefined);
    };

    return (
        <AxiosMock mock={restMock}>
            <FpDataContext
                initialState={{
                    [FpDataType.SØKERSITUASJON]: {
                        situasjon: 'fødsel',
                        rolle: 'mor',
                    },
                    [FpDataType.OM_BARNET]: {
                        type: BarnType.FØDT,
                        fødselsdatoer: [new Date()],
                        antallBarn: 1,
                    },
                    [FpDataType.SØKER]: {
                        erAleneOmOmsorg: false,
                        språkkode: 'nb',
                        // @ts-ignore FIX
                        harJobbetSomFrilansSiste10Mnd: undefined,
                        // @ts-ignore FIX
                        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
                        // @ts-ignore FIX
                        harHattAnnenInntektSiste10Mnd: undefined,
                    },
                    [FpDataType.UTENLANDSOPPHOLD]: {
                        iNorgeNeste12Mnd: false,
                        iNorgeSiste12Mnd: false,
                    },
                }}
            >
                <Inntektsinformasjon
                    søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)}
                    mellomlagreSøknad={() => undefined}
                    avbrytSøknad={() => undefined}
                />
            </FpDataContext>
        </AxiosMock>
    );
};

export const HarIkkeArbeidsforhold = Template.bind({});
HarIkkeArbeidsforhold.args = {
    søkerinfo,
};

export const HarArbeidsforhold = Template.bind({});
HarArbeidsforhold.args = {
    søkerinfo: {
        søker: {
            ...søkerinfo,
        },
        arbeidsforhold: [
            {
                arbeidsgiverId: '1',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Auto Joachim Bilpleie',
                stillingsprosent: 80,
                fom: '2015-01-01',
            },
            {
                arbeidsgiverId: '2',
                arbeidsgiverIdType: 'orgnr',
                arbeidsgiverNavn: 'Taco Express',
                stillingsprosent: 20,
                fom: '2019-01-01',
                tom: '2021-01-01',
            },
        ],
    } as SøkerinfoDTO,
};
