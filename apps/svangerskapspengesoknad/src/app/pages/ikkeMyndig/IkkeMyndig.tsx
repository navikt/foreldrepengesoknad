import { intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import Feilside from '../feilside/Feilside';
import links from 'app/links/links';

export interface IkkeMyndigProps {
    fornavn: string;
}

const IkkeMyndig: FunctionComponent<IkkeMyndigProps> = ({ fornavn }) => {
    const intl = useIntl();

    return (
        //TODO: Lag en egen side for dette
        <Feilside
            dokumenttittel="NAV Svangerskapspengesøknad"
            ingress=""
            tittel=""
            illustrasjon={{
                tittel: intlUtils(intl, 'ikkeMyndig.tittel', {
                    navn: fornavn,
                }),
                tekst: intlUtils(intl, 'ikkeMyndig.ingress'),
                lenke: {
                    tekst: intlUtils(intl, 'ikkeMyndig.boblelenketekst'),
                    url: links.papirsøknad,
                },
            }}
            skalKunneStartePåNytt={false}
            skalKunneGåTilbakeTilSøknad={false}
        />
    );
};

export default IkkeMyndig;
