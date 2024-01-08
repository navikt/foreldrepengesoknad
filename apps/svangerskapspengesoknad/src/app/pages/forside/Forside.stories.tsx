import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Forside from './Forside';

const defaultExport = {
    title: 'pages/Forside',
    component: Forside,
};

export default defaultExport;

const Template: StoryFn<{
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void;
}> = () => {
    return (
        <Forside
            setHarGodkjentVilkår={() => true}
            harGodkjentVilkår={false}
            onChangeLocale={() => undefined}
            locale="nb"
        />
    );
};
export const Default = Template.bind({});
Default.args = {
    setHarGodkjentVilkår: action('button-click'),
};
