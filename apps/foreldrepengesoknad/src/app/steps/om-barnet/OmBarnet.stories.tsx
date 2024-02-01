import { Barn, BarnType } from '@navikt/fp-common';
import { initAmplitude } from '@navikt/fp-metrics';
import { Søkerinfo, SøkersituasjonFp } from '@navikt/fp-types';
import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';
import MockAdapter from 'axios-mock-adapter/types';
import { MemoryRouter } from 'react-router-dom';
import AxiosMock from 'storybook/utils/AxiosMock';
import OmBarnet from './OmBarnet';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const søkerinfo = {
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

export default {
    title: 'steps/OmBarnet',
    component: OmBarnet,
};

interface Props {
    søkerinfo: Søkerinfo;
    søkersituasjon?: SøkersituasjonFp;
    barn?: Barn;
    søknadGjelderEtNyttBarn?: boolean;
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
}

const Template: StoryFn<Props> = ({
    søkerinfo,
    søkersituasjon = {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barn,
    søknadGjelderEtNyttBarn = true,
    gåTilNesteSide,
    mellomlagreSøknadOgNaviger = promiseAction(),
}) => {
    initAmplitude();
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(
            200,
            { data: {} },
            {
                location: '',
            },
        );
        apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
    };
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <AxiosMock mock={restMock}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                        [ContextDataType.OM_BARNET]: barn,
                    }}
                >
                    <OmBarnet
                        søkerInfo={søkerinfo}
                        søknadGjelderNyttBarn={søknadGjelderEtNyttBarn}
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={action('button-click')}
                    />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>
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
    søkerinfo: { ...søkerinfo, søker: { ...søkerinfo.søker, kjønn: 'M' } },
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
    søkerinfo: {
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
    søkerinfo: { ...søkerinfo, søker: { ...søkerinfo.søker, barn: [] } },
};
