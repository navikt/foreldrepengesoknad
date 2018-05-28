import * as React from 'react';
import { Stonadsperiode, Periode } from 'uttaksplan/types';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { preventFormSubmit, normaliserDato } from 'uttaksplan/utils';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import DatoInput from 'app/components/dato-input/DatoInput';
import { Column, Row } from 'nav-frontend-grid';
import { renderDag } from 'uttaksplan/utils/renderUtils';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';

export interface OwnProps {
    periode: Stonadsperiode;
    onChange: (periode: Periode) => void;
    onFjern: (periode: Periode) => void;
}

export interface State {
    startdato?: Date;
    sluttdato?: Date;
}

export type Props = OwnProps & InjectedIntlProps;
class StonadsperiodeSkjema extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.setSluttdato = this.setSluttdato.bind(this);
        this.setStartdato = this.setStartdato.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);

        const { periode } = props;
        this.state = {
            startdato: periode ? periode.tidsperiode.startdato : undefined,
            sluttdato: periode ? periode.tidsperiode.sluttdato : undefined
        };
    }

    setStartdato(startdato: Date) {
        this.setState({ startdato: normaliserDato(startdato) });
    }
    setSluttdato(sluttdato: Date) {
        this.setState({ sluttdato: normaliserDato(sluttdato) });
    }
    handleSubmitClick(evt: React.MouseEvent<HTMLButtonElement>) {
        evt.preventDefault();
        const periode = this.getPeriodeFromSkjema();
        if (periode) {
            this.props.onChange(periode);
        }
    }
    getPeriodeFromSkjema(): Stonadsperiode | undefined {
        const { startdato, sluttdato } = this.state;
        if (!startdato || !sluttdato) {
            return undefined;
        }
        return {
            ...this.props.periode,
            tidsperiode: {
                startdato,
                sluttdato
            }
        };
    }
    render() {
        const { intl, periode, onFjern } = this.props;
        const { startdato, sluttdato } = this.state;
        const tittelKey = periode
            ? 'uttaksplan.stonadsperiodeskjema.endre.tittel'
            : 'uttaksplan.stonadsperiodeskjema.tittel';
        return (
            <form
                action="#"
                onSubmit={preventFormSubmit}
                className="stonadsperiodeskjema dialogContent">
                <h1 className="typo-undertittel m-textCenter blokk-s">
                    <FormattedMessage id={tittelKey} />
                </h1>
                <div className="blokkPad-s">
                    <SkjemaGruppe>
                        <Row>
                            <Column xs="12" sm="6">
                                <div className="blokkPad-s">
                                    <DatoInput
                                        id="startdato"
                                        label={intl.formatMessage({
                                            id:
                                                'uttaksplan.stonadsperiodeskjema.startdato.sporsmal'
                                        })}
                                        dato={startdato}
                                        onChange={(dato: Date) =>
                                            this.setStartdato(dato)
                                        }
                                        avgrensninger={{
                                            helgedagerIkkeTillatt: true
                                        }}
                                        kalenderplassering="fullskjerm"
                                        dayPickerProps={{
                                            renderDay: renderDag
                                        }}
                                    />
                                </div>
                            </Column>
                            <Column xs="12" sm="6">
                                <div className="blokkPad-s">
                                    <DatoInput
                                        id="sluttdato"
                                        dato={sluttdato}
                                        label={intl.formatMessage({
                                            id:
                                                'uttaksplan.stonadsperiodeskjema.sluttdato.sporsmal'
                                        })}
                                        avgrensninger={{
                                            helgedagerIkkeTillatt: true
                                        }}
                                        onChange={(date) =>
                                            this.setSluttdato(date)
                                        }
                                        kalenderplassering="fullskjerm"
                                        dayPickerProps={{
                                            renderDay: renderDag
                                        }}
                                    />
                                </div>
                            </Column>
                        </Row>
                    </SkjemaGruppe>
                    <Row>
                        <Column xs="12" sm={periode ? '6' : '12'}>
                            <div className="blokkPad-xxs">
                                <Hovedknapp
                                    onClick={this.handleSubmitClick}
                                    className="m-fullBredde">
                                    {periode ? (
                                        <FormattedMessage id="uttaksplan.stonadsperiodeskjema.knapp.oppdater" />
                                    ) : (
                                        <FormattedMessage id="uttaksplan.stonadsperiodeskjema.knapp.leggtil" />
                                    )}
                                </Hovedknapp>
                            </div>
                        </Column>
                        {periode && (
                            <Column xs="12" sm="6">
                                <Knapp
                                    htmlType="button"
                                    data-ref="fjern-knapp"
                                    onClick={() => onFjern(periode)}
                                    className="m-fullBredde">
                                    <FormattedMessage id="uttaksplan.stonadsperiodeskjema.knapp.fjern" />
                                </Knapp>
                            </Column>
                        )}
                    </Row>
                </div>
            </form>
        );
    }
}
export default injectIntl(StonadsperiodeSkjema);
