import { AnnenForelder } from '../types';
import { getErMorUfør } from './annenForelderUtils';

describe('annenForelderUtils', () => {
    it('skal returnere true når søker er far eller medmor og mor er ufør', () => {
        const annenForelder = {
            kanIkkeOppgis: false,
            erMorUfør: true,
        } as AnnenForelder;
        const erFarEllerMedmor = true;

        const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);

        expect(erMorUfør).toBe(true);
    });

    it('skal returnere false når søker er mor', () => {
        const annenForelder = {
            kanIkkeOppgis: false,
            erMorUfør: true,
        } as AnnenForelder;
        const erFarEllerMedmor = false;

        const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);

        expect(erMorUfør).toBe(false);
    });

    it('skal returnere false når søker er far eller medmor men mor er arbeidsdyktig', () => {
        const annenForelder = {
            kanIkkeOppgis: false,
            erMorUfør: false,
        } as AnnenForelder;
        const erFarEllerMedmor = true;

        const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);

        expect(erMorUfør).toBe(false);
    });

    it('skal returnere false når annen forelder ikke er oppgitt', () => {
        const annenForelder = {
            kanIkkeOppgis: true,
        } as AnnenForelder;
        const erFarEllerMedmor = true;

        const erMorUfør = getErMorUfør(annenForelder, erFarEllerMedmor);

        expect(erMorUfør).toBe(false);
    });
});
