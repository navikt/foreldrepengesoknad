import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Inntektsinformasjon from './Inntektsinformasjon';
import soknad from 'storybook/storydata/soknad/soknad.json';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';

const defaultExport = {
    title: 'steps/Inntektsinformasjon',
    component: Inntektsinformasjon,
};

export default defaultExport;

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
        <SvpDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [ContextDataType.UTENLANDSOPPHOLD]: {
                    iNorgeNeste12Mnd: true,
                    iNorgeSiste12Mnd: true,
                },
                [ContextDataType.OM_BARNET]: {
                    erBarnetFødt: false,
                    termindato: '2024-02-18',
                    fødselsdato: '2024-02-18',
                },
            }}
        >
            <Inntektsinformasjon
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
                søkerInfo={soknad.søkerinfo as any}
            />
        </SvpDataContext>
    );
};

export const Default = Template.bind({});
