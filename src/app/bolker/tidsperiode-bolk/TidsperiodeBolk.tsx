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
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';

export interface DatoAvgrensninger {
    helgedagerIkkeTillatt?: boolean;
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
    feil?: Feil;
    visVarighet?: boolean;
    varighetRenderer?: (varighetIDager: number) => React.ReactNode;
    onChange: (tidsperiode: Partial<Tidsperiode>) => void;
    datoInputLabelProps?: {
        fom: string;
        tom: string;
    };
    defaultMånedFom?: Date;
    defaultMånedTom?: Date;
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
            feil,
            intl,
            varighetRenderer,
            startdatoDisabled,
            sluttdatoDisabled,
            defaultMånedFom,
            defaultMånedTom,
            datoInputLabelProps
        } = this.props;
        const bem = BEMHelper('tidsperiodeBolk');

        const varighetIDager =
            tidsperiode &&
            tidsperiode.fom &&
            tidsperiode.tom &&
            moment(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
                ? Tidsperioden({ fom: tidsperiode.fom, tom: tidsperiode.tom }).getAntallUttaksdager()
                : undefined;

        let tilAvgrensninger: Avgrensninger = {};
        if (datoAvgrensninger && datoAvgrensninger.til) {
            tilAvgrensninger = datoAvgrensninger.til;
        } else if (tidsperiode.fom) {
            tilAvgrensninger = { minDato: tidsperiode.fom };
        }
        return (
            <SkjemaGruppe feil={feil}>
                <div className={bem.className}>
                    <div className={bem.element('fra')}>
                        <Block margin="none">
                            <DatoInput
                                name="fraDatoInput"
                                id="fraDatoInput"
                                label={datoInputLabelProps ? datoInputLabelProps.fom : getMessage(intl, 'fraogmed')}
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
                                dayPickerProps={{ initialMonth: defaultMånedFom }}
                            />
                        </Block>
                    </div>

                    <div className={bem.element('til')}>
                        <Block margin="none">
                            <DatoInput
                                name="tilDatoInput"
                                id="tilDatoInput"
                                label={datoInputLabelProps ? datoInputLabelProps.tom : getMessage(intl, 'tilogmed')}
                                onChange={(tom: Date | undefined) => {
                                    this.handleOnChange({
                                        ...tidsperiode,
                                        tom
                                    });
                                }}
                                dato={tidsperiode.tom}
                                disabled={sluttdatoDisabled}
                                avgrensninger={tilAvgrensninger}
                                validators={datoValidatorer && datoValidatorer.til}
                                dayPickerProps={{ initialMonth: defaultMånedTom }}
                            />
                        </Block>
                    </div>
                    {visVarighet &&
                        varighetIDager !== undefined && (
                            <Normaltekst className={bem.element('varighet')}>
                                {varighetRenderer
                                    ? varighetRenderer(varighetIDager)
                                    : getVarighetString(varighetIDager, intl)}
                            </Normaltekst>
                        )}
                </div>
            </SkjemaGruppe>
        );
    }
}

export default injectIntl(TidsperiodeBolk);
