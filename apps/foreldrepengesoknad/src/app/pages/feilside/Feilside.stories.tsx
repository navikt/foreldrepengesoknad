import Feilside, { FeilsideProps } from './Feilside';
import withForeldrepengersøknadContext from 'storybook/decorators/withForeldrepengersøknadContext';
import ForeldrepengerStateMock from 'storybook/utils/ForeldrepengerStateMock';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { SøkerinfoDTO } from 'app/types/SøkerinfoDTO';
import links from 'app/links/links';
import { StoryFn } from '@storybook/react';

const defaultExport = {
    title: 'pages/Feilside',
    component: Feilside,
    decorators: [withForeldrepengersøknadContext],
};

export default defaultExport;

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

const Template: StoryFn<FeilsideProps> = (args: FeilsideProps) => {
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
