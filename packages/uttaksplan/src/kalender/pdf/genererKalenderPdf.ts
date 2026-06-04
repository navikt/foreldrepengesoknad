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

interface GenererKalenderPdfParams {
    legendElement: HTMLElement;
    månedElementer: HTMLElement[];
    antallKolonner: 1 | 2 | 3;
    filename: string;
}

const fangElement = (element: HTMLElement): Promise<HTMLCanvasElement> =>
    html2canvas(element, {
        scale: SKALA,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: RENDER_BREDDE_PX,
    });

const høgdeForBredde = (canvas: HTMLCanvasElement, bredde: number): number =>
    (bredde * canvas.height) / canvas.width;

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

    // Forklaringa (legend) øvst på første side.
    const legendCanvas = await fangElement(legendElement);
    leggTilBilete(legendCanvas, MARGIN_MM, y, tilgjengeligBredde);
    y += høgdeForBredde(legendCanvas, tilgjengeligBredde) + RAD_GAP_MM;

    const kolonneBredde = (tilgjengeligBredde - KOLONNE_GAP_MM * (antallKolonner - 1)) / antallKolonner;

    // Fang ein rad (maks `antallKolonner` månadar) om gongen i staden for alle
    // samtidig. Kalenderen kan vere opptil 3 år (≈36 månadar), så å halde alle
    // canvasane i minnet samstundes ville gitt unødvendig høgt minnebruk. Når vi
    // går vidare til neste rad kan dei føregåande canvasane bli GC-a.
    for (let i = 0; i < månedElementer.length; i += antallKolonner) {
        const radElementer = månedElementer.slice(i, i + antallKolonner);
        const radCanvaser = await Promise.all(radElementer.map(fangElement));

        const radHøgde = Math.max(...radCanvaser.map((canvas) => høgdeForBredde(canvas, kolonneBredde)));

        // Start ny side dersom heile raden ikkje får plass på resten av sida.
        if (y + radHøgde > sideBunn) {
            pdf.addPage('a4', 'portrait');
            y = MARGIN_MM;
        }

        radCanvaser.forEach((canvas, kolonne) => {
            const x = MARGIN_MM + kolonne * (kolonneBredde + KOLONNE_GAP_MM);
            leggTilBilete(canvas, x, y, kolonneBredde);
        });

        y += radHøgde + RAD_GAP_MM;
    }

    await pdf.save(filename, { returnPromise: true });
};
