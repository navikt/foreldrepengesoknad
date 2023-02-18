import { intlUtils } from '@navikt/fp-common';
import links from 'app/links/links';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import Feilside from '../feilside/Feilside';

interface Props {
    fornavn: string;
}

const IkkeMyndig: FunctionComponent<Props> = ({ fornavn }) => {
    const intl = useIntl();

    return (
        <Feilside
            dokumenttittel="NAV Foreldrepengesøknad"
            ingress={intlUtils(intl, 'velkommen.ingress')}
            tittel={intlUtils(intl, 'velkommen.tittel')}
            illustrasjon={{
                tittel: intlUtils(intl, 'velkommen.ikkeMyndig.tittel', {
                    navn: fornavn.toLowerCase(),
                }),
                tekst: intlUtils(intl, 'velkommen.ikkeMyndig.ingress'),
                veileder: {
                    ansikt: 'skeptisk',
                },
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
