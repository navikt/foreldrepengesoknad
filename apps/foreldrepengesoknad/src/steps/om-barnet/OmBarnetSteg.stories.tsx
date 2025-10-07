import { Meta, StoryObj } from '@storybook/react-vite';
import { API_URLS } from 'api/queries';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { annenPartVedtak } from 'storybookData/annenPartVedtak';

import { AnnenForelder, Barn, BarnType } from '@navikt/fp-common';
import { Søkerinfo, SøkersituasjonFp } from '@navikt/fp-types';
import { withQueryClient } from '@navikt/fp-utils-test';

import { OmBarnetSteg } from './OmBarnetSteg';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

const defaultSøkerinfo = {
    person: {
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
            {
                fnr: '31091981146',
                fødselsdato: '2022-08-02',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'SNILT',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
            {
                fnr: '31091981147',
                fødselsdato: '2022-08-02',
                annenForelder: {
                    fnr: '12038517080',
                    fødselsdato: '1985-03-12',
                    fornavn: 'LEALAUS',
                    etternavn: 'BÆREPOSE',
                },
                fornavn: 'LYST',
                etternavn: 'MIDTPUNKT',
                kjønn: 'M',
            },
        ],
    },
    arbeidsforhold: [],
} as Søkerinfo;

type StoryArgs = {
    søkersituasjon?: SøkersituasjonFp;
    barn?: Barn;
    gåTilNesteSide?: (action: Action) => void;
    annenForelder?: AnnenForelder;
} & ComponentProps<typeof OmBarnetSteg>;

const meta = {
    title: 'steps/OmBarnetSteg',
    component: OmBarnetSteg,
    decorators: [withQueryClient],
    render: ({
        søkersituasjon = {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barn,
        gåTilNesteSide = action('button-click'),
        annenForelder = { kanIkkeOppgis: true },
        ...rest
    }) => {
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                        [ContextDataType.OM_BARNET]: barn,
                        [ContextDataType.ANNEN_FORELDER]: annenForelder,
                    }}
                >
                    <OmBarnetSteg {...rest} />
                </FpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorFødsel: Story = {
    args: {
        søkerInfo: defaultSøkerinfo,
        søknadGjelderNyttBarn: true,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: promiseAction(),
        barn: undefined,
    },
};

export const FarFødsel: Story = {
    args: {
        ...MorFødsel.args,
        søkerInfo: { ...defaultSøkerinfo, person: { ...defaultSøkerinfo.person, kjønn: 'M' } },
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
    },
};

export const MedmorFødsel: Story = {
    args: {
        ...MorFødsel.args,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'medmor',
        },
    },
};

export const ForAdopsjon: Story = {
    args: {
        ...MorFødsel.args,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
    },
};

export const RegistrertBarnFødselFar: Story = {
    args: {
        ...MorFødsel.args,
        søknadGjelderNyttBarn: false,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'far',
        },
        barn: {
            antallBarn: 1,
            fnr: ['21091981146'],
            fødselsdatoer: ['2021-03-15'],
            type: BarnType.FØDT,
        },
    },
};

export const RegistrertBarnFødselMor: Story = {
    args: {
        ...MorFødsel.args,
        søknadGjelderNyttBarn: false,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barn: {
            antallBarn: 2,
            fnr: ['31091981146', '31091981147'],
            fødselsdatoer: ['2022-08-02', '2022-08-02'],
            type: BarnType.FØDT,
        },
    },
};

export const RegistrertBarnAdopsjonMor: Story = {
    args: {
        ...MorFødsel.args,
        søknadGjelderNyttBarn: false,
        søkersituasjon: {
            situasjon: 'adopsjon',
            rolle: 'mor',
        },
        barn: {
            antallBarn: 1,
            fnr: ['21091981146'],
            fødselsdatoer: ['2021-03-15'],
            type: BarnType.FØDT,
        },
    },
};

export const RegistrertBarnTrillingerDerEnErDød: Story = {
    args: {
        ...MorFødsel.args,
        søknadGjelderNyttBarn: false,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barn: {
            antallBarn: 3,
            fnr: ['21091981146', '31091981147', '31091981148'],
            fødselsdatoer: ['2023-01-02'],
            type: BarnType.FØDT,
        },
        søkerInfo: {
            person: {
                fnr: '21430354032',
                fornavn: 'Hes',
                etternavn: 'Mandagsbil',
                kjønn: 'K',
                fødselsdato: '2003-03-21',
                bankkonto: { kontonummer: '', banknavn: '' },
                barn: [
                    {
                        fnr: '21091981146',
                        fødselsdato: '2023-03-01',
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
                    {
                        fnr: '31091981147',
                        fødselsdato: '2023-03-02',
                        annenForelder: {
                            fnr: '12038517080',
                            fødselsdato: '1985-03-12',
                            fornavn: 'LEALAUS',
                            etternavn: 'BÆREPOSE',
                        },
                        fornavn: 'SNILT',
                        etternavn: 'MIDTPUNKT',
                        kjønn: 'M',
                    },
                    {
                        fnr: '31091981148',
                        fødselsdato: '2023-03-01',
                        dødsdato: '2023-03-02',
                        annenForelder: {
                            fnr: '12038517080',
                            fødselsdato: '1985-03-12',
                            fornavn: 'LEALAUS',
                            etternavn: 'BÆREPOSE',
                        },
                        fornavn: 'LYST',
                        etternavn: 'MIDTPUNKT',
                        kjønn: 'M',
                    },
                ],
            },
            arbeidsforhold: [
                {
                    arbeidsgiverId: '896929119',
                    arbeidsgiverIdType: 'orgnr',
                    arbeidsgiverNavn: 'SAUEFABRIKK',
                    stillingsprosent: 100,
                    fom: '2017-03-24',
                },
                {
                    arbeidsgiverId: '896929119',
                    arbeidsgiverIdType: 'orgnr',
                    arbeidsgiverNavn: 'SAUEFABRIKK',
                    stillingsprosent: 100,
                    fom: '2017-03-24',
                },
            ],
        },
    },
};

export const SøknadPåUregistrertBarnSomErFødt: Story = {
    args: {
        ...MorFødsel.args,
        søknadGjelderNyttBarn: false,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barn: {
            antallBarn: 1,
            fnr: undefined,
            fødselsdatoer: ['2023-01-02'],
            type: BarnType.FØDT,
        },
        søkerInfo: { ...defaultSøkerinfo, person: { ...defaultSøkerinfo.person, barn: [] } },
    },
};

export const FarFødselMorHarVedtak: Story = {
    args: {
        ...MorFødsel.args,
        søknadGjelderNyttBarn: false,
        søkersituasjon: {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barn: {
            antallBarn: 1,
            fnr: ['19522278338'],
            fødselsdatoer: ['2022-08-17'],
            type: BarnType.FØDT,
        },
        annenForelder: {
            fnr: '27438445248',
            fornavn: 'Eline',
            etternavn: 'Ilder',
            kanIkkeOppgis: false,
        },
        søkerInfo: {
            ...defaultSøkerinfo,
            person: {
                ...defaultSøkerinfo.person,
                barn: [
                    {
                        fnr: '19522278338',
                        fornavn: 'Ole',
                        etternavn: 'Duck',
                        kjønn: 'M',
                        fødselsdato: '2022-08-17',
                        annenForelder: {
                            fnr: '27438445248',
                            fornavn: 'Eline',
                            etternavn: 'Ilder',
                            fødselsdato: '1993-06-13',
                        },
                    },
                ],
            },
        },
    },
    parameters: {
        msw: {
            handlers: [http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak))],
        },
    },
};
