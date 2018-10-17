import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Oppsummeringsliste from 'common/components/oppsummeringsliste/Oppsummeringsliste';
import { Periode, Periodetype } from '../../../../../app/types/uttaksplan/periodetyper';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../../app/util/dates/dates';
import Uttaksperiodedetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/Uttaksperiodedetaljer';
import Utsettelsesperiodedetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/Utsettelsesperiodedetaljer';
import Overføringsperiodedetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/Overføringsperiodedetaljer';
import Oppholdsperiodedetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/Oppholdsperiodedetaljer';

interface UttaksplanOppsummeringslisteProps {
    perioder: Periode[];
}

type Props = UttaksplanOppsummeringslisteProps & InjectedIntlProps;

class UttaksplanOppsummeringsliste extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.createOppsummeringslisteData = this.createOppsummeringslisteData.bind(this);
        this.createOppsummeringslisteelementData = this.createOppsummeringslisteelementData.bind(this);
    }

    createOppsummeringslisteData() {
        const { perioder } = this.props;
        return perioder.map((periode) => this.createOppsummeringslisteelementData(periode));
    }

    createOppsummeringslisteelementData(periode: Periode) {
        const { intl } = this.props;
        const { type, tidsperiode } = periode;
        return {
            venstrestiltTekst: getMessage(intl, `oppsummering.uttak.type.${type}`),
            høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                fom: formatDate(tidsperiode.fom),
                tom: formatDate(tidsperiode.tom)
            }),
            content: this.renderPeriodedetaljer(periode)
        };
    }

    renderPeriodedetaljer(periode: Periode) {
        if (periode.type === Periodetype.Uttak) {
            return <Uttaksperiodedetaljer periode={periode} />;
        } else if (periode.type === Periodetype.Utsettelse) {
            return <Utsettelsesperiodedetaljer periode={periode} />;
        } else if (periode.type === Periodetype.Overføring) {
            return <Overføringsperiodedetaljer periode={periode} />;
        } else if (periode.type === Periodetype.Opphold) {
            return <Oppholdsperiodedetaljer periode={periode} />;
        }
        return null;
    }

    render() {
        return <Oppsummeringsliste data={this.createOppsummeringslisteData()} />;
    }
}

export default injectIntl(UttaksplanOppsummeringsliste);
