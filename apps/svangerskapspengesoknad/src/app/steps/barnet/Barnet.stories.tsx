import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import _context from 'storybook/storydata/soknad/soknad.json';
import Barnet from './Barnet';

const defaultExport = {
    title: 'steps/Barnet',
    component: Barnet,
};
export default defaultExport;

const context = _context as any;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
}

const Template: StoryFn<Props> = ({ mellomlagreSøknadOgNaviger = promiseAction() }) => {
    return (
        <Barnet
            søkerInfo={context.søkerinfo}
            mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
            avbrytSøknad={promiseAction()}
        />
    );
};
export const Default = Template.bind({});
