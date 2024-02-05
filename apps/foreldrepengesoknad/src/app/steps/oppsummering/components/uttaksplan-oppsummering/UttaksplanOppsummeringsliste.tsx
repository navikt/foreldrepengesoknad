import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import {
    AnnenForelder,
    NavnPåForeldre,
    Oppholdsperiode,
    Overføringsperiode,
    Periode,
    PeriodeUtenUttakUtsettelse,
    Periodetype,
    Situasjon,
    StønadskontoType,
    TidsperiodeDate,
    Utsettelsesperiode,
    Uttaksperiode,
    appendPeriodeNavnHvisUttakRundtFødselFarMedmor,
    finnesPeriodeIOpprinneligPlan,
    formatDate,
    getPeriodeTittel,
    getStønadskontoNavn,
    isSkalIkkeHaForeldrepengerFørFødselPeriode,
    uttaksperiodeKanJusteresVedFødsel,
} from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';

import Overføringsperiodedetaljer from './detaljer/Overføringsperiodedetaljer';
import Uttaksperiodedetaljer from './detaljer/Uttaksperiodedetaljer';
import Utsettelsesperiodedetaljer from './detaljer/Uttsettelsesperiodedetaljer';
import Oppsummeringsliste, { OppsummeringslisteelementProps } from './oppsummeringsliste/Oppsummeringsliste';

interface UttaksplanOppsummeringslisteProps {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: Arbeidsforhold[];
    annenForelder: AnnenForelder;
    eksisterendeUttaksplan?: Periode[];
    familiehendelsesdato: Date;
    termindato: string | undefined;
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
            termindato ? dayjs(termindato).toDate() : undefined,
        );
    };

    const formatTidsperiode = (tidsperiode: TidsperiodeDate): string => {
        const formatertTidsperiode = intl.formatMessage(
            { id: 'tidsintervall' },
            {
                fom: formatDate(tidsperiode.fom),
                tom: formatDate(tidsperiode.tom),
            },
        );
        if (uttaksperiodeKanJusteresVedFødsel(ønskerJustertUttakVedFødsel, termindato, tidsperiode.fom)) {
            const justeringTekst = intl.formatMessage({ id: 'oppsummering.uttak.periodenBlirAutomatiskJustert' });
            return justeringTekst.concat(formatertTidsperiode);
        }
        return formatertTidsperiode;
    };
    const createOppsummeringslisteelementPropsForUttaksperiode = (
        periode: Uttaksperiode,
        periodeErNyEllerEndret = true,
    ): OppsummeringslisteelementProps => {
        const høyrestiltTekst = isSkalIkkeHaForeldrepengerFørFødselPeriode(periode)
            ? intl.formatMessage({ id: 'uttaksplan.periodeliste.header.skalIkkeHaUttakFørTermin' })
            : formatTidsperiode(periode.tidsperiode);
        return {
            venstrestiltTekst: getUttaksperiodeNavn(periode),
            høyrestiltTekst,
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
        periode: Oppholdsperiode,
    ): OppsummeringslisteelementProps => {
        return {
            venstrestiltTekst: getPeriodeTittel(
                intl,
                periode,
                navnPåForeldre,
                familiehendelsesdato,
                termindato ? dayjs(termindato).toDate() : undefined,
                situasjon,
                erFarEllerMedmor,
            ),
            høyrestiltTekst: formatTidsperiode(periode.tidsperiode),
        };
    };

    const createOppsummeringslisteelementPropsForUtsettelsesperiode = (
        periode: Utsettelsesperiode | PeriodeUtenUttakUtsettelse,
        periodeErNyEllerEndret: boolean,
    ): OppsummeringslisteelementProps => {
        return {
            venstrestiltTekst: intl.formatMessage({ id: 'oppsummering.utsettelse.pga' }),
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
    ): OppsummeringslisteelementProps => {
        const kontonavn = getStønadskontoNavnFromKonto(periode.konto);
        return {
            venstrestiltTekst: intl.formatMessage(
                { id: 'oppsummering.overtakelse.pga' },
                {
                    konto: kontonavn,
                },
            ),
            høyrestiltTekst: formatTidsperiode(periode.tidsperiode),
            content: <Overføringsperiodedetaljer periode={periode} navnPåForeldre={navnPåForeldre} />,
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
                return createOppsummeringslisteelementPropsForOverføringsperiode(periode);
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

        return periodeliste;
    };

    return <Oppsummeringsliste data={oppsummeringslisteData()} />;
};

export default UttaksplanOppsummeringsliste;
