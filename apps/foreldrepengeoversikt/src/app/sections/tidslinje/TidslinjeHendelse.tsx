import { bemUtils } from '@navikt/fp-common';
import { BodyShort, Detail } from '@navikt/ds-react';
import { RecordFillIcon, RecordIcon } from '@navikt/aksel-icons';
import { formaterDato, formaterTid } from 'app/utils/dateUtils';
import './tidslinje-hendelse.css';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { TidslinjehendelseType } from 'app/types/TidslinjehendelseType';
import { getTidligstDatoForInntektsmelding } from 'app/utils/tidslinjeUtils';

interface Props {
    children: React.ReactNode;
    date: Date;
    title: string;
    isActiveStep: boolean;
    visKlokkeslett: boolean;
    type: TidslinjehendelseType;
    førsteUttaksdagISaken: Date | undefined;
    tidligstBehandlingsDato: Date | undefined;
    finnesHendelserFørAktivtSteg: boolean;
    visHeleTidslinjen: boolean;
}

const bem = bemUtils('tidslinje-hendelse');

const getIkonClassElement = (isActiveStep: boolean, opprettet: Date) => {
    if (isActiveStep) {
        return 'ikon_active';
    } else if (dayjs(opprettet).isBefore(dayjs())) {
        return 'ikon_completed';
    }
    return 'ikon_incomplete';
};

const getTimelineClassModifier = (opprettet: Date, isActiveStep: boolean) => {
    if (isActiveStep) {
        return 'active';
    }
    if (dayjs(opprettet).isBefore(dayjs())) {
        return 'complete';
    }
    return 'incomplete';
};

const getDateTekst = (
    type: TidslinjehendelseType,
    date: Date,
    førsteUttaksdagISaken: Date | undefined,
    tidligstBehandlingsDato: Date | undefined
) => {
    if (type === TidslinjehendelseType.VENTER_INNTEKTSMELDING) {
        const tidligstDato = getTidligstDatoForInntektsmelding(førsteUttaksdagISaken);
        if (dayjs(tidligstDato).isAfter(dayjs())) {
            return tidligstDato ? `TIDLIGST ${formaterDato(tidligstDato, 'D. MMM YYYY').toUpperCase()}` : '';
        } else {
            return 'SNAREST';
        }
    } else if (type === TidslinjehendelseType.VENTER_PGA_TIDLIG_SØKNAD) {
        return `TIDLIGST ${formaterDato(tidligstBehandlingsDato, 'D. MMM YYYY').toUpperCase()}`;
    } else if ([TidslinjehendelseType.VENTER_MELDEKORT, TidslinjehendelseType.VENT_DOKUMENTASJON].includes(type)) {
        return 'SNAREST';
    } else if (type === TidslinjehendelseType.FREMTIDIG_VEDTAK) {
        return 'SENERE';
    } else if (dayjs(date).isSame(new Date(), 'd')) {
        return 'I DAG';
    } else if (dayjs(date).isSame(dayjs(new Date()).subtract(1, 'd'), 'd')) {
        return 'I GÅR';
    } else {
        return formaterDato(date, 'D. MMM YYYY').toUpperCase();
    }
};

const TidslinjeHendelse: React.FunctionComponent<Props> = ({
    date,
    title,
    children,
    isActiveStep,
    visKlokkeslett,
    type,
    førsteUttaksdagISaken,
    tidligstBehandlingsDato,
    finnesHendelserFørAktivtSteg,
    visHeleTidslinjen,
}) => {
    const tidTekst = visKlokkeslett ? formaterTid(date) : '';
    const dateTekst = getDateTekst(type, date, førsteUttaksdagISaken, tidligstBehandlingsDato);
    return (
        <div
            className={classNames(
                bem.block,
                bem.modifier(`${getTimelineClassModifier(date, isActiveStep)}`),
                bem.modifier(
                    `${
                        isActiveStep && finnesHendelserFørAktivtSteg && !visHeleTidslinjen
                            ? 'aktiv_er_ikke_første_hendelse'
                            : ''
                    }`
                )
            )}
        >
            <div className={classNames(bem.element('ikon'), bem.element(getIkonClassElement(isActiveStep, date)))}>
                {dayjs(date).isSameOrBefore(dayjs(), 'd') && <RecordFillIcon width="20" height="20" />}
                {dayjs(date).isAfter(dayjs(), 'd') && <RecordIcon width="20" height="20" />}
            </div>

            <div className={bem.element('tekst')}>
                <BodyShort size="small" className={bem.element('tittle')}>
                    {title}
                </BodyShort>
                <Detail className={bem.element('date')}>{`${dateTekst} ${tidTekst}`}</Detail>
                {children}
            </div>
        </div>
    );
};

export default TidslinjeHendelse;
