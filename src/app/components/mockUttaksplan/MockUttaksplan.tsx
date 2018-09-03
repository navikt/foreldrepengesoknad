import * as React from 'react';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import { formaterDato } from 'common/util/datoUtils';
import { Undertittel, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

export interface Props {
    perioder: Periode[];
}

const detaljer = (periode: Periode) => {
    if (periode.type === Periodetype.Uttak) {
        return (
            <Normaltekst>
                Konto: <em>{periode.konto}</em>, forelder: {periode.forelder}
            </Normaltekst>
        );
    }
    if (periode.type === Periodetype.Utsettelse) {
        return (
            <Normaltekst>
                Årsak: <em>{periode.årsak}</em>, forelder: {periode.forelder}
            </Normaltekst>
        );
    }
    return <span />;
};

const MockUttaksplan: React.StatelessComponent<Props> = (props) => (
    <div className="typo-normal">
        <h2>Mock uttaksplan er generert for innsending</h2>
        <p>
            Frem til ny ny uttaksplan er på plass, genereres en mock-uttaksplan basert på antall foreldre og
            familiehendelsesdato og legges til i søknaden. Det genererers kun for fødsel-situasjonen.
        </p>
        <h3>Perioder:</h3>
        <ol className="blokk-l">
            {props.perioder.map((p) => (
                <li key={p.id} className="blokk-m">
                    <EtikettLiten>
                        {formaterDato(p.tidsperiode.fom)} - {formaterDato(p.tidsperiode.tom)}
                    </EtikettLiten>
                    <Undertittel>
                        Periodetype: {p.type} {detaljer(p)}
                    </Undertittel>
                </li>
            ))}
        </ol>
    </div>
);

export default MockUttaksplan;
