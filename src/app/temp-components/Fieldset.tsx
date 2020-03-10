import React from 'react';

interface Props {
    legend: string;
    children: React.ReactNode;
    className?: string;
}

const Fieldset: React.FunctionComponent<Props> = ({ legend, className, children }) => {
    return (
        <div className={className} style={{ display: 'flex', flexDirection: 'column' }}>
            {legend}
            {children}
        </div>
    );
};

export default Fieldset;
