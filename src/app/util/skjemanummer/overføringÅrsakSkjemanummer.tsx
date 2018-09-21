import { OverføringÅrsakType } from '../../types/uttaksplan/periodetyper';
import { Skjemanummer } from '../../types/s\u00F8knad/S\u00F8knad';

export const getOverføringÅrsakSkjemanummer = (årsak: OverføringÅrsakType): Skjemanummer => {
    switch (årsak) {
        case OverføringÅrsakType.insititusjonsoppholdAnnenForelder:
            return Skjemanummer.DOK_INNLEGGELSE;
        case OverføringÅrsakType.sykdomAnnenForelder:
            return Skjemanummer.DOK_OVERFØRING_FOR_SYK;
        default:
            return Skjemanummer.ANNET;
    }
};
