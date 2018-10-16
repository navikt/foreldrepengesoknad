import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../app/util/dates/dates';
import Oppsummeringsliste from 'common/components/oppsummeringsliste/Oppsummeringsliste';
import { Næring } from '../../../../app/types/søknad/SelvstendigNæringsdrivendeInformasjon';
import Næringsdetaljer from 'common/components/oppsummering/steg-oppsummeringslister/detalj-komponenter/Næringsdetaljer';

interface SelvstendigNæringsdrivendeOppsummeringslisteProps {
    næringer: Næring[];
}

type Props = SelvstendigNæringsdrivendeOppsummeringslisteProps & InjectedIntlProps;

class SelvstendigNæringsdrivendeOppsummeringsliste extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modalIsOpen: false
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
                tom: pågående ? 'pågående' : formatDate(tidsperiode.tom)
            }),
            content: <Næringsdetaljer næring={næring} />
        };
    }

    render() {
        return <Oppsummeringsliste data={this.createOppsummeringslisteData()} />;
    }
}

export default injectIntl(SelvstendigNæringsdrivendeOppsummeringsliste);
