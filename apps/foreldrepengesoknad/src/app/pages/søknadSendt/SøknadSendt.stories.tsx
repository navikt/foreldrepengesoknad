import { StoryFn } from '@storybook/react';

import { SøkerinfoDTO, SøkerinfoDTOArbeidsforhold } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import SøknadSendt from 'app/pages/søknadSendt/SøknadSendt';
import withIntlProvider from 'storybook/decorators/withIntl';
import ForeldrepengerStateMock from 'storybook/utils/ForeldrepengerStateMock';
import withForeldrepengersøknadContext from 'storybook/decorators/withForeldrepengersøknadContext';

export default {
    title: 'pages/SøknadSendt',
    component: SøknadSendt,
    decorators: [withIntlProvider, withForeldrepengersøknadContext],
};

interface Props {
    erFerdig: boolean;
    bankkonto?: {
        kontonummer: number;
    };
    arbeidsforhold: SøkerinfoDTOArbeidsforhold[];
}

const Template: StoryFn<Props> = ({ bankkonto, arbeidsforhold }) => {
    return (
        <ForeldrepengerStateMock
            søknad={{ kvittering: {} } as ForeldrepengesøknadContextState}
            søkerinfo={
                {
                    søker: { fnr: '1233434', fornavn: 'Espen', etternavn: 'Utvikler', bankkonto },
                    arbeidsforhold,
                } as SøkerinfoDTO
            }
        >
            <SøknadSendt />
        </ForeldrepengerStateMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    erFerdig: true,
};

export const MedBankkonto = Template.bind({});
MedBankkonto.args = {
    erFerdig: true,
    bankkonto: { kontonummer: 5646464535 },
};

export const MedArbeidsforhold = Template.bind({});
MedArbeidsforhold.args = {
    erFerdig: true,
    arbeidsforhold: [{} as SøkerinfoDTOArbeidsforhold],
};

export const VenterPåLagring = Template.bind({});
VenterPåLagring.args = {
    erFerdig: false,
};
