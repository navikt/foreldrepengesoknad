import * as React from 'react';
import {
    Periode,
    Periodetype,
    StønadskontoType,
    Uttaksperiode,
    ForeldrepengerFørFødselUttaksperiode,
    isForeldrepengerFørFødselUttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import Søknad from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import Block from 'common/components/block/Block';
import FellesperiodeUttakForm, {
    FellesperiodeUttakSkjemadata
} from './fellesperiode-uttak-form/FellesperiodeUttakForm';
import { annenForelderSkalHaForeldrepenger } from '../../util/domain/personUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import TidsperiodeBolk from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import EgenDelUttakForm from './egen-del-uttak-form/EgenDelUttakForm';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { getPermisjonsregler } from '../../util/uttaksplan/permisjonsregler';
import { getDatoavgrensningerForStønadskonto } from '../../util/uttaksplan/uttaksperiodeUtils';
import ForeldrepengerFørFødselUttakForm from './foreldrepenger-før-fødsel-uttak-form/ForeldrepengerFørFødselUttakForm';

interface UttaksperiodeFormProps {
    periode: RecursivePartial<Uttaksperiode>;
    kanEndreStønadskonto?: boolean;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

interface StateProps {
    søknad: Søknad;
}

type Props = UttaksperiodeFormProps & StateProps & InjectedIntlProps;

class UttaksperiodeForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.getSkjemadataForFellesperiodeUttak = this.getSkjemadataForFellesperiodeUttak.bind(this);
        this.updateFellesperiodeUttak = this.updateFellesperiodeUttak.bind(this);
        this.getTidsperiodeDisabledProps = this.getTidsperiodeDisabledProps.bind(this);
    }

    getSkjemadataForFellesperiodeUttak(): FellesperiodeUttakSkjemadata {
        const { morsAktivitetIPerioden, vedlegg, ønskerSamtidigUttak } = this.props.periode;
        return {
            vedlegg: vedlegg as Attachment[],
            morsAktivitetIPerioden,
            ønskerSamtidigUttak
        };
    }

    updateFellesperiodeUttak(data: FellesperiodeUttakSkjemadata, erFarMedmorVerdi: boolean) {
        const { onChange } = this.props;
        onChange({
            ...data,
            forelder: erFarMedmorVerdi ? Forelder.FARMEDMOR : Forelder.MOR,
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

    updateForeldrepengerFørFødselUttak(skalIkkeHaUttakFørTermin: boolean) {
        const { onChange } = this.props;
        onChange({
            skalIkkeHaUttakFørTermin,
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: undefined,
                tom: undefined
            }
        });
    }

    getTidsperiodeDisabledProps(): { startdatoDisabled?: boolean; sluttdatoDisabled?: boolean } | undefined {
        const { periode } = this.props;
        if (isForeldrepengerFørFødselUttaksperiode(periode as Periode)) {
            const skalIkkeHaUttak = (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin;
            return {
                startdatoDisabled: skalIkkeHaUttak,
                sluttdatoDisabled: skalIkkeHaUttak
            };
        }
        return undefined;
    }

    render() {
        const { periode, onChange, søknad, kanEndreStønadskonto } = this.props;
        const { annenForelder } = søknad;
        const { konto, tidsperiode } = periode;
        const { uttaksplanInfo } = søknad.ekstrainfo;
        const { velgbareStønadskontoer, søkerErFarEllerMedmor, navnPåForeldre, familiehendelsesdato } = uttaksplanInfo!;
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Partial<Tidsperiode>);

        const erUttakAvEgenKvote =
            (konto === StønadskontoType.Mødrekvote && !søkerErFarEllerMedmor) ||
            (konto === StønadskontoType.Fedrekvote && søkerErFarEllerMedmor);

        return (
            <React.Fragment>
                <Block margin="s">
                    <TidsperiodeBolk
                        onChange={(v: Partial<Tidsperiode>) => onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode as Partial<Tidsperiode>}
                        visVarighet={true}
                        {...this.getTidsperiodeDisabledProps()}
                        datoAvgrensninger={
                            periode.konto
                                ? getDatoavgrensningerForStønadskonto(
                                      periode.konto,
                                      familiehendelsesdato,
                                      getPermisjonsregler()
                                  )
                                : undefined
                        }
                    />
                </Block>
                <Block margin="s" visible={validTidsperiode !== undefined && kanEndreStønadskonto}>
                    <HvilkenKvoteSkalBenyttesSpørsmål
                        onChange={(stønadskonto: StønadskontoType) => {
                            onChange({ konto: stønadskonto });
                        }}
                        navnPåForeldre={navnPåForeldre}
                        velgbareStønadskontoer={velgbareStønadskontoer}
                        stønadskonto={konto}
                    />
                </Block>
                <Block visible={konto === StønadskontoType.Fellesperiode}>
                    <FellesperiodeUttakForm
                        søkerErFarMedmor={søkerErFarEllerMedmor}
                        annenForelderSkalHaForeldrepenger={annenForelderSkalHaForeldrepenger(annenForelder)}
                        skjemadata={this.getSkjemadataForFellesperiodeUttak()}
                        onChange={(data: FellesperiodeUttakSkjemadata) =>
                            this.updateFellesperiodeUttak(data, søkerErFarEllerMedmor)
                        }
                    />
                </Block>
                <Block visible={erUttakAvEgenKvote} hasChildBlocks={true}>
                    <EgenDelUttakForm
                        ønskerSamtidigUttak={periode.ønskerSamtidigUttak}
                        onChange={(ønskerSamtidigUttak) => this.updateEgenPeriodeUttak(ønskerSamtidigUttak)}
                    />
                </Block>
                <Block visible={isForeldrepengerFørFødselUttaksperiode(periode as Periode)}>
                    <ForeldrepengerFørFødselUttakForm
                        skalIkkeHaUttakFørTermin={
                            (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin
                        }
                        onChange={(skalIkkeHaUttakFørTermin) =>
                            this.updateForeldrepengerFørFødselUttak(skalIkkeHaUttakFørTermin)
                        }
                    />
                </Block>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
