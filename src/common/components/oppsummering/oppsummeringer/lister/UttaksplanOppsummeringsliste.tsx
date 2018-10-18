import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Oppsummeringsliste, {
    OppsummeringslisteelementProps
} from 'common/components/oppsummeringsliste/Oppsummeringsliste';
import {
    Oppholdsperiode,
    Overføringsperiode,
    Periode,
    Periodetype,
    Utsettelsesperiode,
    Uttaksperiode
} from '../../../../../app/types/uttaksplan/periodetyper';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../../app/util/dates/dates';
import Uttaksperiodedetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/Uttaksperiodedetaljer';
import Utsettelsesperiodedetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/Utsettelsesperiodedetaljer';
import Overføringsperiodedetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/Overføringsperiodedetaljer';
import Oppholdsperiodedetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/Oppholdsperiodedetaljer';
import { NavnPåForeldre, Tidsperiode } from 'common/types';
import { getStønadskontoNavn } from '../../../../../app/util/uttaksplan';

interface UttaksplanOppsummeringslisteProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
}

type Props = UttaksplanOppsummeringslisteProps & InjectedIntlProps;

class UttaksplanOppsummeringsliste extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.createOppsummeringslisteData = this.createOppsummeringslisteData.bind(this);
        this.createOppsummeringslisteelementProps = this.createOppsummeringslisteelementProps.bind(this);
        this.createOppsummeringslisteelementPropsForUttaksperiode = this.createOppsummeringslisteelementPropsForUttaksperiode.bind(
            this
        );
        this.createOppsummeringslisteelementPropsForUtsettelsesperiode = this.createOppsummeringslisteelementPropsForUtsettelsesperiode.bind(
            this
        );
        this.createOppsummeringslisteelementPropsForOverføringsperiode = this.createOppsummeringslisteelementPropsForOverføringsperiode.bind(
            this
        );
        this.createOppsummeringslisteelementPropsForOppholdsperiode = this.createOppsummeringslisteelementPropsForOppholdsperiode.bind(
            this
        );
        this.formatTidsperiode = this.formatTidsperiode.bind(this);
    }

    createOppsummeringslisteData() {
        const { perioder } = this.props;
        return perioder.map((periode) => this.createOppsummeringslisteelementProps(periode));
    }

    createOppsummeringslisteelementProps(periode: Periode): OppsummeringslisteelementProps {
        if (periode.type === Periodetype.Uttak) {
            return this.createOppsummeringslisteelementPropsForUttaksperiode(periode);
        } else if (periode.type === Periodetype.Utsettelse) {
            return this.createOppsummeringslisteelementPropsForUtsettelsesperiode(periode);
        } else if (periode.type === Periodetype.Overføring) {
            return this.createOppsummeringslisteelementPropsForOverføringsperiode(periode);
        } else {
            return this.createOppsummeringslisteelementPropsForOppholdsperiode(periode as Oppholdsperiode);
        }
    }

    createOppsummeringslisteelementPropsForUttaksperiode(periode: Uttaksperiode) {
        const { navnPåForeldre, intl } = this.props;
        return {
            venstrestiltTekst: getStønadskontoNavn(intl, periode.konto, navnPåForeldre),
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: <Uttaksperiodedetaljer periode={periode} />
        };
    }

    createOppsummeringslisteelementPropsForUtsettelsesperiode(periode: Utsettelsesperiode) {
        return {
            venstrestiltTekst: `Utsettelse på grunn av ${periode.årsak}`,
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: <Utsettelsesperiodedetaljer periode={periode} />
        };
    }

    createOppsummeringslisteelementPropsForOverføringsperiode(periode: Overføringsperiode) {
        return {
            venstrestiltTekst: `Overtakelse av ${periode.konto} på grunn av ${periode.årsak}`,
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: <Overføringsperiodedetaljer periode={periode} />
        };
    }

    createOppsummeringslisteelementPropsForOppholdsperiode(periode: Oppholdsperiode) {
        return {
            venstrestiltTekst: `Opphold på grunn av ${periode.årsak}`,
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: <Oppholdsperiodedetaljer periode={periode} />
        };
    }

    formatTidsperiode(tidsperiode: Tidsperiode) {
        const { intl } = this.props;
        return getMessage(intl, 'tidsintervall', {
            fom: formatDate(tidsperiode.fom),
            tom: formatDate(tidsperiode.tom)
        });
    }

    render() {
        return <Oppsummeringsliste data={this.createOppsummeringslisteData()} />;
    }
}

export default injectIntl(UttaksplanOppsummeringsliste);
