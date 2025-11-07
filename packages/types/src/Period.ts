import { PeriodeColor } from '@navikt/fp-constants';

import { LegendLabel } from './LegendLabel';

export type Period = {
    fom: string;
    tom: string;
    color: PeriodeColor;
    srText?: string;
    isSelected?: boolean;
    legendLabel: LegendLabel;
};
