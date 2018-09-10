import * as React from 'react';
import { Periode, Periodetype, Utsettelsesperiode, Uttaksperiode } from '../../types/uttaksplan/periodetyper';
import UtsettelsesperiodeForm from '../utsettelsesperiode-form/UtsettelsesperiodeForm';
import UttaksperiodeForm from '../uttaksperiode-form/UttaksperiodeForm';
import { FormSubmitEvent } from 'common/lib/validation/elements/ValiderbarForm';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Knapp } from 'nav-frontend-knapper';
import { RecursivePartial } from '../../types/Partial';
import './nyPeriodeForm.less';

interface Props {
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
    periodetype: Periodetype;
}

interface State {
    periode: RecursivePartial<Periode>;
}

const emptyPeriode: RecursivePartial<Periode> = { tidsperiode: {} };

export default class NyPeriodeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            periode: emptyPeriode
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
        this.updatePeriode(emptyPeriode);
    }

    render() {
        const { periodetype, onCancel } = this.props;
        const { periode } = this.state;

        return (
            <form className={`periodeForm periodeForm--${periodetype.toLowerCase()}`} onSubmit={this.handleOnSubmit}>
                {periodetype === Periodetype.Utsettelse && (
                    <UtsettelsesperiodeForm
                        periode={periode as Partial<Utsettelsesperiode>}
                        onChange={this.updatePeriode}
                    />
                )}
                {periodetype === Periodetype.Uttak && (
                    <UttaksperiodeForm periode={periode as Partial<Uttaksperiode>} onChange={this.updatePeriode} />
                )}

                <Knapperad>
                    <Knapp htmlType="button" onClick={onCancel}>
                        Avbryt
                    </Knapp>
                    <Knapp htmlType="submit">Legg til</Knapp>
                </Knapperad>
            </form>
        );
    }
}
