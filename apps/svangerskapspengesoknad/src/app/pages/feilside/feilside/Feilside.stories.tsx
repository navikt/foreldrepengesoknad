import Feilside, { FeilsideProps } from './Feilside';
import links from 'app/links/links';
import { StoryFn } from '@storybook/react';

const defaultExport = {
    title: 'pages/Feilside',
    component: Feilside,
};

export default defaultExport;

const Template: StoryFn<FeilsideProps> = (args: FeilsideProps) => {
    return <Feilside {...args}></Feilside>;
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
