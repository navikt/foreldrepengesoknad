import { StoryFn } from '@storybook/react';
import { withIntlProvider } from '@navikt/fp-utils-test';
import ScanDocumentInfo from './ScanDocumentInfo';

export default {
    title: 'ScanDocumentInfo',
    component: ScanDocumentInfo,
    // TODO Denne intl-dekoratoren bør eigentleg ikkje vera naudsynt sidan den ligg globalt. Ser ikkje ut som den globale funkar for useIntl når ein køyrer testar
    decorators: [withIntlProvider],
};

const Template: StoryFn = () => {
    return <ScanDocumentInfo />;
};

export const Default = Template.bind({});
