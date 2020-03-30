import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import moment from 'moment';
import { guid } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';

import getMessage from 'common/util/i18nUtils';
import { Avgrensninger, Tidsperiode, TidsperiodeMedValgfriSluttdato } from 'common/types';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import BEMHelper from 'common/util/bem';
import { getVarighetString } from 'common/util/intlUtils';
import { Tidsperioden } from '../../../util/uttaksplan/Tidsperioden';
import { KalenderPlassering } from 'nav-datovelger/dist/datovelger/types';
import { DateValue } from '../../../types/common';
import { InputChangeEvent } from '../../../../common/types/Events';
import { Validator, SkjemaelementFeil } from 'common/lib/validation/types';
import { getTidsperiodeRegler } from '../../../util/validation/tidsperiode';
import Block from 'common/components/block/Block';

import './tidsperiodeBolk.less';

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
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato | Tidsperiode>;
    pågående?: boolean;
    startdatoDisabled?: boolean;
    datoAvgrensninger?: DatoAvgrensninger;
    datoValidatorer?: DatoValidatorer;
    feil?: SkjemaelementFeil;
    visVarighet?: boolean;
    varighetRenderer?: (varighetIDager: number) => React.ReactNode;
    onChange: (tidsperiode: Partial<Tidsperiode>) => void;
    datoInputLabelProps?: {
        fom: string;
        tom: string;
    };
    defaultMånedFom?: Date;
    defaultMånedTom?: Date;
    kalenderplassering?: KalenderPlassering;
    kanVelgeUgyldigDato?: boolean;
    visPågåendePeriodeCheckbox?: boolean;
}

type Props = TidsperiodeBolkProps & InjectedIntlProps;

class TidsperiodeBolk extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(tidsperiode: Partial<TidsperiodeMedValgfriSluttdato>) {
        const { onChange } = this.props;
        onChange(tidsperiode);
    }

    getValidators() {
        const { tidsperiode, intl, visPågåendePeriodeCheckbox, datoValidatorer, pågående } = this.props;
        const tidsperiodeValidators = getTidsperiodeRegler(tidsperiode, intl, visPågåendePeriodeCheckbox, pågående);
        if (datoValidatorer) {
            if (datoValidatorer.fra && tidsperiodeValidators.fra) {
                tidsperiodeValidators.fra.push(...datoValidatorer.fra);
            }
            if (datoValidatorer.til && tidsperiodeValidators.til) {
                tidsperiodeValidators.til.push(...datoValidatorer.til);
            }
        }
        return tidsperiodeValidators;
    }

    render() {
        const {
            tidsperiode,
            pågående,
            datoAvgrensninger,
            visVarighet,
            feil,
            intl,
            varighetRenderer,
            startdatoDisabled,
            defaultMånedFom,
            defaultMånedTom,
            datoInputLabelProps,
            kanVelgeUgyldigDato,
            kalenderplassering,
            visPågåendePeriodeCheckbox = false
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

        const validators = this.getValidators();

        return (
            <SkjemaGruppe feil={feil}>
                <div className={bem.block}>
                    <div className={bem.element('fra')}>
                        <Block margin="none">
                            <DatoInput
                                name="fraDatoInput"
                                id={guid()}
                                label={datoInputLabelProps ? datoInputLabelProps.fom : getMessage(intl, 'fraogmed')}
                                onChange={(fom: Date) => {
                                    this.handleOnChange({
                                        ...tidsperiode,
                                        fom
                                    });
                                }}
                                kanVelgeUgyldigDato={kanVelgeUgyldigDato}
                                disabled={startdatoDisabled}
                                dato={tidsperiode.fom}
                                datoAvgrensinger={datoAvgrensninger && datoAvgrensninger.fra}
                                validators={validators.fra}
                                dayPickerProps={{ initialMonth: defaultMånedFom }}
                                kalender={{ plassering: kalenderplassering }}
                            />
                        </Block>
                    </div>

                    <div className={bem.element('til')}>
                        <Block margin="none">
                            <DatoInput
                                name="tilDatoInput"
                                id={guid()}
                                label={datoInputLabelProps ? datoInputLabelProps.tom : getMessage(intl, 'tilogmed')}
                                onChange={(tom: DateValue) => {
                                    this.handleOnChange({
                                        ...tidsperiode,
                                        tom
                                    });
                                }}
                                kanVelgeUgyldigDato={kanVelgeUgyldigDato}
                                dato={tidsperiode.tom}
                                disabled={pågående || false}
                                datoAvgrensinger={tilAvgrensninger}
                                validators={validators.til}
                                dayPickerProps={{
                                    initialMonth: defaultMånedTom || tidsperiode.fom
                                }}
                                kalender={{ plassering: kalenderplassering }}
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

                <div className={bem.element('pågående-checkbox')}>
                    <Block visible={visPågåendePeriodeCheckbox}>
                        <Checkbox
                            name="pågående"
                            checked={pågående || false}
                            label={getMessage(intl, 'pågående')}
                            onChange={(e: InputChangeEvent) => {
                                this.handleOnChange({
                                    ...tidsperiode,
                                    tom: undefined,
                                    pågående: e.target.checked
                                });
                            }}
                        />
                    </Block>
                </div>
            </SkjemaGruppe>
        );
    }
}

export default injectIntl(TidsperiodeBolk);
