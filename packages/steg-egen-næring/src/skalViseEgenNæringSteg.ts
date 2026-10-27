import dayjs from 'dayjs';

import { AppName, NæringDto } from '@navikt/fp-types';
import { isValidDateString } from '@navikt/fp-validation';

type SkalViseEgenNæringStegParams = {
    harJobbetSomSelvstendigNæringsdrivende: boolean;
    harRegistrertNæring: boolean;
    egenNæring?: NæringDto;
    erPåEgenNæringSteg?: boolean;
};

export const skalViseEgenNæringSteg = ({
    harJobbetSomSelvstendigNæringsdrivende,
    harRegistrertNæring,
    egenNæring,
    erPåEgenNæringSteg = false,
}: SkalViseEgenNæringStegParams): boolean =>
    harJobbetSomSelvstendigNæringsdrivende && (harRegistrertNæring || egenNæring === undefined || erPåEgenNæringSteg);

export const erSluttdatoForGammel = (tom: string | undefined, appOrigin: AppName): boolean => {
    if (!tom || !isValidDateString(tom)) {
        return false;
    }
    const maksMånederSiden = appOrigin === 'svangerskapspengesoknad' ? 5 : 13;
    return dayjs(tom).startOf('day').isBefore(dayjs().startOf('day').subtract(maksMånederSiden, 'month'), 'day');
};

export const erEgenNæringAktiv = (egenNæring: NæringDto | undefined, appOrigin: AppName): boolean => {
    if (!egenNæring) {
        return false;
    }
    return !erSluttdatoForGammel(egenNæring.tom, appOrigin);
};
