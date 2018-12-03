import * as React from 'react';
import PT from 'prop-types';
import {
    Periodetype,
    StønadskontoType,
    Uttaksperiode,
    ForeldrepengerFørFødselUttaksperiode,
    Overføringsperiode
} from '../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import { Skjemanummer, Uttaksplan } from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import Block from 'common/components/block/Block';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { getVelgbareStønadskontotyper } from '../../util/uttaksplan/stønadskontoer';
import { getUttakFormVisibility, UttakSpørsmålKeys } from './uttakFormConfig';
import { getTidsperioderIUttaksplan } from '../../util/uttaksplan';
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
import { Søknadsinfo } from '../../selectors/søknadsinfoSelector';
import { selectArbeidsforhold, selectTilgjengeligeStønadskontoer } from '../../selectors/apiSelector';
import { getUttakRegler } from '../../regler/uttak/uttakRegler';

export type UttakFormPeriodeType = RecursivePartial<Uttaksperiode> | RecursivePartial<Overføringsperiode>;

interface OwnProps {
    søknadsinfo: Søknadsinfo;
    periode: UttakFormPeriodeType;
    kanEndreStønadskonto: boolean;
    harOverlappendePerioder?: boolean;
    onChange: EndrePeriodeChangeEvent;
    onCancel?: () => void;
}

interface StateProps {
    uttaksplan: Uttaksplan;
    arbeidsforhold?: Arbeidsforhold[];
    velgbareStønadskontotyper: StønadskontoType[];
}

type Props = OwnProps & StateProps & InjectedIntlProps;

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
        const { familiehendelsesdato } = this.props.søknadsinfo.søknaden;
        this.onChange({
            type: Periodetype.Uttak,
            skalIkkeHaUttakFørTermin,
            tidsperiode: {
                fom:
                    skalIkkeHaUttakFørTermin === false
                        ? getDefaultPermisjonStartdato(familiehendelsesdato, getPermisjonsregler())
                        : undefined,
                tom: skalIkkeHaUttakFørTermin ? undefined : Uttaksdagen(familiehendelsesdato).forrige()
            }
        });
    }

    updateOverføringUttak(periode: RecursivePartial<Overføringsperiode>) {
        this.onChange({
            type: Periodetype.Overføring,
            ...periode,
            forelder: this.props.søknadsinfo.søker.erFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR
        });
    }

    updateStønadskontoType(konto: StønadskontoType) {
        const søkerErFarEllerMedmor = this.props.søknadsinfo.søker.erFarEllerMedmor;
        if (erUttakAvAnnenForeldersKvote(konto, søkerErFarEllerMedmor)) {
            this.onChange({
                type: Periodetype.Overføring,
                konto,
                forelder: søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR,
                harIkkeAktivitetskrav: konto === StønadskontoType.AktivitetsfriKvote ? true : undefined,
                ønskerFlerbarnsdager: konto === StønadskontoType.Flerbarnsdager ? true : undefined
            });
        } else {
            this.onChange({
                type: Periodetype.Uttak,
                konto,
                forelder: søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR,
                harIkkeAktivitetskrav: konto === StønadskontoType.AktivitetsfriKvote ? true : undefined,
                ønskerFlerbarnsdager: konto === StønadskontoType.Flerbarnsdager ? true : undefined
            });
        }
    }

    getVisibility() {
        const { periode, kanEndreStønadskonto, velgbareStønadskontotyper, søknadsinfo } = this.props;

        return getUttakFormVisibility({
            periode,
            velgbareStønadskontotyper,
            kanEndreStønadskonto,
            søknadsinfo,
            regler: getUttakRegler(søknadsinfo, periode)
        });
    }
    render() {
        const {
            periode,
            søknadsinfo,
            uttaksplan,
            velgbareStønadskontotyper,
            arbeidsforhold,
            harOverlappendePerioder,
            onCancel,
            intl
        } = this.props;

        const visibility = this.getVisibility();
        const ugyldigeTidsperioder = getTidsperioderIUttaksplan(uttaksplan, periode.id);

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
                        familiehendelsesdato={søknadsinfo.søknaden.familiehendelsesdato}
                        onChange={(v) => this.onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode}
                        feil={feil}
                    />
                </Block>
                <Block visible={visibility.isVisible(UttakSpørsmålKeys.kvote)}>
                    <HvilkenKvoteSkalBenyttesSpørsmål
                        onChange={(stønadskontoType) => this.updateStønadskontoType(stønadskontoType)}
                        navnPåForeldre={søknadsinfo.navn.navnPåForeldre}
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
                                            values={{ navnMor: søknadsinfo.navn.mor.fornavn }}
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
                                navnPåForeldre={søknadsinfo.navn.navnPåForeldre}
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
                            erEndringssøknad={søknadsinfo.søknaden.erEndringssøknad}
                            navnAnnenForelder={søknadsinfo.navn.annenForelder.fornavn}
                            årsak={periode.årsak}
                            søkerErFarEllerMedmor={søknadsinfo.søker.erFarEllerMedmor}
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

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => {
    const arbeidsforhold = selectArbeidsforhold(state);
    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(state);

    return {
        uttaksplan: state.søknad.uttaksplan,
        arbeidsforhold,
        velgbareStønadskontotyper: getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer)
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
