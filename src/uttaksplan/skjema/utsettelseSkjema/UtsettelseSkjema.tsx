import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Row, Column } from 'nav-frontend-grid';
import {
    UtsettelseÅrsakType,
    Utsettelsesperiode,
    Forelder,
    Periodetype,
    Tidsperiode,
    Permisjonsregler
} from 'uttaksplan/types';
import Ferieinfo from './Ferieinfo';
import {
    validerUtsettelseskjema,
    getTilTidsromSluttdato,
    getAntallFeriedager,
    getUgyldigeTidsrom,
    getDefaultState
} from './utils';

import './utsettelseSkjema.less';
import { Valideringsfeil, Skjemaelement } from './types';
import { Feil } from 'common/components/skjema-input-element/types';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import { normaliserDato } from 'common/util/datoUtils';
import HvemGjelderPeriodenSpørsmål from 'uttaksplan/skjema/spørsmål/HvemGjelderPeriodenSpørsmål';
import UtsettelsesårsakSpørsmål from 'uttaksplan/skjema/spørsmål/UtsettelsesårsakSpørsmål';
import TidsperiodeSpørsmål from 'uttaksplan/skjema/spørsmål/TidsperiodeSpørsmål';
import { preventFormSubmit } from 'common/util/eventUtils';
import { Tidsperioden, getTidsperiode } from 'uttaksplan/utils/dataUtils';

interface OwnProps {
    termindato: Date;
    tidsperiode: Tidsperiode;
    utsettelse?: Utsettelsesperiode;
    registrerteUtsettelser: Utsettelsesperiode[];
    navnForelder1?: string;
    navnForelder2?: string;
    permisjonsregler: Permisjonsregler;
    onChange: (utsettelse: Utsettelsesperiode) => void;
    onFjern: (utsettelse: Utsettelsesperiode) => void;
}

export type Props = OwnProps & InjectedIntlProps;

export interface State {
    årsak?: UtsettelseÅrsakType;
    forelder?: Forelder;
    startdato?: Date;
    sluttdato?: Date;
    valideringsfeil: Valideringsfeil;
    visValideringsfeil?: boolean;
}

class UtsettelseSkjema extends React.Component<Props, State> {
    revaliderTimeoutId: number;
    skalValidere: boolean;

    constructor(props: Props) {
        super(props);
        this.hentSkjemadata = this.hentSkjemadata.bind(this);
        this.setStartdato = this.setStartdato.bind(this);
        this.setSluttdato = this.setSluttdato.bind(this);
        this.getSkjemaelementFeil = this.getSkjemaelementFeil.bind(this);
        this.validerSkjema = this.validerSkjema.bind(this);
        this.revaliderSkjema = this.revaliderSkjema.bind(this);
        this.state = {
            ...getDefaultState(this.props.utsettelse)
        };
    }

    getSkjemaelementFeil(skjemaelement: Skjemaelement): Feil | undefined {
        return this.state.valideringsfeil.get(skjemaelement);
    }

    setStartdato(dato: Date) {
        const startdato = normaliserDato(dato);
        let sluttdato = this.state.sluttdato;
        if (this.state.startdato && this.state.sluttdato) {
            const uttaksdager = Tidsperioden({
                startdato: this.state.startdato,
                sluttdato: this.state.sluttdato
            }).getAntallUttaksdager();
            sluttdato = getTidsperiode(startdato, uttaksdager).sluttdato;
        }
        this.setState({
            startdato,
            sluttdato
        });
        this.revaliderSkjema();
    }

    setSluttdato(dato: Date) {
        const sluttdato = normaliserDato(dato);
        this.setState({ sluttdato });
        this.revaliderSkjema();
    }

    revaliderSkjema() {
        if (this.revaliderTimeoutId) {
            window.clearTimeout(this.revaliderTimeoutId);
        }
        this.skalValidere = true;
        this.revaliderTimeoutId = window.setTimeout(this.validerSkjema, 0);
    }

    validerSkjema(): Valideringsfeil {
        this.skalValidere = false;
        const valideringsfeil = validerUtsettelseskjema(this.state, this.props);
        this.setState({ valideringsfeil });
        return valideringsfeil;
    }

    hentSkjemadata(): Utsettelsesperiode {
        const { årsak, startdato, sluttdato, forelder } = this.state;
        return {
            id: this.props.utsettelse ? this.props.utsettelse.id : undefined,
            type: Periodetype.Utsettelse,
            årsak,
            tidsperiode: {
                startdato,
                sluttdato
            },
            forelder
        } as any;
    }

    handleSubmitClick(evt: React.MouseEvent<HTMLButtonElement>) {
        evt.preventDefault();
        const valideringsfeil = this.validerSkjema();
        if (valideringsfeil.size === 0) {
            this.setState({ visValideringsfeil: false });
            this.props.onChange(this.hentSkjemadata());
        } else {
            this.setState({ visValideringsfeil: true, valideringsfeil });
        }
    }

    render() {
        const { årsak, startdato, sluttdato, forelder } = this.state;
        const {
            utsettelse,
            navnForelder1,
            navnForelder2,
            tidsperiode,
            permisjonsregler,
            termindato,
            registrerteUtsettelser,
            intl
        } = this.props;

        const utsettelser = utsettelse
            ? registrerteUtsettelser.filter((u) => u.id !== utsettelse.id)
            : registrerteUtsettelser;
        const tilTidsromStartdato = startdato
            ? startdato
            : tidsperiode.startdato;
        const tilTidsperiode: Tidsperiode = {
            startdato: tilTidsromStartdato,
            sluttdato: getTilTidsromSluttdato(
                termindato,
                permisjonsregler,
                tilTidsromStartdato,
                utsettelser
            )
        };

        const ugyldigeTidsrom = getUgyldigeTidsrom(utsettelser, utsettelse);

        const antallFeriedager =
            this.state.årsak === UtsettelseÅrsakType.Ferie
                ? getAntallFeriedager(
                      årsak,
                      forelder,
                      startdato,
                      sluttdato,
                      utsettelser,
                      utsettelse
                  )
                : 0;

        const visFerieinfo = forelder && årsak === UtsettelseÅrsakType.Ferie;

        const startdatoFeil = this.getSkjemaelementFeil('startdato');
        const sluttdatoFeil = this.getSkjemaelementFeil('sluttdato');

        const visStartdatofeil =
            !this.skalValidere &&
            startdatoFeil &&
            (this.state.visValideringsfeil ||
                this.state.startdato !== undefined);

        const visSluttdatofeil =
            !this.skalValidere &&
            sluttdatoFeil &&
            (this.state.visValideringsfeil ||
                this.state.sluttdato !== undefined);

        const tidsperiodeFeil =
            !visStartdatofeil && !visSluttdatofeil
                ? this.getSkjemaelementFeil('tidsperiode')
                : undefined;
        return (
            <form
                action="#"
                onSubmit={preventFormSubmit}
                className="utsettelseSkjema dialogContent">
                <h1 className="typo-undertittel m-textCenter blokk-s">
                    <FormattedMessage id="uttaksplan.utsettelseskjema.tittel" />
                </h1>
                <div className="blokkPad-s">
                    <HvemGjelderPeriodenSpørsmål
                        spørsmål={intl.formatMessage({
                            id: 'uttaksplan.utsettelseskjema.hvem.sporsmal'
                        })}
                        forelder={forelder}
                        navnForelder1={navnForelder1}
                        navnForelder2={navnForelder2}
                        feil={this.getSkjemaelementFeil('forelder')}
                        onChange={(value) => {
                            this.setState({ forelder: value as Forelder });
                            this.revaliderSkjema();
                        }}
                    />
                </div>

                <EkspanderbartInnhold
                    erApen={forelder !== undefined}
                    harEkspanderbartInnhold={true}>
                    {forelder && (
                        <div className="blokkPad-xxs">
                            <UtsettelsesårsakSpørsmål
                                utsettelsesårsak={årsak}
                                forelder={forelder}
                                navnForelder1={navnForelder1}
                                navnForelder2={navnForelder2}
                                feil={this.getSkjemaelementFeil('årsak')}
                                onChange={(nyÅrsak) => {
                                    this.setState({ årsak: nyÅrsak });
                                    this.revaliderSkjema();
                                }}
                            />
                        </div>
                    )}
                </EkspanderbartInnhold>

                <EkspanderbartInnhold
                    erApen={this.state.årsak !== undefined}
                    harEkspanderbartInnhold={true}>
                    <div className="blokkPad-s">
                        <TidsperiodeSpørsmål
                            startdato={{
                                dato: startdato,
                                label: intl.formatMessage({
                                    id:
                                        'uttaksplan.utsettelseskjema.startdato.sporsmal'
                                }),
                                tidsperiode,
                                onChange: this.setStartdato,
                                feil: startdatoFeil,
                                visFeil: visStartdatofeil
                            }}
                            sluttdato={{
                                dato: sluttdato,
                                label: intl.formatMessage({
                                    id:
                                        'uttaksplan.utsettelseskjema.sluttdato.sporsmal'
                                }),
                                tidsperiode: tilTidsperiode,
                                onChange: this.setSluttdato,
                                feil: sluttdatoFeil,
                                visFeil: visSluttdatofeil
                            }}
                            ugyldigeTidsperioder={ugyldigeTidsrom}
                            tidsperiodeFeil={tidsperiodeFeil}
                            helgedagerIkkeTillatt={true}
                        />

                        {visFerieinfo && (
                            <Ferieinfo
                                feriedager={antallFeriedager}
                                permisjonsregler={permisjonsregler}
                                forelderNavn={
                                    forelder === 'forelder1'
                                        ? navnForelder1 ||
                                          intl.formatMessage({
                                              id: 'uttaksplan.forelder1'
                                          })
                                        : navnForelder2 ||
                                          intl.formatMessage({
                                              id: 'uttaksplan.forelder2'
                                          })
                                }
                            />
                        )}
                    </div>
                </EkspanderbartInnhold>
                {this.state.årsak !== undefined && (
                    <Row>
                        <Column xs="12" sm={utsettelse ? '6' : '12'}>
                            <div className="blokkPad-xxs">
                                <Hovedknapp
                                    onClick={(evt) =>
                                        this.handleSubmitClick(evt)
                                    }
                                    className="m-fullBredde">
                                    {utsettelse ? (
                                        <FormattedMessage id="uttaksplan.utsettelseskjema.knapp.oppdater" />
                                    ) : (
                                        <FormattedMessage id="uttaksplan.utsettelseskjema.knapp.leggtil" />
                                    )}
                                </Hovedknapp>
                            </div>
                        </Column>
                        {utsettelse && (
                            <Column xs="12" sm="6">
                                <Knapp
                                    htmlType="button"
                                    data-ref="fjern-knapp"
                                    onClick={() =>
                                        this.props.onFjern(utsettelse)
                                    }
                                    className="m-fullBredde">
                                    <FormattedMessage id="uttaksplan.utsettelseskjema.knapp.fjern" />
                                </Knapp>
                            </Column>
                        )}
                    </Row>
                )}
            </form>
        );
    }
}

export default injectIntl(UtsettelseSkjema);
