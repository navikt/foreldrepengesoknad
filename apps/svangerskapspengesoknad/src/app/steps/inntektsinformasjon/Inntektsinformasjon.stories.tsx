import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouterProvider from 'storybook/decorators/withRouter';
import Inntektsinformasjon from './Inntektsinformasjon';
import søkerinfo from 'storybook/storydata/sokerinfo/sokerinfo.json';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';
import mapSøkerinfoDTOToSøkerinfo from 'app/utils/mapSøkerinfoDTO';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';

const defaultExport = {
    title: 'steps/Inntektsinformasjon',
    component: Inntektsinformasjon,
    decorators: [withRouterProvider],
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
                søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo as SøkerinfoDTO)}
            />
        </SvpDataContext>
    );
};

export const Default = Template.bind({});
