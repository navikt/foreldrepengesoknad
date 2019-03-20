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
    Periode,
    isUttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { Forelder, Tidsperiode } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import { Skjemanummer } from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import Block from 'common/components/block/Block';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import Arbeidsforhold from '../../types/Arbeidsforhold';
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
import lenker from 'app/util/routing/lenker';
import UlønnetPermisjonInfo from './partials/UlønnetPermisjonInfo';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';
import VeilederpanelInnhold from '../veilederpanel-innhold/VeilederpanelInnhold';
import FlernbarnsdagerSpørsmål from './partials/FlerbarnsdagerSpørsmål';
import { getFlerbarnsuker } from 'app/util/validation/uttaksplan/uttaksplanHarForMangeFlerbarnsuker';
import { selectArbeidsforhold, selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';
import { getVelgbareStønadskontotyper } from 'app/util/uttaksplan/stønadskontoer';
import getSøknadsperiode from 'app/regler/søknadsperioden/Søknadsperioden';
import getUttakSkjemaregler from 'app/regler/uttak/uttaksskjema/uttakSkjemaregler';

export type UttakFormPeriodeType =
    | RecursivePartial<Uttaksperiode>
    | RecursivePartial<Overføringsperiode>
    | RecursivePartial<Oppholdsperiode>;

interface OwnProps {
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
    søknadsinfo: Søknadsinfo;
    velgbareStønadskontotyper: StønadskontoType[];
}

type Props = OwnProps & StateProps & InjectedIntlProps;

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
                this.props.søknadsinfo.søker.erFarEllerMedmor,
                this.props.periode.forelder,
                this.props.søknadsinfo
            )
        };
    }

    componentDidMount() {
        const { søknadsinfo, periode, velgbareStønadskontotyper } = this.props;
        if (
            !søknadsinfo.søknaden.erDeltUttak &&
            isUttaksperiode(periode) &&
            velgbareStønadskontotyper.length === 1 &&
            periode.konto === undefined
        ) {
            if (this.state.periodenGjelder !== undefined) {
                this.onChange({ konto: StønadskontoType.Foreldrepenger, forelder: this.state.periodenGjelder });
            } else {
                this.onChange({ konto: StønadskontoType.Foreldrepenger });
            }
        }

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
                    skalIkkeHaUttakFørTermin === false
                        ? getDefaultPermisjonStartdato(familiehendelsesdato, getPermisjonsregler())
                        : undefined,
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
        const { periode, kanEndreStønadskonto, velgbareStønadskontotyper, søknadsinfo } = this.props;

        return getUttakFormVisibility({
            periode,
            velgbareStønadskontotyper,
            kanEndreStønadskonto,
            søknadsinfo,
            skjemaregler: getUttakSkjemaregler(søknadsinfo, periode, velgbareStønadskontotyper),
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
            harOverlappendePerioder,
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
                <Block
                    visible={
                        !isForeldrepengerFørFødselUttaksperiode(periode) &&
                        søknadsinfo.søknaden.erDeltUttak &&
                        isValidTidsperiode(tidsperiode)
                    }>
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
                    }>
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
                            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                                <VeilederpanelInnhold
                                    messages={[
                                        {
                                            type: 'normal',
                                            contentIntlKey: 'uttaksplan.informasjon.flerbarnssøknad',
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
                            </Veilederpanel>
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
                                    <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                                        <VeilederpanelInnhold
                                            messages={[
                                                {
                                                    type: 'normal',
                                                    contentIntlKey: 'uttaksplan.informasjon.morErForSyk',
                                                    values: { navnMor: navnPåForeldre.mor }
                                                }
                                            ]}
                                        />
                                    </Veilederpanel>
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
                                    <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                                        <VeilederpanelInnhold
                                            messages={[
                                                {
                                                    type: 'normal',
                                                    contentIntlKey: 'uttaksplan.informasjon.morErForSykNeiSvar'
                                                }
                                            ]}
                                        />
                                    </Veilederpanel>
                                </>
                            )}

                        <Block
                            visible={visibility.isVisible(UttakSpørsmålKeys.aktivitetskravMor)}
                            hasChildBlocks={true}>
                            <AktivitetskravMorBolk
                                vedlegg={periode.vedlegg as Attachment[]}
                                morsAktivitetIPerioden={periode.morsAktivitetIPerioden}
                                navnPåForeldre={søknadsinfo.navn}
                                onChange={(periodeData) => this.onChange(periodeData)}
                            />
                        </Block>
                        <Block visible={visibility.isVisible(UttakSpørsmålKeys.samtidigUttak)} margin="none">
                            <SamtidigUttakPart
                                onChange={this.onChange}
                                ønskerSamtidigUttak={periode.ønskerSamtidigUttak}
                                visibility={visibility}
                                navn={søknadsinfo.navn}
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
                            søkerErFarEllerMedmor={søker.erFarEllerMedmor}
                            vedlegg={periode.vedlegg as Attachment[]}
                            onChange={(p) => this.onChange(p)}
                        />
                    </Block>
                )}
                {periode.type === Periodetype.Opphold && (
                    <>
                        {periode.årsak !== undefined && (
                            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                                <VeilederpanelInnhold
                                    messages={[
                                        {
                                            type: 'normal',
                                            contentIntlKey: 'uttaksplan.infoVedOpphold',
                                            formatContentAsHTML: true,
                                            values: {
                                                navn: søknadsinfo.navn.annenForelder.fornavn,
                                                link: lenker.viktigeFrister
                                            }
                                        }
                                    ]}
                                />
                            </Veilederpanel>
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

const mapStateToProps = (state: AppState): StateProps => {
    const søknadsinfo = getSøknadsinfo(state);
    const arbeidsforhold = selectArbeidsforhold(state);
    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(state);

    return {
        uttaksplan: state.søknad.uttaksplan,
        arbeidsforhold,
        søknadsinfo: søknadsinfo!,
        velgbareStønadskontotyper: getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer)
    };
};

export default connect(mapStateToProps)(injectIntl(UttaksperiodeForm));
