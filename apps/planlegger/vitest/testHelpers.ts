import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Hjelpefunksjon for å endre fordeling med slider i tester
 * @param utils - Render utilities fra testing-library
 * @param ønsketAntallDager - Antall dager som skal settes for søker 1 (antallDagerSøker1)
 *
 * Merk: Slideren er invertert - slider-verdi = total - antallDagerSøker1
 * Slider til venstre = søker 1 får mange uker
 * Slider til høyre = søker 2 får mange uker
 */
export const endreFordelingMedSlider = async (utils: ReturnType<typeof render>, ønsketAntallDager: number) => {
    const slider = utils.getByRole('slider', {
        name: /Hvordan vil dere fordele 16 uker med fellesperiode\?/i,
    });
    await userEvent.click(slider);
    const max = Number(slider.getAttribute('aria-valuemax') ?? 80);
    const nåSliderVerdi = Number(slider.getAttribute('aria-valuenow') ?? 0);
    const ønsketSliderVerdi = max - ønsketAntallDager;
    const diff = ønsketSliderVerdi - nåSliderVerdi;
    const steg = Math.abs(diff) / 5;
    const key = diff >= 0 ? '{ArrowRight}' : '{ArrowLeft}';
    for (let i = 0; i < steg; i += 1) {
        await userEvent.keyboard(key);
    }
};
