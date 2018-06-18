import * as React from 'react';
import {
    Uttaksperiode,
    Periode,
    Forelder,
    StønadskontoType,
    Periodetype,
    Permisjonsregler,
    Dekningsgrad
} from 'uttaksplan/types';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { normaliserDato } from 'common/util/datoUtils';
import TidsperiodeSpørsmål from 'uttaksplan/skjema/sp\u00F8rsm\u00E5l/TidsperiodeSp\u00F8rsm\u00E5l';
import HvemGjelderPeriodenSpørsmål from 'uttaksplan/skjema/sp\u00F8rsm\u00E5l/HvemGjelderPeriodenSp\u00F8rsm\u00E5l';
import StønadskontoSpørsmål from 'uttaksplan/skjema/sp\u00F8rsm\u00E5l/St\u00F8nadskontoSp\u00F8rsm\u00E5l';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import Knapperad from 'common/components/knapperad/Knapperad';
import { preventFormSubmit } from 'common/util/eventUtils';
import { tidsperioden } from 'uttaksplan/utils/dataUtils';
import { Tidsperiode } from 'nav-datovelger';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { getStønadskontoRegler } from 'uttaksplan/utils/uttaksregler/uttaksperioderegler';

import Foreldernavn from 'uttaksplan/components/foreldernavn/Foreldernavn';

export interface OwnProps {
    periode?: Uttaksperiode;
    navnForelder1?: string;
    navnForelder2?: string;
    permisjonsregler: Permisjonsregler;
    termindato: Date;
    dekningsgrad: Dekningsgrad;
    ugyldigeTidsperioder?: Tidsperiode[];
    onChange: (periode: Periode) => void;
    onFjern: (periode: Periode) => void;
}

export interface State {
    forelder?: Forelder;
    startdato?: Date;
    sluttdato?: Date;
    stønadskonto?: StønadskontoType;
    beholdVarighet?: boolean;
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
            sluttdato: periode ? periode.tidsperiode.sluttdato : undefined,
            beholdVarighet: true
        };
    }

    setStartdato(startdato: Date) {
        let sluttdato = this.state.sluttdato;
        if (this.state.beholdVarighet && sluttdato && this.state.startdato) {
            sluttdato = tidsperioden({
                startdato: this.state.startdato,
                sluttdato
            }).setStartdato(startdato).sluttdato;
        }
        this.setState({
            startdato: normaliserDato(startdato),
            sluttdato: sluttdato
                ? normaliserDato(sluttdato)
                : this.state.sluttdato
        });
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
        const periode: Uttaksperiode = {
            ...this.props.periode,
            type: Periodetype.Uttak,
            tidsperiode: {
                startdato,
                sluttdato
            },
            forelder,
            konto: stønadskonto
        };

        return periode;
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
        const {
            periode,
            onFjern,
            navnForelder1,
            navnForelder2,
            ugyldigeTidsperioder,
            termindato,
            dekningsgrad,
            permisjonsregler
        } = this.props;
        const tittelKey = periode
            ? 'uttaksplan.uttaksperiodeskjema.endre.tittel'
            : 'uttaksplan.uttaksperiodeskjema.tittel';
        const {
            beholdVarighet,
            startdato,
            sluttdato,
            forelder,
            stønadskonto
        } = this.state;
        const lagreKnappTilgjengelig = !this.skjemaErGyldig();

        const regler = stønadskonto
            ? getStønadskontoRegler(
                  stønadskonto,
                  termindato,
                  dekningsgrad,
                  permisjonsregler
              )
            : undefined;
        const tidsperiode: Tidsperiode | undefined = regler
            ? {
                  startdato: regler.tidligsteUttaksdato,
                  sluttdato: regler.sisteUttaksdato
              }
            : undefined;

        return (
            <form
                action="#"
                onSubmit={preventFormSubmit}
                className="uttaksperiodeskjema dialogContent">
                <h1 className="typo-undertittel m-textCenter blokk-s">
                    <FormattedMessage id={tittelKey} />
                </h1>

                <div className="blokkPad-s">
                    <StønadskontoSpørsmål
                        spørsmål="Hvilket uttak ønsker du å legge til?"
                        stønadskonto={stønadskonto}
                        onChange={(konto) =>
                            this.setState({ stønadskonto: konto })
                        }
                    />
                </div>

                <EkspanderbartInnhold erApen={stønadskonto !== undefined}>
                    <div className="blokkPad-s">
                        <HvemGjelderPeriodenSpørsmål
                            navnForelder1={navnForelder1}
                            navnForelder2={navnForelder2}
                            spørsmål="Hvem gjelder perioden?"
                            forelder={forelder}
                            onChange={(f) => this.setState({ forelder: f })}
                        />
                    </div>
                    {stønadskonto === StønadskontoType.Mødrekvote &&
                        forelder === 'forelder2' && (
                            <div className="blokkPad-s">
                                <Veilederinfo type="info">
                                    For at{' '}
                                    <Foreldernavn
                                        forelder="forelder1"
                                        navn={navnForelder1}
                                    />{' '}
                                    skal ta ut mødrekvote, må perioden overføres
                                    fra{' '}
                                    <Foreldernavn
                                        forelder="forelder1"
                                        navn={navnForelder1}
                                    />{' '}
                                    til{' '}
                                    <Foreldernavn
                                        forelder="forelder2"
                                        navn={navnForelder2}
                                    />.
                                </Veilederinfo>
                            </div>
                        )}
                </EkspanderbartInnhold>

                <EkspanderbartInnhold erApen={forelder !== undefined}>
                    <TidsperiodeSpørsmål
                        startdato={{
                            dato: startdato,
                            onChange: this.setStartdato,
                            tidsperiode
                        }}
                        sluttdato={{
                            dato: sluttdato,
                            onChange: this.setSluttdato,
                            tidsperiode
                        }}
                        helgedagerIkkeTillatt={true}
                        beholdVarighet={beholdVarighet}
                        visBeholdVarighet={periode && periode.id !== undefined}
                        onChangeBeholdVarighet={(behold) =>
                            this.setState({ beholdVarighet: behold })
                        }
                        ugyldigeTidsperioder={ugyldigeTidsperioder}
                    />
                </EkspanderbartInnhold>

                <EkspanderbartInnhold
                    erApen={startdato !== undefined && sluttdato !== undefined}>
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
                </EkspanderbartInnhold>
            </form>
        );
    }
}

export default injectIntl(UttaksperiodeSkjema);
