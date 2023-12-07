import { Søkerinfo, intlUtils, links } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import Feilside from '../feilside/Feilside';

interface Props {
    søkerInfo: Søkerinfo;
}

const IkkeMyndig: FunctionComponent<Props> = ({ søkerInfo }) => {
    const intl = useIntl();
    return (
        <Feilside
            dokumenttittel="NAV Foreldrepengesøknad"
            ingress={intlUtils(intl, 'velkommen.ingress')}
            tittel={intlUtils(intl, 'velkommen.tittel')}
            søkerInfo={søkerInfo}
            illustrasjon={{
                tittel: intlUtils(intl, 'velkommen.ikkeMyndig.tittel', {
                    navn: søkerInfo.person.fornavn.toLowerCase(),
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
