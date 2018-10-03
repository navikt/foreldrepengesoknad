import * as React from 'react';
import { Periode, Periodetype, Uttaksperiode } from '../../types/uttaksplan/periodetyper';
import UtsettelsesperiodeForm, { UtsettelseFormPeriodeType } from '../utsettelse-form/UtsettelseForm';
import { FormSubmitEvent } from 'common/lib/validation/elements/ValiderbarForm';
import { RecursivePartial } from '../../types/Partial';
import './nyPeriodeForm.less';
import Block from 'common/components/block/Block';
import { EtikettLiten } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import UttakForm from '../uttak-form/UttakForm';

interface OwnProps {
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
    periodetype: Periodetype;
}

interface State {
    periode: RecursivePartial<Periode>;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('periodeForm');

const PeriodeFormTittel: React.StatelessComponent<{ tittel: string }> = ({ tittel }) => {
    return (
        <Block margin="s">
            <EtikettLiten tag="h1" className={bem.element('heading')}>
                {tittel}
            </EtikettLiten>
        </Block>
    );
};

class NyPeriodeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { periodetype } = props;
        const periode: RecursivePartial<Periode> = {
            tidsperiode: {}
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
            periode
        };

        this.updatePeriode = this.updatePeriode.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    updatePeriode(periode: RecursivePartial<Periode>) {
        const updatedPeriode = {
            ...this.state.periode,
            ...periode
        };
        this.setState({
            periode: updatedPeriode as RecursivePartial<Periode>
        });
    }

    handleOnSubmit(e: FormSubmitEvent) {
        e.preventDefault();
        e.stopPropagation();
        const { onSubmit } = this.props;
        const { periode } = this.state;
        onSubmit(periode as Periode);
        this.updatePeriode({ tidsperiode: {} });
    }

    render() {
        const { intl, onCancel } = this.props;
        const { periode } = this.state;

        return (
            <form className={`periodeForm periodeForm--${periode.type!.toLowerCase()}`} onSubmit={this.handleOnSubmit}>
                {(periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Opphold) && (
                    <>
                        <PeriodeFormTittel tittel={getMessage(intl, 'nyPeriodeForm.utsettelse.tittel')} />
                        <UtsettelsesperiodeForm
                            periode={periode as UtsettelseFormPeriodeType}
                            onChange={this.updatePeriode}
                            onCancel={onCancel}
                        />
                    </>
                )}
                {(periode.type === Periodetype.Uttak || periode.type === Periodetype.Overføring) && (
                    <>
                        <PeriodeFormTittel tittel={getMessage(intl, 'nyPeriodeForm.uttak.tittel')} />
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
