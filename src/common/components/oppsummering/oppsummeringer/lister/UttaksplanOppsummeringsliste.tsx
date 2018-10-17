import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Oppsummeringsliste from 'common/components/oppsummeringsliste/Oppsummeringsliste';
import { Periode } from '../../../../../app/types/uttaksplan/periodetyper';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../../app/util/dates/dates';

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
            })
        };
    }

    render() {
        return <Oppsummeringsliste data={this.createOppsummeringslisteData()} />;
    }
}

export default injectIntl(UttaksplanOppsummeringsliste);
