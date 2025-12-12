import { CalendarPeriodColor } from '@navikt/fp-ui';

import { LegendLabel } from './LegendLabel';

export type UttaksplanKalenderLegendInfo = {
    color: CalendarPeriodColor;
    label: LegendLabel;
    srText: string;
};
