import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const graderingSkalBesvares = (
    periodetype: Periodetype,
    konto: StønadskontoType,
    familiehendelsesdato: Date,
    erFarMedmor: boolean,
    morErForSyk: boolean | undefined
): boolean => {
    const farMedmorSøkerDeFørsteSeksUkeneFørWLBOgMorErIkkeSyk =
        !andreAugust2022ReglerGjelder(familiehendelsesdato) && erFarMedmor && morErForSyk === false;

    if (
        periodetype === Periodetype.Uttak &&
        konto !== StønadskontoType.ForeldrepengerFørFødsel &&
        !farMedmorSøkerDeFørsteSeksUkeneFørWLBOgMorErIkkeSyk
    ) {
        return true;
    }
    return false;
};
