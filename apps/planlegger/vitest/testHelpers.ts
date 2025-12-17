import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Hjelpefunksjon for å endre fordeling med slider i tester
 * @param utils - Render utilities fra testing-library
 * @param ønsketAntallDager - Antall dager som skal settes på slideren
 */
export const endreFordelingMedSlider = async (utils: ReturnType<typeof render>, ønsketAntallDager: number) => {
    const slider = utils.getByRole('slider', {
        name: /Hvordan vil dere fordele 16 uker med fellesperiode\?/i,
    });
    await userEvent.click(slider);
    const nåverdi = Number(slider.getAttribute('aria-valuenow') ?? 0);
    const diff = ønsketAntallDager - nåverdi;
    const steg = Math.abs(diff) / 5;
    const key = diff >= 0 ? '{ArrowRight}' : '{ArrowLeft}';
    for (let i = 0; i < steg; i += 1) {
        await userEvent.keyboard(key);
    }
};
