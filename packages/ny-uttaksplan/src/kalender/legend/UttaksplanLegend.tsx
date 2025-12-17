import { MinusCircleIcon, PlusCircleIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Tooltip, VStack } from '@navikt/ds-react';

import { Barn, isAdoptertBarn, isFødtBarn } from '@navikt/fp-types';
import { CalendarLabel, CalendarPeriod, CalendarPeriodColor } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { LegendLabel } from '../../types/LegendLabel';
import { filtrerBortAnnenPartsIdentiskePerioder } from '../../utils/permisjonsperiodeUtils.ts';
import { useUttaksplanData } from './../../context/UttaksplanDataContext.tsx';
import {
    UttaksplanKalenderLegendInfo,
    getCalendarLabel,
    getFocusStyle,
    getLegendLabelFromPeriode,
    getSelectableStyle,
    getSelectedStyle,
    sortLegendInfoByLabel,
} from './uttaksplanLegendUtils.ts';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const unselectableColors = ['PINK', 'PURPLE', 'BLACKOUTLINE', 'GRAY'] satisfies CalendarPeriodColor[];

interface Props {
    perioderForKalendervisning: CalendarPeriod[];
    selectLegend?: (color: CalendarPeriodColor) => void;
    readOnly: boolean;
    skjulTekstSomDefault?: boolean;
}

export const UttaksplanLegend = ({
    perioderForKalendervisning,
    selectLegend,
    skjulTekstSomDefault = false,
    readOnly,
}: Props) => {
    const intl = useIntl();

    const [visHorisontalt, setVisHorisontalt] = useState(true);

    const { uttaksplan, erFarEllerMedmor, barn } = useUttaksplanData();

    const unikePerioder = filtrerBortAnnenPartsIdentiskePerioder(uttaksplan, erFarEllerMedmor);

    const unikePeriodeLabelsMedFarge = unikePerioder.reduce<UttaksplanKalenderLegendInfo[]>((acc, periode) => {
        const label = getLegendLabelFromPeriode(periode);

        if (!label) {
            return acc;
        }

        const periodeForKalendervisning = perioderForKalendervisning.find(
            (p) =>
                dayjs(p.fom).isSameOrBefore(periode.tom) &&
                dayjs(p.tom).isSameOrAfter(periode.fom) &&
                p.color !== 'PINK' &&
                p.color !== 'PURPLE',
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
                forelder: periode.erAnnenPartEøs ? 'FAR_MEDMOR' : periode.forelder,
                calendarPeriod: periodeForKalendervisning,
            },
        ];
    }, []);

    const barnehageplassPeriode = perioderForKalendervisning.find((p) => p.color === 'PURPLE');
    if (barnehageplassPeriode) {
        unikePeriodeLabelsMedFarge.push({
            label: 'BARNEHAGEPLASS',
            calendarPeriod: barnehageplassPeriode,
        });
    }

    unikePeriodeLabelsMedFarge.push(
        {
            label: getFamiliehendelseKalendarLabel(barn),
            calendarPeriod: notEmpty(perioderForKalendervisning.find((p) => p.color === 'PINK')),
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
            {sortedLegends
                .filter((info) => info.calendarPeriod.color !== 'NONE')
                .map((info) => (
                    <LabelButtonMedEllerUtenToolip
                        key={info.calendarPeriod.color}
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

    const { erFarEllerMedmor, navnPåForeldre, erMedmorDelAvSøknaden, valgtStønadskonto, søker } = useUttaksplanData();

    const harAktivitetsfriKvote = valgtStønadskonto.kontoer.some((k) => k.konto === 'AKTIVITETSFRI_KVOTE');

    const navnAnnenPart = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    const label = getCalendarLabel(info, navnAnnenPart, erMedmorDelAvSøknaden, harAktivitetsfriKvote, søker, intl);

    if (visTekst) {
        return (
            <LabelButton
                key={info.calendarPeriod.color}
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
                    key={info.calendarPeriod.color}
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

    const erKlikkbar =
        !!selectLegend && !unselectableColors.some((color) => color === info.calendarPeriod.color) && !readOnly;

    return (
        <button
            type="button"
            key={info.calendarPeriod.color}
            onClick={
                erKlikkbar
                    ? () => {
                          selectLegend(info.calendarPeriod.color);
                          setSelectedLabel(selectedLabel === info.label ? undefined : info.label);
                      }
                    : undefined
            }
            className={
                `rounded-sm ${getSelectableStyle(!unselectableColors.some((color) => color === info.calendarPeriod.color) && !readOnly)}` +
                ` ${getFocusStyle(info.calendarPeriod.color)} ${getSelectedStyle(selectedLabel === info.label, info.calendarPeriod.color)} `
            }
            tabIndex={!unselectableColors.some((color) => color === info.calendarPeriod.color) && !readOnly ? 0 : -1}
            disabled={!erKlikkbar}
        >
            <CalendarLabel color={info.calendarPeriod.color}>
                {visTekst && <BodyShort style={{ whiteSpace: 'nowrap' }}>{label}</BodyShort>}
            </CalendarLabel>
        </button>
    );
};

const getFamiliehendelseKalendarLabel = (barn: Barn): LegendLabel => {
    if (!isAdoptertBarn(barn)) {
        return isFødtBarn(barn) ? 'FØDSEL' : 'TERMIN';
    }
    return 'ADOPSJON';
};
