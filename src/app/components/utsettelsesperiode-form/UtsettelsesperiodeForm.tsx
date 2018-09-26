import * as React from 'react';
import {
    Periodetype,
    Oppholdsperiode,
    UtsettelseÅrsakType,
    Utsettelsesperiode,
    UtsettelseSykdomÅrsakType
} from '../../types/uttaksplan/periodetyper';
import UtsettelsePgaSykdomPart, { UtsettelsePgaSykdomChangePayload } from './partials/UtsettelsePgaSykdomPart';
import OppholdsårsakSpørsmål from './partials/Oppholds\u00E5rsakSp\u00F8rsm\u00E5l';
import HvorSkalDuJobbeSpørsmål from '../../sp\u00F8rsm\u00E5l/HvorSkalDuJobbeSp\u00F8rsm\u00E5l';
import UtsettelsePgaFerieInfo from './partials/UtsettelsePgaFerieInfo';
import { Forelder, NavnPåForeldre, Tidsperiode } from 'common/types';
import { harAktivtArbeidsforhold } from '../../util/domain/arbeidsforhold';
import DateValues from '../../util/validation/values';
import { UtsettelseSpørsmålKeys, getUtsettelsesperiodeVisibility } from './utsettelsesperiodeVisibility';
import HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål from '../../sp\u00F8rsm\u00E5l/HvaErGrunnenTilAtDuSkalUtsetteDittUttakSp\u00F8rsm\u00E5l';
import Block from 'common/components/block/Block';
import UtsettelseTidsperiodeSpørsmål from './partials/UtsettelseTidsperiodeSp\u00F8rsm\u00E5l';
import { getFamiliehendelsedato, getNavnPåForeldre } from '../../util/uttaksplan';
import HvaSkalMorGjøreSpørsmål from '../../sp\u00F8rsm\u00E5l/HvaSkalMorGj\u00F8reSp\u00F8rsm\u00E5l';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import Søknad from '../../types/s\u00F8knad/S\u00F8knad';
import Arbeidsforhold from '../../types/Arbeidsforhold';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RecursivePartial } from '../../types/Partial';
import { formaterNavn, erFarEllerMedmor } from '../../util/domain/personUtil';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import NyPeriodeKnapperad from '../ny-periode-form/NyPeriodeKnapperad';

export type UtsettelseperiodeFormPeriodeType = RecursivePartial<Utsettelsesperiode> | RecursivePartial<Oppholdsperiode>;

interface OwnProps {
    tittel?: string;
    periode: UtsettelseperiodeFormPeriodeType;
    onChange: (periode: UtsettelseperiodeFormPeriodeType) => void;
    onCancel?: () => void;
}

interface StateProps {
    søknad: Søknad;
    arbeidsforhold: Arbeidsforhold[];
    søkerErFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
}

type Props = OwnProps & StateProps & InjectedIntlProps;

interface State {
    variant?: Utsettelsesvariant;
}

export enum Utsettelsesvariant {
    Ferie = 'ferie',
    Arbeid = 'arbeid',
    Sykdom = 'sykdom',
    UttakAnnenForelder = 'uttakAnnenForelder'
}

const getVariantFromPeriode = (periode: UtsettelseperiodeFormPeriodeType): Utsettelsesvariant | undefined => {
    if (periode.type === Periodetype.Opphold) {
        return Utsettelsesvariant.UttakAnnenForelder;
    } else {
        switch (periode.årsak) {
            case UtsettelseÅrsakType.Arbeid:
                return Utsettelsesvariant.Arbeid;
            case UtsettelseÅrsakType.Ferie:
                return Utsettelsesvariant.Ferie;
            case UtsettelseSykdomÅrsakType.Sykdom:
            case UtsettelseSykdomÅrsakType.InstitusjonBarnet:
            case UtsettelseSykdomÅrsakType.InstitusjonSøker:
                return Utsettelsesvariant.Sykdom;
            default:
                return undefined;
        }
    }
};

class UtsettelsesperiodeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleVariantChange = this.handleVariantChange.bind(this);
        this.updateSykdomÅrsak = this.updateSykdomÅrsak.bind(this);
        this.state = {
            variant: getVariantFromPeriode(props.periode)
        };
    }

    getUtsettelseÅrsakRadios(): RadioProps[] {
        const { søknad, intl } = this.props;
        const { annenForelder, søker } = søknad;
        const { kanIkkeOppgis, utenlandskFnr, harRettPåForeldrepenger } = annenForelder;
        const { erAleneOmOmsorg } = søker;

        const defaultRadios: RadioProps[] = [
            {
                label: getMessage(intl, 'jegskalhaferie'),
                value: Utsettelsesvariant.Ferie
            },
            {
                label: 'Jeg skal jobbe heltid',
                value: Utsettelsesvariant.Arbeid
            },
            {
                label: getMessage(intl, 'pgasykdom'),
                value: Utsettelsesvariant.Sykdom
            }
        ];

        if (erAleneOmOmsorg || !harRettPåForeldrepenger || utenlandskFnr || kanIkkeOppgis) {
            return defaultRadios;
        }

        return [
            ...defaultRadios,
            {
                label: `${formaterNavn(annenForelder.fornavn, annenForelder.etternavn)} ${getMessage(
                    intl,
                    'skaltautforeldrepenger'
                )}`,
                value: Utsettelsesvariant.UttakAnnenForelder
            }
        ];
    }

    handleVariantChange(variant: Utsettelsesvariant) {
        const { onChange } = this.props;
        if (variant !== this.state.variant) {
            if (variant === Utsettelsesvariant.UttakAnnenForelder) {
                onChange({ type: Periodetype.Opphold, årsak: undefined });
            } else {
                if (variant === Utsettelsesvariant.Arbeid) {
                    onChange({ type: Periodetype.Utsettelse, årsak: UtsettelseÅrsakType.Arbeid });
                } else if (variant === Utsettelsesvariant.Ferie) {
                    onChange({ type: Periodetype.Utsettelse, årsak: UtsettelseÅrsakType.Ferie });
                } else if (variant === Utsettelsesvariant.Sykdom) {
                    onChange({ type: Periodetype.Utsettelse, årsak: undefined });
                }
            }
        }
        this.setState({
            variant
        });
    }

    updateSykdomÅrsak({ sykdomsårsak, vedlegg }: UtsettelsePgaSykdomChangePayload) {
        const { onChange } = this.props;
        if (sykdomsårsak === UtsettelseSykdomÅrsakType.InstitusjonBarnet) {
            onChange({
                årsak: UtsettelseSykdomÅrsakType.InstitusjonBarnet,
                vedlegg
            });
        } else if (sykdomsårsak === UtsettelseSykdomÅrsakType.InstitusjonSøker) {
            onChange({
                årsak: UtsettelseSykdomÅrsakType.InstitusjonSøker,
                vedlegg
            });
        } else if (sykdomsårsak === UtsettelseSykdomÅrsakType.Sykdom) {
            onChange({
                årsak: UtsettelseSykdomÅrsakType.Sykdom,
                vedlegg
            });
        }
    }

    render() {
        const {
            periode,
            arbeidsforhold,
            søknad,
            navnPåForeldre,
            søkerErFarEllerMedmor,
            onChange,
            onCancel
        } = this.props;
        const { variant } = this.state;
        const visibility = getUtsettelsesperiodeVisibility(
            variant,
            periode,
            søknad.søker.erAleneOmOmsorg,
            søkerErFarEllerMedmor
        );

        if (visibility === undefined) {
            return null;
        }

        const tidsperiode = periode.tidsperiode as Partial<Tidsperiode>;
        return (
            <React.Fragment>
                <Block hasChildBlocks={true}>
                    <Block>
                        <UtsettelseTidsperiodeSpørsmål
                            tidsperiode={tidsperiode}
                            familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
                            onChange={(p) => onChange({ tidsperiode: p })}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.variant)}>
                        <HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål
                            variant={variant}
                            radios={this.getUtsettelseÅrsakRadios()}
                            onChange={(v) => this.handleVariantChange(v)}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.ferieinfo)} hasChildBlocks={true}>
                        <UtsettelsePgaFerieInfo
                            tidsperiode={tidsperiode}
                            aktivtArbeidsforhold={harAktivtArbeidsforhold(arbeidsforhold, DateValues.today.toDate())}
                            forelder={Forelder.MOR}
                        />
                    </Block>
                    {periode.type === Periodetype.Utsettelse && (
                        <>
                            {periode.årsak === UtsettelseÅrsakType.Arbeid && (
                                <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.arbeidsplass)}>
                                    <HvorSkalDuJobbeSpørsmål
                                        arbeidsforhold={arbeidsforhold}
                                        valgtArbeidsforhold={periode.orgnr}
                                        onChange={(
                                            v: string,
                                            skalJobbeSomFrilansEllerSelvstendigNæringsdrivende: boolean
                                        ) =>
                                            onChange({
                                                orgnr: v,
                                                skalJobbeSomFrilansEllerSelvstendigNæringsdrivende
                                            })
                                        }
                                    />
                                </Block>
                            )}
                            <Block
                                visible={visibility.isVisible(UtsettelseSpørsmålKeys.sykdomsårsak)}
                                hasChildBlocks={true}>
                                <UtsettelsePgaSykdomPart
                                    onChange={this.updateSykdomÅrsak}
                                    vedlegg={(periode.vedlegg as Attachment[]) || []}
                                    sykdomsårsak={periode.årsak as UtsettelseSykdomÅrsakType}
                                    forelder={Forelder.MOR}
                                />
                            </Block>

                            <Block
                                visible={visibility.isVisible(UtsettelseSpørsmålKeys.morsAktivitet)}
                                hasChildBlocks={true}>
                                <HvaSkalMorGjøreSpørsmål
                                    navnPåForeldre={navnPåForeldre}
                                    morsAktivitetIPerioden={periode.morsAktivitetIPerioden}
                                    onChange={(morsAktivitetIPerioden) => onChange({ morsAktivitetIPerioden })}
                                />
                            </Block>
                        </>
                    )}
                    {periode.type === Periodetype.Opphold && (
                        <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.oppholdsårsak)}>
                            <OppholdsårsakSpørsmål
                                onChange={(oppholdsårsak) => onChange({ årsak: oppholdsårsak })}
                                oppholdsårsak={periode.årsak}
                                navnAnnenForelder={søknad.annenForelder.fornavn}
                            />
                        </Block>
                    )}
                </Block>
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
        arbeidsforhold: state.api.søkerinfo!.arbeidsforhold || [],
        søkerErFarEllerMedmor: erFarEllerMedmor(state.api.søkerinfo!.person.kjønn, state.søknad.søker.rolle),
        navnPåForeldre: getNavnPåForeldre(state.søknad, state.api.søkerinfo!.person!)
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeForm));
