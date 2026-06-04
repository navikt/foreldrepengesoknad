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

// Tvinga «desktop»-breidde slik at PDF-en blir deterministisk og uavhengig av
// brukarens viewport. Utan dette ville Calendar sin responsive breakpoint
// (columns={{ sm: 1, md: ... }}) gitt ulik layout på små skjermar.
const RENDER_BREDDE_PX = 1200;

// Dagcellene i kalenderen har media queries som gjer dei høgare på mellomstore
// skjermar (sjå day.module.css). html2canvas (1.4.1) kopierer dei utrekna
// stilane frå det opphavlege DOM-et, så ein månad fanga frå mobil kan bli høgare
// enn frå desktop. Vi tvingar difor desktop-storleik på dagane under fanginga
// slik at månadane alltid får same høgd uavhengig av kva eining brukaren har.
const DESKTOP_DAG_HØGD_PX = 30;
const DESKTOP_DAG_FONT_PX = 14;

interface GenererKalenderPdfParams {
    legendElement: HTMLElement;
    månedElementer: HTMLElement[];
    antallKolonner: 1 | 2 | 3;
    filename: string;
}

// html2canvas serialiserer kvar inline-SVG til eit frittståande bilete. Då mistar
// `fill="currentColor"` og CSS-variabel-fargar (color: var(--ax-...)) konteksten
// si og blir ikkje teikna, slik at ikona (fødsel/termin, barnehage, åtvaring)
// manglar i PDF-en. Vi løyser difor opp fargane til konkrete rgb-verdiar i klona
// før fanginga.
const løysOppIkonFargar = (original: HTMLElement, klone: HTMLElement): void => {
    const originalSvgar = original.querySelectorAll('svg');
    const kloneSvgar = klone.querySelectorAll('svg');

    kloneSvgar.forEach((kloneSvg, index) => {
        const originalSvg = originalSvgar[index];
        if (!originalSvg) {
            return;
        }

        const farge = getComputedStyle(originalSvg).color;
        kloneSvg.style.color = farge;

        kloneSvg.querySelectorAll<SVGElement>('[fill]').forEach((node) => {
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
        windowWidth: RENDER_BREDDE_PX,
        onclone: (klonetDokument, klonetElement) => {
            løysOppIkonFargar(element, klonetElement);

            // Nøytraliser dei responsive dag-høgdene slik at fanginga alltid
            // brukar desktop-layout, uavhengig av brukarens viewport.
            const style = klonetDokument.createElement('style');
            style.textContent = `[data-testid^="day:"]{height:${DESKTOP_DAG_HØGD_PX}px !important;font-size:${DESKTOP_DAG_FONT_PX}px !important;}`;
            klonetDokument.head.appendChild(style);
        },
    });

const høgdeForBredde = (canvas: HTMLCanvasElement, bredde: number): number => (bredde * canvas.height) / canvas.width;

/**
 * Genererer ein PDF av uttaksplan-kalenderen der kvar månad blir teikna som eit
 * eige bilete og plassert slik at ein månad aldri blir delt over to sider.
 *
 * react-to-pdf (og liknande verktøy) rasteriserer heile kalenderen til eitt høgt
 * lerret og klypper det opp i faste sidehøgder utan å ta omsyn til kvar månadane
 * startar og sluttar. Då kan ein månad bli kutta i to over eit sideskift. Her
 * fangar vi difor kvar månad for seg og paginerer manuelt slik at ein heil månad
 * alltid hamnar på éi side.
 */
export const genererKalenderPdf = async ({
    legendElement,
    månedElementer,
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

    let y = MARGIN_MM;

    const leggTilBilete = (canvas: HTMLCanvasElement, x: number, øvst: number, bredde: number): void => {
        pdf.addImage(
            canvas.toDataURL('image/jpeg', JPEG_KVALITET),
            'JPEG',
            x,
            øvst,
            bredde,
            høgdeForBredde(canvas, bredde),
        );
    };

    // Forklaringa (legend) øvst på første side. Skaler ned dersom ho er høgare
    // enn ei heil side slik at ho ikkje blir kutta.
    const legendCanvas = await lagBildeAvElement(legendElement);
    const legendNaturligHøgd = høgdeForBredde(legendCanvas, tilgjengeligBredde);
    const legendBredde =
        legendNaturligHøgd > maksInnhaldsHøgd
            ? (tilgjengeligBredde * maksInnhaldsHøgd) / legendNaturligHøgd
            : tilgjengeligBredde;
    leggTilBilete(legendCanvas, MARGIN_MM, y, legendBredde);
    y += høgdeForBredde(legendCanvas, legendBredde) + RAD_GAP_MM;

    const kolonneBredde = (tilgjengeligBredde - KOLONNE_GAP_MM * (antallKolonner - 1)) / antallKolonner;

    // Fang ein rad (maks `antallKolonner` månadar) om gongen i staden for alle
    // samtidig. Kalenderen kan vere opptil 3 år (≈36 månadar), så å halde alle
    // canvasane i minnet samstundes ville gitt unødvendig høgt minnebruk. Når vi
    // går vidare til neste rad kan dei føregåande canvasane bli GC-a.
    for (let i = 0; i < månedElementer.length; i += antallKolonner) {
        const radElementer = månedElementer.slice(i, i + antallKolonner);
        const radCanvaser = await Promise.all(radElementer.map(lagBildeAvElement));

        // Skaler ned heile raden dersom den høgaste månaden er høgare enn ei
        // side. Då held alle månadane i raden same breidde, men blir smalare
        // slik at den høgaste får plass på éi side og ikkje blir kutta.
        const naturligRadHøgde = Math.max(...radCanvaser.map((canvas) => høgdeForBredde(canvas, kolonneBredde)));
        const radBredde =
            naturligRadHøgde > maksInnhaldsHøgd ? (kolonneBredde * maksInnhaldsHøgd) / naturligRadHøgde : kolonneBredde;
        const radHøgde = Math.max(...radCanvaser.map((canvas) => høgdeForBredde(canvas, radBredde)));

        // Start ny side dersom heile raden ikkje får plass på resten av sida.
        if (y + radHøgde > sideBunn) {
            pdf.addPage('a4', 'portrait');
            y = MARGIN_MM;
        }

        radCanvaser.forEach((canvas, kolonne) => {
            const x = MARGIN_MM + kolonne * (kolonneBredde + KOLONNE_GAP_MM);
            leggTilBilete(canvas, x, y, radBredde);
        });

        y += radHøgde + RAD_GAP_MM;
    }

    await pdf.save(filename, { returnPromise: true });
};
