import Feilside, { FeilsideProps } from './Feilside';
import links from 'app/links/links';
import { StoryFn } from '@storybook/react';
import withSvangerskapspengerContextProvider from './../../../storybook/decorators/withSvangerskapspengerContext';
import SvangerskapspengerStateMock from 'storybook/utils/SvangerskapspengerStateMock';

const defaultExport = {
    title: 'pages/Feilside',
    component: Feilside,
    decorators: [withSvangerskapspengerContextProvider],
};

export default defaultExport;

const context = {} as any;

const Template: StoryFn<FeilsideProps> = (args: FeilsideProps) => {
    return (
        <SvangerskapspengerStateMock context={context}>
            <Feilside {...args}></Feilside>
        </SvangerskapspengerStateMock>
    );
};
export const Default = Template.bind({}) as any;
Default.args = {
    dokumenttittel: 'NAV Svangerskapspengesøknad Feilside',
    ingress: 'Beskrivelse av feilen',
    tittel: 'Feil tittel',
    skalKunneGåTilbakeTilSøknad: false,
    illustrasjon: {
        tittel: 'Hei!',
        tekst: 'Noe har gått galt med søknaden.',
        lenke: { tekst: 'Her finner du en lenke til brukerstøtte', url: links.brukerstøtte },
    },
};
