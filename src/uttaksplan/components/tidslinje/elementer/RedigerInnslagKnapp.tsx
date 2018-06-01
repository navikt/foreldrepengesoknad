import * as React from 'react';
import RedigerIkon from 'common/components/ikoner/RedigerIkon';

export interface Props {
    title?: string;
    onClick: () => void;
}

const RedigerInnslagKnapp: React.StatelessComponent<Props> = (props) => (
    <button
        type="button"
        onClick={() => props.onClick()}
        className="redigerUtsettelseKnapp">
        <RedigerIkon />
        <span className="sr-only">Rediger</span>
    </button>
);

export default RedigerInnslagKnapp;
