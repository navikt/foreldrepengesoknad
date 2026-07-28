import axe, { ElementContext, Result, RunOptions } from 'axe-core';

// Reglane vi køyrer mot. WCAG 2.1 nivå A og AA er kravet for offentlege nettstader i Noreg,
// og «best-practice» fangar i tillegg vanlege feil som ikkje er direkte WCAG-brot.
const REGELSETT = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

const erJsdom = () => globalThis.navigator?.userAgent?.includes('jsdom') === true;

const formaterBrot = (brot: Result[]) =>
    brot
        .map((b) => {
            const noder = b.nodes
                .map((node) => `      - ${node.target.join(' ')}\n        ${node.failureSummary ?? ''}`)
                .join('\n');
            return `  [${b.impact ?? 'ukjent'}] ${b.id}: ${b.help}\n    ${b.helpUrl}\n${noder}`;
        })
        .join('\n\n');

/**
 * Køyrer axe mot det som er rendra, og kastar med ei lesbar oppsummering dersom det finst
 * tilgjengelegheitsbrot. Kan brukast både i jsdom og i browser-modus.
 */
export const forventIngenUuFeil = async (container: ElementContext = document.body): Promise<void> => {
    const options: RunOptions = {
        runOnly: { type: 'tag', values: REGELSETT },
        resultTypes: ['violations'],
        rules: {
            // Fargekontrast krev ekte layout og rendering, og kan berre målast i browser-modus.
            'color-contrast': { enabled: !erJsdom() },
        },
    };

    const resultat = await axe.run(container, options);

    if (resultat.violations.length > 0) {
        throw new Error(
            `Fann ${resultat.violations.length} tilgjengelegheitsbrot:\n\n${formaterBrot(resultat.violations)}`,
        );
    }
};
