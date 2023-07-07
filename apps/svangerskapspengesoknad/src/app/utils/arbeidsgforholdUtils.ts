import Arbeidsforhold from 'app/types/Arbeidsforhold';
import dayjs from 'dayjs';

export const getAktiveArbeidsforhold = (arbeidsforhold: Arbeidsforhold[], termindato?: Date): Arbeidsforhold[] => {
    if (termindato === undefined) {
        return arbeidsforhold;
    }

    return arbeidsforhold.filter((arb) =>
        arb.tom ? dayjs(arb.tom).isSameOrAfter(dayjs(termindato).subtract(9, 'months')) : true
    );
};
