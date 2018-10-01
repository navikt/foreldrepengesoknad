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
import { Forelder, Tidsperiode, NavnPåForeldre } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import Søknad from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import Block from 'common/components/block/Block';
import { erFarEllerMedmor } from '../../util/domain/personUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import TidsperiodeBolk from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { getPermisjonsregler } from '../../util/uttaksplan/permisjonsregler';
import { getDatoavgrensningerForStønadskonto } from '../../util/uttaksplan/uttaksperiodeUtils';
import Arbeidsforhold from '../../types/Arbeidsforhold';
// import GradertUttakForm from './gradert-uttak-form/GradertUttakForm';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/stønadskontoer';
import { getUttakFormVisibility, UttakSpørsmålKeys } from './uttakFormConfig';
import { getNavnPåForeldre } from '../../util/uttaksplan';
import AktivitetskravMorBolk from '../../bolker/AktivitetskravMorBolk';
import NyPeriodeKnapperad from '../ny-periode-form/NyPeriodeKnapperad';
import SamtidigUttakPart from './partials/SamtidigUttakPart';
import ForeldrepengerFørFødselPart from './partials/ForeldrepengerFørFødselPart';
import OverføringUttakPart from './partials/OverføringUttakPart';

interface UttaksperiodeFormProps {
    periode: RecursivePartial<Uttaksperiode> | RecursivePartial<Overføringsperiode>;
    kanEndreStønadskonto: boolean;
    onChange: (periode: RecursivePartial<Periode>) => void;
    onCancel?: () => void;
}

interface StateProps {
    søknad: Søknad;
    arbeidsforhold?: Arbeidsforhold[];
    velgbareStønadskontotyper: StønadskontoType[];
    søkerErFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
}

type Props = UttaksperiodeFormProps & StateProps & InjectedIntlProps;

const erUttakAvAnnenForeldersKvote = (konto: StønadskontoType | undefined, søkerErFarEllerMedmor: boolean): boolean => {
    return (
        (konto === StønadskontoType.Mødrekvote && søkerErFarEllerMedmor) ||
        (konto === StønadskontoType.Fedrekvote && !søkerErFarEllerMedmor)
    );
};

class UttaksperiodeForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.getTidsperiodeDisabledProps = this.getTidsperiodeDisabledProps.bind(this);
        this.updateStønadskontoType = this.updateStønadskontoType.bind(this);
        this.updatePeriodeGradering = this.updatePeriodeGradering.bind(this);
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

    updatePeriodeGradering(periode: RecursivePartial<Uttaksperiode>) {
        this.props.onChange({ ...periode });
    }

    updateOverføringUttak(periode: RecursivePartial<Overføringsperiode>) {
        const { onChange } = this.props;
        onChange({
            type: Periodetype.Overføring,
            ...periode,
            forelder: this.props.søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR
        });
    }

    updateStønadskontoType(konto: StønadskontoType) {
        if (erUttakAvAnnenForeldersKvote(konto, this.props.søkerErFarEllerMedmor)) {
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

    render() {
        const {
            periode,
            søknad,
            kanEndreStønadskonto,
            velgbareStønadskontotyper,
            søkerErFarEllerMedmor,
            navnPåForeldre,
            familiehendelsesdato,
            onCancel,
            onChange
        } = this.props;

        const visibility = getUttakFormVisibility(
            periode,
            velgbareStønadskontotyper,
            kanEndreStønadskonto,
            søknad.søker.erAleneOmOmsorg,
            søkerErFarEllerMedmor
        );

        if (visibility === undefined) {
            return null;
        }
        const tidsperiode = periode.tidsperiode as Partial<Tidsperiode>;

        return (
            <React.Fragment>
                <Block>
                    <TidsperiodeBolk
                        onChange={(v: Partial<Tidsperiode>) => onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode as Partial<Tidsperiode>}
                        visVarighet={true}
                        datoAvgrensninger={
                            periode.konto
                                ? getDatoavgrensningerForStønadskonto(
                                      periode.konto,
                                      familiehendelsesdato,
                                      getPermisjonsregler()
                                  )
                                : undefined
                        }
                        {...this.getTidsperiodeDisabledProps()}
                    />
                </Block>
                <Block visible={visibility.isVisible(UttakSpørsmålKeys.kvote)}>
                    <HvilkenKvoteSkalBenyttesSpørsmål
                        onChange={(stønadskontoType) => this.updateStønadskontoType(stønadskontoType)}
                        navnPåForeldre={navnPåForeldre}
                        velgbareStønadskontoer={velgbareStønadskontotyper}
                        stønadskonto={periode.konto}
                    />
                </Block>
                {periode.type === Periodetype.Uttak && (
                    <>
                        {periode.konto === StønadskontoType.ForeldrepengerFørFødsel && (
                            <Block>
                                <ForeldrepengerFørFødselPart
                                    skalIkkeHaUttakFørTermin={
                                        (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin ||
                                        false
                                    }
                                    onChange={(skalIkkeHaUttakFørTermin) =>
                                        this.updateForeldrepengerFørFødselUttak(skalIkkeHaUttakFørTermin)
                                    }
                                />
                            </Block>
                        )}
                        <Block
                            visible={visibility.isVisible(UttakSpørsmålKeys.aktivitetskravMor)}
                            hasChildBlocks={true}>
                            <AktivitetskravMorBolk
                                vedlegg={periode.vedlegg as Attachment[]}
                                morsAktivitetIPerioden={periode.morsAktivitetIPerioden}
                                navnPåForeldre={navnPåForeldre}
                                onChange={(periodeData) => onChange(periodeData)}
                            />
                        </Block>
                        <Block visible={visibility.isVisible(UttakSpørsmålKeys.samtidigUttak)} margin="none">
                            <SamtidigUttakPart
                                onChange={(ønskerSamtidigUttak) => onChange({ ønskerSamtidigUttak })}
                                ønskerSamtidigUttak={periode.ønskerSamtidigUttak}
                            />
                        </Block>
                    </>
                )}
                {periode.type === Periodetype.Overføring && (
                    <Block visible={visibility.isVisible(UttakSpørsmålKeys.overføringsårsak)} hasChildBlocks={true}>
                        <OverføringUttakPart
                            navnAnnenForelder={søknad.annenForelder.fornavn}
                            årsak={periode.årsak}
                            søkerErFarEllerMedmor={søkerErFarEllerMedmor}
                            vedlegg={periode.vedlegg as Attachment[]}
                            onChange={(p) => this.updateOverføringUttak(p)}
                        />
                    </Block>
                )}

                {/* 
                {validTidsperiode &&
                    periode.type === Periodetype.Uttak &&
                    (periode.konto && periode.konto !== StønadskontoType.ForeldrepengerFørFødsel) && (
                        <GradertUttakForm
                            periode={periode}
                            annenForelderHarRettPåForeldrepenger={søknad.annenForelder.harRettPåForeldrepenger}
                            erAleneOmOmsorg={søknad.søker.erAleneOmOmsorg}
                            arbeidsforhold={arbeidsforhold}
                            onChange={this.props.onChange}
                        />
                    )} */}
                {periode.id === undefined && (
                    <NyPeriodeKnapperad
                        periodeKanLeggesTil={visibility.areAllQuestionsAnswered()}
                        onCancel={onCancel}
                    />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad,
        arbeidsforhold: state.api.søkerinfo!.arbeidsforhold,
        velgbareStønadskontotyper: getVelgbareStønadskontotyper(state.api.tilgjengeligeStønadskontoer),
        søkerErFarEllerMedmor: erFarEllerMedmor(state.søknad.søker.rolle),
        navnPåForeldre: getNavnPåForeldre(state.søknad, state.api.søkerinfo!.person!),
        familiehendelsesdato: state.søknad.ekstrainfo.uttaksplanInfo!.familiehendelsesdato
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
