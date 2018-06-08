import { SøkerRolle } from './Søknad';

export interface Søker {
    søkerRolle: SøkerRolle;
    erSelvstendigNæringsdrivende: boolean;
    erFrilanser: boolean;
    erAleneOmOmsorg: boolean;
}

export type SøkerPartial = Partial<Søker>;

export default Søker;
