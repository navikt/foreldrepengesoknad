import { ForeldreInfo } from '../types/ForeldreInfo';
import { lagPerioderUtenUttak, lagTapteDagerPerioder } from './lagHullPerioder';

const DEFAULT_FORELDRE_INFO = {
    søker: 'MOR',
    rettighetType: 'BEGGE_RETT',
    navnPåForeldre: {
        mor: 'Olga Utvikler',
        farMedmor: 'Espen Utvikler',
    },
    erMedmorDelAvSøknaden: false,
} satisfies ForeldreInfo;

describe('lagHullPerioder', () => {
    it('skal legge til hull i seksukersperioden etter familiehendelsesdato for mor ved fødsel', () => {
        const familiehendelsedato = '2025-03-26';

        const perioder = [
            {
                fom: '2025-03-26',
                tom: '2025-04-10',
            },
        ];

        const perioderMedHull = lagTapteDagerPerioder(perioder, familiehendelsedato, 'fødsel', DEFAULT_FORELDRE_INFO);

        expect(perioderMedHull).toEqual([
            {
                fom: '2025-04-11',
                tom: '2025-05-06',
                forelder: 'MOR',
                type: 'TAPTE_DAGER',
            },
        ]);
    });

    it('skal legge til flere hull i seksukersperioden etter familiehendelsesdato for mor ved fødsel', () => {
        const familiehendelsedato = '2025-03-26';

        const perioder = [
            {
                fom: '2025-03-26',
                tom: '2025-04-10',
            },
            {
                fom: '2025-04-14',
                tom: '2025-04-18',
            },
        ];

        const perioderMedHull = lagTapteDagerPerioder(perioder, familiehendelsedato, 'fødsel', DEFAULT_FORELDRE_INFO);

        expect(perioderMedHull).toEqual([
            {
                fom: '2025-04-11',
                tom: '2025-04-11',
                forelder: 'MOR',
                type: 'TAPTE_DAGER',
            },
            {
                fom: '2025-04-21',
                tom: '2025-05-06',
                forelder: 'MOR',
                type: 'TAPTE_DAGER',
            },
        ]);
    });

    it('skal ikke legge til hull i seksukersperioden etter familiehendelsesdato for mor ved adopsjon', () => {
        const familiehendelsedato = '2025-03-26';

        const perioder = [
            {
                fom: '2025-03-26',
                tom: '2025-04-10',
            },
        ];

        const perioderMedHull = lagTapteDagerPerioder(perioder, familiehendelsedato, 'adopsjon', DEFAULT_FORELDRE_INFO);

        expect(perioderMedHull).toEqual([]);
    });

    it('skal ikke legge til hull etter seksukersperioden', () => {
        const familiehendelsedato = '2025-03-26';

        const perioder = [
            {
                fom: '2025-03-26',
                tom: '2025-06-10',
            },
        ];

        const perioderMedHull = lagTapteDagerPerioder(perioder, familiehendelsedato, 'fødsel', DEFAULT_FORELDRE_INFO);

        expect(perioderMedHull).toEqual([]);
    });

    it('skal legge til hull etter seksukersperioden og før første periode for kun far har rett ved fødsel', () => {
        const familiehendelsedato = '2025-03-26';

        const perioder = [
            {
                fom: '2025-08-11',
                tom: '2025-08-20',
            },
        ];

        const foreldreInfo = {
            ...DEFAULT_FORELDRE_INFO,
            søker: 'FAR_MEDMOR',
            rettighetType: 'BARE_SØKER_RETT',
        } satisfies ForeldreInfo;

        const perioderMedHull = lagTapteDagerPerioder(perioder, familiehendelsedato, 'fødsel', foreldreInfo);

        expect(perioderMedHull).toEqual([
            {
                fom: '2025-05-07',
                tom: '2025-08-08',
                forelder: 'FAR_MEDMOR',
                type: 'TAPTE_DAGER',
            },
        ]);
    });

    it('skal legge til hull fra omsorgsovertakelse og til første periode for kun far har rett ved adopsjon', () => {
        const familiehendelsedato = '2025-03-26';

        const perioder = [
            {
                fom: '2025-08-11',
                tom: '2025-08-20',
            },
        ];

        const foreldreInfo = {
            ...DEFAULT_FORELDRE_INFO,
            søker: 'FAR_MEDMOR',
            rettighetType: 'BARE_SØKER_RETT',
        } satisfies ForeldreInfo;

        const perioderMedHull = lagTapteDagerPerioder(perioder, familiehendelsedato, 'adopsjon', foreldreInfo);

        expect(perioderMedHull).toEqual([
            {
                fom: '2025-03-26',
                tom: '2025-08-08',
                forelder: 'FAR_MEDMOR',
                type: 'TAPTE_DAGER',
            },
        ]);
    });

    it('skal ikke se på perioder som er avsluttet før familiehendelsesdato når en setter inn hull for far', () => {
        const familiehendelsedato = '2025-03-26';

        const perioder = [
            {
                fom: '2025-03-10',
                tom: '2025-03-25',
            },
            {
                fom: '2025-08-11',
                tom: '2025-08-20',
            },
        ];

        const foreldreInfo = {
            ...DEFAULT_FORELDRE_INFO,
            søker: 'FAR_MEDMOR',
            rettighetType: 'BARE_SØKER_RETT',
        } satisfies ForeldreInfo;

        const perioderMedHull = lagTapteDagerPerioder(perioder, familiehendelsedato, 'adopsjon', foreldreInfo);

        expect(perioderMedHull).toEqual([
            {
                fom: '2025-03-26',
                tom: '2025-08-08',
                forelder: 'FAR_MEDMOR',
                type: 'TAPTE_DAGER',
            },
        ]);
    });

    it('skal vise korrekt hull når en har en periode som går over familiehendelsesdato', () => {
        const familiehendelsedato = '2025-03-26';

        const perioder = [
            {
                fom: '2025-03-10',
                tom: '2025-03-28',
            },
            {
                fom: '2025-08-11',
                tom: '2025-08-20',
            },
        ];

        const foreldreInfo = {
            ...DEFAULT_FORELDRE_INFO,
            søker: 'FAR_MEDMOR',
            rettighetType: 'BARE_SØKER_RETT',
        } satisfies ForeldreInfo;

        const perioderMedHull = lagTapteDagerPerioder(perioder, familiehendelsedato, 'adopsjon', foreldreInfo);

        expect(perioderMedHull).toEqual([
            {
                fom: '2025-03-31',
                tom: '2025-08-08',
                forelder: 'FAR_MEDMOR',
                type: 'TAPTE_DAGER',
            },
        ]);
    });

    it('skal lage et hull der familiehendelse er en helgedag', () => {
        const familiehendelsedatoLørdag = '2026-01-24';

        const perioder = [
            {
                fom: '2026-01-30',
                tom: '2026-02-02',
            },
        ];

        const perioderUtenUttak = lagTapteDagerPerioder(
            perioder,
            familiehendelsedatoLørdag,
            'fødsel',
            DEFAULT_FORELDRE_INFO,
        );

        expect(perioderUtenUttak).toEqual([
            {
                fom: '2026-01-26',
                forelder: 'MOR',
                tom: '2026-01-29',
                type: 'TAPTE_DAGER',
            },
            {
                fom: '2026-02-03',
                forelder: 'MOR',
                tom: '2026-03-06',
                type: 'TAPTE_DAGER',
            },
        ]);
    });

    it('skal legge til perioder uten uttak i hullene mellom perioder', () => {
        const familiehendelsedato = '2025-03-20';

        const perioder = [
            {
                fom: '2025-03-26',
                tom: '2025-04-10',
            },
            {
                fom: '2025-04-21',
                tom: '2025-04-30',
            },
            {
                fom: '2025-07-25',
                tom: '2025-08-11',
            },
        ];

        const perioderUtenUttak = lagPerioderUtenUttak(perioder, familiehendelsedato);

        expect(perioderUtenUttak).toEqual([
            {
                fom: '2025-03-21',
                tom: '2025-03-25',
                type: 'PERIODE_UTEN_UTTAK',
            },
            {
                fom: '2025-04-11',
                tom: '2025-04-18',
                type: 'PERIODE_UTEN_UTTAK',
            },
            {
                fom: '2025-05-01',
                tom: '2025-07-24',
                type: 'PERIODE_UTEN_UTTAK',
            },
        ]);
    });

    it('skal lage to perioder uten uttak om familiehendelsesdato er i hullet mellom ekisterende perioder', () => {
        const familiehendelsedato = '2025-03-20';

        const perioder = [
            {
                fom: '2025-03-01',
                tom: '2025-03-11',
            },
            {
                fom: '2025-04-19',
                tom: '2025-04-30',
            },
        ];

        const perioderUtenUttak = lagPerioderUtenUttak(perioder, familiehendelsedato);

        expect(perioderUtenUttak).toEqual([
            {
                fom: '2025-03-12',
                tom: '2025-03-19',
                type: 'PERIODE_UTEN_UTTAK',
            },
            {
                fom: '2025-03-21',
                tom: '2025-04-18',
                type: 'PERIODE_UTEN_UTTAK',
            },
        ]);
    });

    it('skal ikke lage perioder uten uttak i helg', () => {
        const familiehendelsedato = '2025-03-21';

        const perioder = [
            {
                fom: '2025-03-24',
                tom: '2025-03-28',
            },
            {
                fom: '2025-03-31',
                tom: '2025-04-02',
            },
        ];

        const perioderUtenUttak = lagPerioderUtenUttak(perioder, familiehendelsedato);

        expect(perioderUtenUttak).toEqual([]);
    });

    it('skal lage periode uten uttak der familiehendelse er en helgedag', () => {
        const familiehendelsedatoLørdag = '2026-01-24';

        const perioder = [
            {
                fom: '2026-01-24',
                tom: '2026-01-25',
            },
            {
                fom: '2026-01-30',
                tom: '2026-02-02',
            },
        ];

        const perioderUtenUttak = lagPerioderUtenUttak(perioder, familiehendelsedatoLørdag);

        expect(perioderUtenUttak).toEqual([
            {
                fom: '2026-01-26',
                tom: '2026-01-29',
                type: 'PERIODE_UTEN_UTTAK',
            },
        ]);
    });
});
