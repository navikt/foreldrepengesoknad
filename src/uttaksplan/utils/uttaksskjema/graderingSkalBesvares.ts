import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const graderingSkalBesvares = (periodetype: Periodetype, konto: StønadskontoType): boolean => {
    if (periodetype === Periodetype.Uttak && konto !== StønadskontoType.ForeldrepengerFørFødsel) {
        return true;
    }

    return false;
};
