import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import {
    Oppholdsperiode,
    OppholdÅrsakType,
    Periode,
    Utsettelsesperiode,
    UtsettelseÅrsakType
} from '../../types/uttaksplan/periodetyper';
import { TidsperiodePartial } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import TidsperiodeBolk from '../../bolker/TidsperiodeBolk';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål from '../../spørsmål/HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import Søknad from '../../types/søknad/Søknad';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import AnnenForeldersUttakForm from './partials/AnnenForeldersUttakForm';

interface UtsettelsesperiodeFormProps {
    periode: RecursivePartial<Utsettelsesperiode> | RecursivePartial<Oppholdsperiode>;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

interface StateProps {
    søknad: Søknad;
}

type Props = UtsettelsesperiodeFormProps & StateProps & InjectedIntlProps;

interface State {
    gjelderOpphold: boolean;
}

class UtsettelsesperiodeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.getUtsettelseÅrsakRadios = this.getUtsettelseÅrsakRadios.bind(this);

        this.state = {
            gjelderOpphold: false
        };
    }

    handleOnChange(årsak: UtsettelseÅrsakType | OppholdÅrsakType) {
        const { onChange } = this.props;
        if (
            årsak === UtsettelseÅrsakType.Arbeid ||
            årsak === UtsettelseÅrsakType.Ferie ||
            årsak === UtsettelseÅrsakType.Sykdom
        ) {
            const updatedPeriode = { årsak };
            onChange(updatedPeriode as Periode);
            this.setState({ gjelderOpphold: false });
        } else {
            this.setState({ gjelderOpphold: true });
        }
    }

    getUtsettelseÅrsakRadios(): RadioProps[] {
        const { søknad, intl } = this.props;

        const { annenForelder, søker } = søknad;
        const { kanIkkeOppgis, utenlandskFnr, harRettPåForeldrepenger } = annenForelder;
        const { erAleneOmOmsorg } = søker;

        const defaultRadios = [
            {
                label: getMessage(intl, 'jegskalhaferie'),
                value: UtsettelseÅrsakType.Ferie
            },
            {
                label: getMessage(intl, 'jegskaliarbeid'),
                value: UtsettelseÅrsakType.Arbeid
            },
            {
                label: getMessage(intl, 'pgasykdom'),
                value: UtsettelseÅrsakType.Sykdom
            }
        ];

        if (erAleneOmOmsorg || !harRettPåForeldrepenger || utenlandskFnr || kanIkkeOppgis) {
            return defaultRadios;
        }

        return [
            ...defaultRadios,
            {
                label: `${annenForelder.navn} ${getMessage(intl, 'skaltautforeldrepenger')}`,
                value: ''
            }
        ];
    }

    render() {
        const { gjelderOpphold } = this.state;
        const { periode, onChange } = this.props;
        const { tidsperiode, årsak } = periode;
        const bem = BEMHelper('periodeForm');

        return (
            <React.Fragment>
                <Block margin="s">
                    <EtikettLiten className={bem.element('heading')}>Ny utsettelse</EtikettLiten>
                </Block>
                <Block margin="s">
                    <TidsperiodeBolk
                        onChange={(v: TidsperiodePartial) => onChange({ tidsperiode: v })}
                        tidsperiode={tidsperiode as TidsperiodePartial}
                    />
                </Block>
                <Block margin="s">
                    <HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål
                        onChange={this.handleOnChange}
                        årsak={årsak}
                        radios={this.getUtsettelseÅrsakRadios()}
                    />
                </Block>
                <Block visible={gjelderOpphold}>
                    <AnnenForeldersUttakForm onChange={(v: Oppholdsperiode) => onChange(v)} />
                </Block>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad
    };
};

export default connect(mapStateToProps)(injectIntl(UtsettelsesperiodeForm));
