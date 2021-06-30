import React from 'react';
import { Story } from '@storybook/react';

import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import Velkommen from 'app/pages/velkommen/Velkommen';
import withIntlProvider from '../../decorators/withIntl';
import ForeldrepengerStateMock from '../../utils/ForeldrepengerStateMock';
import withForeldrepengersøknadContext from '../../decorators/withForeldrepengersøknadContext';

export default {
    title: 'pages/Velkommen',
    component: Velkommen,
    decorators: [withIntlProvider, withForeldrepengersøknadContext],
};

const Template: Story<any> = ({ harGodkjentVilkår }) => {
    return (
        <ForeldrepengerStateMock
            søknad={{ søknad: { harGodkjentVilkår } } as ForeldrepengesøknadContextState}
            søkerinfo={{ søker: { fnr: '1233434' } } as SøkerinfoDTO}
        >
            <Velkommen fornavn="Espen" onChangeLocale={() => undefined} locale="nb" />
        </ForeldrepengerStateMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    harGodkjentVilkår: false,
};

export const HarAlleredeLestOgForstått = Template.bind({});
HarAlleredeLestOgForstått.args = {
    harGodkjentVilkår: true,
};
