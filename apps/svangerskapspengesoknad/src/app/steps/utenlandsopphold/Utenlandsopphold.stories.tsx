import { StoryFn } from '@storybook/react';
import Utenlandsopphold from './Utenlandsopphold';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import _context from 'storybook/storydata/soknad/soknad.json';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';

const defaultExport = {
    title: 'steps/Utenlandsopphold',
    component: Utenlandsopphold,
    decorators: [withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

const context = _context as any;
const contextUtenUtenlandsoppholdInfo = {
    ...context,
    søknad: {
        ...context.søknad,
        informasjonOmUtenlandsopphold: {
            iNorgePåHendelsestidspunktet: undefined!,
            iNorgeSiste12Mnd: undefined!,
            iNorgeNeste12Mnd: undefined!,
            tidligereOpphold: [],
            senereOpphold: [],
        },
    },
} as SvangerskapspengerContextState;

const Template: StoryFn = () => {
    return (
        <SvangerskapspengerStateMock context={contextUtenUtenlandsoppholdInfo}>
            <Utenlandsopphold />
        </SvangerskapspengerStateMock>
    );
};

export const Default = Template.bind({});
Default.args = {
    contextUtenUtenlandsoppholdInfo,
};
