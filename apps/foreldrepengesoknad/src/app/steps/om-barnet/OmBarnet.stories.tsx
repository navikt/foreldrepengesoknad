import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import { action } from '@storybook/addon-actions';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import _søkerinfo from 'storybook/storyData/sokerinfo/søkerinfoKvinneMedTreBarn.json';
import _søkerinfoMedDødTrilling from 'storybook/storyData/sokerinfo/søkerinfoMedDødTrilling.json';
import OmBarnet from './OmBarnet';
import { Barn, BarnType } from '@navikt/fp-common';
import { Action, FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import { SøkersituasjonFp } from '@navikt/fp-types';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';

const søkerinfo = _søkerinfo as any;
const søkerinfoMedDødTrilling = _søkerinfoMedDødTrilling as any;

export default {
    title: 'steps/OmBarnet',
    component: OmBarnet,
    decorators: [withRouter],
};

interface Props {
    søkerinfo: SøkerinfoDTO;
    søkersituasjon?: SøkersituasjonFp;
    barn?: Barn;
    søknadGjelderEtNyttBarn?: boolean;
    mellomlagreSøknadOgNaviger?: () => void;
    gåTilNesteSide: (action: Action) => void;
}

const Template: StoryFn<Props> = ({
    søkerinfo,
    søkersituasjon = {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barn,
    søknadGjelderEtNyttBarn = false,
    gåTilNesteSide,
    mellomlagreSøknadOgNaviger = action('button-click'),
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
                    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                    [ContextDataType.OM_BARNET]: barn,
                }}
            >
                <OmBarnet
                    søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)}
                    søknadGjelderNyttBarn={søknadGjelderEtNyttBarn}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={action('button-click')}
                />
            </FpDataContext>
        </AxiosMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    barn: undefined,
    søkerinfo,
};

export const FarFødsel = Template.bind({});
FarFødsel.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barn: undefined,
    søkerinfo: { ...søkerinfo, kjønn: 'M' },
};

export const MedmorFødsel = Template.bind({});
MedmorFødsel.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'medmor',
    },
    barn: undefined,
    søkerinfo,
};

export const ForAdopsjon = Template.bind({});
ForAdopsjon.args = {
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
    søkerinfo,
};

export const RegistrertBarnFødselFar = Template.bind({});
RegistrertBarnFødselFar.args = {
    søknadGjelderEtNyttBarn: false,
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    barn: {
        antallBarn: 1,
        fnr: ['21091981146'],
        fødselsdatoer: [new Date('2021-03-15')],
        type: BarnType.FØDT,
    },
    søkerinfo,
};

export const RegistrertBarnFødselMor = Template.bind({});
RegistrertBarnFødselMor.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barn: {
        antallBarn: 2,
        fnr: ['31091981146', '31091981147'],
        fødselsdatoer: [new Date('2022-08-02'), new Date('2022-08-02')],
        type: BarnType.FØDT,
    },
    søknadGjelderEtNyttBarn: false,
    søkerinfo,
};

export const RegistrertBarnAdopsjonMor = Template.bind({});
RegistrertBarnAdopsjonMor.args = {
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
    barn: {
        antallBarn: 1,
        fnr: ['21091981146'],
        fødselsdatoer: [new Date('2021-03-15')],
        type: BarnType.FØDT,
    },
    søknadGjelderEtNyttBarn: false,
    søkerinfo,
};

export const RegistrertBarnTrillingerDerEnErDød = Template.bind({});
RegistrertBarnTrillingerDerEnErDød.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barn: {
        antallBarn: 3,
        fnr: ['21091981146', '31091981147', '31091981148'],
        fødselsdatoer: [new Date('2023-01-02')],
        type: BarnType.FØDT,
    },
    søknadGjelderEtNyttBarn: false,
    søkerinfo: søkerinfoMedDødTrilling,
};

export const SøknadPåUregistrertBarnSomErFødt = Template.bind({});
SøknadPåUregistrertBarnSomErFødt.args = {
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barn: {
        antallBarn: 1,
        fnr: undefined,
        fødselsdatoer: [new Date('2023-01-02')],
        type: BarnType.FØDT,
    },
    søknadGjelderEtNyttBarn: false,
    søkerinfo: { ...søkerinfo, registrerteBarn: [] },
};
