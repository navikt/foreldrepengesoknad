import * as React from 'react';
import { UtenlandsoppholdData } from '../../../types/søknad/Søknad';
import Bolk from '../../layout/Bolk';
import UtenlandsoppholdDialog from './../../skjema/bolker/UtenlandsoppholdDialog';
import UtenlandsoppholdListe from './UtenlandsoppholdListe';

export interface Props {
    utenlandsopphold: UtenlandsoppholdData[];
    onAdd: (opphold: UtenlandsoppholdData) => void;
    onDelete: (opphold: UtenlandsoppholdData) => void;
    onUpdate: (opphold: UtenlandsoppholdData) => void;
}

export interface State {
    visDialog: boolean;
    dialogUtenlandsopphold?: UtenlandsoppholdData;
}

class UtenlandsoppholdBolk extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.visDialog = this.visDialog.bind(this);
        this.onLagre = this.onLagre.bind(this);
        this.lukkDialog = this.lukkDialog.bind(this);
        this.state = {
            visDialog: false
        };
    }

    visDialog(utenlandsopphold?: UtenlandsoppholdData) {
        this.setState({
            visDialog: true,
            dialogUtenlandsopphold: utenlandsopphold
        });
    }

    lukkDialog() {
        this.setState({
            visDialog: false,
            dialogUtenlandsopphold: undefined
        });
    }

    onLagre(utenlandsopphold: UtenlandsoppholdData) {
        if (utenlandsopphold.id) {
            this.props.onUpdate(utenlandsopphold);
        } else {
            this.props.onAdd(utenlandsopphold);
        }
        this.lukkDialog();
    }
    render() {
        const { utenlandsopphold, onDelete } = this.props;
        const { visDialog } = this.state;
        return (
            <Bolk tittel="Utenlandsopphold">
                <h1>Utenlandsopphold</h1>
                <UtenlandsoppholdListe
                    utenlandsopphold={utenlandsopphold}
                    onVis={(opphold) => this.visDialog(opphold)}
                    onFjern={onDelete}
                />
                <button type="button" onClick={() => this.visDialog()}>
                    Legg til
                </button>
                {visDialog && (
                    <UtenlandsoppholdDialog
                        onLagre={this.onLagre}
                        opphold={this.state.dialogUtenlandsopphold}
                    />
                )}
            </Bolk>
        );
    }
}

export default UtenlandsoppholdBolk;
