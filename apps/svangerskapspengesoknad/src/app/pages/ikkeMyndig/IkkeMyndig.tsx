import { intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import Feilside from '../feilside/feilside/Feilside';
import links from 'app/links/links';

export interface IkkeMyndigProps {
    fornavn: string;
}

const IkkeMyndig: FunctionComponent<IkkeMyndigProps> = ({ fornavn }) => {
    const intl = useIntl();

    return (
        <Feilside
            dokumenttittel="NAV Svangerskapspengesøknad"
            ingress={intlUtils(intl, 'velkommen.ingress')}
            tittel={intlUtils(intl, 'velkommen.tittel')}
            illustrasjon={{
                tittel: intlUtils(intl, 'velkommen.ikkeMyndig.tittel', {
                    navn: fornavn.toLowerCase(),
                }),
                tekst: intlUtils(intl, 'velkommen.ikkeMyndig.ingress'),
                lenke: {
                    tekst: intlUtils(intl, 'velkommen.ikkeMyndig.boblelenketekst'),
                    url: links.papirsøknad,
                },
            }}
            skalKunneGåTilbakeTilSøknad={false}
        />
    );
};

export default IkkeMyndig;
