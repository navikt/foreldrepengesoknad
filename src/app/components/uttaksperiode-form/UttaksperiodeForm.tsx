import * as React from 'react';
import {
    Periode,
    Periodetype,
    StønadskontoType,
    TilgjengeligStønadskonto,
    Uttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import Søknad, { SøkerRolle } from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/aktuelleStønadskontoer';
import Block from 'common/components/block/Block';
import FellesperiodeUttakForm, {
    FellesperiodeUttakSkjemadata
} from './fellesperiode-uttak-form/FellesperiodeUttakForm';
import { annenForelderSkalHaForeldrepenger, erFarEllerMedmor, erForelder2 } from '../../util/domain/personUtil';
import { Søkerinfo } from '../../types/søkerinfo';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import TidsperiodeBolk from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import EgenDelUttakForm from './egen-del-uttak-form/EgenDelUttakForm';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';

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
        const { morsAktivitetIPerioden, vedlegg, ønskerSamtidigUttak } = this.props.periode;
        return {
            vedlegg: vedlegg as Attachment[],
            morsAktivitetIPerioden,
            ønskerSamtidigUttak
        };
    }

    updateFellesperiodeUttak(data: FellesperiodeUttakSkjemadata, erForelder2Value: boolean) {
        const { onChange } = this.props;
        onChange({
            ...data,
            forelder: erForelder2Value ? Forelder.FORELDER_2 : Forelder.FORELDER_1,
            type: Periodetype.Uttak
        });
    }

    updateEgenPeriodeUttak(ønskerSamtidigUttak: boolean) {
        const { onChange } = this.props;
        onChange({
            ønskerSamtidigUttak,
            type: Periodetype.Uttak
        });
    }

    render() {
        const { periode, tilgjengeligeStønadskontoer, onChange, søknad, søkerinfo } = this.props;
        const { søker, annenForelder } = søknad;
        const { rolle } = søker;
        const { konto, tidsperiode } = periode;
        const velgbareStønadskontoer = getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer);
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Partial<Tidsperiode>);
        const søkerErForelder2 = erForelder2(søkerinfo.person.kjønn, rolle);

        const erUttakAvEgenKvote =
            (konto === StønadskontoType.Mødrekvote && (rolle === SøkerRolle.MOR || søkerErForelder2 === false)) ||
            (konto === StønadskontoType.Fedrekvote &&
                (erFarEllerMedmor(søkerinfo.person.kjønn, rolle) === true || søkerErForelder2 === true));

        return (
            <React.Fragment>
                <Block margin="s">
                    <TidsperiodeBolk
                        onChange={(v: Partial<Tidsperiode>) => onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode as Partial<Tidsperiode>}
                        visVarighet={true}
                    />
                </Block>
                <Block margin="s" visible={validTidsperiode !== undefined}>
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
                        søkerErForelder2={søkerErForelder2}
                        annenForelderSkalHaForeldrepenger={annenForelderSkalHaForeldrepenger(annenForelder)}
                        skjemadata={this.getSkjemadataForFellesperiodeUttak()}
                        onChange={(data: FellesperiodeUttakSkjemadata) =>
                            this.updateFellesperiodeUttak(data, søkerErForelder2)
                        }
                    />
                </Block>
                <Block visible={erUttakAvEgenKvote}>
                    <EgenDelUttakForm
                        ønskerSamtidigUttak={periode.ønskerSamtidigUttak}
                        onChange={(ønskerSamtidigUttak) => this.updateEgenPeriodeUttak(ønskerSamtidigUttak)}
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
