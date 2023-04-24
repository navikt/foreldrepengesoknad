import { ComponentMeta } from '@storybook/react';
import Feilside from './Feilside';
import withForeldrepengersøknadContext from 'storybook/decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from 'storybook/utils/ForeldrepengerStateMock';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import links from 'app/links/links';

export default {
    title: 'pages/Feilside',
    component: Feilside,
    decorators: [withForeldrepengersøknadContext],
} as ComponentMeta<typeof Feilside>;

const søkerInfo = {
    søker: {
        fnr: '19047815714',
        fornavn: 'TALENTFULL',
        etternavn: 'MYGG',
        kjønn: 'K',
        fødselsdato: '1978-04-19',
        barn: [],
    },
} as SøkerinfoDTO;

const Template: StoryFn<Props> = (args) => {
    return (
        <ForeldrepengerStateMock
            søknad={
                { søknad: { harGodkjentVilkår: true, søker: { språkkode: 'nb' } } } as ForeldrepengesøknadContextState
            }
            søkerinfo={søkerInfo}
        >
            <Feilside {...args}></Feilside>
        </ForeldrepengerStateMock>
    );
};
export const Default = Template.bind({});
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
