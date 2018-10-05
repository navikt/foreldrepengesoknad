import * as React from 'react';
import Block from 'common/components/block/Block';
import { Knapp } from 'nav-frontend-knapper';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import NyPeriodeForm from '../../components/ny-periode-form/NyPeriodeForm';

interface Props {
    onSubmit: (periode: Periode) => void;
}

interface State {
    periodetype?: Periodetype;
    formIsOpen: boolean;
}

export default class NyPeriodeBolk extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.openNyUtsettelsesperiodeForm = this.openNyUtsettelsesperiodeForm.bind(this);
        this.openNyUttaksperiodeForm = this.openNyUttaksperiodeForm.bind(this);
        this.renderPeriodeForm = this.renderPeriodeForm.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

        this.state = {
            formIsOpen: false
        };
    }
    openForm(periodetype: Periodetype) {
        this.setState({
            formIsOpen: true,
            periodetype
        });
    }

    openNyUtsettelsesperiodeForm() {
        this.openForm(Periodetype.Utsettelse);
    }

    openNyUttaksperiodeForm() {
        this.openForm(Periodetype.Uttak);
    }

    closeForm() {
        this.setState({
            formIsOpen: false,
            periodetype: undefined
        });
    }

    handleOnSubmit(periode: Periode) {
        const { onSubmit } = this.props;
        onSubmit(periode);
        this.closeForm();
    }

    renderPeriodeForm() {
        const { periodetype, formIsOpen } = this.state;
        if (formIsOpen && periodetype !== undefined) {
            return <NyPeriodeForm periodetype={periodetype} onSubmit={this.handleOnSubmit} onCancel={this.closeForm} />;
        }
        return null;
    }

    render() {
        return (
            <React.Fragment>
                <Block margin="xs" visible={this.state.formIsOpen}>
                    {this.renderPeriodeForm()}
                </Block>
                <Block margin="none" visible={!this.state.formIsOpen}>
                    <Knapperad>
                        <Knapp onClick={this.openNyUtsettelsesperiodeForm} htmlType="button">
                            Legg til opphold
                        </Knapp>
                        <Knapp onClick={this.openNyUttaksperiodeForm} htmlType="button">
                            Legg til periode
                        </Knapp>
                    </Knapperad>
                </Block>
            </React.Fragment>
        );
    }
}
