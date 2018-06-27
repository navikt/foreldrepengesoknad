import * as React from 'react';
import { Uttaksdatoer } from 'uttaksplan/types/uttaksgrunnlag';

export interface Props {
    uttaksdatoer: Uttaksdatoer;
}

const DevBeregning: React.StatelessComponent<Props> = ({ uttaksdatoer }) => {
    return (
        <div className="panel">
            <h2>Uttaksdatoer</h2>
            <ul>
                {Object.keys(uttaksdatoer).map((d, idx) => (
                    <React.Fragment>
                        <li key={idx}>
                            {d}: {(uttaksdatoer[d] as Date).toDateString()}
                        </li>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default DevBeregning;
