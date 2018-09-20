import * as React from 'react';
import moment from 'moment';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Tidsperiode } from 'common/types';
import { Avgrensninger } from 'nav-datovelger';
import { Validator } from 'common/lib/validation/types/index';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import BEMHelper from 'common/util/bem';
import { getVarighetString } from 'common/util/intlUtils';
import { Tidsperioden } from '../../util/uttaksplan/Tidsperioden';

import './tidsperiodeBolk.less';
import { Normaltekst } from 'nav-frontend-typografi';

export interface DatoAvgrensninger {
    fra?: Avgrensninger;
    til?: Avgrensninger;
}

export interface DatoValidatorer {
    fra?: Validator[];
    til?: Validator[];
}

interface TidsperiodeBolkProps {
    tidsperiode: Partial<Tidsperiode>;
    startdatoDisabled?: boolean;
    sluttdatoDisabled?: boolean;
    datoAvgrensninger?: DatoAvgrensninger;
    datoValidatorer?: DatoValidatorer;
    visVarighet?: boolean;
    onChange: (tidsperiode: Partial<Tidsperiode>) => void;
}

type Props = TidsperiodeBolkProps & InjectedIntlProps;

class TidsperiodeBolk extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(tidsperiode: Partial<Tidsperiode>) {
        const { onChange } = this.props;
        onChange(tidsperiode);
    }

    render() {
        const {
            tidsperiode,
            datoAvgrensninger,
            datoValidatorer,
            visVarighet,
            intl,
            startdatoDisabled,
            sluttdatoDisabled
        } = this.props;
        const bem = BEMHelper('tidsperiodeBolk');

        const varighetIDager =
            tidsperiode && tidsperiode.fom && tidsperiode.tom && moment(tidsperiode.fom).isSameOrBefore(tidsperiode.tom)
                ? Tidsperioden({ fom: tidsperiode.fom, tom: tidsperiode.tom }).getAntallUttaksdager()
                : undefined;

        let tilAvgrensninger: Avgrensninger = {};
        if (datoAvgrensninger && datoAvgrensninger.til) {
            tilAvgrensninger = datoAvgrensninger.til;
        } else if (tidsperiode.fom) {
            tilAvgrensninger = { minDato: tidsperiode.fom };
        }

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
                            disabled={startdatoDisabled}
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
                            onChange={(tom: Date | undefined) => {
                                this.handleOnChange({
                                    ...tidsperiode,
                                    tom
                                });
                            }}
                            dato={tidsperiode.tom}
                            disabled={false || sluttdatoDisabled}
                            avgrensninger={tilAvgrensninger}
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
