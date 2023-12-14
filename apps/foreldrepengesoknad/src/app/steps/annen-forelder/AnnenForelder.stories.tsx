import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';
import { action } from '@storybook/addon-actions';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import _søkerinfo from 'storybook/storyData/sokerinfo/søkerinfoKvinneMedEttBarn.json';
import AnnenForelder from './AnnenForelder';
import { Action, FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { AnnenForelder as AnnenForelderType, Barn, BarnType } from '@navikt/fp-common';
import { SøkersituasjonFp } from '@navikt/fp-types';
import dayjs from 'dayjs';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const søkerinfo = _søkerinfo as any;

export default {
    title: 'steps/AnnenForelder',
    component: AnnenForelder,
    decorators: [withRouter],
};

interface Props {
    søkerinfo: SøkerinfoDTO;
    søkersituasjon?: SøkersituasjonFp;
    annenForelder?: AnnenForelderType;
    barn?: Barn;
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
    avbrytSøknad: () => void;
}

const Template: StoryFn<Props> = ({
    søkerinfo,
    søkersituasjon = {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    barn = {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: undefined,
        dokumentasjonAvAleneomsorg: [],
    },
    annenForelder = {
        kanIkkeOppgis: true,
    },
    gåTilNesteSide,
    mellomlagreSøknadOgNaviger = promiseAction(),
    avbrytSøknad = action('button-click'),
}) => {
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
        <AxiosMock mock={restMock}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                    [ContextDataType.OM_BARNET]: barn,
                    [ContextDataType.ANNEN_FORELDER]: annenForelder,
                    [ContextDataType.SØKER]: {
                        // @ts-ignore TODO (TOR) Fiks Søker-typen
                        harHattAnnenInntektSiste10Mnd: undefined,
                        // @ts-ignore TODO (TOR) Fiks Søker-typen
                        harJobbetSomFrilansSiste10Mnd: undefined,
                        // @ts-ignore TODO (TOR) Fiks Søker-typen
                        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: undefined,
                        // @ts-ignore TODO (TOR) Fiks Søker-typen
                        erAleneOmOmsorg: undefined,
                    },
                }}
            >
                <AnnenForelder
                    søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={avbrytSøknad}
                />
            </FpDataContext>
        </AxiosMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: dayjs('2021-03-15').toDate(),
        dokumentasjonAvAleneomsorg: [],
        fnr: ['21091981146'],
    },
    søkerinfo,
};

export const SkalOppgiPersonalia = Template.bind({});
SkalOppgiPersonalia.args = {
    annenForelder: {
        kanIkkeOppgis: false,
    },
    søkerinfo: {
        søker: {
            ...søkerinfo,
            barn: [],
        },
    } as SøkerinfoDTO,
};

export const SkalOppgiPersonaliaNavnMangler = Template.bind({});
SkalOppgiPersonaliaNavnMangler.args = {
    annenForelder: {
        fornavn: 'annen forelder',
        kanIkkeOppgis: false,
    },
    søkerinfo: {
        søker: {
            ...søkerinfo,
            barn: [],
        },
    } as SøkerinfoDTO,
};

export const SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike = Template.bind({});
SkalOppgiPersonaliaFnrPåAnnenForelderOgBarnErUlike.args = {
    annenForelder: {
        fornavn: 'Tom',
        fnr: '123456789',
        kanIkkeOppgis: false,
    },
    søkerinfo: {
        søker: {
            ...søkerinfo,
            barn: [{ fornavn: 'Ben', annenForelder: { fnr: '999999999' } }],
        },
    } as SøkerinfoDTO,
};

export const ForFar = Template.bind({});
ForFar.args = {
    barn: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-03-15').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: dayjs('2021-03-15').toDate(),
        dokumentasjonAvAleneomsorg: [],
        fnr: ['21091981146'],
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
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
    barn: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: dayjs('2023-05-05').toDate(),
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'mor',
    },
    annenForelder: {
        kanIkkeOppgis: false,
    },
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
    barn: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: dayjs('2023-05-05').toDate(),
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'medmor',
    },
    annenForelder: {
        kanIkkeOppgis: false,
    },
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
    barn: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: dayjs('2023-05-05').toDate(),
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    annenForelder: {
        kanIkkeOppgis: false,
    },
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
    barn: {
        type: BarnType.UFØDT,
        antallBarn: 1,
        termindato: dayjs('2023-05-05').toDate(),
    },
    søkersituasjon: {
        situasjon: 'fødsel',
        rolle: 'far',
    },
    annenForelder: {
        kanIkkeOppgis: false,
    },
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
