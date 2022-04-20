import { Element } from 'nav-frontend-typografi';
import React from 'react';

interface Props {
    legend: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const Fieldset: React.FunctionComponent<Props> = ({ legend, className, children }) => {
    return (
        <fieldset
            className={className}
            style={{ display: 'flex', flexDirection: 'column', border: 'none', padding: '0', margin: '0' }}
        >
            <legend style={{ margin: '0 0 0.5rem 0' }}>
                <Element>{legend}</Element>
            </legend>
            {children}
        </fieldset>
    );
};

export default Fieldset;
