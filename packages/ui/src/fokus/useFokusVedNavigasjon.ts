import { useEffect, useRef } from 'react';

let sistFokuserteNøkkel: string | undefined;

// Skiller innlasting (også automatisk navigering til mellomlagret steg) fra navigering brukeren har utløst.
const harBrukerenSamhandletMedSiden = () =>
    (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive ?? false;

const finnSynligH1 = (container: HTMLElement) => {
    const overskrifter = Array.from(container.querySelectorAll<HTMLHeadingElement>('h1'));
    return overskrifter.find((h) => h.getClientRects().length > 0) ?? overskrifter[0];
};

/**
 * Flytter fokus til overskriften når brukeren har navigert til en ny side eller et nytt steg (WCAG 2.4.3).
 * Ref-en settes på overskriften, eller på en container der første h1 får fokus.
 * `nøkkel` identifiserer siden, slik at en remount av samme side ikke flytter fokus.
 */
export const useFokusVedNavigasjon = <T extends HTMLElement>(nøkkel: string | undefined) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element || nøkkel === undefined || nøkkel === sistFokuserteNøkkel) {
            return;
        }
        sistFokuserteNøkkel = nøkkel;

        if (!harBrukerenSamhandletMedSiden()) {
            return;
        }

        const mål = /^H[1-6]$/.test(element.tagName) ? element : (finnSynligH1(element) ?? element);
        mål.setAttribute('tabindex', '-1');
        mål.focus();
    }, [nøkkel]);

    return ref;
};
