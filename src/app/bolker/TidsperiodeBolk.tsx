import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'common/components/dato-input/DatoInput';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import {
    TidsperiodeMedValgfriSluttdatoPartial,
    TidsperiodePartial
} from 'common/types';
import { Avgrensninger } from 'nav-datovelger';

type TidsperiodeType =
    | TidsperiodePartial
    | TidsperiodeMedValgfriSluttdatoPartial;

export interface DatoAvgrensninger {
    fra?: Avgrensninger;
    til?: Avgrensninger;
}

interface TidsperiodeBolkProps {
    tidsperiode: TidsperiodeType;
    onChange: (tidsperiode: TidsperiodeType) => void;
    sluttdatoDisabled?: boolean;
    datoAvgrensninger?: DatoAvgrensninger;
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
                            onChange={(startdato: Date) => {
                                this.handleOnChange({
                                    ...tidsperiode,
                                    startdato
                                });
                            }}
                            dato={tidsperiode.startdato}
                            avgrensninger={
                                datoAvgrensninger && datoAvgrensninger.fra
                            }
                        />
                    )}
                />

                <Spørsmål
                    render={() => (
                        <DatoInput
                            id="tilDatoInput"
                            label={getMessage(intl, 'tilogmed')}
                            onChange={(sluttdato: Date) => {
                                this.handleOnChange({
                                    ...tidsperiode,
                                    sluttdato
                                });
                            }}
                            dato={tidsperiode.sluttdato}
                            disabled={false || sluttdatoDisabled}
                            avgrensninger={
                                datoAvgrensninger && datoAvgrensninger.til
                            }
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

export default injectIntl(TidsperiodeBolk);
