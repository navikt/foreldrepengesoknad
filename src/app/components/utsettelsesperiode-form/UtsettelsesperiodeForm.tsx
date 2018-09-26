import * as React from 'react';
import {
    Periode,
    MorsAktivitet,
    OppholdÅrsakType,
    Periodetype,
    Oppholdsperiode,
    UtsettelseÅrsakType,
    UtsettelsePgaSykdom,
    UtsettelsePgaInnleggelseBarnet,
    UtsettelsePgaInnleggelseSøker
} from '../../types/uttaksplan/periodetyper';
import UtsettelsePgaSykdomPart, { Sykdomsårsak } from './partials/UtsettelsePgaSykdomPart';
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
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';

interface OwnProps {
    tittel?: string;
    periode: RecursivePartial<Periode>;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

export interface UtsettelsperiodeFormdata {
    tidsperiode: Partial<Tidsperiode>;
    variant?: Utsettelsesvariant;
    morsAktivitetIPerioden?: MorsAktivitet;
    skalJobbeSomFrilansEllerSelvstendigNæringsdrivende?: boolean;
    sykdomsårsak?: Sykdomsårsak;
    oppholdsårsak?: OppholdÅrsakType;
    orgnr?: string;
    vedlegg: Attachment[];
}

interface StateProps {
    søknad: Søknad;
    arbeidsforhold: Arbeidsforhold[];
    søkerErFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
}

type Props = OwnProps & StateProps & InjectedIntlProps;

interface State {
    form: UtsettelsperiodeFormdata;
}

export enum Utsettelsesvariant {
    Ferie = 'ferie',
    Arbeid = 'arbeid',
    Sykdom = 'sykdom',
    UttakAnnenForelder = 'uttakAnnenForelder'
}

const getVariantFromUtsettelseÅrsakType = (årsak: UtsettelseÅrsakType | undefined): Utsettelsesvariant | undefined => {
    if (årsak === UtsettelseÅrsakType.Sykdom) {
        return Utsettelsesvariant.Arbeid;
    }
    if (årsak === UtsettelseÅrsakType.Ferie) {
        return Utsettelsesvariant.Ferie;
    }
    if (årsak === UtsettelseÅrsakType.Arbeid) {
        return Utsettelsesvariant.Arbeid;
    }
    return undefined;
};

const getFormdataFromPeriode = (periode: RecursivePartial<Periode>): UtsettelsperiodeFormdata => {
    if (periode.id !== undefined) {
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Tidsperiode);
        const tidsperiode = validTidsperiode
            ? { fom: validTidsperiode.fom as Date, tom: validTidsperiode.tom as Date }
            : {};
        const vedlegg = (periode.vedlegg as Attachment[]) || [];
        if (periode.type === Periodetype.Opphold) {
            return {
                tidsperiode,
                oppholdsårsak: periode.årsak,
                vedlegg,
                variant: Utsettelsesvariant.UttakAnnenForelder
            };
        } else if (periode.type === Periodetype.Utsettelse) {
            const variant = getVariantFromUtsettelseÅrsakType(periode.årsak);
            const formdata: UtsettelsperiodeFormdata = {
                tidsperiode,
                variant,
                vedlegg,
                morsAktivitetIPerioden: periode.morsAktivitetIPerioden
            };
            if (periode.årsak === UtsettelseÅrsakType.Arbeid) {
                formdata.orgnr = periode.orgnr;
                formdata.skalJobbeSomFrilansEllerSelvstendigNæringsdrivende =
                    periode.skalJobbeSomFrilansEllerSelvstendigNæringsdrivende;
            }
            if (variant === Utsettelsesvariant.Sykdom) {
                formdata.sykdomsårsak = periode.årsak as Sykdomsårsak;
            }
            return formdata;
        }
    }
    return defaultFormData;
};

const defaultFormData: UtsettelsperiodeFormdata = {
    tidsperiode: {},
    vedlegg: []
};

class UtsettelsesperiodeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleFormChange = this.handleFormChange.bind(this);
        this.state = {
            form: props.periode ? getFormdataFromPeriode(props.periode) : defaultFormData
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

    handleFormChange(formdataChange: Partial<UtsettelsperiodeFormdata>) {
        const formdata = { ...this.state.form, ...formdataChange };
        this.setState({
            form: {
                ...this.state.form,
                ...formdata
            }
        });
        if (formdata.variant === Utsettelsesvariant.UttakAnnenForelder) {
            const periode: RecursivePartial<Oppholdsperiode> = {
                type: Periodetype.Opphold,
                tidsperiode: formdata.tidsperiode,
                forelder: this.props.søkerErFarEllerMedmor ? Forelder.MOR : Forelder.FARMEDMOR,
                vedlegg: formdata.vedlegg,
                årsak: formdata.oppholdsårsak
            };
            this.props.onChange(periode);
        } else {
            const type = Periodetype.Utsettelse;
            const forelder = this.props.søkerErFarEllerMedmor ? Forelder.FARMEDMOR : Forelder.MOR;
            const tidsperiode: Partial<Tidsperiode> = formdata.tidsperiode;

            if (formdata.variant === Utsettelsesvariant.Ferie) {
                this.props.onChange({
                    type,
                    forelder,
                    årsak: UtsettelseÅrsakType.Ferie,
                    morsAktivitetIPerioden: formdata.morsAktivitetIPerioden,
                    tidsperiode
                });
            } else if (formdata.variant === Utsettelsesvariant.Arbeid) {
                this.props.onChange({
                    type,
                    forelder,
                    årsak: UtsettelseÅrsakType.Arbeid,
                    orgnr: formdata.orgnr,
                    skalJobbeSomFrilansEllerSelvstendigNæringsdrivende:
                        formdata.skalJobbeSomFrilansEllerSelvstendigNæringsdrivende,
                    vedlegg: formdata.vedlegg,
                    morsAktivitetIPerioden: formdata.morsAktivitetIPerioden,
                    tidsperiode
                });
            } else if (formdata.variant === Utsettelsesvariant.Sykdom) {
                const periode:
                    | RecursivePartial<UtsettelsePgaSykdom>
                    | RecursivePartial<UtsettelsePgaInnleggelseBarnet>
                    | RecursivePartial<UtsettelsePgaInnleggelseSøker> = {
                    type: Periodetype.Utsettelse,
                    forelder,
                    årsak: UtsettelseÅrsakType[formdata.sykdomsårsak!],
                    tidsperiode,
                    morsAktivitetIPerioden: formdata.morsAktivitetIPerioden
                };
                this.props.onChange(periode);
            }
        }
    }

    render() {
        const { arbeidsforhold, søknad, navnPåForeldre, søkerErFarEllerMedmor } = this.props;
        const { form } = this.state;
        const visibility = getUtsettelsesperiodeVisibility(form, søknad.søker.erAleneOmOmsorg, søkerErFarEllerMedmor);

        if (visibility === undefined) {
            return null;
        }

        return (
            <React.Fragment>
                <Block hasChildBlocks={true}>
                    <Block>
                        <UtsettelseTidsperiodeSpørsmål
                            tidsperiode={form.tidsperiode}
                            familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
                            onChange={(tidsperiode) => this.handleFormChange({ tidsperiode })}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.variant)}>
                        <HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål
                            variant={form.variant}
                            radios={this.getUtsettelseÅrsakRadios()}
                            onChange={(variant) => this.handleFormChange({ variant })}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.ferieinfo)} hasChildBlocks={true}>
                        <UtsettelsePgaFerieInfo
                            tidsperiode={form.tidsperiode}
                            aktivtArbeidsforhold={harAktivtArbeidsforhold(arbeidsforhold, DateValues.today.toDate())}
                            forelder={Forelder.MOR}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.arbeidsplass)}>
                        <HvorSkalDuJobbeSpørsmål
                            arbeidsforhold={arbeidsforhold}
                            valgtArbeidsforhold={form.orgnr}
                            onChange={(v: string, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende: boolean) =>
                                this.handleFormChange({ orgnr: v, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende })
                            }
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.oppholdsårsak)}>
                        <OppholdsårsakSpørsmål
                            onChange={(oppholdsårsak) => this.handleFormChange({ oppholdsårsak })}
                            oppholdsårsak={form.oppholdsårsak}
                            navnAnnenForelder={søknad.annenForelder.fornavn}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.sykdomsårsak)} hasChildBlocks={true}>
                        <UtsettelsePgaSykdomPart
                            onChange={(payload) => this.handleFormChange(payload)}
                            vedlegg={form.vedlegg}
                            sykdomsårsak={form.sykdomsårsak}
                            forelder={Forelder.MOR}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.morsAktivitet)} hasChildBlocks={true}>
                        <HvaSkalMorGjøreSpørsmål
                            navnPåForeldre={navnPåForeldre}
                            morsAktivitetIPerioden={form.morsAktivitetIPerioden}
                            onChange={(morsAktivitetIPerioden) => this.handleFormChange({ morsAktivitetIPerioden })}
                        />
                    </Block>
                </Block>
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
