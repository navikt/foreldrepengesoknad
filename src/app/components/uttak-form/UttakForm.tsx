import * as React from 'react';
import PT from 'prop-types';
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
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/stønadskontoer';
import { getUttakFormVisibility, UttakSpørsmålKeys } from './uttakFormConfig';
import { getNavnPåForeldre } from '../../util/uttaksplan';
import AktivitetskravMorBolk from '../../bolker/AktivitetskravMorBolk';
import NyPeriodeKnapperad from '../ny-periode-form/NyPeriodeKnapperad';
import SamtidigUttakPart from './partials/SamtidigUttakPart';
import ForeldrepengerFørFødselPart from './partials/ForeldrepengerFørFødselPart';
import OverføringUttakPart from './partials/OverføringUttakPart';
import GradertUttakPart from './partials/GradertUttakPart';
import UttakTidsperiodeSpørsmål from './partials/UttakTidsperiodeSpørsmål';
import getMessage from 'common/util/i18nUtils';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';

export type UttakFormPeriodeType = RecursivePartial<Uttaksperiode> | RecursivePartial<Overføringsperiode>;

interface UttaksperiodeFormProps {
    periode: UttakFormPeriodeType;
    kanEndreStønadskonto: boolean;
    harOverlappendePerioder?: boolean;
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
    annenForelderHarRett: boolean;
}

type Props = UttaksperiodeFormProps & StateProps & InjectedIntlProps;

const erUttakAvAnnenForeldersKvote = (konto: StønadskontoType | undefined, søkerErFarEllerMedmor: boolean): boolean => {
    return (
        (konto === StønadskontoType.Mødrekvote && søkerErFarEllerMedmor) ||
        (konto === StønadskontoType.Fedrekvote && !søkerErFarEllerMedmor)
    );
};

class UttaksperiodeForm extends React.Component<Props> {
    static contextTypes = {
        validForm: PT.object
    };
    context: any;

    constructor(props: Props) {
        super(props);
        this.getTidsperiodeDisabledProps = this.getTidsperiodeDisabledProps.bind(this);
        this.updateStønadskontoType = this.updateStønadskontoType.bind(this);
        this.updatePeriodeGradering = this.updatePeriodeGradering.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if (this.context.validForm) {
            this.context.validForm.validateAll();
        }
    }

    onChange(periode: UttakFormPeriodeType) {
        this.props.onChange(periode);
        if (this.context.validForm) {
            this.context.validForm.validateAll();
        }
    }

    updateForeldrepengerFørFødselUttak(skalIkkeHaUttakFørTermin: boolean) {
        this.onChange({
            skalIkkeHaUttakFørTermin,
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: undefined,
                tom: undefined
            }
        });
    }

    updatePeriodeGradering(periode: RecursivePartial<Uttaksperiode>) {
        this.onChange({ ...periode });
    }

    updateOverføringUttak(periode: RecursivePartial<Overføringsperiode>) {
        this.onChange({
            type: Periodetype.Overføring,
            ...periode,
            forelder: this.props.søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR
        });
    }

    updateStønadskontoType(konto: StønadskontoType) {
        if (erUttakAvAnnenForeldersKvote(konto, this.props.søkerErFarEllerMedmor)) {
            this.onChange({
                type: Periodetype.Overføring,
                konto
            });
        } else {
            this.onChange({
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
            arbeidsforhold,
            annenForelderHarRett,
            harOverlappendePerioder,
            onCancel,
            intl
        } = this.props;

        const visibility = getUttakFormVisibility(
            periode,
            velgbareStønadskontotyper,
            kanEndreStønadskonto,
            søknad.søker.erAleneOmOmsorg,
            søkerErFarEllerMedmor,
            annenForelderHarRett
        );

        if (visibility === undefined) {
            return null;
        }
        const tidsperiode = periode.tidsperiode as Partial<Tidsperiode>;
        const feil: Feil | undefined = harOverlappendePerioder
            ? { feilmelding: getMessage(intl, 'periodeliste.overlappendePeriode') }
            : undefined;

        return (
            <React.Fragment>
                <Block margin={periode.konto === StønadskontoType.ForeldrepengerFørFødsel ? 'xs' : 'm'}>
                    <UttakTidsperiodeSpørsmål
                        periode={periode}
                        familiehendelsesdato={familiehendelsesdato}
                        onChange={(v: Partial<Tidsperiode>) => this.onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode as Partial<Tidsperiode>}
                        feil={feil}
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
                            <ForeldrepengerFørFødselPart
                                skalIkkeHaUttakFørTermin={
                                    (periode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin || false
                                }
                                onChange={(skalIkkeHaUttakFørTermin) =>
                                    this.updateForeldrepengerFørFødselUttak(skalIkkeHaUttakFørTermin)
                                }
                            />
                        )}
                        <Block
                            visible={visibility.isVisible(UttakSpørsmålKeys.aktivitetskravMor)}
                            hasChildBlocks={true}>
                            <AktivitetskravMorBolk
                                vedlegg={periode.vedlegg as Attachment[]}
                                morsAktivitetIPerioden={periode.morsAktivitetIPerioden}
                                navnPåForeldre={navnPåForeldre}
                                onChange={(periodeData) => this.onChange(periodeData)}
                            />
                        </Block>
                        <Block visible={visibility.isVisible(UttakSpørsmålKeys.samtidigUttak)} margin="none">
                            <SamtidigUttakPart
                                onChange={(ønskerSamtidigUttak) => this.onChange({ ønskerSamtidigUttak })}
                                ønskerSamtidigUttak={periode.ønskerSamtidigUttak}
                            />
                        </Block>
                    </>
                )}
                {periode.type === Periodetype.Overføring && (
                    <Block
                        visible={visibility.isVisible(UttakSpørsmålKeys.overføringsårsak)}
                        hasChildBlocks={true}
                        margin="none">
                        <OverføringUttakPart
                            navnAnnenForelder={søknad.annenForelder.fornavn}
                            årsak={periode.årsak}
                            søkerErFarEllerMedmor={søkerErFarEllerMedmor}
                            vedlegg={periode.vedlegg as Attachment[]}
                            onChange={(p) => this.updateOverføringUttak(p)}
                        />
                    </Block>
                )}

                {periode.type === Periodetype.Uttak && (
                    <Block visible={visibility.isVisible(UttakSpørsmålKeys.skalHaGradering)} margin="none">
                        <GradertUttakPart
                            visibility={visibility}
                            periode={periode}
                            arbeidsforhold={arbeidsforhold}
                            onChange={this.onChange}
                        />
                    </Block>
                )}
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
        familiehendelsesdato: state.søknad.ekstrainfo.uttaksplanInfo!.familiehendelsesdato,
        annenForelderHarRett: state.søknad.annenForelder.harRettPåForeldrepenger
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
