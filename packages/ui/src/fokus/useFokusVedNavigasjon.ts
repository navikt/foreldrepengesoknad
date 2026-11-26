import { useEffect, useRef } from 'react';

let sistFokuserteBesøk: string | undefined;

type Historikktilstand = { key?: string } | null;

// Tilbake/fram gjenoppretter en tidligere history-key, så besøket må glemmes for at overskriften skal fokuseres igjen.
// Fragmentnavigering (f.eks. lenker i feiloppsummeringen) gir oppføringer uten key og skal ikke regnes som nytt besøk.
window.addEventListener('popstate', (event: PopStateEvent) => {
    if ((event.state as Historikktilstand)?.key !== undefined) {
        sistFokuserteBesøk = undefined;
    }
});

// Skiller innlasting (også automatisk navigering til mellomlagret steg) fra navigering brukeren har utløst.
const harBrukerenSamhandletMedSiden = () =>
    (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive ?? false;

// React Router gir hver historikkoppføring en egen key. Med den skilles et nytt besøk på samme side fra en remount.
const historikkNøkkel = () => (history.state as Historikktilstand)?.key ?? '';

/**
 * Flytter fokus til overskriften med ref-en når brukeren har navigert til en ny side eller et nytt steg (WCAG 2.4.3).
 * `nøkkel` identifiserer siden. Er den undefined, eller overskriften ikke rendret ennå, venter hooken.
 */
export const useFokusVedNavigasjon = <T extends HTMLElement>(nøkkel: string | undefined) => {
    const ref = useRef<T>(null);

    // Uten avhengigheter slik at overskrifter som rendres etter lasting også fanges opp.
    useEffect(() => {
        const element = ref.current;
        if (!element || nøkkel === undefined) {
            return;
        }
        const oppføringsnøkkel = historikkNøkkel();
        const besøk = `${nøkkel}|${oppføringsnøkkel}`;
        if (besøk === sistFokuserteBesøk || (oppføringsnøkkel === '' && sistFokuserteBesøk?.startsWith(`${nøkkel}|`))) {
            return;
        }
        sistFokuserteBesøk = besøk;

        if (!harBrukerenSamhandletMedSiden()) {
            return;
        }

        element.setAttribute('tabindex', '-1');
        element.focus();
    });

    return ref;
};
