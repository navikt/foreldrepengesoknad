import * as React from 'react';
import {
    Periode,
    MorsAktivitet,
    OppholdÅrsakType,
    UtsettelseSykdomÅrsakType
} from '../../types/uttaksplan/periodetyper';
import UtsettelsePgaSykdomPart from './partials/UtsettelsePgaSykdomPart';
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
import { default as formUtils } from './utils';

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
    sykdomsårsak?: UtsettelseSykdomÅrsakType;
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
    formdata: UtsettelsperiodeFormdata;
}

export enum Utsettelsesvariant {
    Ferie = 'ferie',
    Arbeid = 'arbeid',
    Sykdom = 'sykdom',
    UttakAnnenForelder = 'uttakAnnenForelder'
}

class UtsettelsesperiodeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleFormChange = this.handleFormChange.bind(this);
        this.state = {
            formdata: props.periode ? formUtils.getFormdataFromPeriode(props.periode) : formUtils.defaultFormData
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
        const { onChange, søkerErFarEllerMedmor } = this.props;
        const formdata = { ...this.state.formdata, ...formdataChange };
        this.setState({
            formdata
        });
        onChange(formUtils.getPeriodeFromFormdata(formdata, søkerErFarEllerMedmor));
    }

    render() {
        const { arbeidsforhold, søknad, navnPåForeldre, søkerErFarEllerMedmor } = this.props;
        const { formdata } = this.state;
        const visibility = getUtsettelsesperiodeVisibility(
            formdata,
            søknad.søker.erAleneOmOmsorg,
            søkerErFarEllerMedmor
        );

        if (visibility === undefined) {
            return null;
        }

        return (
            <React.Fragment>
                <Block hasChildBlocks={true}>
                    <Block>
                        <UtsettelseTidsperiodeSpørsmål
                            tidsperiode={formdata.tidsperiode}
                            familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
                            onChange={(tidsperiode) => this.handleFormChange({ tidsperiode })}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.variant)}>
                        <HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål
                            variant={formdata.variant}
                            radios={this.getUtsettelseÅrsakRadios()}
                            onChange={(variant) => this.handleFormChange({ variant })}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.ferieinfo)} hasChildBlocks={true}>
                        <UtsettelsePgaFerieInfo
                            tidsperiode={formdata.tidsperiode}
                            aktivtArbeidsforhold={harAktivtArbeidsforhold(arbeidsforhold, DateValues.today.toDate())}
                            forelder={Forelder.MOR}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.arbeidsplass)}>
                        <HvorSkalDuJobbeSpørsmål
                            arbeidsforhold={arbeidsforhold}
                            valgtArbeidsforhold={formdata.orgnr}
                            onChange={(v: string, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende: boolean) =>
                                this.handleFormChange({ orgnr: v, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende })
                            }
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.oppholdsårsak)}>
                        <OppholdsårsakSpørsmål
                            onChange={(oppholdsårsak) => this.handleFormChange({ oppholdsårsak })}
                            oppholdsårsak={formdata.oppholdsårsak}
                            navnAnnenForelder={søknad.annenForelder.fornavn}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.sykdomsårsak)} hasChildBlocks={true}>
                        <UtsettelsePgaSykdomPart
                            onChange={(payload) => this.handleFormChange(payload)}
                            vedlegg={formdata.vedlegg}
                            sykdomsårsak={formdata.sykdomsårsak}
                            forelder={Forelder.MOR}
                        />
                    </Block>
                    <Block visible={visibility.isVisible(UtsettelseSpørsmålKeys.morsAktivitet)} hasChildBlocks={true}>
                        <HvaSkalMorGjøreSpørsmål
                            navnPåForeldre={navnPåForeldre}
                            morsAktivitetIPerioden={formdata.morsAktivitetIPerioden}
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
