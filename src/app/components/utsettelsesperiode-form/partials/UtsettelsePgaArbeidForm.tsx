import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import { InputChangeEvent } from '../../../types/dom/Events';
import Input from 'common/components/skjema/wrappers/Input';
import Block from 'common/components/block/Block';
import { StønadskontoType, UtsettelsePgaArbeid, Uttaksperiode } from '../../../types/uttaksplan/periodetyper';
import { getFloatFromString } from 'common/util/numberUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RecursivePartial } from '../../../types/Partial';
import { isStillingsprosentAbove0AndLessThan100 } from '../../../util/validation/fields/stillingsprosent';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import Søknad from '../../../types/søknad/Søknad';
import {
    getAktuelleStønadskontoerForSøker,
    getVelgbareStønadskontotyper
} from '../../../util/uttaksplan/aktuelleStønadskontoer';

interface UtsettelsePgaArbeidFormProps {
    onChange: (v: RecursivePartial<UtsettelsePgaArbeid> | RecursivePartial<Uttaksperiode>) => void;
    periode: RecursivePartial<UtsettelsePgaArbeid> | RecursivePartial<Uttaksperiode>;
}

interface StateProps {
    søknad: Søknad;
}

type Props = UtsettelsePgaArbeidFormProps & StateProps & InjectedIntlProps;

class UtsettelsePgaArbeidForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleStillingsprosentBlur = this.handleStillingsprosentBlur.bind(this);
    }

    handleStillingsprosentBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { onChange } = this.props;
        const pst = getFloatFromString(e.target.value);
        onChange({
            stillingsprosent: pst ? pst.toFixed(1) : e.target.value
        });
    }

    render() {
        const { periode, søknad, onChange, intl } = this.props;
        const stillingsprosent = (periode as UtsettelsePgaArbeid).stillingsprosent;
        const aktuelleStønadskontoer = getAktuelleStønadskontoerForSøker(søknad);
        const velgbareStønadskontor = getVelgbareStønadskontotyper(aktuelleStønadskontoer);
        return (
            <React.Fragment>
                <Block>
                    <Input
                        bredde="XS"
                        label={getMessage(intl, 'stillingsprosent')}
                        onChange={(e: InputChangeEvent) =>
                            onChange({
                                stillingsprosent: e.target.value
                            })
                        }
                        onBlur={this.handleStillingsprosentBlur}
                        value={stillingsprosent || ''}
                        maxLength={4}
                    />
                </Block>

                <Block visible={isStillingsprosentAbove0AndLessThan100(stillingsprosent)}>
                    <HvilkenKvoteSkalBenyttesSpørsmål
                        onChange={(stønadskonto: StønadskontoType) => {
                            const updatedPeriode = periode as RecursivePartial<Uttaksperiode>;
                            onChange({ ...updatedPeriode, konto: stønadskonto });
                        }}
                        velgbareStønadskontoer={velgbareStønadskontor}
                    />
                </Block>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return { søknad: state.søknad };
};
export default connect(mapStateToProps)(injectIntl(UtsettelsePgaArbeidForm));
