import { bemUtils } from '@navikt/fp-common';
import { BodyShort, Heading } from '@navikt/ds-react';
import { Success, Warning, Clock } from '@navikt/ds-icons';
import React from 'react';
import { formaterDato, formaterTid } from 'app/utils/dateUtils';
import './tidslinje-hendelse.css';
import dayjs from 'dayjs';

type TidslinjeHendelseType = 'completed' | 'incomplete' | 'warning';

interface Props {
    children: React.ReactNode;
    date: Date;
    title: string;
    type: TidslinjeHendelseType;
}

const bem = bemUtils('tidslinje-hendelse');

const getIkon = (type: TidslinjeHendelseType) => {
    switch (type) {
        case 'completed':
            return <Success height="32" width="32" className={bem.element('ikon', 'completed')} />;
        case 'warning':
            return <Warning height="32" width="32" className={bem.element('ikon', 'warning')} />;
        case 'incomplete':
            return <Clock height="32" width="32" className={bem.element('ikon', 'incomplete')} />;
        default:
            return null;
    }
};

const TidslinjeHendelse: React.FunctionComponent<Props> = ({ type, date, title, children }) => {
    let dateTekst = formaterDato(date, 'D. MMM YYYY').toUpperCase();
    if (dayjs(date).isSame(new Date(), 'd')) {
        dateTekst = 'I DAG';
    }
    if (dayjs(date).isSame(dayjs(new Date()).subtract(1, 'd'), 'd')) {
        dateTekst = 'I GÅR';
    }
    const tidTekst = formaterTid(date);
    return (
        <div className={bem.block}>
            <div className={bem.element('ikon')}>{getIkon(type)}</div>
            <div>
                <Heading level="3" size="small">
                    {title}
                </Heading>
                <BodyShort size="small" className={bem.element('date')}>{`${dateTekst} ${tidTekst}`}</BodyShort>
                {children}
            </div>
        </div>
    );
};

export default TidslinjeHendelse;
