import { MinusCircleIcon, PlusCircleIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Tooltip, VStack } from '@navikt/ds-react';

import { CalendarLabel, CalendarPeriodColor } from '@navikt/fp-ui';

import { LegendLabel } from '../../types/LegendLabel';
import { UttaksplanKalenderLegendInfo } from '../../types/UttaksplanKalenderLegendInfo';
import { CalendarPeriodWithLabel } from '../utils/usePerioderForKalendervisning.ts';
import { useUttaksplanData } from './../../context/UttaksplanDataContext.tsx';
import {
    getCalendarLabel,
    getFocusStyle,
    getInneholderKalenderHelgedager,
    getSelectableStyle,
    getSelectedStyle,
    sortLegendInfoByLabel,
} from './uttaksplanLegendUtils.ts';

const unselectableColors = ['PINK', 'PURPLE', 'BLACKOUTLINE', 'GRAY'] satisfies CalendarPeriodColor[];

interface Props {
    perioderForKalendervisning: CalendarPeriodWithLabel[];
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

    // TODO (TOR) vil ikkje kalender alltid inkludere helg?
    const inkludererHelg = getInneholderKalenderHelgedager(perioderForKalendervisning);

    const unikeLegendLabels = [...new Set(perioderForKalendervisning.map((period) => period.legendLabel))];
    const unikeLegendColors = [...new Set(perioderForKalendervisning.map((period) => period.color))];

    const legendInfo: UttaksplanKalenderLegendInfo[] = unikeLegendColors.map((color) => ({
        color,
        label:
            unikeLegendLabels.find((label) =>
                perioderForKalendervisning.some((p) => p.color === color && p.legendLabel === label),
            ) ?? 'NO_LABEL',
    }));

    if (inkludererHelg) {
        legendInfo.push({
            color: 'GRAY',
            label: 'HELG',
        });
    }

    const sortedLegends = legendInfo.toSorted(sortLegendInfoByLabel);

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
                .filter((info) => info.color !== 'NONE')
                .map((info) => (
                    <LabelButtonMedEllerUtenToolip
                        key={info.color}
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

    const { modus, erDeltUttak, erFarEllerMedmor, navnPåForeldre, erMedmorDelAvSøknaden, valgtStønadskonto } =
        useUttaksplanData();

    const harAktivitetsfriKvote = valgtStønadskonto.kontoer.some((k) => k.konto === 'AKTIVITETSFRI_KVOTE');

    const navnAnnenPart = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    const label = getCalendarLabel(
        info.label,
        navnAnnenPart,
        erFarEllerMedmor,
        modus === 'planlegger',
        erDeltUttak,
        erMedmorDelAvSøknaden,
        harAktivitetsfriKvote,
        intl,
    );

    if (visTekst) {
        return (
            <LabelButton
                key={info.color}
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
                    key={info.color}
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

    const erKlikkbar = !!selectLegend && !unselectableColors.some((color) => color === info.color) && !readOnly;

    return (
        <button
            type="button"
            key={info.color}
            onClick={
                erKlikkbar
                    ? () => {
                          selectLegend(info.color);
                          setSelectedLabel(selectedLabel === info.label ? undefined : info.label);
                      }
                    : undefined
            }
            className={
                `rounded-sm ${getSelectableStyle(!unselectableColors.some((color) => color === info.color) && !readOnly)}` +
                ` ${getFocusStyle(info.color)} ${getSelectedStyle(selectedLabel === info.label, info.color)} `
            }
            tabIndex={!unselectableColors.some((color) => color === info.color) && !readOnly ? 0 : -1}
            disabled={!erKlikkbar}
        >
            <CalendarLabel color={info.color}>
                {visTekst && <BodyShort style={{ whiteSpace: 'nowrap' }}>{label}</BodyShort>}
            </CalendarLabel>
        </button>
    );
};
