import { Dictionary } from 'lodash';
import { IntlShape } from 'react-intl';

import { UttaksplanAvvikType } from '../utils/types/UttaksplanAvvikType';

type VeilederMessageType = 'normal' | 'info' | 'advarsel' | 'feil';

export interface VeilederMessage {
    contentIntlKey: string;
    type: VeilederMessageType;
    formatContentAsHTML?: boolean;
    titleIntlKey?: string;
    values?: Record<string, string | number | Date | undefined | ((intl: IntlShape) => string)>;
    periodeId?: string;
    skjulesIOppsummering?: boolean;
    avvikType?: UttaksplanAvvikType;
}

export type VeiledermeldingerPerPeriode = Dictionary<VeilederMessage[]>;
