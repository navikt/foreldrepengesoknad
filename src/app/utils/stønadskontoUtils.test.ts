import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { MinsterettType } from 'uttaksplan/types/MinsterettType';
import { getValgtStønadskontoFor80Og100Prosent } from './stønadskontoUtils';

describe('<stønadskontoUtils>', () => {
    const minsteretter0 = {
        [MinsterettType.farRundtFødsel]: 0,
        [MinsterettType.generellMinsterett]: 0,
    };

    const minsteretter10_75 = {
        [MinsterettType.farRundtFødsel]: 10,
        [MinsterettType.generellMinsterett]: 75,
    };

    const kontoer80 = {
        kontoer: {
            [StønadskontoType.Mødrekvote]: 65,
            [StønadskontoType.Fedrekvote]: 55,
        },
        minsteretter: minsteretter0,
    } as TilgjengeligeStønadskontoerDTO;

    const kontoer100 = {
        kontoer: {
            [StønadskontoType.Mødrekvote]: 60,
            [StønadskontoType.Fedrekvote]: 50,
        },
        minsteretter: minsteretter0,
    } as TilgjengeligeStønadskontoerDTO;

    const kontoer80_10_75 = {
        kontoer: kontoer80.kontoer,
        minsteretter: minsteretter10_75,
    } as TilgjengeligeStønadskontoerDTO;

    const kontoer100_10_75 = {
        kontoer: kontoer100.kontoer,
        minsteretter: minsteretter10_75,
    } as TilgjengeligeStønadskontoerDTO;

    it('skal filtrere bort flerbarnsdager og returnere dager for mødre- og fedre-kvote', () => {
        const valgteStønadskontoer = getValgtStønadskontoFor80Og100Prosent(kontoer80, kontoer100);

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

    it('skal opprette aktivitetsfrikonto med 15 uker', () => {
        const valgteStønadskontoer = getValgtStønadskontoFor80Og100Prosent(kontoer80_10_75, kontoer100_10_75);

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
                dager: -10,
            },
            {
                konto: StønadskontoType.AktivitetsfriKvote,
                dager: 75,
            },
        ]);
    });
});
