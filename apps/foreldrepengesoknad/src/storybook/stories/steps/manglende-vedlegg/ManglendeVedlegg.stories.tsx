import React from 'react';
import { Story } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter/types';

import søkerinfo from './testdata/søkerinfo.json';
import context from './testdata/context.json';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import ManglendeVedlegg from 'app/steps/manglende-vedlegg/ManglendeVedlegg';
import withIntlProvider from '../../../decorators/withIntl';
import withRouter from '../../../decorators/withRouter';
import withForeldrepengersøknadContext from '../../../decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from '../../../utils/ForeldrepengerStateMock';
import { lagSendSenereDokument } from 'app/utils/vedleggUtils';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import AxiosMock from '../../../utils/AxiosMock';

export default {
    title: 'steps/ManglendeVedlegg',
    component: ManglendeVedlegg,
    decorators: [withRouter, withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    context: ForeldrepengesøknadContextState;
    søkerinfo: SøkerinfoDTO;
}

const Template: Story<Props> = ({ context, søkerinfo }) => {
    const restMock = (apiMock: MockAdapter) => {
        apiMock.onPost('/storage/vedlegg').reply(
            200,
            { data: {} },
            {
                location: '',
            }
        );
    };
    return (
        <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <ManglendeVedlegg />
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
                dokumentasjonAvAleneomsorg: [
                    lagSendSenereDokument(AttachmentType.ALENEOMSORG, Skjemanummer.DOK_AV_ALENEOMSORG),
                ],
                terminbekreftelse: [
                    lagSendSenereDokument(AttachmentType.TERMINBEKREFTELSE, Skjemanummer.TERMINBEKREFTELSE),
                ],
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};

export const ManglerVedleggForUlikePerioder = Template.bind({});
ManglerVedleggForUlikePerioder.args = {
    context: {
        ...context,
        søknad: {
            ...context.søknad,
            søker: {
                ...context.søknad.søker,
                andreInntekterSiste10Mnd: [
                    {
                        pågående: true,
                        tidsperiode: {
                            fom: '2021-08-01',
                            tom: '',
                        },
                        type: 'ETTERLØNN_SLUTTPAKKE',
                        vedlegg: [
                            lagSendSenereDokument(
                                AttachmentType.ANNEN_INNTEKT,
                                Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
                            ),
                        ],
                    },
                    {
                        pågående: true,
                        tidsperiode: {
                            fom: '2021-09-01',
                            tom: '',
                        },
                        type: 'ETTERLØNN_SLUTTPAKKE',
                        vedlegg: [
                            lagSendSenereDokument(
                                AttachmentType.ANNEN_INNTEKT,
                                Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
                            ),
                        ],
                    },
                ],
            },
        },
    } as ForeldrepengesøknadContextState,
    søkerinfo,
};
