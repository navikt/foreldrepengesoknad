import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import BoIUtlandet from '../bo-i-utlandet/BoIUtlandet';
import _context from 'storybook/storydata/soknad/soknad.json';

const defaultExport = {
    title: 'steps/BoIUtlandet',
    component: BoIUtlandet,
    decorators: [withRouterProvider, withIntlProvider, withSvangerskapspengerContextProvider],
};

export default defaultExport;

interface BoIUtlandetStoryProps {
    contextWithUtenlandsopphold: SvangerskapspengerContextState;
    oppgirBostedIFortid: boolean;
}

const context = _context as any;
const contextWithUtenlandsopphold = {
    ...context,
    søknad: {
        ...context.søknad,
        informasjonOmUtenlandsopphold: {
            iNorgePåHendelsestidspunktet: undefined!,
            iNorgeSiste12Mnd: false,
            iNorgeNeste12Mnd: false,
            tidligereOpphold: [],
            senereOpphold: [],
        },
    },
} as SvangerskapspengerContextState;

const Template: StoryFn<BoIUtlandetStoryProps> = ({ contextWithUtenlandsopphold, oppgirBostedIFortid }) => {
    return (
        <SvangerskapspengerStateMock context={contextWithUtenlandsopphold}>
            <BoIUtlandet oppgirIFortid={oppgirBostedIFortid} />
        </SvangerskapspengerStateMock>
    );
};

export const OppgirIFortid = Template.bind({});
OppgirIFortid.args = {
    contextWithUtenlandsopphold,
    oppgirBostedIFortid: true,
};

export const OppgirIFremtid = Template.bind({});
OppgirIFremtid.args = {
    contextWithUtenlandsopphold,
    oppgirBostedIFortid: false,
};
