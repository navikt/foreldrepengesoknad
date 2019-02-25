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
import Arbeidsforhold from '../../../../../app/types/Arbeidsforhold';
import { UttaksplanValideringState } from 'app/redux/reducers/uttaksplanValideringReducer';
import AnnenForelder from '../../../../../app/types/søknad/AnnenForelder';
import { Tilleggsopplysning, Opplysning } from 'app/types/søknad/Søknad';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import OppsummeringAvDokumentasjon from 'common/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import {
    beskrivTilleggsopplysning,
    TilleggsopplysningMedBeskrivelse
} from 'app/util/cleanup/stringifyTilleggsopplysninger';

interface UttaksplanOppsummeringslisteProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: Arbeidsforhold[];
    uttaksplanValidering: UttaksplanValideringState;
    annenForelder: AnnenForelder;
    begrunnelseForSenEndring?: Tilleggsopplysning;
    begrunnelseForSenEndringVedlegg?: Attachment[];
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
        this.createOppsummeringslisteelementPropsForBegrunnelseForSenEndring = this.createOppsummeringslisteelementPropsForBegrunnelseForSenEndring.bind(
            this
        );
        this.formatTidsperiode = this.formatTidsperiode.bind(this);
        this.getStønadskontoNavnFromKonto = this.getStønadskontoNavnFromKonto.bind(this);
    }

    createOppsummeringslisteData(): OppsummeringslisteelementProps[] {
        const { perioder } = this.props;
        const periodeliste = perioder
            .map((periode) => this.createOppsummeringslisteelementProps(periode))
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
        const { registrerteArbeidsforhold } = this.props;
        return {
            venstrestiltTekst: this.getStønadskontoNavnFromKonto(periode.konto),
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: <Uttaksperiodedetaljer periode={periode} registrerteArbeidsforhold={registrerteArbeidsforhold} />
        };
    }

    createOppsummeringslisteelementPropsForUtsettelsesperiode(periode: Utsettelsesperiode) {
        const { registrerteArbeidsforhold, erFarEllerMedmor, annenForelder, intl } = this.props;
        return {
            venstrestiltTekst: getMessage(intl, 'oppsummering.utsettelse.pga'),
            høyrestiltTekst: this.formatTidsperiode(periode.tidsperiode),
            content: (
                <Utsettelsesperiodedetaljer
                    periode={periode}
                    registrerteArbeidsforhold={registrerteArbeidsforhold}
                    erFarEllerMedmor={erFarEllerMedmor}
                    annenForelder={annenForelder}
                />
            )
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
