import { StoryFn } from '@storybook/react';
import Umyndig, { Props } from './Umyndig';
import { initAmplitude } from '@navikt/fp-metrics';

export default {
    title: 'Umyndig',
    component: Umyndig,
};

const Template: StoryFn<Props> = ({ appnavn }) => {
    initAmplitude();
    return <Umyndig appnavn={appnavn} />;
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
