import * as React from 'react';
import InnholdMedLedetekst from 'common/components/innhold-med-ledetekst/InnholdMedLedetekst';

interface Props {
    ledetekst: string;
    children: JSX.Element | JSX.Element[];
}

const KompleksFeltoppsummering: React.StatelessComponent<Props> = ({ ledetekst, children }) => (
    <InnholdMedLedetekst className="feltoppsummering" ledetekst={ledetekst} children={children} />
);

export default KompleksFeltoppsummering;
