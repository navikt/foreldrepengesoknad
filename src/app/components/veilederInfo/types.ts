import { Dictionary } from 'lodash';
import { AvvikType } from 'app/regler/uttaksplanValidering/types';

export type VeilederMessageType = 'normal' | 'info' | 'advarsel' | 'feil';

export interface VeilederMessage {
    contentIntlKey: string;
    type: VeilederMessageType;
    formatContentAsHTML?: boolean;
    titleIntlKey?: string;
    values?: any;
    periodeId?: string;
    skjulesIOppsummering?: boolean;
    avvikType?: AvvikType;
}

export type VeiledermeldingerPerPeriode = Dictionary<VeilederMessage[]>;
