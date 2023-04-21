import { FunctionComponent } from 'react';
import { formatDate, intlUtils, TidsperiodeDate } from '@navikt/fp-common';
import AnnenForelder from 'app/context/types/AnnenForelder';
import { Tilleggsopplysning } from 'app/context/types/Tilleggsopplysninger';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { beskrivTilleggsopplysning, TilleggsopplysningMedBeskrivelse } from 'app/utils/tilleggsopplysningerUtils';
import { useIntl } from 'react-intl';
import {
    Oppholdsperiode,
    Overføringsperiode,
    Periode,
    Periodetype,
    PeriodeUtenUttakUtsettelse,
    Utsettelsesperiode,
    Uttaksperiode,
} from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { finnesPeriodeIOpprinneligPlan, getPeriodeTittel } from 'uttaksplan/utils/periodeUtils';
import { getStønadskontoNavn } from 'uttaksplan/utils/stønadskontoerUtils';
import Feltoppsummering from './feltoppsummering/Feltoppsummering';
import Oppsummeringsliste, { OppsummeringslisteelementProps } from './oppsummeringsliste/Oppsummeringsliste';
import Overføringsperiodedetaljer from './detaljer/Overføringsperiodedetaljer';
import Uttaksperiodedetaljer from './detaljer/Uttaksperiodedetaljer';
import Utsettelsesperiodedetaljer from './detaljer/Uttsettelsesperiodedetaljer';
import { appendPeriodeNavnHvisUttakRundtFødselFarMedmor, uttaksperiodeKanJusteresVedFødsel } from 'app/utils/wlbUtils';
import { Situasjon } from 'app/types/Situasjon';

interface UttaksplanOppsummeringslisteProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: Arbeidsforhold[];
    annenForelder: AnnenForelder;
    begrunnelseForSenEndring?: Tilleggsopplysning;
    eksisterendeUttaksplan?: Periode[];
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
    ønskerJustertUttakVedFødsel: boolean | undefined;
}

const UttaksplanOppsummeringsliste: FunctionComponent<UttaksplanOppsummeringslisteProps> = ({
    perioder,
    navnPåForeldre,
    erFarEllerMedmor,
    registrerteArbeidsforhold,
    annenForelder,
    begrunnelseForSenEndring,
    eksisterendeUttaksplan,
    familiehendelsesdato,
    termindato,
    situasjon,
    erAleneOmOmsorg,
    ønskerJustertUttakVedFødsel,
}) => {
    const intl = useIntl();

    const getStønadskontoNavnFromKonto = (konto: StønadskontoType) => {
        return getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg);
    };

    const getUttaksperiodeNavn = (periode: Uttaksperiode) => {
        const tittel = getStønadskontoNavnFromKonto(periode.konto);
        return appendPeriodeNavnHvisUttakRundtFødselFarMedmor(
            intl,
            tittel,
            periode,
            situasjon,
            familiehendelsesdato,
            termindato
        );
    };

    const formatTidsperiode = (tidsperiode: TidsperiodeDate): string => {
        const formatertTidsperiode = intlUtils(intl, 'tidsintervall', {
            fom: formatDate(tidsperiode.fom),
            tom: formatDate(tidsperiode.tom),
        });
        if (uttaksperiodeKanJusteresVedFødsel(ønskerJustertUttakVedFødsel, termindato, tidsperiode.fom)) {
            const justeringTekst = intlUtils(intl, 'oppsummering.uttak.periodenBlirAutomatiskJustert');
            return justeringTekst.concat(formatertTidsperiode);
        }
        return formatertTidsperiode;
    };
    const createOppsummeringslisteelementPropsForUttaksperiode = (
        periode: Uttaksperiode,
        periodeErNyEllerEndret = true
    ): OppsummeringslisteelementProps => {
        return {
            venstrestiltTekst: getUttaksperiodeNavn(periode),
            høyrestiltTekst: formatTidsperiode(periode.tidsperiode),
            content: (
                <Uttaksperiodedetaljer
                    periode={periode}
                    registrerteArbeidsforhold={registrerteArbeidsforhold}
                    periodeErNyEllerEndret={periodeErNyEllerEndret}
                    søkerErFarEllerMedmor={erFarEllerMedmor}
                    annenForelder={annenForelder}
                />
            ),
        };
    };

    const createOppsummeringslisteelementPropsForOppholdsperiode = (
        periode: Oppholdsperiode
    ): OppsummeringslisteelementProps => {
        return {
            venstrestiltTekst: getPeriodeTittel(
                intl,
                periode,
                navnPåForeldre,
                familiehendelsesdato,
                termindato,
                situasjon
            ),
            høyrestiltTekst: formatTidsperiode(periode.tidsperiode),
        };
    };

    const createOppsummeringslisteelementPropsForUtsettelsesperiode = (
        periode: Utsettelsesperiode | PeriodeUtenUttakUtsettelse,
        periodeErNyEllerEndret: boolean
    ): OppsummeringslisteelementProps => {
        return {
            venstrestiltTekst: intlUtils(intl, 'oppsummering.utsettelse.pga'),
            høyrestiltTekst: formatTidsperiode(periode.tidsperiode),
            content: (
                <Utsettelsesperiodedetaljer
                    periode={periode}
                    registrerteArbeidsforhold={registrerteArbeidsforhold}
                    søkerErFarEllerMedmor={erFarEllerMedmor}
                    annenForelder={annenForelder}
                    periodeErNyEllerEndret={periodeErNyEllerEndret}
                />
            ),
        };
    };

    const createOppsummeringslisteelementPropsForOverføringsperiode = (
        periode: Overføringsperiode,
        periodeErNyEllerEndret: boolean
    ): OppsummeringslisteelementProps => {
        const kontonavn = getStønadskontoNavnFromKonto(periode.konto);
        return {
            venstrestiltTekst: intlUtils(intl, 'oppsummering.overtakelse.pga', {
                konto: kontonavn,
            }),
            høyrestiltTekst: formatTidsperiode(periode.tidsperiode),
            content: (
                <Overføringsperiodedetaljer
                    periode={periode}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                    periodeErNyEllerEndret={periodeErNyEllerEndret}
                />
            ),
        };
    };

    const createOppsummeringslisteelementPropsForBegrunnelseForSenEndring = (
        begrunnelse: TilleggsopplysningMedBeskrivelse
    ): OppsummeringslisteelementProps => {
        return {
            venstrestiltTekst: begrunnelse.beskrivelse,
            høyrestiltTekst: '',
            content: (
                <>
                    <Feltoppsummering feltnavn={begrunnelse.ekstraInformasjon || ''} verdi={begrunnelse.tekst} />
                </>
            ),
        };
    };

    const createOppsummeringslisteelementProps = (periode: Periode) => {
        const periodeErNyEllerEndret = eksisterendeUttaksplan
            ? finnesPeriodeIOpprinneligPlan(periode, eksisterendeUttaksplan) === false
            : true;
        switch (periode.type) {
            case Periodetype.Uttak:
                return createOppsummeringslisteelementPropsForUttaksperiode(periode, periodeErNyEllerEndret);
            case Periodetype.Utsettelse:
                return createOppsummeringslisteelementPropsForUtsettelsesperiode(periode, periodeErNyEllerEndret);
            case Periodetype.Overføring:
                return createOppsummeringslisteelementPropsForOverføringsperiode(periode, periodeErNyEllerEndret);
            case Periodetype.Opphold:
                return createOppsummeringslisteelementPropsForOppholdsperiode(periode);
            default:
                return null;
        }
    };

    const oppsummeringslisteData = (): OppsummeringslisteelementProps[] => {
        const periodeliste = perioder
            .map((periode) => createOppsummeringslisteelementProps(periode))
            .filter((v) => v !== null) as OppsummeringslisteelementProps[];
        if (begrunnelseForSenEndring) {
            const begrunnelse = beskrivTilleggsopplysning(begrunnelseForSenEndring);
            const begrunnelseForSenEndringList =
                createOppsummeringslisteelementPropsForBegrunnelseForSenEndring(begrunnelse);
            return periodeliste.concat(begrunnelseForSenEndringList);
        }

        return periodeliste;
    };

    return <Oppsummeringsliste data={oppsummeringslisteData()} />;
};

export default UttaksplanOppsummeringsliste;
