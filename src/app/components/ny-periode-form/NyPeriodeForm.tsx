import * as React from 'react';
import {
    Periode,
    PeriodePartial,
    Periodetype,
    UtsettelsesperiodePartial,
    UttaksperiodePartial
} from '../../types/uttaksplan/periodetyper';
import NyUtsettelsesperiodeForm from '../ny-utsettelsesperiode-form/NyUtsettelsesperiodeForm';
import NyUttaksperiodeForm from '../ny-uttaksperiode-form/NyUttaksperiodeForm';
import { FormSubmitEvent } from 'common/lib/validation/elements/ValiderbarForm';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

interface Props {
    onSubmit: (periode: Periode) => void;
    onCancel: () => void;
    periodetype: Periodetype;
}

interface State {
    periode: PeriodePartial;
}

const emptyPeriode: PeriodePartial = { tidsperiode: {} };

export default class NyPeriodeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            periode: emptyPeriode
        };

        this.updatePeriode = this.updatePeriode.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    updatePeriode(periode: PeriodePartial) {
        this.setState({
            periode
        });
    }

    handleOnSubmit(e: FormSubmitEvent) {
        e.preventDefault();
        e.stopPropagation();
        const { onSubmit, periodetype } = this.props;
        const { periode } = this.state;
        periode.type = periodetype;
        onSubmit(periode as Periode);
        this.updatePeriode(emptyPeriode);
    }

    render() {
        const { periodetype, onCancel } = this.props;
        const { periode } = this.state;

        return (
            <form onSubmit={this.handleOnSubmit}>
                {periodetype === Periodetype.Utsettelse && (
                    <NyUtsettelsesperiodeForm
                        periode={periode as UtsettelsesperiodePartial}
                        onChange={this.updatePeriode}
                    />
                )}
                {periodetype === Periodetype.Uttak && (
                    <NyUttaksperiodeForm periode={periode as UttaksperiodePartial} onChange={this.updatePeriode} />
                )}

                <Knapperad>
                    <Hovedknapp>Legg til</Hovedknapp>
                    <Knapp htmlType="button" onClick={onCancel}>
                        Avbryt
                    </Knapp>
                </Knapperad>
            </form>
        );
    }
}
