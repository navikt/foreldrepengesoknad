import dayjs from 'dayjs';

import { Tidslinjehendelse2 } from '../types/Tidslinjehendelse.ts';
import { finnesDetFremtidigeTidslinjehendelser } from './tidslinjeUtils.ts';

const lagHendelse = (
    opprettet: string,
    utvidetTidslinjeHendelseType: Tidslinjehendelse2['utvidetTidslinjeHendelseType'] = 'FØRSTEGANGSSØKNAD',
): Tidslinjehendelse2 => ({
    opprettet,
    utvidetTidslinjeHendelseType,
    aktørType: 'BRUKER',
    dokumenter: [],
});

describe('finnesDetFremtidigeTidslinjehendelser', () => {
    it('skal returnere false når alle hendelser er tilbake i tid', () => {
        const hendelser = [
            lagHendelse(dayjs().subtract(2, 'y').toISOString()),
            lagHendelse(dayjs().subtract(1, 'y').toISOString()),
        ];

        expect(finnesDetFremtidigeTidslinjehendelser(hendelser)).toBe(false);
    });

    it('skal returnere true når minst én hendelse er frem i tid, f.eks. barnet fyller 3 år', () => {
        const hendelser = [
            lagHendelse(dayjs().subtract(1, 'y').toISOString()),
            lagHendelse(dayjs().add(1, 'y').toISOString(), 'BARNET_TRE_ÅR'),
        ];

        expect(finnesDetFremtidigeTidslinjehendelser(hendelser)).toBe(true);
    });

    it('skal returnere false for tom liste', () => {
        expect(finnesDetFremtidigeTidslinjehendelser([])).toBe(false);
    });
});
