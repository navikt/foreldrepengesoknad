import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getValgtStønadskontoFor80Og100Prosent } from './stønadskontoUtils';
import MockDate from 'mockdate';

describe('<stønadskontoUtils>', () => {
    const kontoer80 = {
        kontoer: {
            [StønadskontoType.Mødrekvote]: 65,
            [StønadskontoType.Fedrekvote]: 55,
        },
    } as TilgjengeligeStønadskontoerDTO;
    const kontoer100 = {
        kontoer: {
            [StønadskontoType.Mødrekvote]: 60,
            [StønadskontoType.Fedrekvote]: 50,
        },
    } as TilgjengeligeStønadskontoerDTO;

    it('skal filtrere bort flerbarnsdager og returnere dager for mødre- og fedre-kvote', () => {
        const familiehendelsesdato = '2021-01-01';
        const erMorUfør = false;

        const valgteStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
            kontoer80,
            kontoer100,
            familiehendelsesdato,
            erMorUfør
        );

        expect(valgteStønadskontoer[Dekningsgrad.HUNDRE_PROSENT]).toStrictEqual([
            {
                konto: StønadskontoType.Mødrekvote,
                dager: 60,
            },
            {
                konto: StønadskontoType.Fedrekvote,
                dager: 50,
            },
        ]);
        expect(valgteStønadskontoer[Dekningsgrad.ÅTTI_PROSENT]).toStrictEqual([
            {
                konto: StønadskontoType.Mødrekvote,
                dager: 65,
            },
            {
                konto: StønadskontoType.Fedrekvote,
                dager: 55,
            },
        ]);
    });

    it('skal opprette aktivitetsfrikonto med 15 uker når mor er ufør', () => {
        const familiehendelsesdato = '2021-01-01';
        const erMorUfør = true;

        const valgteStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
            kontoer80,
            kontoer100,
            familiehendelsesdato,
            erMorUfør
        );

        expect(valgteStønadskontoer[Dekningsgrad.HUNDRE_PROSENT]).toStrictEqual([
            {
                konto: StønadskontoType.Mødrekvote,
                dager: -15,
            },
            {
                konto: StønadskontoType.AktivitetsfriKvote,
                dager: 75,
            },
        ]);
        expect(valgteStønadskontoer[Dekningsgrad.ÅTTI_PROSENT]).toStrictEqual([
            {
                konto: StønadskontoType.Mødrekvote,
                dager: -30,
            },
            {
                konto: StønadskontoType.AktivitetsfriKvote,
                dager: 95,
            },
        ]);
    });

    describe('stønadskontoUtils - etter  WLB', () => {
        beforeAll(() => {
            MockDate.set('2022-08-02');
        });

        afterAll(() => {
            MockDate.reset();
        });
        it('skal opprette aktivitetsfrikonto på 8 uker når mor ikke ufør men WLB regler gjelder', () => {
            const familiehendelsesdato = '2022-08-02';
            const erMorUfør = false;

            const valgteStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
                kontoer80,
                kontoer100,
                familiehendelsesdato,
                erMorUfør
            );

            expect(valgteStønadskontoer[Dekningsgrad.HUNDRE_PROSENT]).toContainEqual({
                konto: StønadskontoType.AktivitetsfriKvote,
                dager: 40,
            });
            expect(valgteStønadskontoer[Dekningsgrad.ÅTTI_PROSENT]).toContainEqual({
                konto: StønadskontoType.AktivitetsfriKvote,
                dager: 40,
            });
        });
        it('skal ikke opprette noe aktivitetsfrikonto når mor ikke ufør og WLB regler ikke gjelder', () => {
            const familiehendelsesdato = '2022-08-01';
            const erMorUfør = false;

            const valgteStønadskontoer = getValgtStønadskontoFor80Og100Prosent(
                kontoer80,
                kontoer100,
                familiehendelsesdato,
                erMorUfør
            );

            expect(valgteStønadskontoer[Dekningsgrad.HUNDRE_PROSENT]).not.toContainEqual({
                konto: StønadskontoType.AktivitetsfriKvote,
                dager: 40,
            });
            expect(valgteStønadskontoer[Dekningsgrad.ÅTTI_PROSENT]).not.toContainEqual({
                konto: StønadskontoType.AktivitetsfriKvote,
                dager: 40,
            });
            expect(valgteStønadskontoer[Dekningsgrad.HUNDRE_PROSENT]).not.toContainEqual({
                konto: StønadskontoType.AktivitetsfriKvote,
                dager: 75,
            });
            expect(valgteStønadskontoer[Dekningsgrad.ÅTTI_PROSENT]).not.toContainEqual({
                konto: StønadskontoType.AktivitetsfriKvote,
                dager: 95,
            });
        });
    });
});
