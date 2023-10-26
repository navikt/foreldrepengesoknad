import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import BoIUtlandet from '../bo-i-utlandet/BoIUtlandet';
import _sokerinfo from 'storybook/storydata/sokerinfo/sokerinfo.json';
import _context from 'storybook/storydata/soknad/soknad.json';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';

const defaultExport = {
    title: 'steps/BoIUtlandet',
    component: BoIUtlandet,
    decorators: [withRouterProvider, withIntlProvider, withSvangerskapspengerContextProvider],
};

export default defaultExport;

interface BoIUtlandetStoryProps {
    context: SvangerskapspengerContextState;
    søkerinfo: SøkerinfoDTO;
    oppgirBostedIFortid: boolean;
}

const søkerinfo = _sokerinfo as any;
const context = _context as any;

const Template: StoryFn<BoIUtlandetStoryProps> = ({ context, søkerinfo, oppgirBostedIFortid }) => {
    return (
        <SvangerskapspengerStateMock context={context} søkerinfo={søkerinfo}>
            <BoIUtlandet oppgirIFortid={oppgirBostedIFortid} />
        </SvangerskapspengerStateMock>
    );
};

export const OppgirIFortid = Template.bind({});
OppgirIFortid.args = {
    context,
    søkerinfo,
    oppgirBostedIFortid: true,
};

export const OppgirIFremtid = Template.bind({});
OppgirIFremtid.args = {
    context,
    søkerinfo,
    oppgirBostedIFortid: false,
};
