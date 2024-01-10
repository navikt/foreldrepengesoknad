import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Forside from './Forside';

const defaultExport = {
    title: 'pages/Forside',
    component: Forside,
};

export default defaultExport;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const Template: StoryFn<{
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void;
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
}> = ({ setHarGodkjentVilkår, mellomlagreSøknadOgNaviger = promiseAction() }) => {
    return (
        <Forside
            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            setHarGodkjentVilkår={setHarGodkjentVilkår}
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
