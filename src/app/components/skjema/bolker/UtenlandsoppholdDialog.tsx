import * as React from 'react';
import { UtenlandsoppholdData } from '../../../types/søknad/Søknad';

export interface Props {
    opphold?: UtenlandsoppholdData;
    onLagre: (opphold: UtenlandsoppholdData) => void;
}

export interface State {
    landkode?: string;
    fom?: Date;
    tom?: Date;
}

class UtenlandsoppholdDialog extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            landkode: props.opphold ? props.opphold.landkode : ''
        };
    }

    onSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.stopPropagation();
        evt.preventDefault();
        const { landkode, fom, tom } = this.state;
        if (landkode) {
            this.props.onLagre({
                landkode,
                fom: fom || new Date(),
                tom: tom || new Date()
            });
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <fieldset>
                    <legend>Legg til utenlandsopphold</legend>
                    <label htmlFor="input_land">Land:</label>
                    <input
                        id="input_land"
                        type="text"
                        name="land"
                        value={this.state.landkode}
                        onChange={(evt) =>
                            this.setState({ landkode: evt.target.value })
                        }
                    />
                    <button type="submit">Legg til</button>
                </fieldset>
            </form>
        );
    }
}

export default UtenlandsoppholdDialog;
