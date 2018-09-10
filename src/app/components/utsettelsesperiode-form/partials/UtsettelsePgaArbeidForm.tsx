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
import SkalDereHaGradertUttakSamtidigSpørsmål from '../../../spørsmål/SkalDereHaGradertUttakSamtidigSpørsmål';

type PeriodePartial = RecursivePartial<UtsettelsePgaArbeid> | RecursivePartial<Uttaksperiode>;

interface UtsettelsePgaArbeidFormProps {
    onChange: (v: PeriodePartial) => void;
    periode: PeriodePartial;
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
        const { periode, søknad, intl, onChange } = this.props;

        const utsettelsePgaArbeidPeriode = periode as UtsettelsePgaArbeid;
        const { stillingsprosent, samtidigGradertUttak } = utsettelsePgaArbeidPeriode;

        const uttaksperiode = periode as Uttaksperiode;
        const { konto } = uttaksperiode;

        const aktuelleStønadskontoer = getAktuelleStønadskontoerForSøker(søknad);
        const velgbareStønadskontoer = getVelgbareStønadskontotyper(aktuelleStønadskontoer);
        const harFlereVelgbareKontoerForGradering =
            isStillingsprosentAbove0AndLessThan100(stillingsprosent) && velgbareStønadskontoer.length > 1;

        return (
            <React.Fragment>
                <Block>
                    <Input
                        bredde="XS"
                        label={getMessage(intl, 'stillingsprosent')}
                        onChange={(e: InputChangeEvent) =>
                            onChange({
                                stillingsprosent: e.target.value,
                                konto: harFlereVelgbareKontoerForGradering === false ? velgbareStønadskontoer[0] : null
                            })
                        }
                        onBlur={this.handleStillingsprosentBlur}
                        value={stillingsprosent || ''}
                        maxLength={4}
                    />
                </Block>

                <Block visible={harFlereVelgbareKontoerForGradering}>
                    <HvilkenKvoteSkalBenyttesSpørsmål
                        onChange={(stønadskonto: StønadskontoType) => {
                            onChange({ konto: stønadskonto });
                        }}
                        velgbareStønadskontoer={velgbareStønadskontoer}
                        stønadskonto={konto}
                    />
                </Block>

                <Block
                    visible={
                        isStillingsprosentAbove0AndLessThan100(stillingsprosent) &&
                        !søknad.søker.erAleneOmOmsorg &&
                        søknad.annenForelder.skalHaForeldrepenger &&
                        søknad.annenForelder.harRettPåForeldrepenger
                    }>
                    <SkalDereHaGradertUttakSamtidigSpørsmål
                        onChange={(v: boolean) => {
                            onChange({ samtidigGradertUttak: v });
                        }}
                        samtidigGradertUttak={samtidigGradertUttak}
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
