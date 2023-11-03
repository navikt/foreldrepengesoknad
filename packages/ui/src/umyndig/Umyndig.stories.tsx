import { StoryFn } from '@storybook/react';
import { withIntlProvider } from '@navikt/fp-utils-test';
import Umyndig, { Props } from './Umyndig';
import { initAmplitude } from '@navikt/fp-metrics';

export default {
    title: 'Umyndig',
    component: Umyndig,
    // TODO Denne intl-dekoratoren bør eigentleg ikkje vera naudsynt sidan den ligg globalt. Ser ikkje ut som den globale funkar for useIntl
    decorators: [withIntlProvider],
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
