// import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';
import { Element } from 'nav-frontend-typografi';
import React from 'react';

interface Props {
    children: React.ReactNode;
    info?: React.ReactNode;
    apneLabel?: React.ReactNode;
}

const LabelWithUtvidetInformasjon: React.FunctionComponent<Props> = ({ children, info, apneLabel }) => {
    if (!children) {
        return null;
    }

    if (info === undefined) {
        return <Element tag="span">{children}</Element>;
    }

    return (
        <>
            <Element tag="span">{children}</Element>
            {info && <div>{info}</div>}
        </>
    );
};

export default LabelWithUtvidetInformasjon;
