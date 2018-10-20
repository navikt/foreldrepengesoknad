import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Oppsummeringsliste, {
    OppsummeringslisteelementProps
} from 'common/components/oppsummeringsliste/Oppsummeringsliste';
import {
    Overføringsperiode,
    Periode,
    Periodetype,
    StønadskontoType,
    Utsettelsesperiode,
    Uttaksperiode
} from '../../../../../app/types/uttaksplan/periodetyper';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../../app/util/dates/dates';
import Uttaksperiodedetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/Uttaksperiodedetaljer';
import Utsettelsesperiodedetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/Utsettelsesperiodedetaljer';
import Overføringsperiodedetaljer from 'common/components/oppsummering/oppsummeringer/detaljer/Overføringsperiodedetaljer';
import { NavnPåForeldre, Tidsperiode } from 'common/types';
import { getStønadskontoNavn } from '../../../../../app/util/uttaksplan';

interface UttaksplanOppsummeringslisteProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
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
        this.formatTidsperiode = this.formatTidsperiode.bind(this);
        this.getStønadskontoNavnFromKonto = this.getStønadskontoNavnFromKonto.bind(this);
    }

    createOppsummeringslisteData(): OppsummeringslisteelementProps[] {
        const { perioder } = this.props;
        return perioder
            .map((periode) => this.createOppsummeringslisteelementProps(periode))
            .filter((v) => v !== null) as OppsummeringslisteelementProps[];
    }

    createOppsummeringslisteelementProps(periode: Periode) {
        if (periode.type === Periodetype.Uttak) {
            return this.createOppsummeringslisteelementPropsForUttaksperiode(periode);
        } else if (periode.type === Periodetype.Utsettelse) {
            return this.createOppsummeringslisteelementPropsForUtsettelsesperiode(periode);
        } else if (periode.type === Periodetype.Overføring) {
            return this.createOppsummeringslisteelementPropsForOverføringsperiode(periode);
        }
        return null;
    }

    createOppsummeringslisteelementPropsForUttaksperiode(periode: Uttaksperiode) {
        return {
            venstrestiltTekst: this.getStønadskontoNavnFromKonto(periode.konto),
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: <Uttaksperiodedetaljer periode={periode} />
        };
    }

    createOppsummeringslisteelementPropsForUtsettelsesperiode(periode: Utsettelsesperiode) {
        const { intl } = this.props;
        return {
            venstrestiltTekst: getMessage(intl, 'oppsummering.utsettelse.pga'),
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: <Utsettelsesperiodedetaljer periode={periode} />
        };
    }

    createOppsummeringslisteelementPropsForOverføringsperiode(periode: Overføringsperiode) {
        const { navnPåForeldre, erFarEllerMedmor, intl } = this.props;
        const kontonavn = this.getStønadskontoNavnFromKonto(periode.konto);
        return {
            venstrestiltTekst: getMessage(intl, 'oppsummering.overtakelse.pga', {
                konto: kontonavn
            }),
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: (
                <Overføringsperiodedetaljer
                    periode={periode}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                />
            )
        };
    }

    getStønadskontoNavnFromKonto(konto: StønadskontoType) {
        const { navnPåForeldre, intl } = this.props;
        return getStønadskontoNavn(intl, konto, navnPåForeldre);
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
