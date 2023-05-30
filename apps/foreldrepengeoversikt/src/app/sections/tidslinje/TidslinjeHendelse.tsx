import { bemUtils } from '@navikt/fp-common';
import { BodyShort, Detail } from '@navikt/ds-react';
import { RecordFillIcon, RecordIcon } from '@navikt/aksel-icons';
import { formaterDato, formaterTid } from 'app/utils/dateUtils';
import './tidslinje-hendelse.css';
import dayjs from 'dayjs';
import classNames from 'classnames';

interface Props {
    children: React.ReactNode;
    date: Date;
    title: string;
    isActiveStep: boolean;
    visKlokkeslett: boolean;
}

const bem = bemUtils('tidslinje-hendelse');

const getIkonClassElement = (isActiveStep: boolean, opprettet: Date) => {
    if (isActiveStep) {
        return 'ikon_active';
    } else if (dayjs(opprettet).isBefore(dayjs(), 'd')) {
        return 'ikon_completed';
    }
    return 'ikon_incomplete';
};

const getTimelineClassModifier = (isActiveStep: boolean) => {
    if (isActiveStep) {
        return 'active';
    }
    return 'inactive';
};

const TidslinjeHendelse: React.FunctionComponent<Props> = ({ date, title, children, isActiveStep, visKlokkeslett }) => {
    let dateTekst = formaterDato(date, 'D. MMM YYYY').toUpperCase();
    if (dayjs(date).isSame(new Date(), 'd')) {
        dateTekst = 'I DAG';
    }
    if (dayjs(date).isSame(dayjs(new Date()).subtract(1, 'd'), 'd')) {
        dateTekst = 'I GÅR';
    }

    const tidTekst = visKlokkeslett ? formaterTid(date) : '';

    return (
        <div className={classNames(bem.block, bem.modifier(`${getTimelineClassModifier(isActiveStep)}`))}>
            <div className={classNames(bem.element('ikon'), bem.element(getIkonClassElement(isActiveStep, date)))}>
                {dayjs(date).isSameOrBefore(dayjs(), 'd') && <RecordFillIcon width="20" height="20" />}
                {dayjs(date).isAfter(dayjs(), 'd') && <RecordIcon width="20" height="20" />}
            </div>

            <div>
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
