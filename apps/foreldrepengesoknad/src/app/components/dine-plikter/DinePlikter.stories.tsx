import withIntlProvider from 'storybook/decorators/withIntl';
import DinePlikter from './DinePlikter';

export default {
    title: 'components/DinePlikter',
    component: DinePlikter,
    decorators: [withIntlProvider],
};

export const Default = () => <DinePlikter />;
