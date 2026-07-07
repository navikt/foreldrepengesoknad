import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { KeyboardEvent, MutableRefObject, useMemo, useRef } from 'react';

import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { UkevisningPeriode, UkevisningPeriodeType } from './types/UkevisningPeriode';

dayjs.extend(isoWeek);

interface Props {
    /** ISO-vekeår, jf. dayjs sin `isoWeekYear` (kan avvike frå kalenderåret i årsskiftet). */
    year: number;
    /** ISO-vekenummer, 1–53. */
    week: number;
    periods: UkevisningPeriode[];
    hideWeekend?: boolean;
    dateClickCallback?: (date: string) => void;
}

type DagInfo = {
    dato: Dayjs;
    iso: string;
    erHelg: boolean;
    periode?: UkevisningPeriode;
    mergeForm: MergeForm;
};

type MergeForm = 'single' | 'start' | 'middle' | 'end';

const KORTFARGE: Record<UkevisningPeriodeType, string> = {
    MOR: 'bg-ax-bg-accent-soft text-ax-text-accent-subtle',
    FAR: 'bg-ax-bg-success-soft text-ax-text-success-subtle',
    FELLES: 'bg-ax-bg-brand-beige-soft text-ax-text-brand-beige-subtle',
    FERIE: 'bg-ax-bg-warning-soft text-ax-text-warning-subtle',
};

const IKONSIRKEL_FARGE: Record<UkevisningPeriodeType, string> = {
    MOR: 'bg-ax-bg-accent-moderate text-ax-text-accent-contrast',
    FAR: 'bg-ax-bg-success-moderate text-ax-text-success-contrast',
    FELLES: 'bg-ax-bg-brand-beige-moderate text-ax-text-brand-beige-contrast',
    FERIE: 'bg-ax-bg-warning-moderate text-ax-text-warning-contrast',
};

const MERGEKLASSE: Record<MergeForm, string> = {
    single: '',
    start: 'right-0 rounded-r-none',
    middle: 'inset-x-0 rounded-none',
    end: 'left-0 rounded-l-none',
};

const FOKUSRING_KLASSE =
    'focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ax-border-focus focus-visible:-outline-offset-2';

function cx(...klasser: Array<string | false | undefined>) {
    return klasser.filter(Boolean).join(' ');
}

/**
 * Vekevisning – eit alternativ til `Calendar` og `Manedsvisning` som viser éi veke om gongen med
 * fullstore, fargelagde kort per dag (ikon, typetekst og ei metalinje). Samanhengande periodar
 * smeltar visuelt saman på tvers av kvardagane i veka.
 *
 * Komponenten har eit `hideWeekend`-filter som fjernar helgekolonnane heilt (5-dagars arbeidsveke
 * i staden for 7 dagar). Sidan periodar aldri viser kort i helg (helgedagar er alltid nøytrale
 * «Helg»-celler), gjev det ein liten daud hale av tomme helgceller etter eit kort som strekker seg
 * inn i helga i 7-dagarsvisninga. I 5-dagarsvisninga forsvinn den daude halen sidan
 * helgekolonnane er fjerna heilt. Vekevisninga kjenner ikkje til naboveka si – ein periode som
 * held fram frå fredag denne veka til måndag neste veke kan difor aldri smelte visuelt saman på
 * tvers av to Ukevisning-instansar; det er berre fargen (og srText) som kommuniserer at det i
 * FP-forstand er éin samanhengande periode (same prinsipp som Manedsvisning på tvers av rader).
 *
 * Komponenten har ingen eiga vekenavigering, eigar-filter (min del/begge/den andre sin del) eller
 * detaljvising ved klikk på ein dag – det er opp til den som brukar komponenten å byggje det rundt,
 * slik Manedsvisning-mønsteret òg legg opp til.
 *
 * Ikkje i produksjonsbruk enno – sjå `Ukevisning.stories.tsx` for demo.
 */
export const Ukevisning = ({ year, week, periods, hideWeekend = false, dateClickCallback }: Props) => {
    const alleDager = useMemo(() => finnDagerIUke(year, week, periods), [year, week, periods]);
    const synligeDager = useMemo(
        () => (hideWeekend ? alleDager.filter((dag) => !dag.erHelg) : alleDager),
        [alleDager, hideWeekend],
    );

    const førsteDag = alleDager[0]!.dato;
    const sisteDag = alleDager[alleDager.length - 1]!.dato;
    const visteDagerSisteIndex = synligeDager.length - 1;
    const ukeTittel = `Uke ${førsteDag.isoWeek()}`;
    const datoIntervall = hideWeekend
        ? `${formaterDatoIIntervall(førsteDag, synligeDager[visteDagerSisteIndex]!.dato)} · 5 dager`
        : formaterDatoIIntervall(førsteDag, sisteDag);

    const fokuserbareDatoer = useMemo(
        () => synligeDager.filter((dag) => dag.periode).map((dag) => dag.iso),
        [synligeDager],
    );

    const dagKnappRef = useRef<Map<string, HTMLButtonElement>>(new Map());

    const håndterTastetrykk = (event: KeyboardEvent<HTMLButtonElement>) => {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement) || !target.dataset.iso) {
            return;
        }
        const gjeldendeIndeks = fokuserbareDatoer.indexOf(target.dataset.iso);
        if (gjeldendeIndeks === -1) {
            return;
        }

        let nyIndeks: number | undefined;
        if (event.key === 'ArrowRight') {
            nyIndeks = gjeldendeIndeks + 1;
        } else if (event.key === 'ArrowLeft') {
            nyIndeks = gjeldendeIndeks - 1;
        } else {
            return;
        }

        if (nyIndeks < 0 || nyIndeks >= fokuserbareDatoer.length) {
            return;
        }

        event.preventDefault();
        dagKnappRef.current.get(fokuserbareDatoer[nyIndeks]!)?.focus();
    };

    return (
        <div>
            <HStack gap="space-4" align="baseline" className="mb-3">
                <BodyShort weight="semibold">{ukeTittel}</BodyShort>
                <BodyShort size="small" textColor="subtle">
                    {datoIntervall}
                </BodyShort>
            </HStack>

            <div
                className="grid overflow-hidden rounded-lg border border-ax-border-subtle"
                style={{ gridTemplateColumns: `repeat(${synligeDager.length}, 1fr)` }}
                aria-label={`${ukeTittel}, ${datoIntervall}`}
            >
                {synligeDager.map((dag) => (
                    <DagHeader key={dag.iso} dag={dag} />
                ))}
                {synligeDager.map((dag) => (
                    <Dagcelle
                        key={dag.iso}
                        dag={dag}
                        mergeForm={dag.mergeForm}
                        dateClickCallback={dateClickCallback}
                        dagKnappRef={dagKnappRef}
                        onTastetrykk={håndterTastetrykk}
                    />
                ))}
            </div>

            {hideWeekend && (
                <div
                    className="mt-4 flex items-center gap-2 rounded-md bg-ax-bg-neutral-soft px-3.5 py-2.5 text-sm text-ax-text-neutral-subtle"
                    data-testid="helg-skjult-varsel"
                >
                    <BodyShort size="small">
                        <strong className="text-ax-text-default font-semibold">Helg er skjult.</strong> Foreldrepenger
                        telles uansett ikke i helg, så planen din endres ikke.
                    </BodyShort>
                </div>
            )}
        </div>
    );
};

const DagHeader = ({ dag }: { dag: DagInfo }) => (
    <div className="border-r border-b border-ax-border-subtle bg-ax-bg-default px-2 py-2.5 text-center last:border-r-0">
        <BodyShort size="small" className="text-[11px] font-semibold tracking-[0.06em] text-ax-text-neutral-subtle uppercase">
            {capitalizeFirstLetter(dag.dato.format('dddd'))}
        </BodyShort>
        <BodyShort
            className={cx('text-[22px] font-semibold', dag.erHelg ? 'text-ax-text-neutral-subtle' : 'text-ax-text-default')}
        >
            {dag.dato.date()}
        </BodyShort>
    </div>
);

const Dagcelle = ({
    dag,
    mergeForm,
    dateClickCallback,
    dagKnappRef,
    onTastetrykk,
}: {
    dag: DagInfo;
    mergeForm: MergeForm;
    dateClickCallback?: (date: string) => void;
    dagKnappRef: MutableRefObject<Map<string, HTMLButtonElement>>;
    onTastetrykk: (event: KeyboardEvent<HTMLButtonElement>) => void;
}) => {
    const cellKlasser = cx(
        'relative min-h-[220px] border-r border-ax-border-subtle p-1.5 last:border-r-0',
        dag.erHelg ? 'bg-ax-bg-neutral-soft' : 'bg-ax-bg-default',
    );

    if (dag.erHelg) {
        return (
            <div className={cellKlasser} data-testid="dag:helg">
                <div className="flex h-full items-center justify-center text-[12px] font-medium tracking-[0.05em] text-ax-text-neutral-subtle uppercase">
                    Helg
                </div>
            </div>
        );
    }

    if (!dag.periode) {
        return <div className={cellKlasser} data-testid={`dag:${dag.dato.date()}`} />;
    }

    return (
        <div className={cellKlasser} data-testid={`dag:${dag.dato.date()};type:${dag.periode.type}`}>
            <MicroKort
                periode={dag.periode}
                mergeForm={mergeForm}
                iso={dag.iso}
                dateClickCallback={dateClickCallback}
                dagKnappRef={dagKnappRef}
                onTastetrykk={onTastetrykk}
            />
        </div>
    );
};

const MicroKort = ({
    periode,
    mergeForm,
    iso,
    dateClickCallback,
    dagKnappRef,
    onTastetrykk,
}: {
    periode: UkevisningPeriode;
    mergeForm: MergeForm;
    iso: string;
    dateClickCallback?: (date: string) => void;
    dagKnappRef: MutableRefObject<Map<string, HTMLButtonElement>>;
    onTastetrykk: (event: KeyboardEvent<HTMLButtonElement>) => void;
}) => {
    const visInnhald = mergeForm === 'single' || mergeForm === 'start';

    const klasser = cx('absolute inset-1 z-[1] rounded-lg border-0 p-2.5 text-left', KORTFARGE[periode.type], MERGEKLASSE[mergeForm]);

    const innhald = visInnhald && (
        <>
            <HStack gap="space-8" align="center" className="mb-2">
                <span
                    className={cx(
                        'flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full [&>svg]:h-3 [&>svg]:w-3',
                        IKONSIRKEL_FARGE[periode.type],
                    )}
                    aria-hidden
                >
                    {periode.ikon}
                </span>
                <BodyShort size="small" weight="semibold" className="truncate">
                    {periode.label}
                </BodyShort>
            </HStack>
            <BodyShort size="small" className="opacity-85">
                {periode.meta}
            </BodyShort>
            {periode.advarsel && (
                <span
                    className={cx(
                        'mt-1.5 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-semibold',
                        'bg-ax-bg-warning-strong text-ax-text-warning-contrast',
                    )}
                    data-testid="dag-advarsel"
                >
                    <ExclamationmarkTriangleFillIcon aria-hidden width={11} height={11} />
                    {periode.advarsel}
                </span>
            )}
        </>
    );

    if (!dateClickCallback) {
        return (
            <div className={klasser} aria-hidden>
                {innhald}
            </div>
        );
    }

    return (
        <button
            type="button"
            ref={(el) => registrerKnappRef(dagKnappRef, iso, el)}
            data-iso={iso}
            className={cx(klasser, 'box-border cursor-pointer hover:brightness-[0.97] focus-visible:brightness-[0.97]', FOKUSRING_KLASSE)}
            onClick={() => dateClickCallback(iso)}
            onKeyDown={onTastetrykk}
            aria-label={`${dayjs(iso).format('D. MMMM YYYY')}, ${periode.srText}`}
        >
            {innhald}
        </button>
    );
};

const registrerKnappRef = (
    dagKnappRef: MutableRefObject<Map<string, HTMLButtonElement>>,
    iso: string,
    el: HTMLButtonElement | null,
) => {
    if (el) {
        dagKnappRef.current.set(iso, el);
    } else {
        dagKnappRef.current.delete(iso);
    }
};

/**
 * `isoWeekYear()` er berre typa som ein getter i dayjs (ikkje som ein setjar), sjølv om
 * plugin-implementasjonen faktisk støttar å setje han. Vi må derfor konstruere datoen via ein
 * dato vi *veit* ligg i rett ISO-vekeår: 4. januar ligg alltid i veke 1 av sitt eige ISO-vekeår
 * (ISO 8601-regelen), så `.year(year).month(0).date(4)` gjev oss ein trygg startdato før vi hoppar
 * til rett veke med den typa `isoWeek(value)`-setjaren.
 */
export const finnFørsteDagIIsoUke = (year: number, week: number): Dayjs =>
    dayjs().year(year).month(0).date(4).isoWeek(week).startOf('isoWeek');

const formaterDatoIIntervall = (fom: Dayjs, tom: Dayjs): string => {
    if (fom.month() === tom.month()) {
        return `${fom.format('D.')}–${tom.format('D. MMMM YYYY')}`;
    }
    return `${fom.format('D. MMMM')} – ${tom.format('D. MMMM YYYY')}`;
};

const finnDagerIUke = (year: number, week: number, periods: UkevisningPeriode[]): DagInfo[] => {
    const førsteIUka = finnFørsteDagIIsoUke(year, week);
    const periodeForIso = byggPeriodeOppslag(periods);

    const dagerUtenMergeForm = Array.from({ length: 7 }, (_, i) => {
        const dato = førsteIUka.add(i, 'day');
        const iso = dato.format(ISO_DATE_FORMAT);
        const erHelg = dato.isoWeekday() === 6 || dato.isoWeekday() === 7;
        return {
            dato,
            iso,
            erHelg,
            // Periodar visest aldri i helg – FP telles ikkje i helgedagar.
            periode: erHelg ? undefined : periodeForIso.get(iso),
        };
    });

    const mergeFormer = finnMergeFormerForDager(dagerUtenMergeForm);
    return dagerUtenMergeForm.map((dag, i) => ({ ...dag, mergeForm: mergeFormer[i]! }));
};

/**
 * Byggjer eit oppslag frå ISO-dato til periode ved å ekspandere kvar periode sitt fom/tom-
 * intervall éin gong, slik at oppslaget under rendring av kvar dag er O(1).
 */
const byggPeriodeOppslag = (periods: UkevisningPeriode[]): Map<string, UkevisningPeriode> => {
    const oppslag = new Map<string, UkevisningPeriode>();
    periods.forEach((periode) => {
        let dato = dayjs(periode.fom);
        const tom = dayjs(periode.tom);
        while (!dato.isAfter(tom, 'day')) {
            oppslag.set(dato.format(ISO_DATE_FORMAT), periode);
            dato = dato.add(1, 'day');
        }
    });
    return oppslag;
};

/**
 * Finn samanslåingsform per dag. Samanslåinga vert alltid rekna ut over alle sju dagane i veka
 * (måndag–søndag), uavhengig av `hideWeekend`: sidan periodar aldri visest i helg, kan éin
 * periode aldri stå på begge sider av helga innanfor same veke (helga er alltid dei to siste
 * dagane), så det å skjule helg-kolonnane endrar aldri korleis kvardagskorta smeltar saman – det
 * fjernar berre dei tomme helg-cellene frå visninga.
 */
const finnMergeFormerForDager = (dager: Array<Omit<DagInfo, 'mergeForm'>>): MergeForm[] => {
    const erSammePeriode = (a?: UkevisningPeriode, b?: UkevisningPeriode) =>
        !!a && !!b && a.fom === b.fom && a.tom === b.tom;

    return dager.map((dag, i) => {
        if (!dag.periode) {
            return 'single';
        }

        const forrigeDag = i > 0 ? dager[i - 1] : undefined;
        const nesteDag = i < dager.length - 1 ? dager[i + 1] : undefined;

        const prevSame = erSammePeriode(dag.periode, forrigeDag?.periode);
        const nextSame = erSammePeriode(dag.periode, nesteDag?.periode);

        if (prevSame && nextSame) {
            return 'middle';
        }
        if (prevSame) {
            return 'end';
        }
        if (nextSame) {
            return 'start';
        }
        return 'single';
    });
};
