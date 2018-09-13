import * as React from 'react';
import {
    Periode,
    StønadskontoType,
    TilgjengeligStønadskonto,
    Uttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { TidsperiodePartial } from 'common/types';
import TidsperiodeBolk from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { RecursivePartial } from '../../types/Partial';
import Søknad from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/aktuelleStønadskontoer';
import Block from 'common/components/block/Block';
import FellesperiodeUttakForm from './fellesperiode-uttak-form/FellesperiodeUttakForm';

interface UttaksperiodeFormProps {
    periode: RecursivePartial<Uttaksperiode>;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

interface StateProps {
    søknad: Søknad;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
}

type Props = UttaksperiodeFormProps & StateProps & InjectedIntlProps;

class UttaksperiodeForm extends React.Component<Props> {
    render() {
        const { periode, tilgjengeligeStønadskontoer, onChange } = this.props;
        const { tidsperiode, konto } = periode;
        const velgbareStønadskontoer = getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer);

        return (
            <React.Fragment>
                <Block margin="s">
                    <TidsperiodeBolk
                        onChange={(t: TidsperiodePartial) => onChange({ tidsperiode: t })}
                        tidsperiode={tidsperiode as TidsperiodePartial}
                    />
                </Block>
                <Block margin="s">
                    <HvilkenKvoteSkalBenyttesSpørsmål
                        onChange={(stønadskonto: StønadskontoType) => {
                            onChange({ konto: stønadskonto });
                        }}
                        velgbareStønadskontoer={velgbareStønadskontoer}
                        stønadskonto={konto}
                    />
                </Block>
                <Block visible={konto === StønadskontoType.Fellesperiode}>
                    <FellesperiodeUttakForm />
                </Block>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad,
        tilgjengeligeStønadskontoer: state.api.tilgjengeligeStønadskontoer
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
