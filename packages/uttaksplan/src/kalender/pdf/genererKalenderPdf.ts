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

// Maks pikslar på lengste kant for eit enkelt canvas. Held vi oss under dette,
// unngår vi nettlesarane sine canvas-grenser (som elles kan gi blankt bilete
// eller krasj på lange planar). Blir ein bit likevel for stor, skalerer vi ned
// fanginga av den biten dynamisk.
const MAKS_CANVAS_KANT_PX = 8000;

// Kor mange PDF-rader vi fangar i éi html2canvas-fanging. Vi fangar bitvis i
// staden for heile kalenderen på éin gong, slik at canvas-storleiken og minne-
// bruken blir avgrensa sjølv for lange planar (opptil 3 år), samtidig som vi
// slepp å kalle html2canvas (som klonar heile dokumentet) éin gong per månad.
const RADER_PER_BIT = 3;

// Månadane blir rendra i ein desktop-stor offscreen-container med fast
// kolonnebreidde, slik at PDF-en blir lik uavhengig av brukarens viewport.
// (Calendar-grid-et er elles responsivt: 1 kolonne på smale skjermar.)
const MND_BREDDE_PX = 400;
const MND_GAP_PX = 12;

// Dagcellene i kalenderen har media queries som gjer dei høgare på mellomstore
// skjermar (sjå day.module.css). Vi tvingar desktop-storleik på dagane medan vi
// fangar, slik at høgda blir deterministisk uavhengig av viewport.
const DESKTOP_DAG_HØGD_PX = 30;
const DESKTOP_DAG_FONT_PX = 14;

// html2canvas teiknar tekst etter alfabetisk baseline (bounds.top + baseline) og
// bommar då litt under det optiske midten – sjølv med line-height lik cellehøgda
// sig dagtalet ~4 px ned. Vi pakkar difor talet i ein span og dyttar han denne
// avstanden opp att, så talet hamnar midt i den farga firkanten i fanginga.
const DAG_TEKST_LØFT_PX = 4;

// Breidda vi rendrar forklaringa (legend) i før fanging. Utan ei fast breidde
// ville HStack-en leggje alle etikettane på éi svært brei linje, og når biletet
// så blir skalert ned til sidebreidda blir teksten liten. Med denne breidda
// (≈ to månadskolonnar) brett legenden seg over fleire linjer og får same
// tekststorleik som månadane på sida.
const LEGEND_BREDDE_PX = 2 * MND_BREDDE_PX + MND_GAP_PX;

// Klasse som berre offscreen-klonane får, slik at dei aldri påverkar det
// levande DOM-et i dialogen.
const OFFSCREEN_KLASSE = 'fp-pdf-offscreen';

// Line-height vi gir legend-teksten under fanginga (sjå sentrerTekstForFanging).
const LEGEND_TEKST_LINE_HØGD_PX = 24;
// Same baseline-skeivskap som for dagtala: html2canvas teiknar legend-teksten
// litt for langt ned i forhold til fargeruta ved sida. (Det synte ikkje før, då
// heile legenden låg på éi brei line som blei kraftig nedskalert; no når teksten
// står i naturleg storleik blir avviket synleg.) Vi dyttar teksten tilsvarande
// opp, slik at han hamnar på linje med midten av fargeruta.
const LEGEND_TEKST_LØFT_PX = 4;
// Litt loddrett luft rundt legenden, slik at teksten ikkje blir klypt sjølv om
// html2canvas teiknar han litt lågt.
const LEGEND_PADDING_PX = 4;

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
// og set ein konkret rgb-verdi som fill før fanginga.
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

// Byter ut `currentColor`/CSS-variabel-fargar med konkrete rgb-verdiar på klona,
// slik at ikona blir rasterisert med rett farge. Fargen blir lesen frå det
// opphavlege (levande) elementet, som har rett tema-kontekst.
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

const høgdeForBredde = (bildeBredde: number, bildeHøgde: number, bredde: number): number =>
    (bredde * bildeHøgde) / bildeBredde;

// html2canvas (1.4.1) sentrerer ikkje tekst loddrett slik flexbox/grid gjer –
// det plasserer teksten etter line-boksen, og teiknar han difor litt for langt
// ned. Resultatet er at dagtala sig ned i cellene og legend-teksten hamnar lågt
// og blir klypt. Vi rettar dette på klonane før fanging: line-height lik høgda
// fyller line-boksen, og dagtalet blir i tillegg dytta litt opp (sjå under).
//
// Stilane blir sette *inline på sjølve klonen* (ikkje via eit <style> i <head>).
// Klonane blir lagde under dialogen/portalen sin DOM, der eit globalt stylesheet
// ikkje nødvendigvis når fram – inline-stil blir derimot alltid lesen av
// html2canvas (som måler boksane frå dei verkelege klone-nodane).

// Pakkar dei direkte tekst-noddane (dagtalet) i ein dagcelle inn i ein span som
// blir dytta litt opp. Ikon-div-en blir ikkje rørt. Dette korrigerer html2canvas
// sin baseline-skeivskap, slik at talet blir loddrett sentrert i fanginga.
const løftDagtekst = (celle: HTMLElement): void => {
    Array.from(celle.childNodes).forEach((node) => {
        if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) {
            return;
        }
        const span = celle.ownerDocument.createElement('span');
        span.style.display = 'inline-block';
        span.style.transform = `translateY(-${DAG_TEKST_LØFT_PX}px)`;
        celle.replaceChild(span, node);
        span.appendChild(node);
    });
};

const sentrerTekstForFanging = (klone: HTMLElement): void => {
    // Dagceller: tving deterministisk desktop-storleik og la line-boksen fylle
    // cella. I tillegg pakkar vi sjølve dagtalet i ein span og dyttar han litt
    // opp, slik at html2canvas sin baseline-skeivskap blir korrigert og talet
    // hamnar midt i den farga firkanten.
    klone.querySelectorAll<HTMLElement>('[data-testid^="day:"]').forEach((celle) => {
        celle.style.height = `${DESKTOP_DAG_HØGD_PX}px`;
        celle.style.minHeight = `${DESKTOP_DAG_HØGD_PX}px`;
        celle.style.fontSize = `${DESKTOP_DAG_FONT_PX}px`;
        celle.style.lineHeight = `${DESKTOP_DAG_HØGD_PX}px`;
        løftDagtekst(celle);
    });

    // Legend-tekst (Aksel BodyShort = <p>): same line-height-triks så teksten
    // blir sentrert ved sida av fargeruta, og same løft opp som dagtala for å
    // rette html2canvas sin baseline-skeivskap. (Berre legenden har <p>;
    // månadane bruker Heading/div, så dette påverkar ikkje kalenderen.)
    klone.querySelectorAll<HTMLElement>('p').forEach((tekst) => {
        tekst.style.lineHeight = `${LEGEND_TEKST_LINE_HØGD_PX}px`;
        tekst.style.display = 'inline-block';
        tekst.style.transform = `translateY(-${LEGEND_TEKST_LØFT_PX}px)`;
    });

    // Litt luft mellom vekedag-overskriftene og første veke, slik at fargane i
    // øvste rad ikkje ser ut til å ligge oppå vekedag-tekstane i fanginga.
    const headerRad = klone.querySelector<HTMLElement>('.aksel-hgrid');
    if (headerRad) {
        headerRad.style.marginBottom = '4px';
    }
};

// Vel ein skala som held det ferdige canvas-et innanfor nettlesaren si
// canvas-grense, men aldri høgare enn ynskt SKALA.
const veljSkala = (breddePx: number, høgdePx: number): number => {
    const maksKant = Math.max(breddePx, høgdePx);
    if (maksKant * SKALA <= MAKS_CANVAS_KANT_PX) {
        return SKALA;
    }
    return Math.max(MAKS_CANVAS_KANT_PX / maksKant, 0.1);
};

const lagOffscreenContainer = (forelder: HTMLElement): HTMLDivElement => {
    const container = document.createElement('div');
    container.className = OFFSCREEN_KLASSE;
    container.style.position = 'fixed';
    container.style.left = '-100000px';
    container.style.top = '0';
    container.style.backgroundColor = '#ffffff';
    container.style.width = 'max-content';
    // Lagt under same forelder som originalen, slik at CSS-variablar (Aksel-tema)
    // blir arva og fargane blir rett løyste.
    forelder.appendChild(container);
    return container;
};

// Fangar ein offscreen-container til eit canvas, med dynamisk nedskalering som
// sikring mot for store canvas-dimensjonar.
const fangContainer = (container: HTMLElement): Promise<HTMLCanvasElement> => {
    const skala = veljSkala(container.scrollWidth, container.scrollHeight);
    return html2canvas(container, {
        scale: skala,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
    });
};

// Klypp ut eitt rektangel (ein månad) frå bit-canvas-et til eit eige canvas.
const klyppUtRektangel = (kjelde: HTMLCanvasElement, rekt: Rektangel, skala: number): HTMLCanvasElement => {
    const sx = Math.round(rekt.x * skala);
    const sy = Math.round(rekt.y * skala);
    const sb = Math.round(rekt.bredde * skala);
    const sh = Math.round(rekt.høgde * skala);

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
 * For å halde genereringstida nede unngår vi å kalle html2canvas (som klonar
 * heile dokumentet) éin gong per månad. I staden rendrar vi månadane i ein
 * desktop-stor offscreen-container og fangar dei bitvis (nokre rader om gongen).
 * Det gir få html2canvas-kall, deterministisk desktop-layout, og avgrensa
 * canvas-storleik/minnebruk sjølv for lange planar.
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

    let y = MARGIN_MM;

    const leggTilBilete = (canvas: HTMLCanvasElement, x: number, øvst: number, bredde: number, høgde: number): void => {
        pdf.addImage(canvas.toDataURL('image/jpeg', JPEG_KVALITET), 'JPEG', x, øvst, bredde, høgde);
    };

    const kolonneBredde = (tilgjengeligBredde - KOLONNE_GAP_MM * (antallKolonner - 1)) / antallKolonner;

    // Paginerer og teiknar éi rad (maks `antallKolonner` månadar) inn i PDF-en.
    // Canvasa blir brukte og sleppte med ein gong, slik at vi ikkje held alle
    // månadscanvasa i minnet samtidig.
    const tegnRad = (radCanvaser: HTMLCanvasElement[]): void => {
        // Skaler ned heile raden dersom den høgaste månaden er høgare enn ei side.
        const naturligRadHøgde = Math.max(
            ...radCanvaser.map((canvas) => høgdeForBredde(canvas.width, canvas.height, kolonneBredde)),
        );
        const radBredde =
            naturligRadHøgde > maksInnhaldsHøgd ? (kolonneBredde * maksInnhaldsHøgd) / naturligRadHøgde : kolonneBredde;
        const radHøgde = Math.max(
            ...radCanvaser.map((canvas) => høgdeForBredde(canvas.width, canvas.height, radBredde)),
        );

        if (y + radHøgde > sideBunn) {
            pdf.addPage('a4', 'portrait');
            y = MARGIN_MM;
        }

        radCanvaser.forEach((canvas, kolonne) => {
            const x = MARGIN_MM + kolonne * (kolonneBredde + KOLONNE_GAP_MM);
            leggTilBilete(canvas, x, y, radBredde, høgdeForBredde(canvas.width, canvas.height, radBredde));
        });

        y += radHøgde + RAD_GAP_MM;
    };

    // Forklaringa (legend) øvst på første side. Vi gir containeren ei fast breidde
    // (≈ to månadskolonnar) i staden for max-content, slik at etikettane brett seg
    // over fleire linjer og får same tekststorleik som månadane når biletet blir
    // skalert til sidebreidda.
    const legendContainer = lagOffscreenContainer(legendElement.parentElement ?? document.body);
    legendContainer.style.width = `${LEGEND_BREDDE_PX}px`;
    legendContainer.style.padding = `${LEGEND_PADDING_PX}px 0`;
    try {
        const legendKlone = legendElement.cloneNode(true) as HTMLElement;
        legendContainer.appendChild(legendKlone);
        inlineIkonFargar(legendElement, legendKlone);
        sentrerTekstForFanging(legendKlone);

        const legendCanvas = await fangContainer(legendContainer);
        const legendNaturligHøgd = høgdeForBredde(legendCanvas.width, legendCanvas.height, tilgjengeligBredde);
        const legendBredde =
            legendNaturligHøgd > maksInnhaldsHøgd
                ? (tilgjengeligBredde * maksInnhaldsHøgd) / legendNaturligHøgd
                : tilgjengeligBredde;
        const legendHøgd = høgdeForBredde(legendCanvas.width, legendCanvas.height, legendBredde);
        leggTilBilete(legendCanvas, MARGIN_MM, y, legendBredde, legendHøgd);
        y += legendHøgd + RAD_GAP_MM;
    } finally {
        legendContainer.remove();
    }

    const månedElementer = Array.from(kalenderElement.querySelectorAll<HTMLElement>('[data-month-key]'));
    const månederPerBit = antallKolonner * RADER_PER_BIT;

    // Fang månadane bitvis. Kvar bit blir rendra i ein eigen offscreen-
    // container, fanga, klypt opp i månadar og paginert – deretter blir både
    // container og bit-canvas sleppt før neste bit.
    for (let i = 0; i < månedElementer.length; i += månederPerBit) {
        const bitElementer = månedElementer.slice(i, i + månederPerBit);
        const container = lagOffscreenContainer(kalenderElement.parentElement ?? document.body);
        container.style.display = 'grid';
        container.style.gridTemplateColumns = `repeat(${antallKolonner}, ${MND_BREDDE_PX}px)`;
        container.style.columnGap = `${MND_GAP_PX}px`;
        container.style.rowGap = `${MND_GAP_PX}px`;

        try {
            const bitKloner = bitElementer.map((el) => {
                const klone = el.cloneNode(true) as HTMLElement;
                klone.style.width = `${MND_BREDDE_PX}px`;
                klone.style.maxWidth = `${MND_BREDDE_PX}px`;
                container.appendChild(klone);
                return klone;
            });
            bitElementer.forEach((original, index) => inlineIkonFargar(original, bitKloner[index]!));
            bitKloner.forEach(sentrerTekstForFanging);

            const skala = veljSkala(container.scrollWidth, container.scrollHeight);
            const bitCanvas = await html2canvas(container, {
                scale: skala,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
            });

            const containerRect = container.getBoundingClientRect();
            const månedCanvaser = bitKloner.map((klone) => {
                const rect = klone.getBoundingClientRect();
                return klyppUtRektangel(
                    bitCanvas,
                    {
                        x: rect.left - containerRect.left,
                        y: rect.top - containerRect.top,
                        bredde: rect.width,
                        høgde: rect.height,
                    },
                    skala,
                );
            });

            for (let j = 0; j < månedCanvaser.length; j += antallKolonner) {
                tegnRad(månedCanvaser.slice(j, j + antallKolonner));
            }
        } finally {
            container.remove();
        }
    }

    await pdf.save(filename, { returnPromise: true });
};
