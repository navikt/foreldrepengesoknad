import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'api/queries';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { annenPartVedtak, avslåttAnnenPartVedtak } from 'storybookData/annenPartVedtak';

import { AnnenForelder, Barn, BarnType } from '@navikt/fp-common';
import { BarnDto_fpoversikt, PersonDto_fpoversikt, SøkersituasjonFp } from '@navikt/fp-types';
import { withQueryClient } from '@navikt/fp-utils-test';

import { AnnenForelderSteg } from './AnnenForelderSteg';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

const defaultSøker = {
    fnr: '19047815714',
    navn: {
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
    },
    kjønn: 'K',
    fødselsdato: '1978-04-19',
    barn: [
        {
            fnr: '21091981146',
            fødselsdato: '2021-03-15',
            annenPart: {
                fnr: '12038517080',
                fødselsdato: '1985-03-12',
                navn: {
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
            },
            navn: {
                fornavn: 'KLØKTIG',
                etternavn: 'MIDTPUNKT',
            },
            kjønn: 'M',
        },
    ],
} satisfies PersonDto_fpoversikt;

const defaultAnnenForelder = {
    fnr: '1',
    fornavn: 'Hans',
    etternavn: 'Utvikler',
    kanIkkeOppgis: false,
    erAleneOmOmsorg: false,
} satisfies AnnenForelder;

type StoryArgs = {
    søkersituasjon?: SøkersituasjonFp;
    barn?: Barn;
    annenForelder?: AnnenForelder;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof AnnenForelderSteg>;

const meta = {
    title: 'steps/AnnenForelderSteg',
    component: AnnenForelderSteg,
    decorators: [withQueryClient],
    render: ({
        søkersituasjon = {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barn = {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-03-15'],
            antallBarn: 1,
        },
        annenForelder,
        gåTilNesteSide = action('button-click'),
        ...rest
    }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.ANNEN_FORELDER]}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                        [ContextDataType.OM_BARNET]: barn,
                        [ContextDataType.ANNEN_FORELDER]: annenForelder,
                    }}
                >
                    <AnnenForelderSteg {...rest} />
                </FpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const AnnenForelderFraOppgittBarn: Story = {
    args: {
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-03-15'],
            antallBarn: 1,
            fnr: ['21091981146'],
        },
        søkerInfo: { person: defaultSøker, arbeidsforhold: [] },
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: action('button-click'),
    },
};

export const SkalOppgiPersonalia: Story = {
    args: {
        ...AnnenForelderFraOppgittBarn.args,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-03-15'],
            antallBarn: 1,
        },
        søkerInfo: {
            person: {
                ...defaultSøker,
                barn: [],
            },
            arbeidsforhold: [],
        },
        annenForelder: undefined,
    },
};

export const SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike: Story = {
    args: {
        ...SkalOppgiPersonalia.args,
        søkerInfo: {
            person: {
                ...defaultSøker,
                barn: [
                    {
                        navn: {
                            fornavn: 'Ben',
                            etternavn: 'Big',
                        },
                        fnr: '1',
                        kjønn: 'M',
                        fødselsdato: '2021-03-15',
                        annenPart: {
                            fnr: '999999999',
                            fødselsdato: '1985-03-12',
                            navn: {
                                fornavn: 'LEALAUS',
                                etternavn: 'BÆREPOSE',
                            },
                        },
                    },
                ] satisfies BarnDto_fpoversikt[],
            },
            arbeidsforhold: [],
        },
        annenForelder: {
            ...defaultAnnenForelder,
            fornavn: 'Tom',
            fnr: '123456789',
        },
    },
};

export const ForFar: Story = {
    args: {
        ...SkalOppgiPersonalia.args,
        barn: {
            type: BarnType.FØDT,
            fødselsdatoer: ['2021-03-15'],
            antallBarn: 1,
            fnr: ['21091981146'],
        },
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        søkerInfo: {
            person: {
                ...defaultSøker,
                navn: {
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                kjønn: 'M',
                barn: [
                    {
                        fnr: '21091981146',
                        fødselsdato: '2021-03-15',
                        annenPart: {
                            fnr: '12038517080',
                            fødselsdato: '1985-03-12',
                            navn: {
                                fornavn: 'TALENTFULL',
                                etternavn: 'MYGG',
                            },
                        },
                        navn: {
                            fornavn: 'KLØKTIG',
                            etternavn: 'MIDTPUNKT',
                        },
                        kjønn: 'K',
                    },
                ],
            },
            arbeidsforhold: [],
        },
        annenForelder: undefined,
    },
};

export const MorUfødtBarn: Story = {
    args: {
        ...SkalOppgiPersonalia.args,
        barn: {
            type: BarnType.UFØDT,
            antallBarn: 1,
            termindato: '2023-05-05',
        },
        annenForelder: undefined,
        søkerInfo: {
            person: {
                ...defaultSøker,
                barn: [],
            },
            arbeidsforhold: [],
        },
    },
};

export const MedmorUfødtBarn: Story = {
    args: {
        ...MorUfødtBarn.args,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'medmor',
        },
        søkerInfo: {
            person: {
                ...defaultSøker,
                kjønn: 'K',
                barn: [],
            },
            arbeidsforhold: [],
        },
    },
};

export const FarUfødtBarn: Story = {
    args: {
        ...MorUfødtBarn.args,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        søkerInfo: {
            person: {
                ...defaultSøker,
                navn: {
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                kjønn: 'M',
                barn: [],
            },
            arbeidsforhold: [],
        },
    },
};

export const FarGiftUfødtBarn: Story = {
    args: {
        ...FarUfødtBarn.args,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        søkerInfo: {
            person: {
                ...defaultSøker,
                navn: {
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                kjønn: 'M',
                barn: [],
                sivilstand: { type: 'GIFT' },
            },
            arbeidsforhold: [],
        },
    },
};

export const FarFødtBarnMorHarVedtak: Story = {
    args: {
        ...AnnenForelderFraOppgittBarn.args,
        annenForelder: {
            ...defaultAnnenForelder,
            fornavn: defaultSøker.navn.fornavn,
            etternavn: defaultSøker.navn.etternavn,
            fnr: defaultSøker.fnr,
        },
    },
    parameters: {
        msw: {
            handlers: [http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))],
        },
    },
};

export const FarFødtBarnMorHarAvslåttVedtak: Story = {
    args: {
        ...AnnenForelderFraOppgittBarn.args,
        annenForelder: {
            ...defaultAnnenForelder,
            fornavn: defaultSøker.navn.fornavn,
            etternavn: defaultSøker.navn.etternavn,
            fnr: defaultSøker.fnr,
        },
    },
    parameters: {
        msw: {
            handlers: [http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(avslåttAnnenPartVedtak))],
        },
    },
};
