import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useMemo } from 'react';

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

const HENDELSEKNAPP_KLASSE = cx(
    'absolute inset-1 z-[2] box-border flex cursor-pointer flex-col items-center justify-center gap-0.5',
    'rounded-md border-0 bg-ax-bg-brand-magenta-soft p-0 text-ax-text-brand-magenta-subtle',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-ax-border-focus focus-visible:outline-offset-2',
);

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
            >
                {showWeekNumbers && <div className={cx(GRID_HEAD_KLASSE, 'bg-ax-bg-neutral-soft')} aria-hidden />}
                {ukedagNavn.map((navn, i) => {
                    const erHelg = i >= 5;
                    if (hideWeekend && erHelg) {
                        return null;
                    }
                    return (
                        <div key={navn} className={cx(GRID_HEAD_KLASSE, erHelg && 'bg-ax-bg-neutral-soft')}>
                            {navn}
                        </div>
                    );
                })}

                {uker.map((uke, ukeIndex) => (
                    <UkeRad
                        key={uke.ukenummer}
                        uke={uke}
                        erSisteRad={ukeIndex === uker.length - 1}
                        showWeekNumbers={showWeekNumbers}
                        hideWeekend={hideWeekend}
                        dateClickCallback={dateClickCallback}
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
}: {
    uke: { ukenummer: number; dager: DagInfo[] };
    erSisteRad: boolean;
    showWeekNumbers: boolean;
    hideWeekend: boolean;
    dateClickCallback?: (date: string) => void;
}) => {
    const mergeFormer = useMemo(() => finnMergeFormerForUke(uke.dager), [uke.dager]);

    return (
        <>
            {showWeekNumbers && (
                <div
                    className={cx(
                        'flex items-center justify-center border-r border-ax-border-subtle bg-ax-bg-neutral-soft',
                        'text-xs font-medium text-ax-text-neutral-subtle',
                        !erSisteRad && 'border-b',
                    )}
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
                    />
                );
            })}
        </>
    );
};

const Dagcelle = ({
    dag,
    erSisteRad,
    mergeForm,
    dateClickCallback,
}: {
    dag: DagInfo;
    erSisteRad: boolean;
    mergeForm: MergeForm;
    dateClickCallback?: (date: string) => void;
}) => {
    const dagNr = dag.dato.date();

    const cellKlasser = cx(
        'relative min-h-16 border-r border-ax-border-subtle p-1',
        !erSisteRad && 'border-b',
        dag.erHelg || !dag.erIDenneMåneden ? 'bg-ax-bg-neutral-soft' : 'bg-ax-bg-default',
    );

    if (!dag.erIDenneMåneden) {
        return <div className={cellKlasser} data-testid={`dag:utanfor;${dag.iso}`} />;
    }

    if (dag.hendelse) {
        return (
            <div className={cellKlasser} data-testid={`dag:${dagNr};hendelse`}>
                {dateClickCallback ? (
                    <button
                        type="button"
                        className={HENDELSEKNAPP_KLASSE}
                        onClick={() => dateClickCallback(dag.iso)}
                        aria-label={`${dag.dato.format('D. MMMM')}, ${dag.hendelse.label}`}
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
        <div className={cellKlasser} data-testid={`dag:${dagNr}${periode ? `;type:${periode.type}` : ''}`}>
            <span
                className={cx(
                    'pointer-events-none relative z-[2] text-[13px] font-medium',
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
                    dagNr={dagNr}
                    dateClickCallback={dateClickCallback}
                />
            )}
        </div>
    );
};

const MicroCard = ({
    periode,
    mergeForm,
    iso,
    dagNr,
    dateClickCallback,
}: {
    periode: ManedsvisningPeriode;
    mergeForm: MergeForm;
    iso: string;
    dagNr: number;
    dateClickCallback?: (date: string) => void;
}) => {
    const klasser = cx(
        'absolute inset-1 z-[1] box-border cursor-pointer rounded-md border-0 p-0',
        'hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2',
        'focus-visible:outline-ax-border-focus focus-visible:outline-offset-2 focus-visible:brightness-[0.97]',
        KORTFARGE[periode.type],
        MERGEKLASSE[mergeForm],
        periode.harAdvarsel &&
            "after:absolute after:top-1.5 after:right-1.5 after:h-2 after:w-2 after:rounded-full after:content-['']",
        periode.harAdvarsel && 'after:bg-ax-bg-warning-strong after:shadow-[0_0_0_2px_var(--ax-bg-default)]',
    );

    if (!dateClickCallback) {
        return <div className={klasser} aria-hidden />;
    }

    return (
        <button
            type="button"
            className={klasser}
            onClick={() => dateClickCallback(iso)}
            aria-label={`${dagNr}., ${periode.srText}`}
        />
    );
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

    const alleDager: DagInfo[] = Array.from({ length: antallDager }, (_, i) => {
        const dato = førsteIRuta.add(i, 'day');
        const iso = dato.format(ISO_DATE_FORMAT);
        return {
            dato,
            iso,
            erIDenneMåneden: dato.month() === month && dato.year() === year,
            erHelg: dato.isoWeekday() === 6 || dato.isoWeekday() === 7,
            hendelse: hendelser.find((h) => h.dato === iso),
            periode: periods.find((p) => !dato.isBefore(dayjs(p.fom), 'day') && !dato.isAfter(dayjs(p.tom), 'day')),
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
