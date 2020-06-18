import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import Oppsummeringsliste, {
    OppsummeringslisteelementProps,
} from 'app/steg/oppsummering/components/oppsummeringsliste/Oppsummeringsliste';
import {
    Overføringsperiode,
    Periode,
    Periodetype,
    StønadskontoType,
    Utsettelsesperiode,
    Uttaksperiode,
    Oppholdsperiode,
} from '../../../../../../types/uttaksplan/periodetyper';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../../../util/dates/dates';
import Uttaksperiodedetaljer from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/detaljer/Uttaksperiodedetaljer';
import Utsettelsesperiodedetaljer from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/detaljer/Utsettelsesperiodedetaljer';
import Overføringsperiodedetaljer from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/detaljer/Overføringsperiodedetaljer';
import { NavnPåForeldre, Tidsperiode } from 'common/types';
import { getStønadskontoNavn, getPeriodeTittel } from '../../../../../../util/uttaksplan';
import Arbeidsforhold from '../../../../../../types/Arbeidsforhold';
import { UttaksplanValideringState } from 'app/redux/reducers/uttaksplanValideringReducer';
import AnnenForelder from '../../../../../../types/søknad/AnnenForelder';
import { Tilleggsopplysning, Opplysning } from 'app/types/søknad/Søknad';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';
import OppsummeringAvDokumentasjon from 'app/steg/oppsummering/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import {
    beskrivTilleggsopplysning,
    TilleggsopplysningMedBeskrivelse,
} from 'app/util/cleanup/stringifyTilleggsopplysninger';
import { Søknadsinfo } from 'app/selectors/types';
import { finnesPeriodeIOpprinneligPlan } from 'app/util/uttaksplan/uttaksplanEndringUtil';

interface UttaksplanOppsummeringslisteProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: Arbeidsforhold[];
    uttaksplanValidering: UttaksplanValideringState;
    annenForelder: AnnenForelder;
    begrunnelseForSenEndring?: Tilleggsopplysning;
    begrunnelseForSenEndringVedlegg?: Attachment[];
    søknadsinfo: Søknadsinfo;
    eksisterendeUttaksplan?: Periode[];
    intl: IntlShape;
}

type Props = UttaksplanOppsummeringslisteProps;

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
        this.createOppsummeringslisteelementPropsForBegrunnelseForSenEndring = this.createOppsummeringslisteelementPropsForBegrunnelseForSenEndring.bind(
            this
        );
        this.formatTidsperiode = this.formatTidsperiode.bind(this);
        this.getStønadskontoNavnFromKonto = this.getStønadskontoNavnFromKonto.bind(this);
    }

    createOppsummeringslisteData(): OppsummeringslisteelementProps[] {
        const { perioder, eksisterendeUttaksplan } = this.props;
        const periodeliste = perioder
            .map((periode) => this.createOppsummeringslisteelementProps(periode, eksisterendeUttaksplan))
            .filter((v) => v !== null) as OppsummeringslisteelementProps[];

        if (this.props.begrunnelseForSenEndring) {
            const begrunnelse = beskrivTilleggsopplysning(
                Opplysning.BEGRUNNELSE_FOR_SEN_ENDRING,
                this.props.begrunnelseForSenEndring,
                this.props.intl
            );

            return periodeliste.concat(
                this.createOppsummeringslisteelementPropsForBegrunnelseForSenEndring(begrunnelse)
            );
        }

        return periodeliste;
    }

    createOppsummeringslisteelementProps(periode: Periode, eksisterendeUttaksplan?: Periode[]) {
        const periodeErNyEllerEndret = eksisterendeUttaksplan
            ? finnesPeriodeIOpprinneligPlan(periode, eksisterendeUttaksplan) === false
            : true;
        switch (periode.type) {
            case Periodetype.Uttak:
                return this.createOppsummeringslisteelementPropsForUttaksperiode(periode, periodeErNyEllerEndret);
            case Periodetype.Utsettelse:
                return this.createOppsummeringslisteelementPropsForUtsettelsesperiode(periode, periodeErNyEllerEndret);
            case Periodetype.Overføring:
                return this.createOppsummeringslisteelementPropsForOverføringsperiode(periode, periodeErNyEllerEndret);
            case Periodetype.Opphold:
                return this.createOppsummeringslisteelementPropsForOppholdsperiode(periode);
            default:
                return null;
        }
    }

    createOppsummeringslisteelementPropsForUttaksperiode(periode: Uttaksperiode, periodeErNyEllerEndret = true) {
        const { registrerteArbeidsforhold, søknadsinfo } = this.props;
        return {
            venstrestiltTekst: this.getStønadskontoNavnFromKonto(periode.konto),
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: (
                <Uttaksperiodedetaljer
                    periode={periode}
                    registrerteArbeidsforhold={registrerteArbeidsforhold}
                    periodeErNyEllerEndret={periodeErNyEllerEndret}
                    søknadsinfo={søknadsinfo}
                />
            ),
        };
    }

    createOppsummeringslisteelementPropsForOppholdsperiode(periode: Oppholdsperiode) {
        return {
            venstrestiltTekst: getPeriodeTittel(this.props.intl, periode, this.props.søknadsinfo.navn.navnPåForeldre),
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
        };
    }

    createOppsummeringslisteelementPropsForUtsettelsesperiode(
        periode: Utsettelsesperiode,
        periodeErNyEllerEndret: boolean
    ) {
        const { registrerteArbeidsforhold, søknadsinfo, intl } = this.props;
        return {
            venstrestiltTekst: getMessage(intl, 'oppsummering.utsettelse.pga'),
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: (
                <Utsettelsesperiodedetaljer
                    periode={periode}
                    registrerteArbeidsforhold={registrerteArbeidsforhold}
                    søknadsinfo={søknadsinfo}
                    periodeErNyEllerEndret={periodeErNyEllerEndret}
                />
            ),
        };
    }

    createOppsummeringslisteelementPropsForOverføringsperiode(
        periode: Overføringsperiode,
        periodeErNyEllerEndret: boolean
    ) {
        const { navnPåForeldre, erFarEllerMedmor, intl } = this.props;
        const kontonavn = this.getStønadskontoNavnFromKonto(periode.konto);
        return {
            venstrestiltTekst: getMessage(intl, 'oppsummering.overtakelse.pga', {
                konto: kontonavn,
            }),
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: (
                <Overføringsperiodedetaljer
                    periode={periode}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    periodeErNyEllerEndret={periodeErNyEllerEndret}
                />
            ),
        };
    }

    createOppsummeringslisteelementPropsForBegrunnelseForSenEndring(begrunnelse: TilleggsopplysningMedBeskrivelse) {
        return {
            venstrestiltTekst: begrunnelse.beskrivelse,
            høyrestiltTekst: '',
            content: (
                <>
                    <Feltoppsummering
                        feltnavn={
                            begrunnelse.ekstraInformasjon ||
                            getMessage(this.props.intl, 'oppsummering.uttak.begrunnelseForSenEndring.defaultLabel')
                        }
                        verdi={begrunnelse.tekst}
                    />
                    {this.props.begrunnelseForSenEndringVedlegg && (
                        <OppsummeringAvDokumentasjon vedlegg={this.props.begrunnelseForSenEndringVedlegg || []} />
                    )}
                </>
            ),
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
            tom: formatDate(tidsperiode.tom),
        });
    }

    render() {
        return <Oppsummeringsliste data={this.createOppsummeringslisteData()} />;
    }
}

export default injectIntl(UttaksplanOppsummeringsliste);
