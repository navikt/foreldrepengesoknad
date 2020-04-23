import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../../../util/dates/dates';
import Oppsummeringsliste from 'app/steg/oppsummering/components/oppsummeringsliste/Oppsummeringsliste';
import { Næring } from '../../../../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import Næringsdetaljer from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/detaljer/Næringsdetaljer';

interface SelvstendigNæringsdrivendeOppsummeringslisteProps {
    næringer: Næring[];
    intl: IntlShape;
}

type Props = SelvstendigNæringsdrivendeOppsummeringslisteProps;

class SelvstendigNæringsdrivendeOppsummeringsliste extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modalIsOpen: false,
        };

        this.createOppsummeringslisteData = this.createOppsummeringslisteData.bind(this);
        this.createOppsummeringslisteelementData = this.createOppsummeringslisteelementData.bind(this);
    }

    createOppsummeringslisteData() {
        const { næringer } = this.props;
        return næringer.map((næring) => this.createOppsummeringslisteelementData(næring));
    }

    createOppsummeringslisteelementData(næring: Næring) {
        const { intl } = this.props;
        const { navnPåNæringen, tidsperiode, pågående } = næring;
        return {
            venstrestiltTekst: navnPåNæringen,
            høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                fom: formatDate(tidsperiode.fom),
                tom: pågående ? 'pågående' : formatDate(tidsperiode.tom),
            }),
            content: <Næringsdetaljer næring={næring} />,
        };
    }

    render() {
        return <Oppsummeringsliste data={this.createOppsummeringslisteData()} />;
    }
}

export default injectIntl(SelvstendigNæringsdrivendeOppsummeringsliste);
