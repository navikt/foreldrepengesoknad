import * as React from 'react';
import {
    Periode,
    StønadskontoType,
    TilgjengeligStønadskonto,
    Uttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { TidsperiodePartial } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import Søknad from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/aktuelleStønadskontoer';
import Block from 'common/components/block/Block';
import FellesperiodeUttakForm, {
    FellesperiodeUttakSkjemadata
} from './fellesperiode-uttak-form/FellesperiodeUttakForm';
import { erForelder2 } from '../../util/domain/personUtil';
import { Søkerinfo } from '../../types/søkerinfo';
import { Attachment } from 'common/storage/attachment/types/Attachment';

interface UttaksperiodeFormProps {
    periode: RecursivePartial<Uttaksperiode>;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

interface StateProps {
    søknad: Søknad;
    søkerinfo: Søkerinfo;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
}

type Props = UttaksperiodeFormProps & StateProps & InjectedIntlProps;

class UttaksperiodeForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.getSkjemadataForFellesperiodeUttak = this.getSkjemadataForFellesperiodeUttak.bind(this);
        this.updateFellesperiodeUttak = this.updateFellesperiodeUttak.bind(this);
    }

    getSkjemadataForFellesperiodeUttak(): FellesperiodeUttakSkjemadata {
        const { tidsperiode, morsAktivitetIPerioden, vedlegg, ønskerSamtidigUttak } = this.props.periode;
        return {
            tidsperiode: tidsperiode as TidsperiodePartial,
            vedlegg: vedlegg as Attachment[],
            morsAktivitetIPerioden,
            ønskerSamtidigUttak
        };
    }

    updateFellesperiodeUttak(data: FellesperiodeUttakSkjemadata) {
        const { onChange } = this.props;
        onChange(data);
    }

    render() {
        const { periode, tilgjengeligeStønadskontoer, onChange, søknad, søkerinfo } = this.props;
        const { rolle } = søknad.søker;
        const { konto } = periode;
        const velgbareStønadskontoer = getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer);

        return (
            <React.Fragment>
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
                    <FellesperiodeUttakForm
                        søkerErForelder2={erForelder2(søkerinfo.person.kjønn, rolle)}
                        skjemadata={this.getSkjemadataForFellesperiodeUttak()}
                        onChange={this.updateFellesperiodeUttak}
                    />
                </Block>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad,
        søkerinfo: state.api.søkerinfo!,
        tilgjengeligeStønadskontoer: state.api.tilgjengeligeStønadskontoer
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
