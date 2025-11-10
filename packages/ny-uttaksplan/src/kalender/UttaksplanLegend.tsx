import { ReactNode } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack } from '@navikt/ds-react';

import { CalendarLabel, CalendarPeriodColor } from '@navikt/fp-ui';
import { getLocaleFromSessionStorage, getNavnGenitivEierform } from '@navikt/fp-utils';

import { LegendLabel } from '../types/LegendLabel';
import { UttaksplanKalenderLegendInfo } from '../types/UttaksplanKalenderLegendInfo';

const getCalendarLabel = (
    label: LegendLabel,
    navnAnnenPart: string,
    erFarEllerMedmor: boolean,
    intl: IntlShape,
): ReactNode => {
    switch (label) {
        case 'HELG':
            return intl.formatMessage({ id: 'kalender.helg' });
        case 'FERIE':
            return intl.formatMessage({ id: 'kalender.ferie' });
        case 'TERMIN':
            return intl.formatMessage({ id: 'kalender.termin' });
        case 'FØDSEL':
            return intl.formatMessage({ id: 'kalender.fødsel' });
        case 'ADOPSJON':
            return intl.formatMessage({ id: 'kalender.adopsjon' });
        case 'BARNEHAGEPLASS':
            return intl.formatMessage({ id: 'kalender.barnehageplass' });
        case 'MORS_DEL':
            return erFarEllerMedmor
                ? intl.formatMessage(
                      { id: 'kalender.annenPartPeriode' },
                      { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
                  )
                : intl.formatMessage({ id: 'kalender.dinPeriode' });
        case 'FARS_DEL':
            return erFarEllerMedmor
                ? intl.formatMessage({ id: 'kalender.dinPeriode' })
                : intl.formatMessage(
                      { id: 'kalender.annenPartPeriode' },
                      { navnAnnenPart: getNavnGenitivEierform(navnAnnenPart, getLocaleFromSessionStorage()) },
                  );
        case 'TAPTE_DAGER':
            return intl.formatMessage({ id: 'kalender.tapteDager' });
        default:
            return label;
    }
};

interface Props {
    navnAnnenPart: string;
    erFarEllerMedmor: boolean;
    selectLegend: (color: CalendarPeriodColor) => void;
    legendInfo: UttaksplanKalenderLegendInfo[];
}

export const UttaksplanLegend = ({ navnAnnenPart, erFarEllerMedmor, selectLegend, legendInfo }: Props) => {
    const intl = useIntl();

    return (
        <HStack gap="space-16" align="center">
            {legendInfo
                .filter((info) => info.color !== 'NONE')
                .map((info) => (
                    <button
                        key={info.color}
                        onClick={
                            info.color !== 'PINK' && info.color !== 'PURPLE' && info.color !== 'BLACKOUTLINE'
                                ? () => selectLegend(info.color)
                                : undefined
                        }
                        type="button"
                        className="inline-block w-fit cursor-pointer pb-[0.46rem] pr-2 [all:unset]"
                    >
                        <CalendarLabel color={info.color}>
                            <BodyShort style={{ whiteSpace: 'nowrap' }}>
                                {getCalendarLabel(info.label, navnAnnenPart, erFarEllerMedmor, intl)}
                            </BodyShort>
                        </CalendarLabel>
                    </button>
                ))}
        </HStack>
    );
};
