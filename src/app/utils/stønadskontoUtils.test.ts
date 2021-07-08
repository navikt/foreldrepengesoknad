import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { TilgjengeligeStønadskontoerDTO } from 'app/types/TilgjengeligeStønadskontoerDTO';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getValgtStønadskontoFor80Og100Prosent } from './stønadskontoUtils';

describe('<stønadskontoUtils>', () => {
    const kontoer80 = {
        kontoer: {
            [StønadskontoType.Mødrekvote]: 65,
            [StønadskontoType.Fedrekvote]: 55,
            [StønadskontoType.Flerbarnsdager]: 45,
        },
    } as TilgjengeligeStønadskontoerDTO;
    const kontoer100 = {
        kontoer: {
            [StønadskontoType.Mødrekvote]: 60,
            [StønadskontoType.Fedrekvote]: 50,
            [StønadskontoType.Flerbarnsdager]: 40,
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

    it('skal opprette aktivitetsfrikonto når mor er ufør', () => {
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
});
