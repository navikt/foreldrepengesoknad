import * as React from 'react';
import { Periode } from 'uttaksplan/types';
import { Uttaksgrunnlag } from 'uttaksplan/utils/uttak/uttaksgrunnlag';
import { getUttaksinfo } from 'uttaksplan/utils/uttak/uttaksinfo';

export interface Props {
    uttaksgrunnlag?: Uttaksgrunnlag;
    perioder: Periode[];
}

const DevBeregning: React.StatelessComponent<Props> = ({
    uttaksgrunnlag,
    perioder
}) => {
    const uttaksinfo = getUttaksinfo(perioder);
    return (
        <div className="dev-only blokk-xl">
            {}

            {uttaksinfo && (
                <div className="panel">
                    <h3>Uttaksinfo</h3>
                    <ul>
                        <li>
                            Første registrerte uttaksdag:{' '}
                            {uttaksinfo.registrertTidsperiode.startdato.toDateString()}
                        </li>
                        <li>
                            Siste registrerte uttaksdag:{' '}
                            {uttaksinfo.registrertTidsperiode.sluttdato.toDateString()}
                        </li>
                        <li>
                            Siste registrerte uttaksdag (inkludert opphold):{' '}
                            {uttaksinfo.registrertTidsperiodeInkludertOpphold.sluttdato.toDateString()}
                        </li>
                        <li>
                            Siste beregnet uttaksdag:{' '}
                            {uttaksinfo.sluttdatoGittUttaksdager.toDateString()}
                        </li>
                        <li>
                            Antall dager uttak: {uttaksinfo.antallDagerUttak}
                        </li>
                        <li>
                            Antall dager opphold:{' '}
                            {uttaksinfo.antallDagerOpphold}
                        </li>
                        <li>
                            Antall dager utsettelser:{' '}
                            {uttaksinfo.antallDagerUtsettelser}
                        </li>
                        <li>
                            Antall dager totalt: {uttaksinfo.antallDagerTotalt}
                        </li>
                    </ul>
                </div>
            )}
            {uttaksgrunnlag && (
                <div className="panel">
                    <h3>Uttaksdatoer</h3>
                    <ul>
                        {Object.keys(uttaksgrunnlag.datoer).map((d, idx) => (
                            <React.Fragment key={idx}>
                                <li>
                                    {d}:{' '}
                                    {(uttaksgrunnlag.datoer[
                                        d
                                    ] as Date).toDateString()}
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
                            familiehendelsedato:{' '}
                            {uttaksgrunnlag.familiehendelsedato.toDateString()}
                        </li>
                        <li>Dekningsgrad: {uttaksgrunnlag.dekningsgrad}</li>
                        <li>
                            To foreldre:{' '}
                            {uttaksgrunnlag.annenForelder !== undefined
                                ? 'Ja'
                                : 'Nei'}
                        </li>
                        <li>
                            Antall uttaksdager tilgjengelig:{' '}
                            {uttaksgrunnlag.antallUttaksdagerTilgjengelig}
                        </li>
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
