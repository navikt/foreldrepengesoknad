import { Dictionary } from 'lodash';

export type VeilederMessageType = 'normal' | 'info' | 'advarsel' | 'feil';

export interface VeilederMessage {
    contentIntlKey: string;
    type: VeilederMessageType;
    formatContentAsHTML?: boolean;
    titleIntlKey?: string;
    values?: any;
    periodeId?: string;
}

export type VeiledermeldingerPerPeriode = Dictionary<VeilederMessage[]>;
