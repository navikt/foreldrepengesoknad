import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Forside from './Forside';
import { Action, SvpDataContext } from 'app/appData/SvpDataContext';

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
    gåTilNesteSide?: (action: Action) => void;
}> = ({ setHarGodkjentVilkår, mellomlagreSøknadOgNaviger = promiseAction(), gåTilNesteSide }) => {
    return (
        <SvpDataContext onDispatch={gåTilNesteSide}>
            <Forside
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                setHarGodkjentVilkår={setHarGodkjentVilkår}
                harGodkjentVilkår={false}
                onChangeLocale={() => undefined}
                locale="nb"
            />
        </SvpDataContext>
    );
};
export const Default = Template.bind({});
Default.args = {
    setHarGodkjentVilkår: action('button-click'),
};
