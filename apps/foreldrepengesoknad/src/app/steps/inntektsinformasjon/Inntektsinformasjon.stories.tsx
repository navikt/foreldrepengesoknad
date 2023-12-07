import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import { action } from '@storybook/addon-actions';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import _context from 'storybook/storyData/soknad/soknadMedEttBarn.json';
import _søkerinfo from 'storybook/storyData/sokerinfo/søkerinfoKvinneMedEttBarn.json';
import Inntektsinformasjon from './Inntektsinformasjon';
import { Action, FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { BarnType } from '@navikt/fp-common';
import { Opphold } from 'app/context/types/InformasjonOmUtenlandsopphold';

const søkerinfo = _søkerinfo as any;

const defaultUtenlandsopphold = {
    iNorgeNeste12Mnd: false,
    iNorgeSiste12Mnd: false,
};

export default {
    title: 'steps/Inntektsinformasjon',
    component: Inntektsinformasjon,
    decorators: [withRouter],
};

interface Props {
    søkerinfo: SøkerinfoDTO;
    mellomlagreSøknadOgNaviger?: () => void;
    gåTilNesteSide: (action: Action) => void;
    utenlandsopphold: Opphold;
}

const Template: StoryFn<Props> = ({
    søkerinfo,
    gåTilNesteSide,
    mellomlagreSøknadOgNaviger = action('button-click'),
    utenlandsopphold = defaultUtenlandsopphold,
}) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage/vedlegg').reply(
            200,
            { data: {} },
            {
                location: '',
            },
        );
        apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
    };

    return (
        <AxiosMock mock={restMock}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.SØKERSITUASJON]: {
                        situasjon: 'fødsel',
                        rolle: 'mor',
                    },
                    [ContextDataType.OM_BARNET]: {
                        type: BarnType.FØDT,
                        fødselsdatoer: [new Date()],
                        antallBarn: 1,
                    },
                    [ContextDataType.SØKER]: {
                        erAleneOmOmsorg: false,
                        // @ts-ignore FIX
                        harJobbetSomFrilansSiste10Mnd: undefined,
                        // @ts-ignore FIX
                        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
                        // @ts-ignore FIX
                        harHattAnnenInntektSiste10Mnd: undefined,
                    },
                    [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                }}
            >
                <Inntektsinformasjon
                    søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={action('button-click')}
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
