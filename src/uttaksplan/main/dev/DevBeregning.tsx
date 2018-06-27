import * as React from 'react';
import { Uttaksdatoer, Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';

export interface Props {
    uttaksdatoer?: Uttaksdatoer;
    uttaksgrunnlag?: Uttaksgrunnlag;
}

const DevBeregning: React.StatelessComponent<Props> = ({
    uttaksdatoer,
    uttaksgrunnlag
}) => {
    return (
        <div className="dev-only blokk-xl">
            {uttaksdatoer && (
                <div className="panel">
                    <h3>Uttaksdatoer</h3>
                    <ul>
                        {Object.keys(uttaksdatoer).map((d, idx) => (
                            <React.Fragment key={idx}>
                                <li>
                                    {d}:{' '}
                                    {(uttaksdatoer[d] as Date).toDateString()}
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            )}
            {uttaksgrunnlag && (
                <div className="panel">
                    <h3>Uttaksgrunnlag</h3>
                    <ul>
                        <li>
                            Familiehendelsesdato:{' '}
                            {uttaksgrunnlag.termindato.toDateString()}
                        </li>
                        <li>Dekningsgrad: {uttaksgrunnlag.dekningsgrad}</li>
                        <li>Antall barn: {uttaksgrunnlag.antallBarn}</li>
                        <li>
                            Er barnet født:{' '}
                            {uttaksgrunnlag.erBarnetFødt ? 'Ja' : 'Nei'}
                        </li>
                        <li>Søkers kjønn: {uttaksgrunnlag.søker.kjønn}</li>
                        <li>
                            Aleneomsorg:{' '}
                            {uttaksgrunnlag.søker.erAleneOmOmsorg
                                ? 'Ja'
                                : 'Nei'}
                        </li>
                        <li>Søkerrolle: {uttaksgrunnlag.søker.rolle}</li>
                        <li>
                            Søkersituasjon: {uttaksgrunnlag.søker.situasjon}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DevBeregning;
