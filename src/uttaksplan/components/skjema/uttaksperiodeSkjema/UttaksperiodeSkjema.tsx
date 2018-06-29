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
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import Knapperad from 'common/components/knapperad/Knapperad';
import { preventFormSubmit } from 'common/util/eventUtils';
import { Tidsperiode } from 'nav-datovelger';
import { getStønadskontoRegler } from 'uttaksplan/utils/regler/uttaksperioderegler';
import { getSisteMuligePermisjonsdag } from 'uttaksplan/utils/permisjonUtils';
import { Uttaksgrunnlag } from 'uttaksplan/utils/uttak/uttaksgrunnlag';
import HvemGjelderPeriodenSpørsmål from 'uttaksplan/components/skjema/spørsmål/HvemGjelderPeriodenSpørsmål';
import StønadskontoSpørsmål from 'uttaksplan/components/skjema/spørsmål/StønadskontoSpørsmål';
import TidsperiodeSpørsmål from 'uttaksplan/components/skjema/spørsmål/TidsperiodeSpørsmål';

export interface OwnProps {
    periode?: Uttaksperiode;
    familiehendelsedato: Date;
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
        const tilgjengeligeStønadskontoer =
            uttaksgrunnlag.tilgjengeligeStønadskontoer;

        // Hvilke spørsmål skal vises
        const visSpørsmålOmHvem = uttaksgrunnlag.erDeltPermisjon;
        const visSpørsmålOmStønadskonto = visSpørsmålOmHvem
            ? forelder !== undefined
            : tilgjengeligeStønadskontoer.length > 1;
        const visSpørsmålOmTidsrom =
            !uttaksgrunnlag.erDeltPermisjon || stønadskonto ? true : false;

        const lagreKnappTilgjengelig = !this.skjemaErGyldig();
        const { permisjonsregler, søker, annenForelder } = uttaksgrunnlag;

        const navnForelder1 = søker.fornavn;
        const navnForelder2 = annenForelder
            ? annenForelder.fornavn
            : 'forelder 2';

        const regler = stønadskonto
            ? getStønadskontoRegler(
                  stønadskonto,
                  this.props.familiehendelsedato,
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
                  startdato: this.props.familiehendelsedato,
                  sluttdato: getSisteMuligePermisjonsdag(
                      this.props.familiehendelsedato,
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
                {visSpørsmålOmHvem && (
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
                )}

                {visSpørsmålOmStønadskonto && (
                    <EkspanderbartInnhold erApen={visSpørsmålOmStønadskonto}>
                        <div className="blokkPad-s">
                            <StønadskontoSpørsmål
                                spørsmål="Hvilken stønadskonto skal brukes?"
                                stønadskonto={this.state.stønadskonto}
                                tilgjengeligeKontoer={
                                    tilgjengeligeStønadskontoer
                                }
                                onChange={(sk: StønadskontoType) =>
                                    this.setState({ stønadskonto: sk })
                                }
                            />
                        </div>
                    </EkspanderbartInnhold>
                )}

                <EkspanderbartInnhold erApen={visSpørsmålOmTidsrom}>
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
