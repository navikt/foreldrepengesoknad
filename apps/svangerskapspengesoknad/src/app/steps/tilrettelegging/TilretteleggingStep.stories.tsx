import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TilretteleggingStep from './TilretteleggingStep';
import _context from 'storybook/storydata/soknad/soknad.json';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';
import dayjs from 'dayjs';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

const defaultExport = {
    title: 'steps/TilretteleggingStep',
    component: TilretteleggingStep,
};

export default defaultExport;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const context = _context as any;

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide?: (action: Action) => void;
}

const Template: StoryFn<Props> = ({ mellomlagreSøknadOgNaviger = promiseAction(), gåTilNesteSide }) => {
    return (
        <SvpDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [ContextDataType.TILRETTELEGGINGER]: context.søknad.tilrettelegging,
                [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
                [ContextDataType.OM_BARNET]: {
                    erBarnetFødt: false,
                    termindato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT),
                    fødselsdato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT),
                },
            }}
        >
            <TilretteleggingStep
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
                søkerInfo={context.søkerinfo}
            />
        </SvpDataContext>
    );
};
export const Default = Template.bind({});
