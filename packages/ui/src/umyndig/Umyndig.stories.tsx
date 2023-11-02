import { StoryFn } from '@storybook/react';
import { RawIntlProvider, createIntl } from 'react-intl';
import Umyndig, { Props } from './Umyndig';
import { initAmplitude } from '@navikt/fp-metrics';

export default {
    title: 'Umyndig',
    component: Umyndig,
};

const Template: StoryFn<Props> = ({ appnavn }) => {
    initAmplitude();
    return (
        <RawIntlProvider value={createIntl({ locale: 'nb', messages: {} })}>
            <Umyndig appnavn={appnavn} />
        </RawIntlProvider>
    );
};

export const UmyndigForeldrepenger = Template.bind({});
UmyndigForeldrepenger.args = {
    appnavn: 'Foreldrepenger',
};

export const UmyndigEngangsstonad = Template.bind({});
UmyndigEngangsstonad.args = {
    appnavn: 'Engangsstønad',
};

export const UmyndigSvangerskapspenger = Template.bind({});
UmyndigSvangerskapspenger.args = {
    appnavn: 'Svangerskapspenger',
};
