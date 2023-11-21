import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import withRouter from 'storybook/decorators/withRouter';
import AxiosMock from 'storybook/utils/AxiosMock';
import _søkerinfo from 'storybook/storyData/sokerinfo/søkerinfoKvinneMedEttBarn.json';
import AnnenForelder from './AnnenForelder';
import { FpDataContext, FpDataType } from 'app/context/FpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { AnnenForelder as AnnenForelderType, Barn, BarnType } from '@navikt/fp-common';
import { SøkersituasjonFp } from '@navikt/fp-types';
import dayjs from 'dayjs';

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
}) => {
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
            <FpDataContext
                initialState={{
                    [FpDataType.SØKERSITUASJON]: søkersituasjon,
                    [FpDataType.OM_BARNET]: barn,
                    [FpDataType.ANNEN_FORELDER]: annenForelder,
                    [FpDataType.SØKER]: {
                        språkkode: 'nb',
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
                    mellomlagreSøknad={() => undefined}
                    avbrytSøknad={() => undefined}
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
