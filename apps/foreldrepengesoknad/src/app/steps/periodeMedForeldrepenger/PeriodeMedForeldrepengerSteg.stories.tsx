import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouter from 'storybook/decorators/withRouter';
import PeriodeMedForeldrepengerSteg from './PeriodeMedForeldrepengerSteg';
import { Action, FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import stønadskontoDeltUttak80 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak80.json';
import stønadskontoDeltUttak100 from 'storybook/storyData/stonadskontoer/stønadskontoDeltUttak100.json';
import { BarnType } from '@navikt/fp-common';
import dayjs from 'dayjs';
import MockAdapter from 'axios-mock-adapter';
import { RequestStatus } from 'app/types/RequestState';
import AxiosMock from 'storybook/utils/AxiosMock';
import { FpApiDataContext } from 'app/api/context/FpApiDataContext';

const UTTAKSPLAN_ANNEN_URL = '/innsyn/v2/annenPartVedtak';
const STØNADSKONTO_URL = 'test/konto';

export default {
    title: 'steps/PeriodeMedForeldrepengerSteg',
    component: PeriodeMedForeldrepengerSteg,
    decorators: [withRouter],
};

interface Props {
    mellomlagreSøknadOgNaviger?: () => void;
    avbrytSøknad: () => void;
    gåTilNesteSide: (action: Action) => void;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = action('button-click'),
    avbrytSøknad = action('button-click'),
    gåTilNesteSide,
}) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoDeltUttak80);
        apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, stønadskontoDeltUttak100);
    };
    return (
        <AxiosMock mock={restMock}>
            <FpApiDataContext>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.SØKERSITUASJON]: {
                            situasjon: 'fødsel',
                            rolle: 'far',
                        },
                        [ContextDataType.OM_BARNET]: {
                            type: BarnType.FØDT,
                            fødselsdatoer: [dayjs('2022-03-01').toDate()],
                            antallBarn: 1,
                            termindato: dayjs('2022-03-24').toDate(),
                        },
                        [ContextDataType.SØKER]: {
                            erAleneOmOmsorg: true,
                            språkkode: 'nb',
                            harJobbetSomFrilansSiste10Mnd: false,
                            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
                            harHattAnnenInntektSiste10Mnd: false,
                        },
                        [ContextDataType.ANNEN_FORELDER]: {
                            etternavn: 'dfg',
                            fornavn: 'dfg',
                            fnr: '02068629902',
                            utenlandskFnr: false,
                            kanIkkeOppgis: false,
                            harRettPåForeldrepengerINorge: true,
                            erInformertOmSøknaden: true,
                        },
                    }}
                >
                    <PeriodeMedForeldrepengerSteg
                        mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                        avbrytSøknad={avbrytSøknad}
                    />
                </FpDataContext>
            </FpApiDataContext>
        </AxiosMock>
    );
};

export const MedDeltUttak = Template.bind({});
