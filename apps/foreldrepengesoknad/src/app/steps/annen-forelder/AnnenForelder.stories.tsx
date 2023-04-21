import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import withIntlProvider from 'storybook/decorators/withIntl';
import withRouter from 'storybook/decorators/withRouter';
import withForeldrepengersøknadContext from 'storybook/decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from 'storybook/utils/ForeldrepengerStateMock';
import AxiosMock from 'storybook/utils/AxiosMock';
import _søkerinfo from 'storybook/storyData/sokerinfo/søkerinfoKvinneMedEttBarn.json';
import _context from 'storybook/storyData/soknad/soknadMedEttBarn.json';
import AnnenForelder from './AnnenForelder';

const søkerinfo = _søkerinfo as any;
const context = _context as any;

export default {
    title: 'steps/AnnenForelder',
    component: AnnenForelder,
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
            }
        );
        apiMock.onPost('/storage').reply(200, undefined);
    };
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <AnnenForelder />
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
            barn: {
                ...context.søknad.barn,
                fnr: '21091981146',
            },
        },
    },
    søkerinfo,
};

export const SkalOppgiPersonalia = Template.bind({});
SkalOppgiPersonalia.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            annenForelder: {
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: {
        søker: {
            ...søkerinfo,
            barn: [],
        },
    } as SøkerinfoDTO,
};

export const SkalOppgiPersonaliaNavnMangler = Template.bind({});
SkalOppgiPersonaliaNavnMangler.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            annenForelder: {
                fornavn: 'annen forelder',
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: {
        søker: {
            ...søkerinfo,
            barn: [],
        },
    } as SøkerinfoDTO,
};

export const SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike = Template.bind({});
SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            annenForelder: {
                fornavn: 'Tom',
                fnr: '123456789',
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: {
        søker: {
            ...søkerinfo,
            barn: [{ fornavn: 'Ben', annenForelder: { fnr: '999999999' } }],
        },
    } as SøkerinfoDTO,
};

export const ForFar = Template.bind({});
ForFar.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            barn: {
                ...context.søknad.barn,
                fnr: '21091981146',
            },
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'far',
            },
        },
    },
    søkerinfo: {
        søker: {
            ...søkerinfo.søker,
            fornavn: 'LEALAUS',
            etternavn: 'BÆREPOSE',
            kjønn: 'M',
            barn: [
                {
                    fnr: '21091981146',
                    fødselsdato: '2021-03-15',
                    annenForelder: {
                        fnr: '12038517080',
                        fødselsdato: '1985-03-12',
                        fornavn: 'TALENTFULL',
                        etternavn: 'MYGG',
                    },
                    fornavn: 'KLØKTIG',
                    etternavn: 'MIDTPUNKT',
                    kjønn: 'K',
                },
            ],
        },
    },
};

export const MorUfødtBarn = Template.bind({});
MorUfødtBarn.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            barn: {
                type: 'ufødt',
                antallBarn: '1',
                termindato: '2023-05-05',
            },
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'mor',
            },
            annenForelder: {
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: {
        ...søkerinfo,
        søker: {
            ...søkerinfo.søker,
            barn: [],
        },
    } as SøkerinfoDTO,
};

export const MedmorUfødtBarn = Template.bind({});
MedmorUfødtBarn.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            barn: {
                type: 'ufødt',
                antallBarn: '1',
                termindato: '2023-05-05',
            },
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'medmor',
            },
            annenForelder: {
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: {
        ...søkerinfo,
        søker: {
            ...søkerinfo.søker,
            kjønn: 'K',
            barn: [],
        },
    } as SøkerinfoDTO,
};

export const FarUfødtBarn = Template.bind({});
FarUfødtBarn.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            barn: {
                type: 'ufødt',
                antallBarn: '1',
                termindato: '2023-05-05',
            },
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'far',
            },
            annenForelder: {
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: {
        ...søkerinfo,
        søker: {
            ...søkerinfo.søker,
            fornavn: 'LEALAUS',
            etternavn: 'BÆREPOSE',
            kjønn: 'M',
            barn: [],
        },
    } as SøkerinfoDTO,
};

export const FarGiftUfødtBarn = Template.bind({});
FarGiftUfødtBarn.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            barn: {
                type: 'ufødt',
                antallBarn: '1',
                termindato: '2023-05-05',
            },
            søkersituasjon: {
                situasjon: 'fødsel',
                rolle: 'far',
            },
            annenForelder: {
                kanIkkeOppgis: false,
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo: {
        ...søkerinfo,
        søker: {
            ...søkerinfo.søker,
            fornavn: 'LEALAUS',
            etternavn: 'BÆREPOSE',
            kjønn: 'M',
            barn: [],
            sivilstand: { type: 'GIFT' },
        },
    } as SøkerinfoDTO,
};
