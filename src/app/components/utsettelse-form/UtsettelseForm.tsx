import * as React from 'react';
import PT from 'prop-types';

import {
    Arbeidsform,
    Oppholdsperiode,
    Periodetype,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    TilgjengeligStønadskonto
} from '../../types/uttaksplan/periodetyper';
import UtsettelsePgaSykdomPart, { UtsettelsePgaSykdomChangePayload } from './partials/UtsettelsePgaSykdomPart';
import UtsettelsePgaFerieInfo from './partials/UtsettelsePgaFerieInfo';
import { Forelder, NavnPåForeldre, Tidsperiode } from 'common/types';
import { harAktivtArbeidsforhold } from '../../util/domain/arbeidsforhold';
import { getUtsettelseFormVisibility, UtsettelseSpørsmålKeys } from './utsettelseFormConfig';
import HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål from '../../spørsmål/HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål';
import Block from 'common/components/block/Block';
import UtsettelseTidsperiodeSpørsmål from './partials/UtsettelseTidsperiodeSpørsmål';
import { getFamiliehendelsedato, getNavnPåForeldre } from '../../util/uttaksplan';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import Søknad from '../../types/søknad/Søknad';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { RecursivePartial } from '../../types/Partial';
import { getErSøkerFarEllerMedmor } from '../../util/domain/personUtil';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import NyPeriodeKnapperad from '../ny-periode-form/NyPeriodeKnapperad';
import AktivitetskravMorBolk from '../../bolker/AktivitetskravMorBolk';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import HvorSkalDuJobbeSpørsmålFlervalg from 'app/spørsmål/HvorSkalDuJobbeSpørsmålFlervalg';
import { EndrePeriodeChangeEvent } from '../endre-periode-form/EndrePeriodeForm';
import { Tidsperioden, isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import AlertStripe from 'nav-frontend-alertstriper';

export type UtsettelseFormPeriodeType = RecursivePartial<Utsettelsesperiode> | RecursivePartial<Oppholdsperiode>;

interface OwnProps {
    periode: UtsettelseFormPeriodeType;
    antallFeriedager: number;
    harOverlappendePerioder?: boolean;
    onChange: EndrePeriodeChangeEvent;
    onCancel?: () => void;
    onUtsettelsesvariantChange?: (utsettelsesvariant: Utsettelsesvariant | undefined) => void;
}

interface StateProps {
    søknad: Søknad;
    arbeidsforhold: Arbeidsforhold[];
    søkerErFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    familiehendelsesdato: Date;
}

type Props = OwnProps & StateProps & InjectedIntlProps;

interface State {
    variant?: Utsettelsesvariant;
}

export enum Utsettelsesvariant {
    Ferie = 'ferie',
    Arbeid = 'arbeid',
    Sykdom = 'sykdom'
}

export const getVariantFromPeriode = (periode: UtsettelseFormPeriodeType): Utsettelsesvariant | undefined => {
    switch (periode.årsak) {
        case UtsettelseÅrsakType.Arbeid:
            return Utsettelsesvariant.Arbeid;
        case UtsettelseÅrsakType.Ferie:
            return Utsettelsesvariant.Ferie;
        case UtsettelseÅrsakType.Sykdom:
        case UtsettelseÅrsakType.InstitusjonBarnet:
        case UtsettelseÅrsakType.InstitusjonSøker:
            return Utsettelsesvariant.Sykdom;
        default:
            return undefined;
    }
};

const getVeilederForFrilansOgSNVisible = (periode: UtsettelseFormPeriodeType) => {
    const castPeriode = periode as Utsettelsesperiode;

    return (
        castPeriode.erArbeidstaker === false &&
        castPeriode.arbeidsformer !== undefined &&
        (castPeriode.arbeidsformer.includes(Arbeidsform.frilans) ||
            castPeriode.arbeidsformer.includes(Arbeidsform.selvstendignæringsdrivende))
    );
};

class UtsettelsesperiodeForm extends React.Component<Props, State> {
    static contextTypes = {
        validForm: PT.object
    };
    context: any;

    constructor(props: Props) {
        super(props);
        this.onVariantChange = this.onVariantChange.bind(this);
        this.onSykdomÅrsakChange = this.onSykdomÅrsakChange.bind(this);
        this.getVisibility = this.getVisibility.bind(this);
        this.state = {
            variant: getVariantFromPeriode(props.periode)
        };
    }

    componentDidMount() {
        if (this.context.validForm) {
            this.context.validForm.validateAll();
        }
    }

    onChange(periode: UtsettelseFormPeriodeType, replace: boolean = false) {
        this.props.onChange(periode, replace, this.getVisibility());
        if (this.context.validForm) {
            this.context.validForm.validateAll();
        }
    }

    getUtsettelseÅrsakRadios(): RadioProps[] {
        const { søknad, intl } = this.props;
        const { annenForelder, søker } = søknad;
        const { kanIkkeOppgis, harRettPåForeldrepenger } = annenForelder;
        const { erAleneOmOmsorg } = søker;

        const defaultRadios: RadioProps[] = [
            {
                label: getMessage(intl, 'jegskalhaferie'),
                value: Utsettelsesvariant.Ferie
            },
            {
                label: getMessage(intl, 'jegskaljobbeheltid'),
                value: Utsettelsesvariant.Arbeid
            },
            {
                label: getMessage(intl, 'pgasykdom'),
                value: Utsettelsesvariant.Sykdom
            }
        ];

        if (erAleneOmOmsorg || !harRettPåForeldrepenger || kanIkkeOppgis) {
            return defaultRadios;
        }

        return [...defaultRadios];
    }

    onVariantChange(variant: Utsettelsesvariant) {
        if (variant !== this.state.variant) {
            const forelder = this.props.søkerErFarEllerMedmor === false ? Forelder.MOR : Forelder.FARMEDMOR;
            if (variant === Utsettelsesvariant.Arbeid) {
                this.onChange({
                    type: Periodetype.Utsettelse,
                    årsak: UtsettelseÅrsakType.Arbeid,
                    forelder,
                    erArbeidstaker: this.props.arbeidsforhold.length > 0
                });
            } else if (variant === Utsettelsesvariant.Ferie) {
                this.onChange({
                    type: Periodetype.Utsettelse,
                    årsak: UtsettelseÅrsakType.Ferie,
                    forelder,
                    erArbeidstaker: this.props.arbeidsforhold.length > 0
                });
            } else if (variant === Utsettelsesvariant.Sykdom) {
                this.onChange({
                    type: Periodetype.Utsettelse,
                    årsak: undefined,
                    forelder,
                    erArbeidstaker: this.props.arbeidsforhold.length > 0
                });
            }
        }
        this.setState({
            variant
        });
        if (this.props.onUtsettelsesvariantChange) {
            this.props.onUtsettelsesvariantChange(variant);
        }
    }

    onSykdomÅrsakChange({ sykdomsårsak, vedlegg }: UtsettelsePgaSykdomChangePayload) {
        if (sykdomsårsak === UtsettelseÅrsakType.InstitusjonBarnet) {
            this.onChange({
                årsak: UtsettelseÅrsakType.InstitusjonBarnet,
                vedlegg
            });
        } else if (sykdomsårsak === UtsettelseÅrsakType.InstitusjonSøker) {
            this.onChange({
                årsak: UtsettelseÅrsakType.InstitusjonSøker,
                vedlegg
            });
        } else if (sykdomsårsak === UtsettelseÅrsakType.Sykdom) {
            this.onChange({
                årsak: UtsettelseÅrsakType.Sykdom,
                vedlegg
            });
        } else {
            throw new Error('No sykdomsårsak defined');
        }
    }

    getVisibility() {
        const { periode, søknad, søkerErFarEllerMedmor, familiehendelsesdato } = this.props;
        const { variant } = this.state;

        return getUtsettelseFormVisibility({
            variant,
            periode,
            søkerErAleneOmOmsorg: søknad.søker.erAleneOmOmsorg,
            søkerErFarEllerMedmor,
            familiehendelsesdato,
            annenForelder: søknad.annenForelder
        });
    }

    render() {
        const {
            periode,
            antallFeriedager,
            arbeidsforhold,
            søknad,
            navnPåForeldre,
            harOverlappendePerioder,
            onCancel,
            intl
        } = this.props;

        const { variant } = this.state;

        const visibility = this.getVisibility();

        if (visibility === undefined) {
            return null;
        }
        const tidsperiode = periode.tidsperiode as Partial<Tidsperiode>;
        const antallHelligdager = isValidTidsperiode(tidsperiode) ? Tidsperioden(tidsperiode).getAntallFridager() : 0;
        const visInfoOmHelligdagerOgFerie =
            antallHelligdager > 0 &&
            periode.type === Periodetype.Utsettelse &&
            periode.årsak === UtsettelseÅrsakType.Ferie;
        return (
            <>
                <Block hasChildBlocks={true}>
                    <Block>
                        <UtsettelseTidsperiodeSpørsmål
                            tidsperiode={tidsperiode}
                            familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
                            onChange={(p) => this.onChange({ tidsperiode: p })}
                            feil={
                                harOverlappendePerioder
                                    ? { feilmelding: getMessage(intl, 'periodeliste.overlappendePeriode') }
                                    : undefined
                            }
                        />
                    </Block>
                    <Block
                        visible={visibility.isVisible(UtsettelseSpørsmålKeys.variant)}
                        margin={visInfoOmHelligdagerOgFerie ? 'xs' : undefined}>
                        <HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål
                            variant={variant}
                            radios={this.getUtsettelseÅrsakRadios()}
                            onChange={(v) => this.onVariantChange(v)}
                        />
                    </Block>
                    <Block visible={visInfoOmHelligdagerOgFerie}>
                        <AlertStripe type="info" solid={true}>
                            <FormattedMessage id="utsettelse.helligdager" />
                        </AlertStripe>
                    </Block>

                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.ferieinfo)} hasChildBlocks={true}>
                        <UtsettelsePgaFerieInfo
                            antallFeriedager={antallFeriedager}
                            aktivtArbeidsforhold={harAktivtArbeidsforhold(arbeidsforhold, tidsperiode.tom)}
                            forelder={Forelder.MOR}
                        />
                    </Block>
                    {periode.type === Periodetype.Utsettelse && (
                        <>
                            {periode.årsak === UtsettelseÅrsakType.Arbeid && (
                                <>
                                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.arbeidsplass)}>
                                        <HvorSkalDuJobbeSpørsmålFlervalg
                                            arbeidsforhold={arbeidsforhold || []}
                                            onChange={(orgnumre, arbeidsformer) =>
                                                this.onChange({
                                                    orgnumre,
                                                    arbeidsformer,
                                                    erArbeidstaker: arbeidsformer.includes(Arbeidsform.arbeidstaker)
                                                })
                                            }
                                            arbeidsformer={(periode as Utsettelsesperiode).arbeidsformer || []}
                                            orgnumre={(periode as Utsettelsesperiode).orgnumre || []}
                                        />
                                    </Block>
                                    <Block visible={periode.erArbeidstaker === true}>
                                        <Veilederinfo>
                                            {getMessage(intl, 'vedlegg.veileder.dokumentasjonAvArbeidVedUtsettelse')}
                                        </Veilederinfo>
                                    </Block>
                                    <Block visible={getVeilederForFrilansOgSNVisible(periode)}>
                                        <Veilederinfo>
                                            <FormattedMessage id="uttaksplan.infoTilFrilansOgSelvstendig" />
                                        </Veilederinfo>
                                    </Block>
                                </>
                            )}
                            <Block
                                visible={visibility.isVisible(UtsettelseSpørsmålKeys.sykdomsårsak)}
                                hasChildBlocks={true}>
                                <UtsettelsePgaSykdomPart
                                    onChange={this.onSykdomÅrsakChange}
                                    vedlegg={(periode.vedlegg as Attachment[]) || []}
                                    sykdomsårsak={periode.årsak}
                                    forelder={Forelder.MOR}
                                />
                            </Block>

                            <Block
                                visible={visibility.isVisible(UtsettelseSpørsmålKeys.morsAktivitet)}
                                hasChildBlocks={true}>
                                <AktivitetskravMorBolk
                                    navnPåForeldre={navnPåForeldre}
                                    morsAktivitetIPerioden={periode.morsAktivitetIPerioden}
                                    vedlegg={periode.vedlegg as Attachment[]}
                                    onChange={(periodeData) => this.onChange(periodeData)}
                                />
                            </Block>
                        </>
                    )}
                </Block>
                {periode.id === undefined && (
                    <NyPeriodeKnapperad
                        periodeKanLeggesTil={visibility.areAllQuestionsAnswered()}
                        onCancel={onCancel}
                        ariaLabelAvbryt={getMessage(intl, 'uttaksplan.nyttopphold.avbrytAriaLabel')}
                        ariaLabelLeggTil={getMessage(intl, 'uttaksplan.nyttopphold.leggTilAriaLabel')}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad,
        arbeidsforhold: state.api.søkerinfo!.arbeidsforhold || [],
        søkerErFarEllerMedmor: getErSøkerFarEllerMedmor(state.søknad.søker.rolle),
        navnPåForeldre: getNavnPåForeldre(state.søknad, state.api.søkerinfo!.person!),
        tilgjengeligeStønadskontoer: state.api.tilgjengeligeStønadskontoer,
        familiehendelsesdato: getFamiliehendelsedato(state.søknad.barn, state.søknad.situasjon)
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeForm));
