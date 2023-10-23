import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import withIntlProvider from 'storybook/decorators/withIntl';
import withRouter from 'storybook/decorators/withRouter';
import withForeldrepengersøknadContext from 'storybook/decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from 'storybook/utils/ForeldrepengerStateMock';
import AxiosMock from 'storybook/utils/AxiosMock';
import _søkerinfo from 'storybook/storyData/sokerinfo/søkerinfoKvinneMedTreBarn.json';
import _søkerinfoMedDødTrilling from 'storybook/storyData/sokerinfo/søkerinfoMedDødTrilling.json';
import _context from 'storybook/storyData/soknad/soknadOmBarnet.json';
import OmBarnet from './OmBarnet';
import { BarnType } from '@navikt/fp-common';

const søkerinfo = _søkerinfo as any;
const context = _context as any;
const søkerinfoMedDødTrilling = _søkerinfoMedDødTrilling as any;

export default {
    title: 'steps/OmBarnet',
    component: OmBarnet,
    decorators: [withRouter, withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    context: ForeldrepengesøknadContextState;
    søkerinfo: SøkerinfoDTO;
}

const Template: StoryFn<Props> = ({ context, søkerinfo }) => {
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
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <OmBarnet />
            </ForeldrepengerStateMock>
        </AxiosMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            barn: undefined,
        },
    },
    søkerinfo,
};

export const FarFødsel = Template.bind({});
FarFødsel.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'far',
            },
            barn: undefined,
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: { ...søkerinfo, kjønn: 'M' },
};

export const MedmorFødsel = Template.bind({});
MedmorFødsel.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'medmor',
            },
            barn: undefined,
        },
    },
    søkerinfo,
};

export const ForAdopsjon = Template.bind({});
ForAdopsjon.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søkersituasjon: {
                situasjon: 'adopsjon',
                rolle: 'mor',
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const RegistrertBarnFødselFar = Template.bind({});
RegistrertBarnFødselFar.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
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
        },
        søknadGjelderEtNyttBarn: false,
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const RegistrertBarnFødselMor = Template.bind({});
RegistrertBarnFødselMor.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
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
        },
        søknadGjelderEtNyttBarn: false,
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const RegistrertBarnAdopsjonMor = Template.bind({});
RegistrertBarnAdopsjonMor.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
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
        },
        søknadGjelderEtNyttBarn: false,
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const RegistrertBarnTrillingerDerEnErDød = Template.bind({});
RegistrertBarnTrillingerDerEnErDød.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
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
        },
        søknadGjelderEtNyttBarn: false,
    } as ForeldrepengesøknadContextState,
    søkerinfo: søkerinfoMedDødTrilling,
};

export const SøknadPåUregistrertBarnSomErFødt = Template.bind({});
SøknadPåUregistrertBarnSomErFødt.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
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
        },
        søknadGjelderEtNyttBarn: false,
    } as ForeldrepengesøknadContextState,
    søkerinfo: { ...søkerinfo, registrerteBarn: [] },
};
