import * as React from 'react';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import { Dekningsgrad } from 'uttaksplan/types';
import AktivitetskravInfo from 'uttaksplan/components/content/AktivitetskravInfo';
import DekningsgradSpørsmål from '../spørsmål/DekningsgradSpørsmål';
import FordelingFellesperiodeSpørsmål from '../spørsmål/FordelingFellesperiodeSpørsmål';

export interface Props {
    form: UttaksplanFormState;
    uttaksgrunnlag: Uttaksgrunnlag;
    onChangeDekningsgrad: (dekningsgrad: Dekningsgrad) => void;
    onChangeFordeling: (uker: number) => void;
}

import './uttaksplanSkjema.less';
import { Uttaksgrunnlag } from 'uttaksplan/utils/uttak/uttaksgrunnlag';
import { UttaksplanFormState } from 'uttaksplan/redux/types';

class UttaksplanSkjema extends React.Component<Props, {}> {
    render() {
        const { form, uttaksgrunnlag, onChangeDekningsgrad, onChangeFordeling } = this.props;

        const { dekningsgrad, ukerFellesperiode, fellesperiodeukerForelder1 } = form;
        const { permisjonsregler } = uttaksgrunnlag;
        const navnForelder1 = uttaksgrunnlag.søker.fornavn;
        const navnForelder2 = uttaksgrunnlag.annenForelder ? uttaksgrunnlag.annenForelder.fornavn : 'Forelder 2';

        return (
            <React.Fragment>
                <div className="blokk-m">
                    <DekningsgradSpørsmål
                        dekningsgrad={dekningsgrad}
                        antallUkerTotalt80={permisjonsregler.antallUkerTotalt80}
                        antallUkerTotalt100={permisjonsregler.antallUkerTotalt100}
                        permisjonsregler={permisjonsregler}
                        onChange={onChangeDekningsgrad}
                    />
                </div>

                <EkspanderbartInnhold erApen={dekningsgrad && uttaksgrunnlag.annenForelder !== undefined}>
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
