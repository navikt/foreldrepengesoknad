import * as React from 'react';
import moment from 'moment';
import {
    Periodetype,
    StønadskontoType,
    Uttaksperiode,
    ForeldrepengerFørFødselUttaksperiode,
    Overføringsperiode,
    MorsAktivitet,
    Oppholdsperiode,
    isForeldrepengerFørFødselUttaksperiode,
    Periode,
    isUttaksperiode
} from '../../../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode, Feil } from 'common/types';
import { RecursivePartial } from '../../../../types/Partial';
import { injectIntl, IntlShape } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import Block from 'common/components/block/Block';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import Arbeidsforhold from '../../../../types/Arbeidsforhold';
import { getUttakFormVisibility, UttakSpørsmålKeys } from './uttakFormConfig';
import { getTidsperioderIUttaksplan, getUtsettelserIUttaksplan } from '../../../../util/uttaksplan';
import AktivitetskravMorBolk from '../AktivitetskravMorBolk';
import NyPeriodeKnapperad from '../nyPeriodeForm/NyPeriodeKnapperad';
import SamtidigUttakPart from './partials/SamtidigUttakPart';
import ForeldrepengerFørFødselPart from './partials/ForeldrepengerFørFødselPart';
import OverføringUttakPart from './partials/OverføringUttakPart';
import GradertUttakPart from './partials/GradertUttakPart';
import UttakTidsperiodeSpørsmål from './partials/UttakTidsperiodeSpørsmål';
import getMessage from 'common/util/i18nUtils';
import { erUttakAvAnnenForeldersKvote } from '../../../../util/uttaksplan/uttakUtils';
import { Uttaksdagen } from '../../../../util/uttaksplan/Uttaksdagen';
import { getDefaultPermisjonStartdato } from '../../../../util/uttaksplan/permisjonUtils';
import ErMorForSykSpørsmål from 'app/spørsmål/ErMorForSykSpørsmål';
import { EndrePeriodeChangeEvent } from '../endrePeriodeForm/EndrePeriodeForm';
import { isValidTidsperiode } from '../../../../util/uttaksplan/Tidsperioden';
import HvemSkalTaForeldrepengerSpørsmål from './partials/HvemSkalTaForeldrepengerSpørsmål';
import {
    getStønadskontoFromOppholdsårsak,
    getOppholdsÅrsakFromStønadskonto
} from 'app/util/uttaksplan/uttaksperiodeUtils';
import { selectSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { Søknadsinfo, NavnISøknaden } from 'app/selectors/types';
import lenker from 'app/util/routing/lenker';
import UlønnetPermisjonInfo from './partials/UlønnetPermisjonInfo';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import FlernbarnsdagerSpørsmål from './partials/FlerbarnsdagerSpørsmål';
import { getFlerbarnsuker } from 'app/util/validation/uttaksplan/uttaksplanHarForMangeFlerbarnsuker';
import { selectArbeidsforhold, selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';
import { getVelgbareStønadskontotyper } from 'app/util/uttaksplan/stønadskontoer';
import getSøknadsperiode from 'app/regler/søknadsperioden/Søknadsperioden';
import getUttakSkjemaregler from 'app/regler/uttak/uttaksskjema/uttakSkjemaregler';
import { periodeErInnenDeFørsteSeksUkene } from 'app/util/validation/uttaksplan/uttaksplanTidsperiodeValidation';
import { VeilederMessage } from '../../../veilederInfo/types';
import VedleggSpørsmål from 'app/components/skjema/vedleggSpørsmål/VedleggSpørsmål';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { Skjemanummer } from 'app/types/søknad/Søknad';
import { ValidFormContext, ValidFormContextInterface } from 'common/lib/validation/elements/ValiderbarForm';

export type UttakFormPeriodeType =
    | RecursivePartial<Uttaksperiode>
    | RecursivePartial<Overføringsperiode>
    | RecursivePartial<Oppholdsperiode>;

interface OwnProps {
    periode: UttakFormPeriodeType;
    kanEndreStønadskonto: boolean;
    onChange: EndrePeriodeChangeEvent;
    onCancel?: () => void;
    intl: IntlShape;
}

interface ComponentStateProps {
    periodenGjelder: Forelder | undefined;
}

interface StateProps {
    uttaksplan: Periode[];
    arbeidsforhold?: Arbeidsforhold[];
    søknadsinfo: Søknadsinfo;
    velgbareStønadskontotyper: StønadskontoType[];
}

type Props = OwnProps & StateProps;

const periodenGjelderAnnenForelder = (søkerErFarEllerMedmor: boolean, forelder: Forelder): boolean => {
    return (søkerErFarEllerMedmor && forelder === Forelder.farMedmor) ||
        (!søkerErFarEllerMedmor && forelder === Forelder.mor)
        ? false
        : true;
};

const getPeriodeGjelder = (
    søkerErFarEllerMedmor: boolean,
    forelder: Forelder | undefined,
    søknadsinfo: Søknadsinfo
): Forelder | undefined => {
    if (!søknadsinfo.søknaden.erDeltUttak) {
        return søkerErFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
    }

    if (forelder === undefined) {
        return undefined;
    }

    if (periodenGjelderAnnenForelder(søkerErFarEllerMedmor, forelder)) {
        return søkerErFarEllerMedmor ? Forelder.mor : Forelder.farMedmor;
    } else {
        return søkerErFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;
    }
};

const getOppholdsInfotekst = (
    periode: Periode,
    familiehendelsesdato: Date,
    søkerErMor: boolean,
    navn: NavnISøknaden
): VeilederMessage[] => {
    return periodeErInnenDeFørsteSeksUkene(periode as Periode, familiehendelsesdato) && søkerErMor
        ? [
              {
                  type: 'normal',
                  contentIntlKey: 'uttaksplan.infoVedOpphold.førsteSeksUker',
                  values: {
                      navnFar: navn.farMedmor.fornavn
                  }
              }
          ]
        : [
              {
                  type: 'normal',
                  contentIntlKey: 'uttaksplan.infoVedOpphold',
                  formatContentAsHTML: true,
                  values: {
                      navn: navn.annenForelder.fornavn,
                      link: lenker.viktigeFrister
                  }
              }
          ];
};

type FormContextProps = Props & {
    formContext: ValidFormContextInterface;
};

class UttaksperiodeForm extends React.Component<FormContextProps, ComponentStateProps> {
    timeoutId: number;

    constructor(props: FormContextProps) {
        super(props);
        this.updateStønadskontoType = this.updateStønadskontoType.bind(this);
        this.updateForeldrepengerFørFødselUttak = this.updateForeldrepengerFørFødselUttak.bind(this);
        this.updatePeriodenGjelder = this.updatePeriodenGjelder.bind(this);
        this.getVisibility = this.getVisibility.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            periodenGjelder: getPeriodeGjelder(
                this.props.søknadsinfo.søker.erFarEllerMedmor,
                this.props.periode.forelder,
                this.props.søknadsinfo
            )
        };
    }

    componentDidMount() {
        const { periode, velgbareStønadskontotyper } = this.props;

        if (isUttaksperiode(periode) && velgbareStønadskontotyper.length === 1 && periode.konto === undefined) {
            if (this.state.periodenGjelder !== undefined) {
                this.onChange({ konto: StønadskontoType.Foreldrepenger, forelder: this.state.periodenGjelder });
            } else {
                this.onChange({ konto: StønadskontoType.Foreldrepenger });
            }
        }

        if (this.props.formContext && this.props.periode.id) {
            this.props.formContext.validateAll();
        }
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    onChange(periode: UttakFormPeriodeType, replace: boolean = false) {
        this.props.onChange(periode, replace, this.getVisibility());
        if (this.props.formContext) {
            this.timeoutId = setTimeout(() => {
                if (this.props.formContext && this.props.periode.id) {
                    this.props.formContext.validateAll();
                }
            });
        }
    }

    updatePeriodenGjelder(forelder: Forelder) {
        const { periode, søknadsinfo } = this.props;
        const søkerErFarEllerMedmor = søknadsinfo.søker.erFarEllerMedmor;

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
        const { familiehendelsesdato } = this.props.søknadsinfo.søknaden;

        this.onChange({
            type: Periodetype.Uttak,
            skalIkkeHaUttakFørTermin,
            tidsperiode: {
                fom:
                    skalIkkeHaUttakFørTermin === false ? getDefaultPermisjonStartdato(familiehendelsesdato) : undefined,
                tom: skalIkkeHaUttakFørTermin ? undefined : Uttaksdagen(familiehendelsesdato).forrige()
            }
        });
    }

    updateStønadskontoType(konto: StønadskontoType) {
        const { søknadsinfo } = this.props;
        const søkerErFarEllerMedmor = søknadsinfo.søker.erFarEllerMedmor;

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
                    forelder: this.state.periodenGjelder
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
        const { periode, kanEndreStønadskonto, velgbareStønadskontotyper, søknadsinfo } = this.props;

        return getUttakFormVisibility({
            periode,
            velgbareStønadskontotyper,
            kanEndreStønadskonto,
            søknadsinfo,
            skjemaregler: getUttakSkjemaregler(søknadsinfo, periode),
            søknadsperiode: getSøknadsperiode(søknadsinfo, periode as Periode)
        });
    }

    render() {
        const {
            periode,
            søknadsinfo,
            uttaksplan,
            velgbareStønadskontotyper,
            arbeidsforhold,
            onCancel,
            intl
        } = this.props;

        const visibility = this.getVisibility();
        const { familiehendelsesdato } = søknadsinfo.søknaden;
        const { søker } = søknadsinfo;
        const { navnPåForeldre } = søknadsinfo.navn;

        if (visibility === undefined) {
            return null;
        }
        const ugyldigeTidsperioder = søknadsinfo.søknaden.harGjenskaptUttaksplanFraEkisterendeSak
            ? getUtsettelserIUttaksplan(uttaksplan, periode.id)
            : getTidsperioderIUttaksplan(uttaksplan, periode.id);

        const tidsperiode = periode.tidsperiode as Partial<Tidsperiode>;

        const periodeErNyOgFørFamiliehendelsesdatoFeil: Feil | undefined =
            periode.id === undefined &&
            isValidTidsperiode(tidsperiode) &&
            moment(tidsperiode.fom).isBefore(familiehendelsesdato, 'days')
                ? { feilmelding: getMessage(intl, 'periodeliste.nyPeriodeErFørFamiliehendelsesdato') }
                : undefined;

        const erForeldrepengerFørFødselOgSkalIkkeHaUttakFørTermin =
            isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin === true;

        return (
            <React.Fragment>
                <Block visible={erForeldrepengerFørFødselOgSkalIkkeHaUttakFørTermin === false}>
                    <UttakTidsperiodeSpørsmål
                        periode={periode}
                        familiehendelsesdato={familiehendelsesdato}
                        ugyldigeTidsperioder={ugyldigeTidsperioder}
                        onChange={(v: Partial<Tidsperiode>) => this.onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode}
                        feil={periodeErNyOgFørFamiliehendelsesdatoFeil}
                    />
                </Block>
                <Block
                    visible={
                        !isForeldrepengerFørFødselUttaksperiode(periode) &&
                        !søker.harMidlertidigOmsorg &&
                        søknadsinfo.søknaden.erDeltUttak &&
                        isValidTidsperiode(tidsperiode)
                    }
                >
                    <HvemSkalTaForeldrepengerSpørsmål
                        navnPåForeldre={navnPåForeldre}
                        valgtForelder={this.state.periodenGjelder}
                        søkerErFarEllerMedmor={søker.erFarEllerMedmor}
                        onChange={(forelder: Forelder) => this.updatePeriodenGjelder(forelder)}
                    />
                </Block>
                <Block
                    visible={
                        visibility.isVisible(UttakSpørsmålKeys.kvote) &&
                        this.state.periodenGjelder !== undefined &&
                        velgbareStønadskontotyper.length > 1
                    }
                >
                    {søknadsinfo.søknaden.erFlerbarnssøknad && (
                        <VeilederInfo
                            messages={[
                                {
                                    type: 'normal',
                                    contentIntlKey: søknadsinfo.søknaden.erDeltUttak
                                        ? 'uttaksplan.informasjon.flerbarnssøknad'
                                        : 'uttaksplan.informasjon.flerbarnssøknad.ikkeDeltUttak',
                                    values: {
                                        navnMor: søknadsinfo.navn.mor.fornavn,
                                        uker: getFlerbarnsuker(
                                            søknadsinfo.søknaden.dekningsgrad!,
                                            søknadsinfo.søknaden.antallBarn
                                        )
                                    }
                                }
                            ]}
                        />
                    )}
                    <HvilkenKvoteSkalBenyttesSpørsmål
                        onChange={(stønadskontoType) => this.updateStønadskontoType(stønadskontoType)}
                        navnPåForeldre={navnPåForeldre}
                        navnAnnenForelder={søknadsinfo.navn.annenForelder.fornavn}
                        erOppholdsperiode={periode.type === Periodetype.Opphold}
                        velgbareStønadskontoer={velgbareStønadskontotyper}
                        valgtKvote={
                            periode.type === Periodetype.Uttak || periode.type === Periodetype.Overføring
                                ? periode.konto
                                : getStønadskontoFromOppholdsårsak((periode as Oppholdsperiode).årsak)
                        }
                    />
                    {søknadsinfo.annenForelder.harRett && <UlønnetPermisjonInfo />}
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
                        <Block visible={visibility.isVisible(UttakSpørsmålKeys.ønskerFlerbarnsdager)}>
                            <FlernbarnsdagerSpørsmål periode={periode} onChange={this.onChange} />
                        </Block>
                        <Block visible={visibility.isVisible(UttakSpørsmålKeys.erMorForSyk)}>
                            <ErMorForSykSpørsmål
                                onChange={(v) => this.onChange({ erMorForSyk: v })}
                                erMorForSyk={periode.erMorForSyk}
                            />
                        </Block>
                        {visibility.isVisible(UttakSpørsmålKeys.erMorForSyk) &&
                            periode.erMorForSyk === true && (
                                <>
                                    <VeilederInfo
                                        messages={[
                                            {
                                                type: 'normal',
                                                contentIntlKey: 'uttaksplan.informasjonVedSykdomAnnenForelder',
                                                values: { navn: navnPåForeldre.mor }
                                            }
                                        ]}
                                    />

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
                                    <VeilederInfo
                                        messages={[
                                            {
                                                type: 'normal',
                                                contentIntlKey: 'uttaksplan.informasjon.morErForSykNeiSvar'
                                            }
                                        ]}
                                    />
                                </>
                            )}

                        <Block visible={visibility.isVisible(UttakSpørsmålKeys.samtidigUttak)} margin="none">
                            <SamtidigUttakPart
                                onChange={this.onChange}
                                ønskerSamtidigUttak={periode.ønskerSamtidigUttak}
                                visibility={visibility}
                                navn={søknadsinfo.navn}
                                erFlerbarnssøknad={søknadsinfo.søknaden.erFlerbarnssøknad}
                                periode={periode}
                                søkerErMor={søknadsinfo.søker.erMor}
                            />
                        </Block>
                        <Block
                            visible={visibility.isVisible(UttakSpørsmålKeys.aktivitetskravMor)}
                            hasChildBlocks={true}
                        >
                            <AktivitetskravMorBolk
                                vedlegg={periode.vedlegg as Attachment[]}
                                morsAktivitetIPerioden={periode.morsAktivitetIPerioden}
                                navnPåForeldre={søknadsinfo.navn}
                                onChange={(periodeData) => this.onChange(periodeData)}
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
                        margin="none"
                    >
                        <OverføringUttakPart
                            erEndringssøknad={søknadsinfo.søknaden.erEndringssøknad}
                            navnAnnenForelder={søknadsinfo.navn.annenForelder.fornavn}
                            årsak={periode.årsak}
                            søkerErFarEllerMedmor={søker.erFarEllerMedmor}
                            vedlegg={periode.vedlegg as Attachment[]}
                            onChange={(p) => this.onChange(p)}
                        />
                    </Block>
                )}
                {periode.type === Periodetype.Opphold && (
                    <>
                        {periode.årsak !== undefined && (
                            <VeilederInfo
                                messages={getOppholdsInfotekst(
                                    periode as Periode,
                                    søknadsinfo.søknaden.familiehendelsesdato,
                                    søknadsinfo.søker.erMor,
                                    søknadsinfo.navn
                                )}
                            />
                        )}
                    </>
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

const UttaksperiodeFormContextWrapper = (props: Props) => {
    const formContext = React.useContext(ValidFormContext);

    return <UttaksperiodeForm {...props} formContext={formContext} />;
};

const mapStateToProps = (state: AppState): StateProps => {
    const søknadsinfo = selectSøknadsinfo(state);
    const arbeidsforhold = selectArbeidsforhold(state);
    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(state);

    return {
        uttaksplan: state.søknad.uttaksplan,
        arbeidsforhold,
        søknadsinfo: søknadsinfo!,
        velgbareStønadskontotyper: getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer)
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeFormContextWrapper));
