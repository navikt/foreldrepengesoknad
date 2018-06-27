import * as React from 'react';
import {
    Uttaksperiode,
    Periode,
    Forelder,
    StønadskontoType,
    Periodetype,
    Dekningsgrad
} from 'uttaksplan/types';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { normaliserDato } from 'common/util/datoUtils';
import TidsperiodeSpørsmål from 'uttaksplan/skjema/spørsm\u00E5l/TidsperiodeSpørsm\u00E5l';
import HvemGjelderPeriodenSpørsmål from 'uttaksplan/skjema/spørsm\u00E5l/HvemGjelderPeriodenSpørsm\u00E5l';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import Knapperad from 'common/components/knapperad/Knapperad';
import { preventFormSubmit } from 'common/util/eventUtils';
import { Tidsperiode } from 'nav-datovelger';
import { getStønadskontoRegler } from 'uttaksplan/utils/uttaksregler/uttaksperioderegler';
import { Uttaksgrunnlag } from 'uttaksplan/types/uttaksgrunnlag';
import { getSisteMuligePermisjonsdag } from 'uttaksplan/utils/permisjonUtils';
import StønadskontoSpørsmål from 'uttaksplan/skjema/sp\u00F8rsm\u00E5l/St\u00F8nadskontoSp\u00F8rsm\u00E5l';
import { getTilgjengeligeStønadskontoer } from 'uttaksplan/utils/st\u00F8nadskontoUtils';

export interface OwnProps {
    periode?: Uttaksperiode;
    termindato: Date;
    dekningsgrad: Dekningsgrad;
    uttaksgrunnlag: Uttaksgrunnlag;
    ugyldigeTidsperioder?: Tidsperiode[];
    onChange: (periode: Periode) => void;
    onFjern: (periode: Periode) => void;
}

export interface State {
    forelder?: Forelder;
    startdato?: Date;
    sluttdato?: Date;
    stønadskonto?: StønadskontoType;
    visStønadskontoSpørsmål: boolean;
    tilgjengeligeStønadskontoer: StønadskontoType[];
}

export type Props = OwnProps & InjectedIntlProps;

class UttaksperiodeSkjema extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.setSluttdato = this.setSluttdato.bind(this);
        this.setStartdato = this.setStartdato.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.skjemaErGyldig = this.skjemaErGyldig.bind(this);

        const { periode, uttaksgrunnlag } = props;
        const { tilgjengeligeStønadskontoer } = uttaksgrunnlag;

        const singelStønadskonto =
            tilgjengeligeStønadskontoer.length === 1
                ? tilgjengeligeStønadskontoer[0]
                : undefined;

        this.state = {
            forelder: periode ? periode.forelder : undefined,
            stønadskonto: periode ? periode.konto : singelStønadskonto,
            startdato: periode ? periode.tidsperiode.startdato : undefined,
            sluttdato: periode ? periode.tidsperiode.sluttdato : undefined,
            tilgjengeligeStønadskontoer,
            visStønadskontoSpørsmål: tilgjengeligeStønadskontoer.length > 1
        };
    }

    setStartdato(startdato: Date) {
        this.setState({
            startdato: normaliserDato(startdato)
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
            uttaksgrunnlag,
            ugyldigeTidsperioder
        } = this.props;
        const tittelKey = periode
            ? 'uttaksplan.uttaksperiodeskjema.endre.tittel'
            : 'uttaksplan.uttaksperiodeskjema.tittel';
        const { startdato, sluttdato, forelder, stønadskonto } = this.state;

        const lagreKnappTilgjengelig = !this.skjemaErGyldig();
        const { permisjonsregler, søker, annenForelder } = uttaksgrunnlag;

        const navnForelder1 = søker.fornavn;
        const navnForelder2 = annenForelder
            ? annenForelder.fornavn
            : 'forelder 2';

        const regler = stønadskonto
            ? getStønadskontoRegler(
                  stønadskonto,
                  this.props.termindato,
                  this.props.dekningsgrad,
                  permisjonsregler
              )
            : undefined;

        const tidsperiode: Tidsperiode | undefined = regler
            ? {
                  startdato: regler.tidligsteUttaksdato,
                  sluttdato: regler.sisteUttaksdato
              }
            : {
                  startdato: this.props.termindato,
                  sluttdato: getSisteMuligePermisjonsdag(
                      this.props.termindato,
                      permisjonsregler
                  )
              };

        return (
            <form
                action="#"
                onSubmit={preventFormSubmit}
                className="uttaksperiodeskjema dialogContent">
                <h1 className="typo-undertittel m-textCenter blokk-s">
                    <FormattedMessage id={tittelKey} />
                </h1>

                <div className="blokkPad-s">
                    <HvemGjelderPeriodenSpørsmål
                        navnForelder1={navnForelder1}
                        navnForelder2={navnForelder2}
                        spørsmål="Hvem skal ha perioden?"
                        forelder={forelder}
                        onChange={(f) =>
                            this.setState({
                                forelder: f
                            })
                        }
                    />
                </div>

                <EkspanderbartInnhold
                    erApen={this.state.forelder !== undefined}>
                    <div className="blokkPad-s">
                        <StønadskontoSpørsmål
                            spørsmål="Hvilken stønadskonto skal brukes?"
                            stønadskonto={this.state.stønadskonto}
                            tilgjengeligeKontoer={getTilgjengeligeStønadskontoer(
                                uttaksgrunnlag.søker
                            )}
                            onChange={(sk: StønadskontoType) =>
                                this.setState({ stønadskonto: sk })
                            }
                        />
                    </div>
                </EkspanderbartInnhold>

                <EkspanderbartInnhold erApen={stønadskonto !== undefined}>
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
