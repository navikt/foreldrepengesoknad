import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'common/components/dato-input/DatoInput';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import {
    TidsperiodeMedValgfriSluttdatoPartial,
    TidsperiodePartial
} from 'common/types';

type TidsperiodeType =
    | TidsperiodePartial
    | TidsperiodeMedValgfriSluttdatoPartial;

interface TidsperiodeBolkProps {
    tidsperiode: TidsperiodeType;
    onChange: (tidsperiode: TidsperiodeType) => void;
    sluttdatoDisabled?: boolean;
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
        const { tidsperiode, intl, sluttdatoDisabled } = this.props;

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
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

export default injectIntl(TidsperiodeBolk);
