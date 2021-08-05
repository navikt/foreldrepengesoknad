import React from 'react';
import { Story } from '@storybook/react';

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
    return (
        <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
            <ManglendeVedlegg />
        </ForeldrepengerStateMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    context,
    søkerinfo,
};

export const MedManglendeDokumentasjon = Template.bind({});
MedManglendeDokumentasjon.args = {
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
