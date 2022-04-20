import * as React from 'react';
import InnholdMedLedetekst from '../InnholdMedLedetekst';

interface Props {
    className?: string;
    ledetekst: string;
    children: JSX.Element | JSX.Element[];
}

const KompleksFeltoppsummering: React.FunctionComponent<Props> = ({ ledetekst, children, className }) => (
    <InnholdMedLedetekst className={`feltoppsummering ${className}`} ledetekst={ledetekst}>
        {children}
    </InnholdMedLedetekst>
);

export default KompleksFeltoppsummering;
