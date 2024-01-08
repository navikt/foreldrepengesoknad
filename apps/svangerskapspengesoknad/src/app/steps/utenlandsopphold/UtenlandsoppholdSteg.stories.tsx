import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import _context from 'storybook/storydata/soknad/soknad.json';
import UtenlandsoppholdSteg from './UtenlandsoppholdSteg';
import withRouterProvider from 'storybook/decorators/withRouter';
import { Action, SvpDataContext } from 'app/context/SvpDataContext';

const defaultExport = {
    title: 'steps/UtenlandsoppholdSteg',
    component: UtenlandsoppholdSteg,
    decorators: [withRouterProvider],
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
    gåTilNesteSide?: (action: Action) => void;
}

const Template: StoryFn<Props> = ({ mellomlagreSøknadOgNaviger = promiseAction(), gåTilNesteSide }) => {
    return (
        <SvpDataContext onDispatch={gåTilNesteSide}>
            <UtenlandsoppholdSteg
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
                søkerInfo={context.søkerinfo}
            />
        </SvpDataContext>
    );
};

export const Default = Template.bind({});
