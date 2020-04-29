import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

import DocumentTitle from 'react-document-title';
import Applikasjonsside from '../../components/applikasjon/applikasjonsside/Applikasjonsside';
import Feilsidemelding from 'common/components/feilsidemelding/Feilsidemelding';
import { SøkerinfoProps } from '../../types/søkerinfo';

const URL_PAPIRSØKNAD =
    'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/Skjemaer/Familie/' +
    'foreldrepenger-og-engangsstonad/Foreldrepenger+og+engangsst%C3%B8nad?method=mail&veiledertype=privatperson';

interface Props extends SøkerinfoProps {
    intl: IntlShape;
}

const IkkeMyndig: React.StatelessComponent<Props> = (props: Props) => {
    const { intl, søkerinfo } = props;
    return (
        <Applikasjonsside visSpråkvelger={false} margin={false}>
            <DocumentTitle title={getMessage(intl, 'dokument.tittel.feilside.ikkeMyndig')} />
            <Feilsidemelding
                illustrasjon={{
                    tittel: getMessage(intl, 'ikkeMyndig.tittel', {
                        navn: søkerinfo.person.fornavn.toLowerCase()
                    }),
                    tekst: getMessage(intl, 'ikkeMyndig.ingress'),
                    lenke: {
                        url: URL_PAPIRSØKNAD,
                        tekst: getMessage(intl, 'ikkeMyndig.boblelenketekst')
                    }
                }}
                tittel={getMessage(intl, 'velkommen.tittel')}
                ingress={getMessage(intl, 'velkommen.ingress')}
            />
        </Applikasjonsside>
    );
};

export default injectIntl(IkkeMyndig);
