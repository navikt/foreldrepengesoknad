import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import { SvangerskapspengerContextState } from 'app/context/SvangerskapspengerContextConfig';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';
import BoIUtlandet from '../bo-i-utlandet/BoIUtlandet';
import _sokerinfo from 'storybook/storydata/sokerinfo/sokerinfo.json';
import _soknad from 'storybook/storydata/soknad/soknad.json';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';

export default {
    title: 'steps/BoIUtlandet',
    component: BoIUtlandet,
    decorators: [withRouterProvider, withIntlProvider, withSvangerskapspengerContextProvider],
};

interface BoIUtlandetStoryProps {
    søknad: SvangerskapspengerContextState;
    søkerinfo: SøkerinfoDTO;
    oppgirBostedIFortid: boolean;
}

const søkerinfo = _sokerinfo as any;
const søknad = _soknad as any;

const Template: StoryFn<BoIUtlandetStoryProps> = ({ søknad, søkerinfo, oppgirBostedIFortid }) => {
    return (
        <SvangerskapspengerStateMock søknad={søknad} søkerinfo={søkerinfo}>
            <BoIUtlandet oppgirIFortid={oppgirBostedIFortid} />
        </SvangerskapspengerStateMock>
    );
};

export const OppgirIFortid = Template.bind({});
OppgirIFortid.args = {
    søknad,
    søkerinfo,
    oppgirBostedIFortid: true,
};

export const OppgirIFremtid = Template.bind({});
OppgirIFremtid.args = {
    søknad,
    søkerinfo,
    oppgirBostedIFortid: false,
};
