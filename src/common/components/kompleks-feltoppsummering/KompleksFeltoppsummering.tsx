import * as React from 'react';
import InnholdMedLedetekst from 'common/components/innhold-med-ledetekst/InnholdMedLedetekst';

interface Props {
    className?: string;
    ledetekst: string;
    children: JSX.Element | JSX.Element[];
}

const KompleksFeltoppsummering: React.StatelessComponent<Props> = ({ ledetekst, children, className }) => (
    <InnholdMedLedetekst className={`feltoppsummering ${className}`} ledetekst={ledetekst} children={children} />
);

export default KompleksFeltoppsummering;
