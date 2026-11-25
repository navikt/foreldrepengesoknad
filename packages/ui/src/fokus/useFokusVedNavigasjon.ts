import { useEffect, useRef } from 'react';

let sistFokuserteBesøk: string | undefined;

// Skiller innlasting (også automatisk navigering til mellomlagret steg) fra navigering brukeren har utløst.
const harBrukerenSamhandletMedSiden = () =>
    (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive ?? false;

// React Router gir hver historikkoppføring en egen key. Med den skilles et nytt besøk på samme side fra en remount.
const historikkNøkkel = () => (history.state as { key?: string } | null)?.key ?? '';

const finnSynligH1 = (container: HTMLElement) => {
    const overskrifter = Array.from(container.querySelectorAll<HTMLHeadingElement>('h1'));
    return overskrifter.find((h) => h.getClientRects().length > 0) ?? overskrifter[0];
};

const finnOverskrift = (element: HTMLElement) =>
    /^H[1-6]$/.test(element.tagName) ? element : (finnSynligH1(element) ?? element);

/**
 * Flytter fokus til overskriften når brukeren har navigert til en ny side eller et nytt steg (WCAG 2.4.3).
 * Ref-en settes på overskriften, eller på en container der første synlige h1 får fokus.
 * `nøkkel` identifiserer siden. Er den undefined, venter hooken (f.eks. til innholdet er lastet).
 */
export const useFokusVedNavigasjon = <T extends HTMLElement>(nøkkel: string | undefined) => {
    const ref = useRef<T>(null);

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

        const mål = finnOverskrift(element);
        mål.setAttribute('tabindex', '-1');
        mål.focus();
    }, [nøkkel]);

    return ref;
};
