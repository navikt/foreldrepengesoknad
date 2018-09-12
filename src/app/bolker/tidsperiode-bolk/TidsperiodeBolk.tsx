import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { TidsperiodeMedValgfriSluttdatoPartial, TidsperiodePartial } from 'common/types';
import { Avgrensninger } from 'nav-datovelger';
import { Validator } from 'common/lib/validation/types/index';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import BEMHelper from 'common/util/bem';
import { getVarighetString } from 'common/util/intlUtils';
import { Tidsperioden } from '../../util/uttaksplan/Tidsperioden';

import './tidsperiodeBolk.less';
import { Normaltekst } from 'nav-frontend-typografi';

type TidsperiodeType = TidsperiodePartial | TidsperiodeMedValgfriSluttdatoPartial;

export interface DatoAvgrensninger {
    fra?: Avgrensninger;
    til?: Avgrensninger;
}

export interface DatoValidatorer {
    fra?: Validator[];
    til?: Validator[];
}

interface TidsperiodeBolkProps {
    tidsperiode: TidsperiodeType;
    sluttdatoDisabled?: boolean;
    datoAvgrensninger?: DatoAvgrensninger;
    datoValidatorer?: DatoValidatorer;
    visVarighet?: boolean;
    onChange: (tidsperiode: TidsperiodeType) => void;
}

type Props = TidsperiodeBolkProps & InjectedIntlProps;

class TidsperiodeBolk extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(tidsperiode: TidsperiodeType) {
        const { onChange } = this.props;
        onChange(tidsperiode);
    }

    render() {
        const { tidsperiode, datoAvgrensninger, datoValidatorer, visVarighet, intl, sluttdatoDisabled } = this.props;
        const bem = BEMHelper('tidsperiodeBolk');

        const varighetIDager =
            tidsperiode && tidsperiode.fom && tidsperiode.tom
                ? Tidsperioden({ fom: tidsperiode.fom, tom: tidsperiode.tom }).getAntallUttaksdager()
                : undefined;
        return (
            <div className={bem.className}>
                <div className={bem.element('fra')}>
                    <Block margin="none">
                        <DatoInput
                            id="fraDatoInput"
                            label={getMessage(intl, 'fraogmed')}
                            onChange={(fom: Date) => {
                                this.handleOnChange({
                                    ...tidsperiode,
                                    fom
                                });
                            }}
                            dato={tidsperiode.fom}
                            avgrensninger={datoAvgrensninger && datoAvgrensninger.fra}
                            validators={datoValidatorer && datoValidatorer.fra}
                        />
                    </Block>
                </div>

                <div className={bem.element('til')}>
                    <Block margin="none">
                        <DatoInput
                            id="tilDatoInput"
                            label={getMessage(intl, 'tilogmed')}
                            onChange={(tom: Date) => {
                                this.handleOnChange({
                                    ...tidsperiode,
                                    tom
                                });
                            }}
                            dato={tidsperiode.tom}
                            disabled={false || sluttdatoDisabled}
                            avgrensninger={datoAvgrensninger && datoAvgrensninger.til}
                            validators={datoValidatorer && datoValidatorer.til}
                        />
                    </Block>
                </div>
                {visVarighet &&
                    varighetIDager !== undefined && (
                        <Normaltekst className={bem.element('varighet')}>
                            {getVarighetString(varighetIDager, intl)}
                        </Normaltekst>
                    )}
            </div>
        );
    }
}

export default injectIntl(TidsperiodeBolk);
