import * as React from 'react';
import {
    Uttaksperiode,
    Periode,
    Forelder,
    StønadskontoType
} from 'uttaksplan/types';
import { preventFormSubmit } from 'uttaksplan/utils';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { normaliserDato } from 'common/util/datoUtils';
import TidsperiodeSpørsmål from 'uttaksplan/skjema/sp\u00F8rsm\u00E5l/TidsperiodeSp\u00F8rsm\u00E5l';
import HvemGjelderPeriodenSpørsmål from 'uttaksplan/skjema/sp\u00F8rsm\u00E5l/HvemGjelderPeriodenSp\u00F8rsm\u00E5l';
import StønadskontoSpørsmål from 'uttaksplan/skjema/sp\u00F8rsm\u00E5l/St\u00F8nadskontoSp\u00F8rsm\u00E5l';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import Knapperad from 'common/components/knapperad/Knapperad';

export interface OwnProps {
    periode: Uttaksperiode;
    onChange: (periode: Periode) => void;
    onFjern: (periode: Periode) => void;
}

export interface State {
    forelder?: Forelder;
    startdato?: Date;
    sluttdato?: Date;
    stønadskonto?: StønadskontoType;
}

export type Props = OwnProps & InjectedIntlProps;
class UttaksperiodeSkjema extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.setSluttdato = this.setSluttdato.bind(this);
        this.setStartdato = this.setStartdato.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.skjemaErGyldig = this.skjemaErGyldig.bind(this);

        const { periode } = props;
        this.state = {
            forelder: periode ? periode.forelder : undefined,
            stønadskonto: periode ? periode.konto : undefined,
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

    getPeriodeFromSkjema(): Uttaksperiode | undefined {
        const { startdato, sluttdato, stønadskonto, forelder } = this.state;
        if (!startdato || !sluttdato || !stønadskonto || !forelder) {
            return undefined;
        }
        return {
            ...this.props.periode,
            tidsperiode: {
                startdato,
                sluttdato
            },
            forelder,
            konto: stønadskonto
        };
    }

    skjemaErGyldig() {
        return (
            this.state.forelder !== undefined &&
            this.state.stønadskonto !== undefined &&
            this.state.startdato !== undefined &&
            this.state.sluttdato !== undefined
        );
    }

    render() {
        const { periode, onFjern } = this.props;
        const tittelKey = periode
            ? 'uttaksplan.uttaksperiodeskjema.endre.tittel'
            : 'uttaksplan.uttaksperiodeskjema.tittel';

        const lagreKnappTilgjengelig = !this.skjemaErGyldig();

        return (
            <form
                action="#"
                onSubmit={preventFormSubmit}
                className="uttaksperiodeskjema dialogContent">
                <h1 className="typo-undertittel m-textCenter blokk-s">
                    <FormattedMessage id={tittelKey} />
                </h1>
                <div className="blokkPad-s">
                    <TidsperiodeSpørsmål
                        startdato={{
                            dato: this.state.startdato,
                            onChange: this.setStartdato
                        }}
                        sluttdato={{
                            dato: this.state.sluttdato,
                            onChange: this.setSluttdato
                        }}
                    />
                </div>
                <EkspanderbartInnhold
                    erApen={
                        this.state.startdato !== undefined &&
                        this.state.sluttdato !== undefined
                    }>
                    <div className="blokkPad-s">
                        <HvemGjelderPeriodenSpørsmål
                            spørsmål="Hvem gjelder perioden?"
                            forelder={this.state.forelder}
                            onChange={(forelder) => this.setState({ forelder })}
                        />
                    </div>
                </EkspanderbartInnhold>

                <EkspanderbartInnhold
                    erApen={this.state.forelder !== undefined}>
                    <div className="blokkPad-s">
                        <StønadskontoSpørsmål
                            spørsmål="Hvilken stønadskonto skal brukes?"
                            stønadskonto={this.state.stønadskonto}
                            onChange={(stønadskonto) =>
                                this.setState({ stønadskonto })
                            }
                        />
                    </div>
                </EkspanderbartInnhold>

                <Knapperad>
                    <Hovedknapp
                        onClick={this.handleSubmitClick}
                        className="m-fullBredde"
                        disabled={lagreKnappTilgjengelig}>
                        {periode ? (
                            <FormattedMessage id="uttaksplan.uttaksperiodeskjema.knapp.oppdater" />
                        ) : (
                            <FormattedMessage id="uttaksplan.uttaksperiodeskjema.knapp.leggtil" />
                        )}
                    </Hovedknapp>
                    {periode && (
                        <Knapp
                            htmlType="button"
                            data-ref="fjern-knapp"
                            onClick={() => onFjern(periode)}
                            className="m-fullBredde">
                            <FormattedMessage id="uttaksplan.uttaksperiodeskjema.knapp.fjern" />
                        </Knapp>
                    )}
                </Knapperad>
            </form>
        );
    }
}
export default injectIntl(UttaksperiodeSkjema);
