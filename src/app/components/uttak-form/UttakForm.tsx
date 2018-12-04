import * as React from 'react';
import PT from 'prop-types';
import {
    Periodetype,
    StønadskontoType,
    Uttaksperiode,
    ForeldrepengerFørFødselUttaksperiode,
    Overføringsperiode
} from '../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode, NavnPåForeldre } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import Søknad, { Skjemanummer } from '../../types/søknad/Søknad';
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
import { EndrePeriodeChangeEvent } from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import VedleggSpørsmål from '../vedlegg-spørsmål/VedleggSpørsmål';
import ErMorForSykSpørsmål from 'app/spørsmål/ErMorForSykSpørsmål';

export type UttakFormPeriodeType = RecursivePartial<Uttaksperiode> | RecursivePartial<Overføringsperiode>;

interface UttaksperiodeFormProps {
    periode: UttakFormPeriodeType;
    kanEndreStønadskonto: boolean;
    harOverlappendePerioder?: boolean;
    onChange: EndrePeriodeChangeEvent;
    onCancel?: () => void;
}

interface StateProps {
    søknad: Søknad;
    arbeidsforhold?: Arbeidsforhold[];
    velgbareStønadskontotyper: StønadskontoType[];
    søkerErFarEllerMedmor: boolean;
    morErUfør: boolean;
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    annenForelderHarRett: boolean;
}

type Props = UttaksperiodeFormProps & StateProps & InjectedIntlProps;

class UttaksperiodeForm extends React.Component<Props> {
    static contextTypes = {
        validForm: PT.object
    };
    context: any;
    timeoutId: number;

    constructor(props: Props) {
        super(props);
        this.updateStønadskontoType = this.updateStønadskontoType.bind(this);
        this.updateForeldrepengerFørFødselUttak = this.updateForeldrepengerFørFødselUttak.bind(this);
        this.updateOverføringUttak = this.updateOverføringUttak.bind(this);
        this.getVisibility = this.getVisibility.bind(this);
        this.onChange = this.onChange.bind(this);
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

    onChange(periode: UttakFormPeriodeType) {
        this.props.onChange(periode, this.getVisibility());
        if (this.context.validForm) {
            this.timeoutId = setTimeout(() => {
                if (this.context.validForm) {
                    this.context.validForm.validateAll();
                }
            });
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
                konto,
                forelder: this.props.søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR,
                harIkkeAktivitetskrav:
                    konto === StønadskontoType.AktivitetsfriKvote ||
                    konto === StønadskontoType.AktivitetsfriFlerbarnsdager
                        ? true
                        : undefined,
                ønskerFlerbarnsdager: konto === StønadskontoType.Flerbarnsdager ? true : undefined
            });
        } else {
            this.onChange({
                type: Periodetype.Uttak,
                konto,
                forelder: this.props.søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR,
                harIkkeAktivitetskrav:
                    konto === StønadskontoType.AktivitetsfriKvote ||
                    konto === StønadskontoType.AktivitetsfriFlerbarnsdager
                        ? true
                        : undefined,
                ønskerFlerbarnsdager: konto === StønadskontoType.Flerbarnsdager ? true : undefined
            });
        }
    }

    getVisibility() {
        const {
            periode,
            søknad,
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
            søkerErAleneOmOmsorg: søknad.søker.erAleneOmOmsorg,
            søkerErFarEllerMedmor,
            annenForelderHarRett,
            morErUfør,
            familiehendelsesdato,
            situasjon: søknad.situasjon
        });
    }
    render() {
        const {
            periode,
            søknad,
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
        const ugyldigeTidsperioder = getTidsperioderIUttaksplan(søknad.uttaksplan, periode.id);

        const tidsperiode = periode.tidsperiode as Partial<Tidsperiode>;
        const feil: Feil | undefined = harOverlappendePerioder
            ? { feilmelding: getMessage(intl, 'periodeliste.overlappendePeriode') }
            : undefined;

        return (
            <React.Fragment>
                <Block margin={periode.konto === StønadskontoType.ForeldrepengerFørFødsel ? 'xs' : 'm'}>
                    <UttakTidsperiodeSpørsmål
                        periode={periode}
                        ugyldigeTidsperioder={ugyldigeTidsperioder}
                        familiehendelsesdato={familiehendelsesdato}
                        onChange={(v: Partial<Tidsperiode>) => this.onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode}
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
                                navnAnnenForelder={søknad.annenForelder.fornavn}
                                periode={periode}
                            />
                        </Block>
                        <Block visible={visibility.isVisible(UttakSpørsmålKeys.skalHaGradering)} margin="none">
                            <GradertUttakPart
                                visibility={visibility}
                                periode={periode}
                                arbeidsforhold={arbeidsforhold}
                                onChange={this.onChange}
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
                            erEndringssøknad={søknad.erEndringssøknad}
                            navnAnnenForelder={søknad.annenForelder.fornavn}
                            årsak={periode.årsak}
                            søkerErFarEllerMedmor={søkerErFarEllerMedmor}
                            vedlegg={periode.vedlegg as Attachment[]}
                            onChange={(p) => this.updateOverføringUttak(p)}
                        />
                    </Block>
                )}

                {periode.id === undefined && (
                    <NyPeriodeKnapperad
                        periodeKanLeggesTil={visibility.areAllQuestionsAnswered()}
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
    return {
        søknad: state.søknad,
        arbeidsforhold: state.api.søkerinfo!.arbeidsforhold,
        velgbareStønadskontotyper: getVelgbareStønadskontotyper(state.api.tilgjengeligeStønadskontoer),
        søkerErFarEllerMedmor,
        morErUfør: søkerErFarEllerMedmor && state.søknad.annenForelder.erUfør,
        navnPåForeldre: getNavnPåForeldre(state.søknad, state.api.søkerinfo!.person!),
        familiehendelsesdato: getFamiliehendelsedato(state.søknad.barn, state.søknad.situasjon),
        annenForelderHarRett: state.søknad.annenForelder.harRettPåForeldrepenger
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
