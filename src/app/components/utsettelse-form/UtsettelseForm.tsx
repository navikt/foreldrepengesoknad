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
import { Forelder, Tidsperiode } from 'common/types';
import { harAktivtArbeidsforhold } from '../../util/domain/arbeidsforhold';
import { getUtsettelseFormVisibility, UtsettelseSpørsmålKeys } from './utsettelseFormConfig';
import HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål from '../../spørsmål/HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål';
import Block from 'common/components/block/Block';
import UtsettelseTidsperiodeSpørsmål from './partials/UtsettelseTidsperiodeSpørsmål';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { RecursivePartial } from '../../types/Partial';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import NyPeriodeKnapperad from '../ny-periode-form/NyPeriodeKnapperad';
import AktivitetskravMorBolk from '../../bolker/AktivitetskravMorBolk';
import HvorSkalDuJobbeSpørsmålFlervalg from 'app/spørsmål/HvorSkalDuJobbeSpørsmålFlervalg';
import { EndrePeriodeChangeEvent } from '../endre-periode-form/EndrePeriodeForm';
import { Tidsperioden, isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import AlertStripe from 'nav-frontend-alertstriper';
import VeilederMeldinger from '../veilederpanel-innhold/VeilederpanelInnhold';
import { getSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { Søknadsinfo } from 'app/selectors/types';
import { selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';

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
    arbeidsforhold: Arbeidsforhold[];
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    søknadsinfo: Søknadsinfo;
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
        if (this.context.validForm && this.props.periode.id) {
            this.context.validForm.validateAll();
        }
    }

    onChange(periode: UtsettelseFormPeriodeType, replace: boolean = false) {
        this.props.onChange(periode, replace, this.getVisibility());
        if (this.context.validForm && this.props.periode.id) {
            this.context.validForm.validateAll();
        }
    }

    getUtsettelseÅrsakRadios(): RadioProps[] {
        const { søknadsinfo, intl } = this.props;

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

        if (
            søknadsinfo.søker.erAleneOmOmsorg ||
            !søknadsinfo.annenForelder.harRett ||
            søknadsinfo.annenForelder.kanIkkeOppgis
        ) {
            return defaultRadios;
        }

        return [...defaultRadios];
    }

    onVariantChange(variant: Utsettelsesvariant) {
        if (variant !== this.state.variant) {
            const forelder =
                this.props.søknadsinfo.søker.erFarEllerMedmor === false ? Forelder.MOR : Forelder.FARMEDMOR;
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
        const { periode, søknadsinfo } = this.props;
        const { variant } = this.state;

        return getUtsettelseFormVisibility({
            variant,
            periode,
            søknadsinfo
        });
    }

    render() {
        const {
            periode,
            antallFeriedager,
            arbeidsforhold,
            harOverlappendePerioder,
            onCancel,
            søknadsinfo,
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
                            familiehendelsesdato={søknadsinfo.søknaden.familiehendelsesdato}
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
                                        <VeilederMeldinger
                                            messages={[
                                                {
                                                    type: 'normal',
                                                    contentIntlKey:
                                                        'vedlegg.veileder.dokumentasjonAvArbeidVedUtsettelse'
                                                }
                                            ]}
                                        />
                                    </Block>
                                    <Block visible={getVeilederForFrilansOgSNVisible(periode)}>
                                        <VeilederMeldinger
                                            messages={[
                                                {
                                                    type: 'normal',
                                                    contentIntlKey: 'uttaksplan.infoTilFrilansOgSelvstendig'
                                                }
                                            ]}
                                        />
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
                                    navnPåForeldre={søknadsinfo.navn}
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
        arbeidsforhold: state.api.søkerinfo!.arbeidsforhold || [],
        tilgjengeligeStønadskontoer: selectTilgjengeligeStønadskontoer(state),
        søknadsinfo: getSøknadsinfo(state)!
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeForm));
