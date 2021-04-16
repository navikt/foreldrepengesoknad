import { OverføringÅrsakType } from '../../types/uttaksplan/periodetyper';
import { Skjemanummer } from '../../types/søknad/Søknad';

export const getOverføringÅrsakSkjemanummer = (årsak: OverføringÅrsakType): Skjemanummer => {
    switch (årsak) {
        case OverføringÅrsakType.institusjonsoppholdAnnenForelder:
            return Skjemanummer.DOK_INNLEGGELSE;
        case OverføringÅrsakType.sykdomAnnenForelder:
            return Skjemanummer.DOK_OVERFØRING_FOR_SYK;
        default:
            return Skjemanummer.ANNET;
    }
};
