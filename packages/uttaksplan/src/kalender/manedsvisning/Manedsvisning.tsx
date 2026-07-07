import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useMemo } from 'react';

import { BodyShort } from '@navikt/ds-react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import styles from './manedsvisning.module.css';
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
    MOR: styles.tekstMor!,
    FAR: styles.tekstFar!,
    FELLES: styles.tekstFelles!,
    FERIE: styles.tekstFerie!,
};

const KORTFARGE: Record<ManedsvisningPeriodeType, string> = {
    MOR: styles.mor!,
    FAR: styles.far!,
    FELLES: styles.felles!,
    FERIE: styles.ferie!,
};

/**
 * Månadsvisning av uttaksplanen. Viser éin månad om gongen med små, fargelagde kort per dag
 * («micro cards»). Samanhengande periodar innanfor same veke smeltar visuelt saman.
 *
 * Komponenten tek inn same type informasjon som `Calendar` (periodar med fom/tom/srText), men
 * brukar ein snevrare, semantisk periodetype i staden for den opne `CalendarPeriodColor`-typen,
 * sidan plassen i micro-visninga berre gjev rom for éin av fire faste kategoriar.
 *
 * Komponenten har ingen eiga månadsnavigering, filtrering eller detaljvising ved klikk på ein dag
 * – det er opp til den som brukar komponenten å byggje det rundt, slik det og er gjort for
 * `Calendar` i `UttaksplanKalender`.
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
            <BodyShort weight="semibold" className={styles.månedstittel}>
                {månedstittel}
            </BodyShort>

            <div
                className={`${styles.grid} ${hideWeekend ? styles.utenHelg : ''}`}
                style={{ gridTemplateColumns }}
                role="grid"
                aria-label={månedstittel}
            >
                {showWeekNumbers && <div className={`${styles.gridHead} ${styles.hjørne}`} aria-hidden />}
                {ukedagNavn.map((navn, i) => (
                    <div key={navn} className={`${styles.gridHead} ${i >= 5 ? styles.helgKolonne : ''}`}>
                        {navn}
                    </div>
                ))}

                {uker.map((uke, ukeIndex) => (
                    <UkeRad
                        key={uke.ukenummer}
                        uke={uke}
                        erSisteRad={ukeIndex === uker.length - 1}
                        showWeekNumbers={showWeekNumbers}
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
    dateClickCallback,
}: {
    uke: { ukenummer: number; dager: DagInfo[] };
    erSisteRad: boolean;
    showWeekNumbers: boolean;
    dateClickCallback?: (date: string) => void;
}) => {
    const mergeFormer = useMemo(() => finnMergeFormerForUke(uke.dager), [uke.dager]);

    return (
        <>
            {showWeekNumbers && (
                <div className={`${styles.ukenummer} ${erSisteRad ? styles.sisteRad : ''}`} data-testid="ukenummer">
                    {uke.ukenummer}
                </div>
            )}
            {uke.dager.map((dag, dagIndex) => (
                <Dagcelle
                    key={dag.iso}
                    dag={dag}
                    erSisteRad={erSisteRad}
                    mergeForm={mergeFormer[dagIndex]!}
                    dateClickCallback={dateClickCallback}
                />
            ))}
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

    const cellKlasser = [
        styles.dagcelle,
        dag.erHelg ? styles.helgKolonne : '',
        !dag.erIDenneMåneden ? styles.utanforMåneden : '',
        erSisteRad ? styles.sisteRad : '',
    ]
        .filter(Boolean)
        .join(' ');

    if (!dag.erIDenneMåneden) {
        return <div className={cellKlasser} data-testid={`dag:utanfor;${dag.iso}`} />;
    }

    if (dag.hendelse) {
        return (
            <div className={cellKlasser} data-testid={`dag:${dagNr};hendelse`}>
                {dateClickCallback ? (
                    <button
                        type="button"
                        className={styles.hendelseknapp}
                        onClick={() => dateClickCallback(dag.iso)}
                        aria-label={`${dag.dato.format('D. MMMM')}, ${dag.hendelse.label}`}
                    >
                        <span className={styles.hendelseikon} aria-hidden>
                            {dag.hendelse.ikon}
                        </span>
                        <span className={styles.hendelselabel}>{dag.hendelse.label}</span>
                    </button>
                ) : (
                    <div className={styles.hendelseknapp}>
                        <span className={styles.hendelseikon} aria-hidden>
                            {dag.hendelse.ikon}
                        </span>
                        <span className={styles.hendelselabel}>{dag.hendelse.label}</span>
                    </div>
                )}
            </div>
        );
    }

    const periode = dag.erHelg ? undefined : dag.periode;

    return (
        <div className={cellKlasser} data-testid={`dag:${dagNr}${periode ? `;type:${periode.type}` : ''}`}>
            <span className={`${styles.dagnummer} ${periode ? TEKSTFARGE[periode.type] : ''}`}>{dagNr}</span>
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
    const mergeKlasse =
        mergeForm === 'start'
            ? styles.mergeStart
            : mergeForm === 'middle'
              ? styles.mergeMiddle
              : mergeForm === 'end'
                ? styles.mergeEnd
                : '';

    const klasser = [styles.microCard, KORTFARGE[periode.type], mergeKlasse, periode.harAdvarsel ? styles.varsel : '']
        .filter(Boolean)
        .join(' ');

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
