import * as React from 'react';
import classnames from 'classnames';
import { Periode, Periodetype, Uttaksperiode, UtsettelseÅrsakType } from '../../types/uttaksplan/periodetyper';
import UtsettelsesperiodeForm, {
    UtsettelseFormPeriodeType,
    Utsettelsesvariant
} from '../utsettelse-form/UtsettelseForm';
import { FormSubmitEvent } from 'common/lib/validation/elements/ValiderbarForm';
import { RecursivePartial } from '../../types/Partial';
import './nyPeriodeForm.less';
import Block from 'common/components/block/Block';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import UttakForm from '../uttak-form/UttakForm';
import { Forelder, Tidsperiode, NavnPåForeldre } from 'common/types';
import PeriodeFargestrek from '../periode-fargestrek/PeriodeFargestrek';
import PeriodeCleanup from '../../util/cleanup/periodeCleanup';
import Søknad from '../../types/søknad/Søknad';
import { UttakSpørsmålVisibility } from '../uttak-form/uttakFormConfig';
import { UtsettelseSpørsmålVisibility } from '../utsettelse-form/utsettelseFormConfig';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';
import { getPeriodeIkon } from '../periodeliste/elements/PeriodeHeader';

interface OwnProps {
    antallFeriedager: number;
    erMorUfør: boolean | undefined;
    forelder: Forelder;
    søknad: Søknad;
    periodetype: Periodetype;
    tidsperiode?: Partial<Tidsperiode>;
    navnPåForeldre: NavnPåForeldre;
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
}

interface State {
    periode: RecursivePartial<Periode>;
    utsettelsesvariant?: Utsettelsesvariant;
    visibility: UtsettelseSpørsmålVisibility | UttakSpørsmålVisibility | undefined;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('nyPeriodeForm');

const PeriodeFormTittel: React.StatelessComponent<{
    tittel: string;
    ikon?: React.ReactNode;
}> = ({ tittel, ikon }) => {
    return (
        <Block margin="s">
            <Undertittel tag="h1" className={bem.element('heading')}>
                {ikon && (
                    <span role="presentation" aria-hidden="true" className={bem.element('heading__ikon')}>
                        {ikon}
                    </span>
                )}
                {tittel}
            </Undertittel>
        </Block>
    );
};

class NyPeriodeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { periodetype, tidsperiode } = props;
        const periode: RecursivePartial<Periode> = {
            tidsperiode: tidsperiode || {}
        };
        if (
            periodetype === Periodetype.Utsettelse ||
            periodetype === Periodetype.Uttak ||
            periodetype === Periodetype.Opphold ||
            periodetype === Periodetype.Overføring
        ) {
            periode.type = periodetype;
        }
        this.state = {
            periode,
            visibility: undefined
        };

        this.updatePeriode = this.updatePeriode.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.getUtsettelsePeriodeFormTittelIkon = this.getUtsettelsePeriodeFormTittelIkon.bind(this);
    }

    updatePeriode(
        periode: RecursivePartial<Periode>,
        replace: boolean,
        visibility?: UtsettelseSpørsmålVisibility | UttakSpørsmålVisibility
    ) {
        if (replace) {
            this.setState({ periode, visibility });
        } else {
            const updatedPeriode = {
                ...this.state.periode,
                ...periode
            };
            this.setState({
                periode: updatedPeriode as RecursivePartial<Periode>,
                visibility
            });
        }
    }

    handleOnSubmit(e: FormSubmitEvent) {
        e.preventDefault();
        e.stopPropagation();
        const { onSubmit } = this.props;
        const { periode, visibility } = this.state;
        const { søker, annenForelder } = this.props.søknad;
        const cleanedPeriode = PeriodeCleanup.cleanupNyPeriode(periode as Periode, søker, annenForelder, visibility);
        onSubmit(cleanedPeriode as Periode);
        this.updatePeriode({ tidsperiode: {} }, false);
    }

    getUtsettelsePeriodeFormTittelIkon(periode: Periode | undefined) {
        const { navnPåForeldre } = this.props;
        const { utsettelsesvariant } = this.state;
        if (periode && periode.type === Periodetype.Utsettelse && periode.årsak) {
            return getPeriodeIkon(periode as Periode, navnPåForeldre);
        } else if (periode && utsettelsesvariant) {
            const sykdomsutsettelse = { ...periode, årsak: UtsettelseÅrsakType.Sykdom };
            return getPeriodeIkon(sykdomsutsettelse as Periode, navnPåForeldre);
        } else {
            return undefined;
        }
    }

    render() {
        const { intl, antallFeriedager, forelder, navnPåForeldre, onCancel } = this.props;
        const { periode } = this.state;
        return (
            <form
                className={classnames(bem.className, bem.modifier(periode.type!.toLowerCase()))}
                onSubmit={this.handleOnSubmit}>
                <div className={bem.element('fargestrek')}>
                    <PeriodeFargestrek farge={getPeriodeFarge(periode as Periode, forelder)} />
                </div>
                {periode.type === Periodetype.Utsettelse && (
                    <>
                        <PeriodeFormTittel
                            tittel={getMessage(intl, 'nyPeriodeForm.utsettelse.tittel')}
                            ikon={this.getUtsettelsePeriodeFormTittelIkon(periode as Periode)}
                        />
                        <UtsettelsesperiodeForm
                            antallFeriedager={antallFeriedager}
                            periode={periode as UtsettelseFormPeriodeType}
                            onChange={this.updatePeriode}
                            onCancel={onCancel}
                            onUtsettelsesvariantChange={(utsettelsesvariant) => this.setState({ utsettelsesvariant })}
                        />
                    </>
                )}
                {(periode.type === Periodetype.Uttak ||
                    periode.type === Periodetype.Overføring ||
                    periode.type === Periodetype.Opphold) && (
                    <>
                        <PeriodeFormTittel
                            tittel={getMessage(intl, 'nyPeriodeForm.uttak.tittel')}
                            ikon={getPeriodeIkon(periode as Periode, navnPåForeldre)}
                        />
                        <UttakForm
                            periode={periode as Partial<Uttaksperiode>}
                            kanEndreStønadskonto={true}
                            onChange={this.updatePeriode}
                            onCancel={onCancel}
                        />
                    </>
                )}
            </form>
        );
    }
}

export default injectIntl(NyPeriodeForm);
