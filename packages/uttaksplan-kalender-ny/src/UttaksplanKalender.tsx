import { DownloadIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { ReactElement } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Margin, Options, Resolution, usePDF } from 'react-to-pdf';

import { Alert, Button } from '@navikt/ds-react';

import { BarnType, PeriodeColor, StønadskontoType } from '@navikt/fp-constants';
import { Barn, SaksperiodeNy } from '@navikt/fp-types';
import { Calendar } from '@navikt/fp-ui';
import { getFamiliehendelsedato } from '@navikt/fp-utils';
import { Planperiode, finnOgSettInnHull } from '@navikt/fp-uttaksplan-ny';

import { UttaksplanLegend } from './UttaksplanLegend';
import { isAvslåttPeriode, isAvslåttPeriodeFørsteSeksUkerMor } from './helpers/uttaksplanHelpers';
import {
    KalenderPeriode,
    getInneholderKalenderHelgedager,
    getPerioderForKalendervisning,
    getUnikeUtsettelsesårsaker,
} from './uttaksplanKalenderUtils';

interface Props {
    søkersPerioder: SaksperiodeNy[];
    annenPartsPerioder?: SaksperiodeNy[];
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erFarEllerMedmor: boolean;
    bareFarMedmorHarRett: boolean;
    barn: Barn;
    navnAnnenPart: string;
    førsteUttaksdagNesteBarnsSak?: string;
    planleggerLegend?: ReactElement<any>;
    barnehagestartdato?: string;
}

export const UttaksplanKalender = ({
    søkersPerioder,
    annenPartsPerioder,
    harAktivitetskravIPeriodeUtenUttak,
    erFarEllerMedmor,
    bareFarMedmorHarRett,
    barn,
    navnAnnenPart,
    førsteUttaksdagNesteBarnsSak,
    planleggerLegend,
    barnehagestartdato,
}: Props) => {
    const intl = useIntl();
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erAdopsjon = barn.type === BarnType.ADOPTERT_ANNET_BARN || barn.type === BarnType.ADOPTERT_STEBARN;
    const erIPlanleggerModus = planleggerLegend !== undefined;

    const allePerioder = [...søkersPerioder.concat(annenPartsPerioder || [])].sort((p1, p2) =>
        dayjs(p1.fom).isBefore(p2.fom) ? -1 : 1,
    );

    const foreldrepengerHarAktivitetskrav =
        allePerioder.some((p) => p.kontoType === StønadskontoType.Foreldrepenger) &&
        allePerioder.some((p) => p.kontoType === StønadskontoType.AktivitetsfriKvote);

    const søkersHullPerioder = finnOgSettInnHull(
        allePerioder as Planperiode[],
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsesdato,
        erAdopsjon,
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    )
        .filter((p) => !!p.periodeHullÅrsak)
        .map<KalenderPeriode>((p) => ({
            fom: p.fom,
            tom: p.tom,
            forelder: søkersPerioder[0].forelder,
            periodeHullÅrsak: p.periodeHullÅrsak,
        }));

    const allePerioderInklHull = [...allePerioder.concat(søkersHullPerioder)].sort((p1, p2) =>
        dayjs(p1.fom).isBefore(p2.fom) ? -1 : 1,
    );

    const unikeUtsettelseÅrsaker = getUnikeUtsettelsesårsaker(allePerioderInklHull);

    const perioderForKalendervisning = getPerioderForKalendervisning(
        allePerioderInklHull,
        erFarEllerMedmor,
        barn,
        navnAnnenPart,
        unikeUtsettelseÅrsaker,
        intl,
        erIPlanleggerModus,
        foreldrepengerHarAktivitetskrav,
        barnehagestartdato,
    );

    const inkludererHelg = getInneholderKalenderHelgedager(perioderForKalendervisning);
    const unikePeriodefarger = [...new Set(perioderForKalendervisning.map((period) => period.color))];
    if (inkludererHelg) {
        unikePeriodefarger.push(PeriodeColor.GRAY);
    }

    const pdfOptions = {
        filename: 'Min foreldrepengeplan.pdf',
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.MEDIUM,
        },
    } satisfies Options;
    const { toPDF, targetRef } = usePDF(pdfOptions);

    const harAvslåttePerioderSomIkkeGirTapteDager = allePerioderInklHull.some(
        (p) => isAvslåttPeriode(p) && (erFarEllerMedmor || !isAvslåttPeriodeFørsteSeksUkerMor(p, familiehendelsesdato)),
    );

    return (
        <div>
            {harAvslåttePerioderSomIkkeGirTapteDager && (
                <Alert variant="info" className="my-6">
                    <FormattedMessage id="kalender.avslåttePerioder" />
                </Alert>
            )}
            <div ref={targetRef}>
                <div className="flex flex-wrap max-[768px]:pb-2" id="legend">
                    {planleggerLegend !== undefined ? (
                        <>{planleggerLegend}</>
                    ) : (
                        <UttaksplanLegend
                            uniqueColors={unikePeriodefarger}
                            barn={barn}
                            navnAnnenPart={navnAnnenPart}
                            unikeUtsettelseÅrsaker={unikeUtsettelseÅrsaker}
                            erFarEllerMedmor={erFarEllerMedmor}
                        />
                    )}
                </div>
                <Calendar
                    periods={perioderForKalendervisning}
                    useSmallerWidth={true}
                    dateClickCallback={(clickedDate) => {
                        console.log(clickedDate);
                    }}
                />
            </div>
            <Button
                className="mt-8 print:hidden"
                variant="tertiary"
                icon={<DownloadIcon aria-hidden />}
                onClick={() => toPDF()}
            >
                <FormattedMessage id="kalender.lastNed" />
            </Button>
        </div>
    );
};
