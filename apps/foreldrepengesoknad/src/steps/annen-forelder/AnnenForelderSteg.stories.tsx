import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { AnnenForelder as AnnenForelderType, Barn, BarnType } from '@navikt/fp-common';
import { SivilstandType } from '@navikt/fp-constants';
import { BarnFrontend, PersonFrontend, SøkersituasjonFp } from '@navikt/fp-types';

import { AnnenForelderSteg } from './AnnenForelderSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultSøker = {
    fnr: '19047815714',
    fornavn: 'TALENTFULL',
    etternavn: 'MYGG',
    kjønn: 'K',
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
} satisfies PersonFrontend;

type StoryArgs = {
    søkersituasjon?: SøkersituasjonFp;
    barn?: Barn;
    annenForelder?: AnnenForelderType;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof AnnenForelderSteg>;

const meta = {
    title: 'steps/AnnenForelderSteg',
    component: AnnenForelderSteg,
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
        søkerInfo: { søker: defaultSøker, arbeidsforhold: [] },
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
            søker: {
                ...defaultSøker,
                barn: [],
            },
            arbeidsforhold: [],
        },
        annenForelder: {
            kanIkkeOppgis: false,
        },
    },
};

export const SkalOppgiPersonaliaNavnMangler: Story = {
    args: {
        ...SkalOppgiPersonalia.args,
        søkerInfo: {
            søker: {
                ...defaultSøker,
                barn: [],
            },
            arbeidsforhold: [],
        },
        annenForelder: {
            fornavn: 'annen forelder',
            kanIkkeOppgis: false,
        },
    },
};

export const SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike: Story = {
    args: {
        ...SkalOppgiPersonalia.args,
        søkerInfo: {
            søker: {
                ...defaultSøker,
                barn: [
                    {
                        fornavn: 'Ben',
                        fnr: '1',
                        etternavn: 'Big',
                        kjønn: 'M',
                        fødselsdato: '2021-03-15',
                        annenForelder: {
                            fnr: '999999999',
                            fødselsdato: '1985-03-12',
                            fornavn: 'LEALAUS',
                            etternavn: 'BÆREPOSE',
                        },
                    },
                ] satisfies BarnFrontend[],
            },
            arbeidsforhold: [],
        },
        annenForelder: {
            fornavn: 'Tom',
            fnr: '123456789',
            kanIkkeOppgis: false,
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
            søker: {
                ...defaultSøker,
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
        annenForelder: {
            kanIkkeOppgis: false,
        },
        søkerInfo: {
            søker: {
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
            søker: {
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
            søker: {
                ...defaultSøker,
                fornavn: 'LEALAUS',
                etternavn: 'BÆREPOSE',
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
            søker: {
                ...defaultSøker,
                fornavn: 'LEALAUS',
                etternavn: 'BÆREPOSE',
                kjønn: 'M',
                barn: [],
                sivilstand: { type: SivilstandType.GIFT },
            },
            arbeidsforhold: [],
        },
    },
};
