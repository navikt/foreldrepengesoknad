import { RecordFillIcon, RecordIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { BodyShort, Detail } from '@navikt/ds-react';

import { Tidslinjehendelse } from '../../types/Tidslinjehendelse';
import { formaterDato, formaterTid } from '../../utils/dateUtils';
import { getTidligstDatoForInntektsmelding } from '../../utils/tidslinjeUtils';
import styles from './tidslinjeHendelse.module.css';

interface Props {
    children: React.ReactNode;
    date: string;
    title: string;
    isActiveStep: boolean;
    visKlokkeslett: boolean;
    utvidetTidslinjeHendelseType: Tidslinjehendelse['utvidetTidslinjeHendelseType'];
    førsteUttaksdagISaken: string | undefined;
    tidligstBehandlingsDato: string | undefined;
    finnesHendelserFørAktivtSteg: boolean;
    visHeleTidslinjen: boolean;
    erSistePåForsidenMenIkkeSisteIHeleTidslinjen: boolean;
}

const getIkonClassElement = (isActiveStep: boolean, opprettet: string) => {
    if (isActiveStep) {
        return styles.ikonActive;
    } else if (dayjs(opprettet).isBefore(dayjs())) {
        return styles.ikonCompleted;
    }
    return styles.ikonIncomplete;
};

const getTimelineClassModifier = (opprettet: string, isActiveStep: boolean) => {
    if (isActiveStep) {
        return styles.active;
    }
    if (dayjs(opprettet).isBefore(dayjs())) {
        return styles.complete;
    }
    return styles.incomplete;
};

const getDateTekst = (
    utvidetTidslinjeHendelseType: Tidslinjehendelse['utvidetTidslinjeHendelseType'],
    date: string,
    førsteUttaksdagISaken: string | undefined,
    tidligstBehandlingsDato: string | undefined,
) => {
    if (utvidetTidslinjeHendelseType === 'VENTER_INNTEKTSMELDING') {
        const tidligstDato = getTidligstDatoForInntektsmelding(førsteUttaksdagISaken);
        if (dayjs(tidligstDato).isAfter(dayjs())) {
            return tidligstDato ? `TIDLIGST ${formaterDato(tidligstDato, 'D. MMM YYYY').toUpperCase()}` : '';
        } else {
            return 'SNAREST';
        }
    } else if (utvidetTidslinjeHendelseType === 'VENTER_PGA_TIDLIG_SØKNAD') {
        return `TIDLIGST ${formaterDato(tidligstBehandlingsDato, 'D. MMM YYYY').toUpperCase()}`;
    } else if (['VENTER_MELDEKORT', 'VENT_DOKUMENTASJON'].includes(utvidetTidslinjeHendelseType)) {
        return 'SNAREST';
    } else if (utvidetTidslinjeHendelseType === 'FREMTIDIG_VEDTAK') {
        return 'SENERE';
    } else if (dayjs(date).isSame(new Date(), 'd')) {
        return 'I DAG';
    } else if (dayjs(date).isSame(dayjs(new Date()).subtract(1, 'd'), 'd')) {
        return 'I GÅR';
    } else {
        return formaterDato(date, 'D. MMM YYYY').toUpperCase();
    }
};

export const TidslinjeHendelse = ({
    date,
    title,
    children,
    isActiveStep,
    visKlokkeslett,
    utvidetTidslinjeHendelseType,
    førsteUttaksdagISaken,
    tidligstBehandlingsDato,
    finnesHendelserFørAktivtSteg,
    visHeleTidslinjen,
    erSistePåForsidenMenIkkeSisteIHeleTidslinjen,
}: Props) => {
    const tidTekst = visKlokkeslett ? formaterTid(date) : '';
    const dateTekst = getDateTekst(utvidetTidslinjeHendelseType, date, førsteUttaksdagISaken, tidligstBehandlingsDato);
    return (
        <div
            className={classNames(
                styles.tidslinjeHendelse,
                getTimelineClassModifier(date, isActiveStep),
                isActiveStep && finnesHendelserFørAktivtSteg && !visHeleTidslinjen
                    ? styles.aktivErIkkeFørsteHendelse
                    : undefined,
                erSistePåForsidenMenIkkeSisteIHeleTidslinjen ? styles.sisteHendelsePåForsiden : undefined,
            )}
        >
            <div className={classNames(styles.ikon, getIkonClassElement(isActiveStep, date))}>
                {dayjs(date).isSameOrBefore(dayjs(), 'd') && (
                    <RecordFillIcon width="20" height="20" aria-hidden={true} />
                )}
                {dayjs(date).isAfter(dayjs(), 'd') && <RecordIcon width="20" height="20" aria-hidden={true} />}
            </div>

            <div className={styles.tekst}>
                <BodyShort size="small" className={styles.title}>
                    {title}
                </BodyShort>
                <Detail className={styles.date}>{`${dateTekst} ${tidTekst}`}</Detail>
                {children}
            </div>
        </div>
    );
};
