import { useEffect, useRef } from 'react';

let sistFokuserteBesøk: string | undefined;

// Skiller innlasting (også automatisk navigering til mellomlagret steg) fra navigering brukeren har utløst.
const harBrukerenSamhandletMedSiden = () =>
    (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive ?? false;

// React Router gir hver historikkoppføring en egen key. Med den skilles et nytt besøk på samme side fra en remount.
const historikkNøkkel = () => (history.state as { key?: string } | null)?.key ?? '';

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
        const besøk = `${nøkkel}|${historikkNøkkel()}`;
        if (besøk === sistFokuserteBesøk) {
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
