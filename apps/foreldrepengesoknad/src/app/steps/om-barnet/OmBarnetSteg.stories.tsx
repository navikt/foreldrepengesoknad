import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Barn, BarnType } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { Søkerinfo, SøkersituasjonFp } from '@navikt/fp-types';

import { Action, ContextDataType, FpDataContext } from 'app/appData/FpDataContext';
import SøknadRoutes from 'app/appData/routes';

import OmBarnetSteg from './OmBarnetSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const defaultSøkerinfo = {
    søker: {
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
} & ComponentProps<typeof OmBarnetSteg>;

const meta = {
    component: OmBarnetSteg,
    render: ({
        søkersituasjon = {
            situasjon: 'fødsel',
            rolle: 'mor',
        },
        barn,
        gåTilNesteSide = action('button-click'),
        ...rest
    }) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                        [ContextDataType.OM_BARNET]: barn,
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
        søkerInfo: { ...defaultSøkerinfo, søker: { ...defaultSøkerinfo.søker, kjønn: 'M' } },
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
            søker: {
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
                    stillingsprosent: 100.0,
                    fom: '2017-03-24',
                },
                {
                    arbeidsgiverId: '896929119',
                    arbeidsgiverIdType: 'orgnr',
                    arbeidsgiverNavn: 'SAUEFABRIKK',
                    stillingsprosent: 100.0,
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
        søkerInfo: { ...defaultSøkerinfo, søker: { ...defaultSøkerinfo.søker, barn: [] } },
    },
};
