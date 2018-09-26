import * as React from 'react';
import { Periode, Periodetype, Uttaksperiode } from '../../types/uttaksplan/periodetyper';
import UtsettelsesperiodeForm, { UtsettelseperiodeFormPeriodeType } from '../utsettelse-form/UtsettelseForm';
import UttaksperiodeForm from '../uttaksperiode-form/UttaksperiodeForm';
import { FormSubmitEvent } from 'common/lib/validation/elements/ValiderbarForm';
import { RecursivePartial } from '../../types/Partial';
import './nyPeriodeForm.less';
import Block from 'common/components/block/Block';
import { EtikettLiten } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import NyPeriodeKnapperad from './NyPeriodeKnapperad';

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

        const periode: RecursivePartial<Periode> = {
            type: Periodetype.Utsettelse,
            tidsperiode: {}
        };

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
        const validTidsperiode = getValidTidsperiode(periode.tidsperiode as Tidsperiode);
        const periodeKanLeggesTil = periode.type !== undefined && validTidsperiode !== undefined;

        return (
            <form className={`periodeForm periodeForm--${periode.type!.toLowerCase()}`} onSubmit={this.handleOnSubmit}>
                {(periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Opphold) && (
                    <>
                        <PeriodeFormTittel tittel={getMessage(intl, 'nyPeriodeForm.utsettelse.tittel')} />
                        <UtsettelsesperiodeForm
                            periode={periode as UtsettelseperiodeFormPeriodeType}
                            onChange={this.updatePeriode}
                            onCancel={onCancel}
                        />
                    </>
                )}
                {periode.type === Periodetype.Uttak && (
                    <>
                        <PeriodeFormTittel tittel={getMessage(intl, 'nyPeriodeForm.uttak.tittel')} />
                        <UttaksperiodeForm periode={periode as Partial<Uttaksperiode>} onChange={this.updatePeriode} />
                        <NyPeriodeKnapperad periodeKanLeggesTil={periodeKanLeggesTil} onCancel={onCancel} />
                    </>
                )}
            </form>
        );
    }
}

export default injectIntl(NyPeriodeForm);
