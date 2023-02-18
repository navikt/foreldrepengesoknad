import { Dictionary } from 'lodash';
import { UttaksplanAvvikType } from '../utils/types/UttaksplanAvvikType';

export type VeilederMessageType = 'normal' | 'info' | 'advarsel' | 'feil';

export interface VeilederMessage {
    contentIntlKey: string;
    type: VeilederMessageType;
    formatContentAsHTML?: boolean;
    titleIntlKey?: string;
    values?: any;
    periodeId?: string;
    skjulesIOppsummering?: boolean;
    avvikType?: UttaksplanAvvikType;
}

export type VeiledermeldingerPerPeriode = Dictionary<VeilederMessage[]>;
