import { NæringDto } from '@navikt/fp-types';

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
