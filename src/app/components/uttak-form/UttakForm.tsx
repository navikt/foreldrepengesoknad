import * as React from 'react';
import moment from 'moment';
import PT from 'prop-types';
import {
    Periodetype,
    StønadskontoType,
    Uttaksperiode,
    ForeldrepengerFørFødselUttaksperiode,
    Overføringsperiode,
    MorsAktivitet,
    Oppholdsperiode,
    isForeldrepengerFørFødselUttaksperiode,
    Periode
} from '../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode, NavnPåForeldre } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import { Skjemanummer } from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import Block from 'common/components/block/Block';
import { getErSøkerFarEllerMedmor } from '../../util/domain/personUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/stønadskontoer';
import { getUttakFormVisibility, UttakSpørsmålKeys } from './uttakFormConfig';
import { getNavnPåForeldre, getTidsperioderIUttaksplan, getFamiliehendelsedato } from '../../util/uttaksplan';
import AktivitetskravMorBolk from '../../bolker/AktivitetskravMorBolk';
import NyPeriodeKnapperad from '../ny-periode-form/NyPeriodeKnapperad';
import SamtidigUttakPart from './partials/SamtidigUttakPart';
import ForeldrepengerFørFødselPart from './partials/ForeldrepengerFørFødselPart';
import OverføringUttakPart from './partials/OverføringUttakPart';
import GradertUttakPart from './partials/GradertUttakPart';
import UttakTidsperiodeSpørsmål from './partials/UttakTidsperiodeSpørsmål';
import getMessage from 'common/util/i18nUtils';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';
import { erUttakAvAnnenForeldersKvote } from '../../util/uttaksplan/uttakUtils';
import { Uttaksdagen } from '../../util/uttaksplan/Uttaksdagen';
import { getDefaultPermisjonStartdato } from '../../util/uttaksplan/permisjonUtils';
import { getPermisjonsregler } from '../../util/uttaksplan/permisjonsregler';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import VedleggSpørsmål from '../vedlegg-spørsmål/VedleggSpørsmål';
import ErMorForSykSpørsmål from 'app/spørsmål/ErMorForSykSpørsmål';
import { EndrePeriodeChangeEvent } from '../endre-periode-form/EndrePeriodeForm';
import { isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import HvemSkalTaForeldrepengerSpørsmål from './partials/HvemSkalTaForeldrepengerSpørsmål';
import {
    getStønadskontoFromOppholdsårsak,
    getOppholdsÅrsakFromStønadskonto
} from 'app/util/uttaksplan/uttaksperiodeUtils';
import { getSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { Søknadsinfo } from 'app/selectors/types';

export type UttakFormPeriodeType =
    | RecursivePartial<Uttaksperiode>
    | RecursivePartial<Overføringsperiode>
    | RecursivePartial<Oppholdsperiode>;

interface UttaksperiodeFormProps {
    periode: UttakFormPeriodeType;
    kanEndreStønadskonto: boolean;
    harOverlappendePerioder?: boolean;
    onChange: EndrePeriodeChangeEvent;
    onCancel?: () => void;
}

interface ComponentStateProps {
    periodenGjelder: Forelder | undefined;
}

interface StateProps {
    uttaksplan: Periode[];
    arbeidsforhold?: Arbeidsforhold[];
    velgbareStønadskontotyper: StønadskontoType[];
    søkerErFarEllerMedmor: boolean;
    morErUfør: boolean;
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    annenForelderHarRett: boolean;
    søknadsinfo: Søknadsinfo;
}

type Props = UttaksperiodeFormProps & StateProps & InjectedIntlProps;

const periodenGjelderAnnenForelder = (søkerErFarEllerMedmor: boolean, forelder: Forelder): boolean => {
    if (
        (søkerErFarEllerMedmor && forelder === Forelder.FARMEDMOR) ||
        (!søkerErFarEllerMedmor && forelder === Forelder.MOR)
    ) {
        return false;
    }

    return true;
};

const getPeriodeGjelder = (
    søkerErFarEllerMedmor: boolean,
    forelder: Forelder | undefined,
    søknadsinfo: Søknadsinfo
): Forelder | undefined => {
    if (!søknadsinfo.søknaden.erDeltUttak) {
        return søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR;
    }

    if (forelder === undefined) {
        return undefined;
    }

    if (periodenGjelderAnnenForelder(søkerErFarEllerMedmor, forelder)) {
        return søkerErFarEllerMedmor ? Forelder.MOR : Forelder.FARMEDMOR;
    } else {
        return søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR;
    }
};

class UttaksperiodeForm extends React.Component<Props, ComponentStateProps> {
    static contextTypes = {
        validForm: PT.object
    };
    context: any;
    timeoutId: number;

    constructor(props: Props) {
        super(props);
        this.updateStønadskontoType = this.updateStønadskontoType.bind(this);
        this.updateForeldrepengerFørFødselUttak = this.updateForeldrepengerFørFødselUttak.bind(this);
        this.updatePeriodenGjelder = this.updatePeriodenGjelder.bind(this);
        this.getVisibility = this.getVisibility.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            periodenGjelder: getPeriodeGjelder(
                this.props.søkerErFarEllerMedmor,
                this.props.periode.forelder,
                this.props.søknadsinfo
            )
        };
    }

    componentDidMount() {
        if (this.context.validForm) {
            this.context.validForm.validateAll();
        }
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    onChange(periode: UttakFormPeriodeType, replace: boolean = false) {
        this.props.onChange(periode, replace, this.getVisibility());
        if (this.context.validForm) {
            this.timeoutId = setTimeout(() => {
                if (this.context.validForm) {
                    this.context.validForm.validateAll();
                }
            });
        }
    }

    updatePeriodenGjelder(forelder: Forelder) {
        const { periode, søkerErFarEllerMedmor } = this.props;

        this.setState({ periodenGjelder: forelder });

        if (periode.type !== undefined) {
            if (periodenGjelderAnnenForelder(søkerErFarEllerMedmor, forelder)) {
                const årsak = getOppholdsÅrsakFromStønadskonto((periode as Uttaksperiode).konto);

                this.onChange({ tidsperiode: periode.tidsperiode, type: Periodetype.Opphold, forelder, årsak }, true);
            } else {
                const konto = getStønadskontoFromOppholdsårsak((periode as Oppholdsperiode).årsak);
                const erOverføring = erUttakAvAnnenForeldersKvote(konto, søkerErFarEllerMedmor);

                if (erOverføring) {
                    const updatedPeriode: Partial<Overføringsperiode> = {
                        tidsperiode: periode.tidsperiode as Tidsperiode,
                        type: Periodetype.Overføring,
                        forelder,
                        konto
                    };

                    this.onChange({ ...updatedPeriode }, true);
                } else {
                    const updatedPeriode: Partial<Uttaksperiode> = {
                        tidsperiode: periode.tidsperiode as Tidsperiode,
                        type: Periodetype.Uttak,
                        forelder,
                        konto
                    };

                    this.onChange({ ...updatedPeriode }, true);
                }
            }
        }
    }

    updateForeldrepengerFørFødselUttak(skalIkkeHaUttakFørTermin: boolean) {
        this.onChange({
            type: Periodetype.Uttak,
            skalIkkeHaUttakFørTermin,
            tidsperiode: {
                fom:
                    skalIkkeHaUttakFørTermin === false
                        ? getDefaultPermisjonStartdato(this.props.familiehendelsesdato, getPermisjonsregler())
                        : undefined,
                tom: skalIkkeHaUttakFørTermin ? undefined : Uttaksdagen(this.props.familiehendelsesdato).forrige()
            }
        });
    }

    updateStønadskontoType(konto: StønadskontoType) {
        const { søkerErFarEllerMedmor } = this.props;
        if (erUttakAvAnnenForeldersKvote(konto, søkerErFarEllerMedmor)) {
            // Dersom perioden gjelder den andre forelderen og man velger den andre forelderen sin kvote betyr det
            // at man legger inn i planen at "Her tar den andre forelderen uttak, så det blir et opphold i min plan"
            if (periodenGjelderAnnenForelder(søkerErFarEllerMedmor, this.state.periodenGjelder!)) {
                this.onChange({
                    type: Periodetype.Opphold,
                    forelder: this.state.periodenGjelder,
                    årsak: getOppholdsÅrsakFromStønadskonto(konto)
                });
            }
            // Dersom perioden ikke gjelder den andre forelderen og man velger den andre forelderen sin kvote så betyr det
            // at her tar søker å overfører den andre forelderens kvote
            else {
                this.onChange({
                    type: Periodetype.Overføring,
                    konto,
                    forelder: this.state.periodenGjelder,
                    harIkkeAktivitetskrav: konto === StønadskontoType.AktivitetsfriKvote ? true : undefined,
                    ønskerFlerbarnsdager: konto === StønadskontoType.Flerbarnsdager ? true : undefined,
                    morsAktivitetIPerioden:
                        konto === StønadskontoType.AktivitetsfriKvote ? MorsAktivitet.Uføre : undefined
                });
            }
        } else {
            if (periodenGjelderAnnenForelder(søkerErFarEllerMedmor, this.state.periodenGjelder!)) {
                this.onChange({
                    type: Periodetype.Opphold,
                    forelder: this.state.periodenGjelder,
                    årsak: getOppholdsÅrsakFromStønadskonto(konto)
                });
            } else {
                this.onChange({
                    type: Periodetype.Uttak,
                    konto,
                    forelder: this.state.periodenGjelder,
                    harIkkeAktivitetskrav: konto === StønadskontoType.AktivitetsfriKvote ? true : undefined,
                    ønskerFlerbarnsdager: konto === StønadskontoType.Flerbarnsdager ? true : undefined,
                    morsAktivitetIPerioden:
                        konto === StønadskontoType.AktivitetsfriKvote ? MorsAktivitet.Uføre : undefined
                });
            }
        }
    }

    getVisibility() {
        const {
            periode,
            søknadsinfo,
            kanEndreStønadskonto,
            velgbareStønadskontotyper,
            søkerErFarEllerMedmor,
            morErUfør,
            familiehendelsesdato,
            annenForelderHarRett
        } = this.props;

        return getUttakFormVisibility({
            periode,
            velgbareStønadskontotyper,
            kanEndreStønadskonto,
            søkerErAleneOmOmsorg: søknadsinfo.søker.erAleneOmOmsorg,
            søkerErFarEllerMedmor,
            annenForelderHarRett,
            morErUfør,
            familiehendelsesdato,
            situasjon: søknadsinfo.søknaden.situasjon
        });
    }
    render() {
        const {
            periode,
            søknadsinfo,
            uttaksplan,
            velgbareStønadskontotyper,
            søkerErFarEllerMedmor,
            navnPåForeldre,
            familiehendelsesdato,
            arbeidsforhold,
            harOverlappendePerioder,
            onCancel,
            intl
        } = this.props;

        const visibility = this.getVisibility();

        if (visibility === undefined) {
            return null;
        }
        const ugyldigeTidsperioder = getTidsperioderIUttaksplan(uttaksplan, periode.id);

        const tidsperiode = periode.tidsperiode as Partial<Tidsperiode>;
        const feil: Feil | undefined = harOverlappendePerioder
            ? { feilmelding: getMessage(intl, 'periodeliste.overlappendePeriode') }
            : undefined;

        const periodeErNyOgFørFamiliehendelsesdatoFeil: Feil | undefined =
            periode.id === undefined &&
            isValidTidsperiode(tidsperiode) &&
            moment(tidsperiode.fom).isBefore(familiehendelsesdato)
                ? { feilmelding: getMessage(intl, 'periodeliste.nyPeriodeErFørFamiliehendelsesdato') }
                : undefined;

        return (
            <React.Fragment>
                <Block>
                    <UttakTidsperiodeSpørsmål
                        periode={periode}
                        ugyldigeTidsperioder={ugyldigeTidsperioder}
                        familiehendelsesdato={familiehendelsesdato}
                        onChange={(v: Partial<Tidsperiode>) => this.onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode}
                        feil={feil || periodeErNyOgFørFamiliehendelsesdatoFeil}
                    />
                </Block>
                <Block visible={!isForeldrepengerFørFødselUttaksperiode(periode) && søknadsinfo.søknaden.erDeltUttak}>
                    <HvemSkalTaForeldrepengerSpørsmål
                        navnPåForeldre={navnPåForeldre}
                        valgtForelder={this.state.periodenGjelder}
                        onChange={(forelder: Forelder) => this.updatePeriodenGjelder(forelder)}
                    />
                </Block>
                <Block
                    visible={visibility.isVisible(UttakSpørsmålKeys.kvote) && this.state.periodenGjelder !== undefined}>
                    <HvilkenKvoteSkalBenyttesSpørsmål
                        onChange={(stønadskontoType) => this.updateStønadskontoType(stønadskontoType)}
                        navnPåForeldre={navnPåForeldre}
                        velgbareStønadskontoer={velgbareStønadskontotyper}
                        valgtKvote={
                            periode.type === Periodetype.Uttak || periode.type === Periodetype.Overføring
                                ? periode.konto
                                : getStønadskontoFromOppholdsårsak((periode as Oppholdsperiode).årsak)
                        }
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
                        <Block visible={visibility.isVisible(UttakSpørsmålKeys.erMorForSyk)}>
                            <ErMorForSykSpørsmål
                                onChange={(v) => this.onChange({ erMorForSyk: v })}
                                erMorForSyk={periode.erMorForSyk}
                            />
                        </Block>
                        {visibility.isVisible(UttakSpørsmålKeys.erMorForSyk) &&
                            periode.erMorForSyk === true && (
                                <>
                                    <Veilederinfo>
                                        <FormattedMessage
                                            id="uttaksplan.informasjon.morErForSyk"
                                            values={{ navnMor: navnPåForeldre.mor }}
                                        />
                                    </Veilederinfo>
                                    <Block>
                                        <VedleggSpørsmål
                                            attachmentType={AttachmentType.UTSETTELSE_SYKDOM}
                                            skjemanummer={Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM}
                                            vedlegg={periode.vedlegg as Attachment[]}
                                            onChange={(v) => this.onChange({ vedlegg: v })}
                                        />
                                    </Block>
                                </>
                            )}
                        {visibility.isVisible(UttakSpørsmålKeys.erMorForSyk) &&
                            periode.erMorForSyk === false && (
                                <>
                                    <Veilederinfo>
                                        <FormattedMessage id="uttaksplan.informasjon.morErForSykNeiSvar" />
                                    </Veilederinfo>
                                </>
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
                                onChange={this.onChange}
                                ønskerSamtidigUttak={periode.ønskerSamtidigUttak}
                                visibility={visibility}
                                navnAnnenForelder={søknadsinfo.navn.annenForelder.fornavn}
                                periode={periode}
                            />
                        </Block>
                        <Block visible={visibility.isVisible(UttakSpørsmålKeys.skalHaGradering)} margin="none">
                            <GradertUttakPart
                                visibility={visibility}
                                periode={periode as Uttaksperiode}
                                arbeidsforhold={arbeidsforhold}
                                onChange={this.onChange}
                                visAntallDagerUttak={periode.ønskerSamtidigUttak !== true}
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
                            erEndringssøknad={søknadsinfo.søknaden.erEndringssøknad}
                            navnAnnenForelder={søknadsinfo.navn.annenForelder.fornavn}
                            årsak={periode.årsak}
                            søkerErFarEllerMedmor={søkerErFarEllerMedmor}
                            vedlegg={periode.vedlegg as Attachment[]}
                            onChange={(p) => this.onChange(p)}
                        />
                    </Block>
                )}

                {periode.id === undefined && (
                    <NyPeriodeKnapperad
                        periodeKanLeggesTil={
                            visibility.areAllQuestionsAnswered() &&
                            periodeErNyOgFørFamiliehendelsesdatoFeil === undefined
                        }
                        onCancel={onCancel}
                        ariaLabelAvbryt={getMessage(intl, 'uttaksplan.nyperiode.avbrytAriaLabel')}
                        ariaLabelLeggTil={getMessage(intl, 'uttaksplan.nyperiode.leggTilAriaLabel')}
                    />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(state.søknad.søker.rolle);
    const søknadsinfo = getSøknadsinfo(state);

    return {
        uttaksplan: state.søknad.uttaksplan,
        arbeidsforhold: state.api.søkerinfo!.arbeidsforhold,
        velgbareStønadskontotyper: getVelgbareStønadskontotyper(state.api.tilgjengeligeStønadskontoer),
        søkerErFarEllerMedmor,
        morErUfør: søkerErFarEllerMedmor && state.søknad.annenForelder.erUfør,
        navnPåForeldre: getNavnPåForeldre(state.søknad, state.api.søkerinfo!.person!),
        familiehendelsesdato: getFamiliehendelsedato(state.søknad.barn, state.søknad.situasjon),
        annenForelderHarRett: state.søknad.annenForelder.harRettPåForeldrepenger,
        søknadsinfo: søknadsinfo!
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
