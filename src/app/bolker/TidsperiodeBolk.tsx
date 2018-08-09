import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import {
    TidsperiodeMedValgfriSluttdatoPartial,
    TidsperiodePartial
} from 'common/types';
import { Avgrensninger } from 'nav-datovelger';
import { Validator } from 'common/lib/validation/types/index';
import DatoInput from 'common/wrappers/skjemaelementer/DatoInput';

type TidsperiodeType =
    | TidsperiodePartial
    | TidsperiodeMedValgfriSluttdatoPartial;

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
    onChange: (tidsperiode: TidsperiodeType) => void;
    sluttdatoDisabled?: boolean;
    datoAvgrensninger?: DatoAvgrensninger;
    datoValidatorer?: DatoValidatorer;
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
        const {
            tidsperiode,
            datoAvgrensninger,
            datoValidatorer,
            intl,
            sluttdatoDisabled
        } = this.props;

        return (
            <React.Fragment>
                <Spørsmål
                    render={() => (
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
                            avgrensninger={
                                datoAvgrensninger && datoAvgrensninger.fra
                            }
                            validators={datoValidatorer && datoValidatorer.fra}
                        />
                    )}
                />

                <Spørsmål
                    render={() => (
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
                            avgrensninger={
                                datoAvgrensninger && datoAvgrensninger.til
                            }
                            validators={datoValidatorer && datoValidatorer.til}
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

export default injectIntl(TidsperiodeBolk);
