import * as React from 'react';
import {
    Periode,
    Periodetype,
    StønadskontoType,
    Uttaksperiode,
    ForeldrepengerFørFødselUttaksperiode,
    isForeldrepengerFørFødselUttaksperiode,
    Overføringsperiode
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
import OverføringUttakForm, { OverføringUttakFormSkjemadata } from './overføring-uttak-form/OverføringUttakForm';
import FlerbarnsukerUttakForm from './flerbarnsuker-uttak-form/FlerbarnsukerUttakForm';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/st\u00F8nadskontoer';

interface UttaksperiodeFormProps {
    periode: RecursivePartial<Uttaksperiode> | RecursivePartial<Overføringsperiode>;
    kanEndreStønadskonto?: boolean;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

interface StateProps {
    søknad: Søknad;
    velgbareStønadskontoer: StønadskontoType[];
}

type Props = UttaksperiodeFormProps & StateProps & InjectedIntlProps;

const erUttakAvAnnenForeldersKvote = (konto: StønadskontoType | undefined, søkerErFarEllerMedmor: boolean): boolean => {
    return (
        (konto === StønadskontoType.Mødrekvote && søkerErFarEllerMedmor) ||
        (konto === StønadskontoType.Fedrekvote && !søkerErFarEllerMedmor)
    );
};

const erUttakAvEgenKvote = (konto: StønadskontoType | undefined, søkerErFarEllerMedmor: boolean) => {
    return (
        (konto === StønadskontoType.Mødrekvote && !søkerErFarEllerMedmor) ||
        (konto === StønadskontoType.Fedrekvote && søkerErFarEllerMedmor)
    );
};

class UttaksperiodeForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.getSkjemadataForFellesperiodeUttak = this.getSkjemadataForFellesperiodeUttak.bind(this);
        this.updateFellesperiodeUttak = this.updateFellesperiodeUttak.bind(this);
        this.getTidsperiodeDisabledProps = this.getTidsperiodeDisabledProps.bind(this);
        this.updateStønadskontoType = this.updateStønadskontoType.bind(this);
    }

    getSkjemadataForFellesperiodeUttak(): FellesperiodeUttakSkjemadata {
        const { morsAktivitetIPerioden, vedlegg, ønskerSamtidigUttak } = this.props.periode as Uttaksperiode;
        return {
            vedlegg: vedlegg as Attachment[],
            morsAktivitetIPerioden,
            ønskerSamtidigUttak
        };
    }

    getSkjemadataForOverføring(): OverføringUttakFormSkjemadata {
        const { periode } = this.props;
        if (periode.type === Periodetype.Overføring) {
            return {
                årsak: periode.årsak,
                vedlegg: periode.vedlegg as Attachment[]
            };
        }
        return {};
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
            type: Periodetype.Uttak,
            ønskerSamtidigUttak
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

    updateOverføringUttak(skjemadata: OverføringUttakFormSkjemadata) {
        const { onChange } = this.props;
        onChange({
            type: Periodetype.Overføring,
            ...skjemadata,
            forelder: this.props.søknad.ekstrainfo.uttaksplanInfo!.søkerErFarEllerMedmor
                ? Forelder.FARMEDMOR
                : Forelder.MOR
        });
    }

    updateFlerbarnsukerUttak(ønskerSamtidigUttak: boolean) {
        const { onChange } = this.props;
        onChange({
            type: Periodetype.Uttak,
            ønskerSamtidigUttak
        });
    }

    updateStønadskontoType(konto: StønadskontoType) {
        const uttaksplanInfo = this.props.søknad.ekstrainfo.uttaksplanInfo!;

        if (erUttakAvAnnenForeldersKvote(konto, uttaksplanInfo.søkerErFarEllerMedmor)) {
            this.props.onChange({
                type: Periodetype.Overføring,
                konto
            });
        } else {
            this.props.onChange({
                type: Periodetype.Uttak,
                konto
            });
        }
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

    renderStønadskontoForm() {
        const { periode, søknad } = this.props;
        const { annenForelder } = søknad;
        const { uttaksplanInfo } = søknad.ekstrainfo;
        const { søkerErFarEllerMedmor, navnPåForeldre } = uttaksplanInfo!;
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Partial<Tidsperiode>);

        if (periode.konto === StønadskontoType.ForeldrepengerFørFødsel) {
            return (
                <ForeldrepengerFørFødselUttakForm
                    skalIkkeHaUttakFørTermin={
                        (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin
                    }
                    onChange={(skalIkkeHaUttakFørTermin) =>
                        this.updateForeldrepengerFørFødselUttak(skalIkkeHaUttakFørTermin)
                    }
                />
            );
        }
        if (validTidsperiode) {
            if (periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.Flerbarnsuker) {
                return (
                    <FlerbarnsukerUttakForm
                        ønskerSamtidigUttak={periode.ønskerSamtidigUttak}
                        onChange={(ønskerSamtidigUttak) => this.updateFlerbarnsukerUttak(ønskerSamtidigUttak)}
                    />
                );
            }
            if (periode.konto === StønadskontoType.Fellesperiode) {
                return (
                    <FellesperiodeUttakForm
                        søkerErFarMedmor={søkerErFarEllerMedmor}
                        navnPåForeldre={navnPåForeldre}
                        annenForelderSkalHaForeldrepenger={annenForelderSkalHaForeldrepenger(annenForelder)}
                        skjemadata={this.getSkjemadataForFellesperiodeUttak()}
                        onChange={(data: FellesperiodeUttakSkjemadata) =>
                            this.updateFellesperiodeUttak(data, søkerErFarEllerMedmor)
                        }
                    />
                );
            } else if (periode.type === Periodetype.Uttak && erUttakAvEgenKvote(periode.konto, søkerErFarEllerMedmor)) {
                return (
                    <EgenDelUttakForm
                        ønskerSamtidigUttak={periode.ønskerSamtidigUttak}
                        onChange={(ønskerSamtidigUttak) => this.updateEgenPeriodeUttak(ønskerSamtidigUttak)}
                    />
                );
            } else if (erUttakAvAnnenForeldersKvote(periode.konto, søkerErFarEllerMedmor)) {
                return (
                    <OverføringUttakForm
                        skjemadata={this.getSkjemadataForOverføring()}
                        navnAnnenForelder={søknad.annenForelder.fornavn}
                        søkerErFarEllerMedmor={søkerErFarEllerMedmor}
                        onChange={(skjemadata) => this.updateOverføringUttak(skjemadata)}
                    />
                );
            }
        }
        return undefined;
    }

    render() {
        const { periode, onChange, søknad, kanEndreStønadskonto, velgbareStønadskontoer } = this.props;
        const { tidsperiode } = periode;
        const { uttaksplanInfo } = søknad.ekstrainfo;
        const { navnPåForeldre, familiehendelsesdato } = uttaksplanInfo!;
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Partial<Tidsperiode>);

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
                        onChange={(stønadskontoType) => this.updateStønadskontoType(stønadskontoType)}
                        navnPåForeldre={navnPåForeldre}
                        velgbareStønadskontoer={velgbareStønadskontoer}
                        stønadskonto={periode.konto}
                    />
                </Block>
                <Block
                    hasChildBlocks={true}
                    visible={
                        validTidsperiode !== undefined || isForeldrepengerFørFødselUttaksperiode(periode as Periode)
                    }>
                    {this.renderStønadskontoForm()}
                </Block>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad,
        velgbareStønadskontoer: getVelgbareStønadskontotyper(state.api.tilgjengeligeStønadskontoer!)
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
