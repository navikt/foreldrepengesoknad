import { HeartFillIcon, MinusCircleIcon, PlusCircleIcon, TeddyBearFillIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Tooltip, VStack } from '@navikt/ds-react';

import { Barn, BrukerRolleSak_fpoversikt, isAdoptertBarn, isFødtBarn } from '@navikt/fp-types';
import { CalendarLabel, CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { LegendLabel } from '../../types/LegendLabel';
import { UttaksplanperiodeMedKunTapteDager, erEøsUttakPeriode } from '../../types/UttaksplanPeriode';
import { useAlleUttakPerioderInklTapteDager } from '../../utils/lagHullPerioder';
import { filtrerBortAnnenPartsIdentiskePerioder } from '../utils/uttaksplanKalenderUtils';
import { useUttaksplanData } from './../../context/UttaksplanDataContext';
import {
    UttaksplanKalenderLegendInfo,
    getCalendarLabel,
    getFocusStyle,
    getLegendLabelFromPeriode,
    getSelectableStyle,
    getSelectedStyle,
    sortLegendInfoByLabel,
} from './uttaksplanLegendUtils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const UNSELECTABLE_DAYS = new Set<LegendLabel>(['HELG', 'BARNEHAGEPLASS', 'FØDSEL']);

interface Props {
    perioderForKalendervisning: CalendarPeriod[];
    selectLegend?: (color: CalendarPeriodColor) => void;
    readOnly: boolean;
    skjulTekstSomDefault?: boolean;
    barnehagestartdato?: string;
}

export const UttaksplanLegend = ({
    perioderForKalendervisning,
    selectLegend,
    skjulTekstSomDefault = false,
    readOnly,
    barnehagestartdato,
}: Props) => {
    const intl = useIntl();

    const [visHorisontalt, setVisHorisontalt] = useState(true);

    const {
        foreldreInfo: { søker },
        barn,
        familiehendelsedato,
    } = useUttaksplanData();

    const saksperioderInkludertHull = useAlleUttakPerioderInklTapteDager();

    const unikePerioder = filtrerBortAnnenPartsIdentiskePerioder(saksperioderInkludertHull, søker === 'FAR_MEDMOR');

    const unikePeriodeLabelsMedFarge = unikePerioder.reduce<UttaksplanKalenderLegendInfo[]>((acc, periode) => {
        const label = getLegendLabelFromPeriode(periode, barn, søker === 'FAR_MEDMOR');

        if (!label) {
            return acc;
        }

        const periodeForKalendervisning = perioderForKalendervisning.find(
            (p) =>
                dayjs(p.fom).isSameOrBefore(periode.tom) &&
                dayjs(p.tom).isSameOrAfter(periode.fom) &&
                !erBarnehageplassPeriode(p, barnehagestartdato) &&
                !erFamiliehendelsePeriode(p, familiehendelsedato),
        );

        if (!periodeForKalendervisning) {
            return acc;
        }

        if (acc.some((item) => item.calendarPeriod.color === periodeForKalendervisning.color)) {
            return acc;
        }

        return [
            ...acc,
            {
                label,
                forelder: utledForelder(periode, søker),
                calendarPeriod: periodeForKalendervisning,
            },
        ];
    }, []);

    const barnehageplassPeriode = perioderForKalendervisning.find((p) =>
        erBarnehageplassPeriode(p, barnehagestartdato),
    );
    if (barnehageplassPeriode) {
        unikePeriodeLabelsMedFarge.push({
            label: 'BARNEHAGEPLASS',
            calendarPeriod: barnehageplassPeriode,
        });
    }

    unikePeriodeLabelsMedFarge.push(
        {
            label: getFamiliehendelseKalendarLabel(barn),
            calendarPeriod: notEmpty(
                perioderForKalendervisning.find((p) => erFamiliehendelsePeriode(p, familiehendelsedato)),
            ),
        },
        {
            label: 'HELG',
            calendarPeriod: {
                fom: '',
                tom: '',
                color: 'GRAY',
                srText: perioderForKalendervisning.find((p) => p.color === 'GRAY')?.srText || '',
            },
        },
    );

    const sortedLegends = [...unikePeriodeLabelsMedFarge].sort(sortLegendInfoByLabel);

    return (
        <HStackEllerVStack gap={skjulTekstSomDefault ? 'space-8' : 'space-16'} visHorisontalt={visHorisontalt}>
            {skjulTekstSomDefault && !visHorisontalt && (
                <HStack gap="space-8" align="center">
                    <FormattedMessage id="UttaksplanLegend.HvaFargeneBetyr" />
                    <MinusCircleIcon
                        title={intl.formatMessage({ id: 'UttaksplanLegend.LukkFargeForklaring' })}
                        fontSize="1.5rem"
                        className="mb-1 cursor-pointer"
                        onClick={() => setVisHorisontalt(true)}
                    />
                </HStack>
            )}
            {sortedLegends.map((info) => (
                <LabelButtonMedEllerUtenToolip
                    key={getPeriodKey(info)}
                    info={info}
                    selectLegend={selectLegend}
                    readOnly={readOnly}
                    visTekst={!skjulTekstSomDefault || !visHorisontalt}
                />
            ))}
            {skjulTekstSomDefault && visHorisontalt && (
                <PlusCircleIcon
                    title={intl.formatMessage({ id: 'UttaksplanLegend.ApneFargeForklaring' })}
                    fontSize="1.5rem"
                    className="mb-1 cursor-pointer"
                    onClick={() => setVisHorisontalt(false)}
                />
            )}
        </HStackEllerVStack>
    );
};

const utledForelder = (periode: UttaksplanperiodeMedKunTapteDager, søker: BrukerRolleSak_fpoversikt) => {
    if (erEøsUttakPeriode(periode)) {
        return søker;
    }
    return periode.forelder;
};

const HStackEllerVStack = ({
    children,
    gap,
    visHorisontalt,
}: {
    children: React.ReactNode;
    gap: 'space-8' | 'space-16';
    visHorisontalt: boolean;
}) =>
    visHorisontalt ? (
        <HStack gap={gap} align="center">
            {children}
        </HStack>
    ) : (
        <VStack gap={gap}>{children}</VStack>
    );

const LabelButtonMedEllerUtenToolip = ({
    info,
    selectLegend,
    readOnly,
    visTekst,
}: {
    info: UttaksplanKalenderLegendInfo;
    selectLegend?: (color: CalendarPeriodColor) => void;
    readOnly: boolean;
    visTekst: boolean;
}) => {
    const intl = useIntl();

    const {
        foreldreInfo: { søker, navnPåForeldre, erMedmorDelAvSøknaden, erIkkeSøkerSpesifisert },
        valgtStønadskonto,
    } = useUttaksplanData();

    const harAktivitetsfriKvote = valgtStønadskonto.kontoer.some((k) => k.konto === 'AKTIVITETSFRI_KVOTE');

    const erFarEllerMedmor = søker === 'FAR_MEDMOR';
    const navnAnnenPart = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    const label = getCalendarLabel(
        info,
        navnAnnenPart,
        erMedmorDelAvSøknaden,
        harAktivitetsfriKvote,
        søker,
        erIkkeSøkerSpesifisert ?? false,
        intl,
    );

    if (visTekst) {
        return (
            <LabelButton
                info={info}
                label={label}
                selectLegend={selectLegend}
                readOnly={readOnly}
                visTekst={visTekst}
            />
        );
    }
    return (
        <Tooltip content={label}>
            <div>
                <LabelButton
                    info={info}
                    label={label}
                    selectLegend={selectLegend}
                    readOnly={readOnly}
                    visTekst={visTekst}
                />
            </div>
        </Tooltip>
    );
};

const LabelButton = ({
    info,
    label,
    selectLegend,
    readOnly,
    visTekst,
}: {
    info: UttaksplanKalenderLegendInfo;
    selectLegend?: (color: CalendarPeriodColor) => void;
    label?: React.ReactNode;
    readOnly: boolean;
    visTekst: boolean;
}) => {
    const [selectedLabel, setSelectedLabel] = useState<LegendLabel | undefined>(undefined);

    const erKlikkbar = !!selectLegend && !UNSELECTABLE_DAYS.has(info.label) && !readOnly;

    return (
        <button
            type="button"
            onClick={
                erKlikkbar
                    ? () => {
                          selectLegend(info.calendarPeriod.color);
                          setSelectedLabel(selectedLabel === info.label ? undefined : info.label);
                      }
                    : undefined
            }
            className={
                `rounded-sm ${getSelectableStyle(!UNSELECTABLE_DAYS.has(info.label) && !readOnly)}` +
                ` ${getFocusStyle(info.calendarPeriod.color)} ${getSelectedStyle(selectedLabel === info.label, info.calendarPeriod.color)} `
            }
            tabIndex={!UNSELECTABLE_DAYS.has(info.label) && !readOnly ? 0 : -1}
            disabled={!erKlikkbar}
        >
            {(info.label === 'FØDSEL' || info.label === 'TERMIN') && (
                <HStack gap="space-4">
                    <HeartFillIcon aria-hidden color="var(--ax-bg-brand-magenta-strong)" width={25} height={25} />
                    {visTekst && <BodyShort style={{ whiteSpace: 'nowrap' }}>{label}</BodyShort>}
                </HStack>
            )}
            {info.label === 'BARNEHAGEPLASS' && (
                <HStack gap="space-4">
                    <TeddyBearFillIcon aria-hidden color="var(--ax-brand-beige-800)" width={25} height={25} />
                    {visTekst && <BodyShort style={{ whiteSpace: 'nowrap' }}>{label}</BodyShort>}
                </HStack>
            )}
            {info.label !== 'FØDSEL' && info.label !== 'BARNEHAGEPLASS' && info.label !== 'TERMIN' && (
                <CalendarLabel color={info.calendarPeriod.color}>
                    {visTekst && <BodyShort style={{ whiteSpace: 'nowrap' }}>{label}</BodyShort>}
                </CalendarLabel>
            )}
        </button>
    );
};

const getFamiliehendelseKalendarLabel = (barn: Barn): LegendLabel => {
    if (!isAdoptertBarn(barn)) {
        return isFødtBarn(barn) ? 'FØDSEL' : 'TERMIN';
    }
    return 'ADOPSJON';
};

const getPeriodKey = (info: UttaksplanKalenderLegendInfo) => {
    return `${info.calendarPeriod.fom}${info.calendarPeriod.tom}${info.calendarPeriod.icon ? `;with-icon` : ''}`;
};

const erFamiliehendelsePeriode = (p: CalendarPeriod, familiehendelsedato: string): boolean => {
    return p.fom === familiehendelsedato && p.tom === familiehendelsedato && !!p.icon;
};

const erBarnehageplassPeriode = (p: CalendarPeriod, barnehagestartdato: string | undefined): boolean => {
    return p.fom === barnehagestartdato && p.tom === barnehagestartdato && !!p.icon;
};
