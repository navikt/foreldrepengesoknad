import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const A4_BREDDE_MM = 210;
const A4_HØGDE_MM = 297;
const MARGIN_MM = 10;
const KOLONNE_GAP_MM = 4;
const RAD_GAP_MM = 4;

// Lågare skala + JPEG-komprimering held filstorleik og genereringstid nede.
// Kalenderen er reint vektor-/tekstinnhald på kvit botn, så ein moderat skala og
// JPEG-kvalitet gjev framleis skarp nok tekst.
const SKALA = 1.5;
const JPEG_KVALITET = 0.7;

// Dagcellene i kalenderen har media queries som gjer dei høgare på mellomstore
// skjermar (sjå day.module.css). For at PDF-en skal bli lik uavhengig av kva
// eining brukaren har, tvingar vi desktop-storleik på dagane medan vi fangar.
// Stilen blir lagt på det *levande* DOM-et slik at posisjonane vi måler stemmer
// med biletet html2canvas lagar.
const DESKTOP_DAG_HØGD_PX = 30;
const DESKTOP_DAG_FONT_PX = 14;
const DAG_HØGD_STYLE = `[data-testid^="day:"]{height:${DESKTOP_DAG_HØGD_PX}px !important;font-size:${DESKTOP_DAG_FONT_PX}px !important;}`;

interface GenererKalenderPdfParams {
    legendElement: HTMLElement;
    kalenderElement: HTMLElement;
    antallKolonner: 1 | 2 | 3;
    filename: string;
}

interface Rektangel {
    x: number;
    y: number;
    bredde: number;
    høgde: number;
}

// Aksel-ikona blir teikna med `color="var(--ax-…)"` (ein CSS-variabel) og
// `fill="currentColor"` på stiane. html2canvas serialiserer kvar inline-SVG til
// eit frittståande bilete, og då blir verken CSS-variabelen eller currentColor
// løyst opp – difor mangla/feila ikona i PDF-en. var() i SVG-presentasjons-
// attributt blir dessutan ikkje løyst likt i alle nettlesarar, noko som gjorde
// at det såg rett ut lokalt men feil i prod. Vi løyser difor variabelen sjølve
// (frå :root) og set ein konkret rgb-verdi som fill før fanginga.
const løysOppIkonFarge = (svg: SVGElement): string => {
    const computed = getComputedStyle(svg);
    const colorAttr = svg.getAttribute('color')?.trim();
    if (colorAttr?.startsWith('var(')) {
        const variabelnamn = colorAttr.slice(4, -1).split(',')[0]?.trim();
        if (variabelnamn) {
            // Les variabelen frå ikonet sin eigen kontekst, slik at han blir løyst
            // anten tokenet er definert på :root eller på ein Aksel-tema-wrapper.
            const verdi = computed.getPropertyValue(variabelnamn).trim();
            if (verdi) {
                return verdi;
            }
        }
    }
    return computed.color;
};

// Køyrer på klona (i onclone) og bytter ut `currentColor`/CSS-variabel-fargar med
// konkrete rgb-verdiar slik at ikona blir rasterisert med rett farge.
const inlineIkonFargar = (original: HTMLElement, klone: HTMLElement): void => {
    const originalSvgar = original.querySelectorAll<SVGElement>('svg');
    const kloneSvgar = klone.querySelectorAll<SVGElement>('svg');

    kloneSvgar.forEach((kloneSvg, index) => {
        const originalSvg = originalSvgar[index];
        if (!originalSvg) {
            return;
        }

        const farge = løysOppIkonFarge(originalSvg);
        kloneSvg.style.color = farge;

        const fillNoder: Element[] = [kloneSvg, ...kloneSvg.querySelectorAll('[fill]')];
        fillNoder.forEach((node) => {
            if (node.getAttribute('fill') === 'currentColor') {
                node.setAttribute('fill', farge);
            }
        });
    });
};

const lagBildeAvElement = (element: HTMLElement): Promise<HTMLCanvasElement> =>
    html2canvas(element, {
        scale: SKALA,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (_klonetDokument, klonetElement) => {
            inlineIkonFargar(element, klonetElement);
        },
    });

const høgdeForBredde = (bildeBredde: number, bildeHøgde: number, bredde: number): number =>
    (bredde * bildeHøgde) / bildeBredde;

// Klypp ut eitt rektangel (ein månad) frå det samla kalender-biletet til eit eige
// canvas. Då slepp vi å kalle html2canvas (som klonar heile dokumentet) éin gong
// per månad, samtidig som kvar månad framleis blir eit sjølvstendig bilete vi kan
// paginere utan å dele han over to sider.
const klyppUtRektangel = (kjelde: HTMLCanvasElement, rekt: Rektangel): HTMLCanvasElement => {
    const sx = Math.round(rekt.x * SKALA);
    const sy = Math.round(rekt.y * SKALA);
    const sb = Math.round(rekt.bredde * SKALA);
    const sh = Math.round(rekt.høgde * SKALA);

    const canvas = document.createElement('canvas');
    canvas.width = sb;
    canvas.height = sh;

    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, sb, sh);
        ctx.drawImage(kjelde, sx, sy, sb, sh, 0, 0, sb, sh);
    }

    return canvas;
};

/**
 * Genererer ein PDF av uttaksplan-kalenderen der kvar månad blir teikna som eit
 * eige bilete og plassert slik at ein månad aldri blir delt over to sider.
 *
 * For å halde genereringstida nede fangar vi heile kalenderen i éi html2canvas-
 * fanging (i staden for éi fanging per månad – html2canvas klonar heile
 * dokumentet for kvar fanging, så det blei svært treigt for lange planar). Deretter
 * klypper vi ut kvar månad frå det samla biletet og paginerer manuelt.
 */
export const genererKalenderPdf = async ({
    legendElement,
    kalenderElement,
    antallKolonner,
    filename,
}: GenererKalenderPdfParams): Promise<void> => {
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

    const tilgjengeligBredde = A4_BREDDE_MM - 2 * MARGIN_MM;
    const sideBunn = A4_HØGDE_MM - MARGIN_MM;
    // Høgda som er tilgjengeleg for innhald på éi side. Eit einskild bilete som
    // er høgare enn dette må skalerast ned, elles ville jsPDF teikna det utanfor
    // sidekanten og biletet blei kutta over sideskiftet.
    const maksInnhaldsHøgd = A4_HØGDE_MM - 2 * MARGIN_MM;

    // Tving desktop-høgd på dagane på det levande DOM-et medan vi måler og fangar,
    // slik at posisjonane vi måler stemmer med biletet og resultatet blir likt
    // uavhengig av brukarens viewport.
    const dagHøgdStyle = document.createElement('style');
    dagHøgdStyle.textContent = DAG_HØGD_STYLE;
    document.head.appendChild(dagHøgdStyle);

    try {
        let y = MARGIN_MM;

        const leggTilBilete = (
            canvas: HTMLCanvasElement,
            x: number,
            øvst: number,
            bredde: number,
            høgde: number,
        ): void => {
            pdf.addImage(canvas.toDataURL('image/jpeg', JPEG_KVALITET), 'JPEG', x, øvst, bredde, høgde);
        };

        // Forklaringa (legend) øvst på første side. Skaler ned dersom ho er høgare
        // enn ei heil side slik at ho ikkje blir kutta.
        const legendCanvas = await lagBildeAvElement(legendElement);
        const legendNaturligHøgd = høgdeForBredde(legendCanvas.width, legendCanvas.height, tilgjengeligBredde);
        const legendBredde =
            legendNaturligHøgd > maksInnhaldsHøgd
                ? (tilgjengeligBredde * maksInnhaldsHøgd) / legendNaturligHøgd
                : tilgjengeligBredde;
        const legendHøgd = høgdeForBredde(legendCanvas.width, legendCanvas.height, legendBredde);
        leggTilBilete(legendCanvas, MARGIN_MM, y, legendBredde, legendHøgd);
        y += legendHøgd + RAD_GAP_MM;

        // Mål kvar månad relativt til kalender-elementet *før* vi fangar, medan
        // dag-høgd-stilen er aktiv, slik at rektangla stemmer med biletet.
        const månedElementer = Array.from(kalenderElement.querySelectorAll<HTMLElement>('[data-month-key]'));
        const kalenderRect = kalenderElement.getBoundingClientRect();
        const månedRektangler: Rektangel[] = månedElementer.map((el) => {
            const rect = el.getBoundingClientRect();
            return {
                x: rect.left - kalenderRect.left,
                y: rect.top - kalenderRect.top,
                bredde: rect.width,
                høgde: rect.height,
            };
        });

        // Éi fanging av heile kalenderen. Vi klypper ut kvar månad etterpå.
        const kalenderCanvas = await lagBildeAvElement(kalenderElement);
        const månedCanvaser = månedRektangler.map((rekt) => klyppUtRektangel(kalenderCanvas, rekt));

        const kolonneBredde = (tilgjengeligBredde - KOLONNE_GAP_MM * (antallKolonner - 1)) / antallKolonner;

        for (let i = 0; i < månedCanvaser.length; i += antallKolonner) {
            const radCanvaser = månedCanvaser.slice(i, i + antallKolonner);

            // Skaler ned heile raden dersom den høgaste månaden er høgare enn ei
            // side. Då held alle månadane i raden same breidde, men blir smalare
            // slik at den høgaste får plass på éi side og ikkje blir kutta.
            const naturligRadHøgde = Math.max(
                ...radCanvaser.map((canvas) => høgdeForBredde(canvas.width, canvas.height, kolonneBredde)),
            );
            const radBredde =
                naturligRadHøgde > maksInnhaldsHøgd
                    ? (kolonneBredde * maksInnhaldsHøgd) / naturligRadHøgde
                    : kolonneBredde;
            const radHøgde = Math.max(
                ...radCanvaser.map((canvas) => høgdeForBredde(canvas.width, canvas.height, radBredde)),
            );

            // Start ny side dersom heile raden ikkje får plass på resten av sida.
            if (y + radHøgde > sideBunn) {
                pdf.addPage('a4', 'portrait');
                y = MARGIN_MM;
            }

            radCanvaser.forEach((canvas, kolonne) => {
                const x = MARGIN_MM + kolonne * (kolonneBredde + KOLONNE_GAP_MM);
                leggTilBilete(canvas, x, y, radBredde, høgdeForBredde(canvas.width, canvas.height, radBredde));
            });

            y += radHøgde + RAD_GAP_MM;
        }

        await pdf.save(filename, { returnPromise: true });
    } finally {
        dagHøgdStyle.remove();
    }
};
