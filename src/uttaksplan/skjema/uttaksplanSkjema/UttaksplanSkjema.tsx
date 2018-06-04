import * as React from 'react';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import { Dekningsgrad, Permisjonsregler } from 'uttaksplan/types';
import AktivitetskravInfo from 'uttaksplan/components/content/AktivitetskravInfo';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
import FordelingFellesperiodeSpørsmål from '../spørsmål/FordelingFellesperiodeSpørsmål';

export interface Props {
    navnForelder1: string;
    navnForelder2: string;
    ukerFellesperiode: number;
    fellesperiodeukerForelder1: number;
    dekningsgrad?: Dekningsgrad;
    permisjonsregler: Permisjonsregler;
    onChangeDekningsgrad: (dekningsgrad: Dekningsgrad) => void;
    onChangeFordeling: (uker: number) => void;
}

class UttaksplanSkjema extends React.Component<Props, {}> {
    render() {
        const {
            navnForelder1,
            navnForelder2,
            dekningsgrad,
            ukerFellesperiode,
            fellesperiodeukerForelder1,
            onChangeDekningsgrad,
            permisjonsregler,
            onChangeFordeling
        } = this.props;
        return (
            <React.Fragment>
                <div className="blokk-m">
                    <DekningsgradSpørsmål
                        dekningsgrad={dekningsgrad}
                        antallUkerTotalt80={permisjonsregler.antallUkerTotalt80}
                        antallUkerTotalt100={
                            permisjonsregler.antallUkerTotalt100
                        }
                        permisjonsregler={permisjonsregler}
                        onChange={onChangeDekningsgrad}
                    />
                </div>

                <EkspanderbartInnhold
                    animert={false}
                    erApen={dekningsgrad !== undefined}>
                    <div className="blokk-s">
                        <FordelingFellesperiodeSpørsmål
                            navnForelder1={navnForelder1}
                            navnForelder2={navnForelder2}
                            ukerFellesperiode={ukerFellesperiode}
                            ukerForelder1={fellesperiodeukerForelder1}
                            onChange={onChangeFordeling}
                            introRenderer={() => (
                                <AktivitetskravInfo
                                    permisjonsregler={permisjonsregler}
                                    navnForelder1={navnForelder1}
                                    navnForelder2={navnForelder2}
                                />
                            )}
                        />
                    </div>
                </EkspanderbartInnhold>
            </React.Fragment>
        );
    }
}
export default UttaksplanSkjema;
