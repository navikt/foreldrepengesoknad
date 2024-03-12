import { StoryFn } from '@storybook/react';

import { links } from '@navikt/fp-constants';
import { Søker } from '@navikt/fp-types';

import Feilside, { FeilsideProps } from './Feilside';

const defaultExport = {
    title: 'pages/Feilside',
    component: Feilside,
};

export default defaultExport;

const søker = {
    fnr: '19047815714',
    fornavn: 'TALENTFULL',
    etternavn: 'MYGG',
    kjønn: 'K',
    fødselsdato: '1978-04-19',
    barn: [],
} as Søker;

const Template: StoryFn<FeilsideProps> = (args: FeilsideProps) => {
    return <Feilside {...args} søker={søker}></Feilside>;
};
export const Default = Template.bind({}) as any;
Default.args = {
    dokumenttittel: 'NAV Foreldrepengesøknad Feilside',
    ingress: 'Beskrivelse av feilen',
    tittel: 'Feil tittel',
    skalKunneGåTilbakeTilSøknad: false,
    illustrasjon: {
        tittel: 'Hei!',
        tekst: 'Noe har gått galt med søknaden.',
        lenke: { tekst: 'Her finner du en lenke til brukerstøtte', url: links.brukerstøtte },
    },
};
