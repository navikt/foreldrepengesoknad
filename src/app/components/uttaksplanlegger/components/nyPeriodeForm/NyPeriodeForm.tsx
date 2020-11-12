import * as React from 'react';
import classnames from 'classnames';
import { Periode, Periodetype, Uttaksperiode, UtsettelseÅrsakType } from '../../../../types/uttaksplan/periodetyper';
import UtsettelseForm, { UtsettelseFormPeriodeType, Utsettelsesvariant } from '../utsettelseForm/UtsettelseForm';
import ValiderbarForm, { FormSubmitEvent } from 'common/lib/validation/elements/ValiderbarForm';
import './nyPeriodeForm.less';
import Block from 'common/components/block/Block';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import UttakForm from '../uttakForm/UttakForm';
import { Forelder, Tidsperiode, NavnPåForeldre } from 'common/types';
import PeriodeFargestrek from '../periodeliste/periode-fargestrek/PeriodeFargestrek';
import PeriodeCleanup from '../../../../util/cleanup/periodeCleanup';
import { UttakSpørsmålVisibility } from '../uttakForm/uttakFormConfig';
import { UtsettelseSpørsmålVisibility } from '../utsettelseForm/utsettelseFormConfig';
import { getPeriodeFarge } from '../../../../util/uttaksplan/styleUtils';
import { getPeriodeIkon } from '../periodeliste/elements/PeriodeHeader';
import { Søknadsinfo } from 'app/selectors/types';
import { RecursivePartial } from 'app/types/Partial';

interface OwnProps {
    antallFeriedager: number;
    erMorUfør: boolean | undefined;
    forelder: Forelder;
    periodetype: Periodetype;
    tidsperiode?: Partial<Tidsperiode>;
    navnPåForeldre: NavnPåForeldre;
    søknadsinfo: Søknadsinfo;
    intl: IntlShape;
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
}

interface State {
    periode: RecursivePartial<Periode>;
    utsettelsesvariant?: Utsettelsesvariant;
    visibility: UtsettelseSpørsmålVisibility | UttakSpørsmålVisibility | undefined;
}

type Props = OwnProps;

const bem = BEMHelper('nyPeriodeForm');

const PeriodeFormTittel: React.FunctionComponent<{
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
            tidsperiode: tidsperiode || {},
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
            visibility: undefined,
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
                ...periode,
            };
            const cleanedPeriode = PeriodeCleanup.cleanupNyPeriode(updatedPeriode as Periode, this.props.søknadsinfo);
            this.setState({
                periode: cleanedPeriode as RecursivePartial<Periode>,
                visibility,
            });
        }
    }

    handleOnSubmit(e: FormSubmitEvent) {
        e.preventDefault();
        e.stopPropagation();
        const { onSubmit, søknadsinfo } = this.props;
        const { periode } = this.state;
        const cleanedPeriode = PeriodeCleanup.cleanupNyPeriode(periode as Periode, søknadsinfo);
        onSubmit(cleanedPeriode as Periode);
        this.updatePeriode({ tidsperiode: {} }, false);
    }

    getUtsettelsePeriodeFormTittelIkon(periode: Periode | undefined) {
        const { navnPåForeldre, søknadsinfo } = this.props;
        const { utsettelsesvariant } = this.state;
        if (periode && periode.type === Periodetype.Utsettelse && periode.årsak) {
            return getPeriodeIkon(periode as Periode, navnPåForeldre, søknadsinfo.søker.harMidlertidigOmsorg);
        } else if (periode && utsettelsesvariant) {
            const sykdomsutsettelse = { ...periode, årsak: UtsettelseÅrsakType.Sykdom };
            return getPeriodeIkon(sykdomsutsettelse as Periode, navnPåForeldre, søknadsinfo.søker.harMidlertidigOmsorg);
        } else {
            return undefined;
        }
    }

    render() {
        const { intl, antallFeriedager, forelder, navnPåForeldre, onCancel, søknadsinfo } = this.props;
        const { søker } = søknadsinfo;
        const { periode } = this.state;

        return (
            <ValiderbarForm
                runValidationOnRegister={false}
                validateBeforeSubmit={true}
                className={classnames(bem.block, bem.modifier(periode.type!.toLowerCase()))}
                onSubmit={this.handleOnSubmit}
            >
                <div className={bem.element('fargestrek')}>
                    <PeriodeFargestrek
                        farge={getPeriodeFarge(periode as Periode, forelder, søker.harMidlertidigOmsorg)}
                    />
                </div>
                {periode.type === Periodetype.Utsettelse && (
                    <>
                        <PeriodeFormTittel
                            tittel={getMessage(intl, 'nyPeriodeForm.utsettelse.tittel')}
                            ikon={this.getUtsettelsePeriodeFormTittelIkon(periode as Periode)}
                        />
                        <UtsettelseForm
                            antallFeriedager={antallFeriedager}
                            periode={periode as UtsettelseFormPeriodeType}
                            onChange={this.updatePeriode}
                            onCancel={onCancel}
                            onUtsettelsesvariantChange={(utsettelsesvariant) => this.setState({ utsettelsesvariant })}
                            erNyPeriode={true}
                        />
                    </>
                )}
                {(periode.type === Periodetype.Uttak ||
                    periode.type === Periodetype.Overføring ||
                    periode.type === Periodetype.Opphold) && (
                    <>
                        <PeriodeFormTittel
                            tittel={getMessage(intl, 'nyPeriodeForm.uttak.tittel')}
                            ikon={getPeriodeIkon(periode as Periode, navnPåForeldre, søker.harMidlertidigOmsorg)}
                        />
                        <UttakForm
                            periode={periode as Partial<Uttaksperiode>}
                            kanEndreStønadskonto={true}
                            onChange={this.updatePeriode}
                            onCancel={onCancel}
                            erNyPeriode={true}
                        />
                    </>
                )}
            </ValiderbarForm>
        );
    }
}

export default injectIntl(NyPeriodeForm);
