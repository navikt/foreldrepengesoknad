import { ComponentMeta, Story } from '@storybook/react';
import ItemList, { ItemListProps } from './ItemList';

export default {
    title: 'components/ItemList',
    component: ItemList,
} as ComponentMeta<typeof ItemList>;

interface Item {
    title: string;
    id: string;
}

const Template: Story<ItemListProps<Item>> = (args) => <ItemList {...args} />;

export const Default = Template.bind({});
Default.args = {
    getItemId: (item) => item.id,
    getItemTitle: (item) => item.title,
    items: [{ title: 'Test Item', id: 'test' }],
};
