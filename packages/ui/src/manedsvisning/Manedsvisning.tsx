import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { KeyboardEvent, MutableRefObject, useMemo, useRef } from 'react';

import { BodyShort } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { ManedsvisningHendelse } from './types/ManedsvisningHendelse';
import { ManedsvisningPeriode, ManedsvisningPeriodeType } from './types/ManedsvisningPeriode';

dayjs.extend(isoWeek);

interface Props {
    /** 0-indeksert månad, som i dayjs (0 = januar). */
    year: number;
    month: number;
    periods: ManedsvisningPeriode[];
    hendelser?: ManedsvisningHendelse[];
    showWeekNumbers?: boolean;
    hideWeekend?: boolean;
    dateClickCallback?: (date: string) => void;
}

type DagInfo = {
    dato: Dayjs;
    iso: string;
    erIDenneMåneden: boolean;
    erHelg: boolean;
    hendelse?: ManedsvisningHendelse;
    periode?: ManedsvisningPeriode;
};

type MergeForm = 'single' | 'start' | 'middle' | 'end';

const TEKSTFARGE: Record<ManedsvisningPeriodeType, string> = {
    MOR: 'text-ax-text-accent-subtle',
    FAR: 'text-ax-text-success-subtle',
    FELLES: 'text-ax-text-brand-beige-subtle',
    FERIE: 'text-ax-text-warning-subtle',
};

const KORTFARGE: Record<ManedsvisningPeriodeType, string> = {
    MOR: 'bg-ax-bg-accent-soft',
    FAR: 'bg-ax-bg-success-soft',
    FELLES: 'bg-ax-bg-brand-beige-soft',
    FERIE: 'bg-ax-bg-warning-soft',
};

const MERGEKLASSE: Record<MergeForm, string> = {
    single: '',
    start: 'right-0 rounded-r-none',
    middle: 'inset-x-0 rounded-none',
    end: 'left-0 rounded-l-none',
};

const GRID_HEAD_KLASSE = [
    'border-b border-r border-ax-border-subtle bg-ax-bg-default px-1 py-2',
    'text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-ax-text-neutral-subtle',
].join(' ');

/**
 * Fokusringen teiknast innover (negativ outline-offset) og cella løftast i z-index ved fokus,
 * slik at ringen alltid ligg heilt innanfor dagcella si eiga flate og aldri vert dekt av
 * nabodagen til høgre (som elles teiknast over, sidan dei ligg etter i DOM-rekkefølgja).
 */
const FOKUSRING_KLASSE =
    'focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ax-border-focus focus-visible:-outline-offset-2';

const HENDELSEKNAPP_KLASSE = cx(
    'absolute inset-1 z-[2] box-border flex flex-col items-center justify-center gap-0.5',
    'rounded-md border-0 bg-ax-bg-brand-magenta-soft p-0 text-ax-text-brand-magenta-subtle',
);

const HENDELSEKNAPP_INTERAKTIV_KLASSE = cx(HENDELSEKNAPP_KLASSE, 'cursor-pointer', FOKUSRING_KLASSE);

function cx(...klasser: Array<string | false | undefined>) {
    return klasser.filter(Boolean).join(' ');
}

/**
 * Månadsvisning – eit alternativ til `Calendar` som viser éin månad om gongen med små,
 * fargelagde kort per dag («micro cards»). Samanhengande periodar innanfor same veke smeltar
 * visuelt saman.
 *
 * Komponenten tek inn mykje av same type informasjon som `Calendar` (periodar med fom/tom/
 * srText), men brukar ein snevrare, semantisk periodetype i staden for den opne
 * `CalendarPeriodColor`-typen, sidan plassen i micro-visninga berre gjev rom for éin av fire
 * faste kategoriar.
 *
 * Komponenten har ingen eiga månadsnavigering, filtrering eller detaljvising ved klikk på ein dag
 * – det er opp til den som brukar komponenten å byggje det rundt, slik `UttaksplanKalender`
 * byggjer dette rundt `Calendar`.
 *
 * Ikkje i produksjonsbruk enno – sjå `Manedsvisning.stories.tsx` for demo.
 */
export const Manedsvisning = ({
    year,
    month,
    periods,
    hendelser = [],
    showWeekNumbers = true,
    hideWeekend = false,
    dateClickCallback,
}: Props) => {
    const uker = useMemo(() => finnUkerIMåned(year, month, periods, hendelser), [year, month, periods, hendelser]);

    const ukedagNavn = useMemo(
        () =>
            Array.from({ length: 7 }, (_, i) =>
                capitalizeFirstLetter(
                    dayjs()
                        .isoWeekday(i + 1)
                        .format('dd'),
                ),
            ),
        [],
    );

    const månedstittel = capitalizeFirstLetter(dayjs().year(year).month(month).format('MMMM YYYY'));

    const antallDagkolonner = hideWeekend ? 5 : 7;
    const gridTemplateColumns = showWeekNumbers
        ? `48px repeat(${antallDagkolonner}, 1fr)`
        : `repeat(${antallDagkolonner}, 1fr)`;

    // Alle dagar som har ein fokuserbar knapp (periode eller hendelse), i kronologisk rekkefølgje.
    // Brukast til piltastnavigering mellom dagane.
    const fokuserbareDatoer = useMemo(
        () =>
            uker
                .flatMap((uke) => uke.dager)
                .filter(
                    (dag) =>
                        dag.erIDenneMåneden &&
                        (!hideWeekend || !dag.erHelg) &&
                        (dag.hendelse || (dag.periode && !dag.erHelg)),
                )
                .map((dag) => dag.iso),
        [uker, hideWeekend],
    );

    const dagKnappRef = useRef<Map<string, HTMLButtonElement>>(new Map());

    const håndterTastetrykk = (event: KeyboardEvent<HTMLDivElement>) => {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement) || !target.dataset.iso) {
            return;
        }
        const gjeldendeIndeks = fokuserbareDatoer.indexOf(target.dataset.iso);
        if (gjeldendeIndeks === -1) {
            return;
        }

        let nyIndeks: number | undefined;
        switch (event.key) {
            case 'ArrowRight':
                nyIndeks = gjeldendeIndeks + 1;
                break;
            case 'ArrowLeft':
                nyIndeks = gjeldendeIndeks - 1;
                break;
            case 'ArrowDown':
                nyIndeks = finnNærmastDatoIndeks(
                    fokuserbareDatoer,
                    dayjs(target.dataset.iso).add(7, 'day').format(ISO_DATE_FORMAT),
                );
                break;
            case 'ArrowUp':
                nyIndeks = finnNærmastDatoIndeks(
                    fokuserbareDatoer,
                    dayjs(target.dataset.iso).subtract(7, 'day').format(ISO_DATE_FORMAT),
                );
                break;
            default:
                return;
        }

        if (nyIndeks === undefined || nyIndeks < 0 || nyIndeks >= fokuserbareDatoer.length) {
            return;
        }

        event.preventDefault();
        dagKnappRef.current.get(fokuserbareDatoer[nyIndeks]!)?.focus();
    };

    return (
        <div>
            <BodyShort weight="semibold" className="mb-3 capitalize">
                {månedstittel}
            </BodyShort>

            <div
                className="grid overflow-hidden rounded-lg border border-ax-border-subtle"
                style={{ gridTemplateColumns }}
                role="grid"
                aria-label={månedstittel}
                onKeyDown={håndterTastetrykk}
                tabIndex={-1}
            >
                <div className="contents" role="row">
                    {showWeekNumbers && (
                        <div
                            className={cx(GRID_HEAD_KLASSE, 'bg-ax-bg-neutral-soft')}
                            role="columnheader"
                            aria-hidden
                        />
                    )}
                    {ukedagNavn.map((navn, i) => {
                        const erHelg = i >= 5;
                        if (hideWeekend && erHelg) {
                            return null;
                        }
                        return (
                            <div
                                key={navn}
                                className={cx(GRID_HEAD_KLASSE, erHelg && 'bg-ax-bg-neutral-soft')}
                                role="columnheader"
                            >
                                {navn}
                            </div>
                        );
                    })}
                </div>

                {uker.map((uke, ukeIndex) => (
                    <UkeRad
                        key={uke.ukenummer}
                        uke={uke}
                        erSisteRad={ukeIndex === uker.length - 1}
                        showWeekNumbers={showWeekNumbers}
                        hideWeekend={hideWeekend}
                        dateClickCallback={dateClickCallback}
                        dagKnappRef={dagKnappRef}
                    />
                ))}
            </div>
        </div>
    );
};

const UkeRad = ({
    uke,
    erSisteRad,
    showWeekNumbers,
    hideWeekend,
    dateClickCallback,
    dagKnappRef,
}: {
    uke: { ukenummer: number; dager: DagInfo[] };
    erSisteRad: boolean;
    showWeekNumbers: boolean;
    hideWeekend: boolean;
    dateClickCallback?: (date: string) => void;
    dagKnappRef: MutableRefObject<Map<string, HTMLButtonElement>>;
}) => {
    const mergeFormer = useMemo(() => finnMergeFormerForUke(uke.dager), [uke.dager]);

    return (
        <div className="contents" role="row">
            {showWeekNumbers && (
                <div
                    className={cx(
                        'flex items-center justify-center border-r border-ax-border-subtle bg-ax-bg-neutral-soft',
                        'text-xs font-medium text-ax-text-neutral-subtle',
                        !erSisteRad && 'border-b',
                    )}
                    role="rowheader"
                    data-testid="ukenummer"
                >
                    {uke.ukenummer}
                </div>
            )}
            {uke.dager.map((dag, dagIndex) => {
                if (hideWeekend && dag.erHelg) {
                    return null;
                }
                return (
                    <Dagcelle
                        key={dag.iso}
                        dag={dag}
                        erSisteRad={erSisteRad}
                        mergeForm={mergeFormer[dagIndex]!}
                        dateClickCallback={dateClickCallback}
                        dagKnappRef={dagKnappRef}
                    />
                );
            })}
        </div>
    );
};

const Dagcelle = ({
    dag,
    erSisteRad,
    mergeForm,
    dateClickCallback,
    dagKnappRef,
}: {
    dag: DagInfo;
    erSisteRad: boolean;
    mergeForm: MergeForm;
    dateClickCallback?: (date: string) => void;
    dagKnappRef: MutableRefObject<Map<string, HTMLButtonElement>>;
}) => {
    const dagNr = dag.dato.date();

    const cellBakgrunnKlasse = dag.erHelg || !dag.erIDenneMåneden ? 'bg-ax-bg-neutral-soft' : 'bg-ax-bg-default';

    const cellKlasser = cx(
        'relative min-h-16 border-r border-ax-border-subtle p-1',
        !erSisteRad && 'border-b',
        cellBakgrunnKlasse,
    );

    if (!dag.erIDenneMåneden) {
        return <div className={cellKlasser} role="gridcell" data-testid={`dag:utanfor;${dag.iso}`} />;
    }

    if (dag.hendelse) {
        return (
            <div className={cellKlasser} role="gridcell" data-testid={`dag:${dagNr};hendelse`}>
                {dateClickCallback ? (
                    <button
                        type="button"
                        ref={(el) => registrerKnappRef(dagKnappRef, dag.iso, el)}
                        data-iso={dag.iso}
                        className={HENDELSEKNAPP_INTERAKTIV_KLASSE}
                        onClick={() => dateClickCallback(dag.iso)}
                        aria-label={`${dag.dato.format('D. MMMM YYYY')}, ${dag.hendelse.label}`}
                    >
                        <span className="h-5 w-5" aria-hidden>
                            {dag.hendelse.ikon}
                        </span>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.05em]">
                            {dag.hendelse.label}
                        </span>
                    </button>
                ) : (
                    <div className={HENDELSEKNAPP_KLASSE}>
                        <span className="h-5 w-5" aria-hidden>
                            {dag.hendelse.ikon}
                        </span>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.05em]">
                            {dag.hendelse.label}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    const periode = dag.erHelg ? undefined : dag.periode;

    return (
        <div
            className={cellKlasser}
            role="gridcell"
            data-testid={`dag:${dagNr}${periode ? `;type:${periode.type}` : ''}`}
        >
            <span
                className={cx(
                    // Litt margin flyttar datotalet vekk frå kortkanten/fokusringen, slik at dei aldri overlappar
                    // visuelt – utan å leggje ein synleg (ugjennomsiktig) boks bak sjølve talet.
                    'pointer-events-none relative z-20 m-1 text-[13px] font-medium leading-none',
                    periode ? TEKSTFARGE[periode.type] : 'text-ax-text-default',
                )}
            >
                {dagNr}
            </span>
            {periode && (
                <MicroCard
                    periode={periode}
                    mergeForm={mergeForm}
                    iso={dag.iso}
                    dateClickCallback={dateClickCallback}
                    dagKnappRef={dagKnappRef}
                />
            )}
        </div>
    );
};

const MicroCard = ({
    periode,
    mergeForm,
    iso,
    dateClickCallback,
    dagKnappRef,
}: {
    periode: ManedsvisningPeriode;
    mergeForm: MergeForm;
    iso: string;
    dateClickCallback?: (date: string) => void;
    dagKnappRef: MutableRefObject<Map<string, HTMLButtonElement>>;
}) => {
    const klasser = cx(
        'absolute inset-1 z-[1] rounded-md border-0 p-0',
        KORTFARGE[periode.type],
        MERGEKLASSE[mergeForm],
        periode.harAdvarsel &&
            "after:absolute after:top-1.5 after:right-1.5 after:h-2 after:w-2 after:rounded-full after:content-['']",
        periode.harAdvarsel && 'after:bg-ax-bg-warning-strong after:shadow-[0_0_0_2px_var(--ax-bg-default)]',
    );

    if (!dateClickCallback) {
        return <div className={cx(klasser, 'box-border')} aria-hidden />;
    }

    return (
        <button
            type="button"
            ref={(el) => registrerKnappRef(dagKnappRef, iso, el)}
            data-iso={iso}
            className={cx(
                klasser,
                'box-border cursor-pointer hover:brightness-[0.97] focus-visible:brightness-[0.97]',
                FOKUSRING_KLASSE,
            )}
            onClick={() => dateClickCallback(iso)}
            aria-label={`${dayjs(iso).format('D. MMMM YYYY')}, ${periode.srText}`}
        />
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
 * Finn indeksen i ei kronologisk sortert liste av datoar som ligg nærast eit gjeve mål-dato.
 * Brukast til å flytte fokus opp/ned éi «veke» blant dei fokuserbare dagane, som ikkje
 * nødvendigvis ligg akkurat 7 dagar frå kvarandre i lista (fordi mange dagar manglar knapp).
 */
const finnNærmastDatoIndeks = (datoer: string[], måldato: string): number | undefined => {
    if (datoer.length === 0) {
        return undefined;
    }
    let besteIndeks = 0;
    let besteAvstand = Math.abs(dayjs(datoer[0]).diff(dayjs(måldato), 'day'));
    for (let i = 1; i < datoer.length; i++) {
        const avstand = Math.abs(dayjs(datoer[i]).diff(dayjs(måldato), 'day'));
        if (avstand < besteAvstand) {
            besteAvstand = avstand;
            besteIndeks = i;
        }
    }
    return besteIndeks;
};

const finnUkerIMåned = (
    year: number,
    month: number,
    periods: ManedsvisningPeriode[],
    hendelser: ManedsvisningHendelse[],
): Array<{ ukenummer: number; dager: DagInfo[] }> => {
    const førsteIMåned = dayjs().year(year).month(month).startOf('month');
    const sisteIMåned = førsteIMåned.endOf('month');

    const førsteIRuta = førsteIMåned.startOf('isoWeek');
    const sisteIRuta = sisteIMåned.endOf('isoWeek');

    const antallDager = sisteIRuta.diff(førsteIRuta, 'day') + 1;

    const hendelseForIso = new Map(hendelser.map((h) => [h.dato, h]));
    const periodeForIso = byggPeriodeOppslag(periods);

    const alleDager: DagInfo[] = Array.from({ length: antallDager }, (_, i) => {
        const dato = førsteIRuta.add(i, 'day');
        const iso = dato.format(ISO_DATE_FORMAT);
        return {
            dato,
            iso,
            erIDenneMåneden: dato.month() === month && dato.year() === year,
            erHelg: dato.isoWeekday() === 6 || dato.isoWeekday() === 7,
            hendelse: hendelseForIso.get(iso),
            periode: periodeForIso.get(iso),
        };
    });

    const uker: Array<{ ukenummer: number; dager: DagInfo[] }> = [];
    for (let i = 0; i < alleDager.length; i += 7) {
        const dagerIUka = alleDager.slice(i, i + 7);
        uker.push({ ukenummer: dagerIUka[0]!.dato.isoWeek(), dager: dagerIUka });
    }

    return uker;
};

/**
 * Byggjer eit oppslag frå ISO-dato til periode ved å ekspandere kvar periode sitt fom/tom-
 * intervall éin gong. Dette gjer oppslaget under rendring av kvar dag O(1) i staden for at
 * kvar dag må søkje gjennom heile periodelista (O(dagar × periodar)).
 */
const byggPeriodeOppslag = (periods: ManedsvisningPeriode[]): Map<string, ManedsvisningPeriode> => {
    const oppslag = new Map<string, ManedsvisningPeriode>();
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
 * Finn samanslåingsform per dag i ei veke. Samanslåing skjer berre innanfor kvardagane
 * (måndag–fredag) i same veke, sidan helg alltid vert vist nøytralt uansett periode.
 */
const finnMergeFormerForUke = (dager: DagInfo[]): MergeForm[] => {
    const erSammePeriode = (a?: ManedsvisningPeriode, b?: ManedsvisningPeriode) =>
        !!a && !!b && a.fom === b.fom && a.tom === b.tom;

    const periodeForDag = (dag: DagInfo) => (dag.erHelg || dag.hendelse ? undefined : dag.periode);

    return dager.map((dag, i) => {
        const periode = periodeForDag(dag);
        if (!periode) {
            return 'single';
        }

        const forrigeDag = i > 0 && !dager[i - 1]!.erHelg ? dager[i - 1] : undefined;
        const nesteDag = i < dager.length - 1 && !dager[i + 1]!.erHelg ? dager[i + 1] : undefined;

        const prevSame = !!forrigeDag && erSammePeriode(periode, periodeForDag(forrigeDag));
        const nextSame = !!nesteDag && erSammePeriode(periode, periodeForDag(nesteDag));

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
