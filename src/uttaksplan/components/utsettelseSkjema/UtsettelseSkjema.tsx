import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import * as classnames from 'classnames';
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
import { preventFormSubmit } from 'uttaksplan/utils';
import { isBefore, isSameDay } from 'date-fns';
import Ferieinfo from 'uttaksplan/components/utsettelseSkjema/Ferieinfo';
import {
    validerUtsettelseskjema,
    getTilTidsromSluttdato,
    getAntallFeriedager,
    getUgyldigeTidsrom,
    getDefaultState
} from 'uttaksplan/components/utsettelseSkjema/utils';

import './utsettelseSkjema.less';
import {
    Valideringsfeil,
    Skjemaelement
} from 'uttaksplan/components/utsettelseSkjema/types';
import { Feil } from 'common/components/skjema-input-element/types';
import Radioliste from 'uttaksplan/components/radioliste/Radioliste';
import EkspanderbartInnhold from 'common/components/ekspanderbartInnhold/EkspanderbartInnhold';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import DatoInput from 'common/components/dato-input/DatoInput';
import { renderDag } from 'common/util/renderUtils';
import { normaliserDato } from 'common/util/datoUtils';

interface OwnProps {
    termindato: Date;
    tidsrom: Tidsperiode;
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
        const sluttdato = this.state.sluttdato;
        this.setState({
            startdato,
            sluttdato: sluttdato
                ? isBefore(startdato, sluttdato) ||
                  isSameDay(startdato, sluttdato)
                    ? sluttdato
                    : undefined
                : undefined
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
            tidsrom,
            permisjonsregler,
            termindato,
            registrerteUtsettelser,
            intl
        } = this.props;

        const tilTidsromStartdato = startdato ? startdato : tidsrom.startdato;
        const tilTidsrom: Tidsperiode = {
            startdato: tilTidsromStartdato,
            sluttdato: getTilTidsromSluttdato(
                termindato,
                permisjonsregler,
                tilTidsromStartdato,
                registrerteUtsettelser
            )
        };

        const ugyldigeTidsrom = getUgyldigeTidsrom(
            registrerteUtsettelser,
            utsettelse
        );

        const antallFeriedager =
            this.state.årsak === UtsettelseÅrsakType.Ferie
                ? getAntallFeriedager(
                      årsak,
                      forelder,
                      startdato,
                      sluttdato,
                      registrerteUtsettelser,
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
                    <Radioliste
                        kolonner="2"
                        tittel={intl.formatMessage({
                            id: 'uttaksplan.utsettelseskjema.hvem.sporsmal'
                        })}
                        inputnavn="forelder"
                        stil="ekstern"
                        feil={this.getSkjemaelementFeil('forelder')}
                        valg={[
                            {
                                tittel:
                                    navnForelder1 ||
                                    intl.formatMessage({
                                        id: 'uttaksplan.Forelder1'
                                    }),
                                verdi: 'forelder1'
                            },
                            {
                                tittel:
                                    navnForelder2 ||
                                    intl.formatMessage({
                                        id: 'uttaksplan.Forelder2'
                                    }),
                                verdi: 'forelder2'
                            }
                        ]}
                        valgtVerdi={forelder}
                        onChange={(value) => {
                            this.setState({ forelder: value as Forelder });
                            this.revaliderSkjema();
                        }}
                    />
                </div>

                <EkspanderbartInnhold
                    erApen={forelder !== undefined}
                    harEkspanderbartInnhold={true}>
                    <div className="blokkPad-xxs">
                        <Radioliste
                            tittel={
                                <FormattedMessage
                                    id="uttaksplan.utsettelseskjema.årsak.sporsmal"
                                    values={{
                                        navn:
                                            forelder === 'forelder1'
                                                ? navnForelder1 ||
                                                  intl
                                                      .formatMessage({
                                                          id:
                                                              'uttaksplan.forelder1'
                                                      })
                                                      .toLowerCase()
                                                : navnForelder2 ||
                                                  intl
                                                      .formatMessage({
                                                          id:
                                                              'uttaksplan.forelder2'
                                                      })
                                                      .toLowerCase()
                                    }}
                                />
                            }
                            stil="ekstern"
                            feil={this.getSkjemaelementFeil('årsak')}
                            valg={[
                                {
                                    tittel: intl.formatMessage({
                                        id:
                                            'uttaksplan.utsettelseskjema.årsak.arbeid'
                                    }),
                                    verdi: UtsettelseÅrsakType.Arbeid
                                },
                                {
                                    tittel: intl.formatMessage({
                                        id:
                                            'uttaksplan.utsettelseskjema.årsak.ferie'
                                    }),
                                    verdi: UtsettelseÅrsakType.Ferie
                                }
                            ]}
                            inputnavn="utsettelse"
                            valgtVerdi={årsak}
                            onChange={(value) => {
                                this.setState({
                                    årsak: value as UtsettelseÅrsakType
                                });
                                this.revaliderSkjema();
                            }}
                        />
                    </div>
                </EkspanderbartInnhold>

                <EkspanderbartInnhold
                    erApen={this.state.årsak !== undefined}
                    harEkspanderbartInnhold={true}>
                    <div className="blokkPad-s">
                        <SkjemaGruppe
                            feil={tidsperiodeFeil}
                            className={classnames('tidsperiodeSkjemagruppe', {
                                'tidsperiodeSkjemagruppe--harFeil':
                                    tidsperiodeFeil !== undefined
                            })}>
                            <Row>
                                <Column xs="12" sm="6">
                                    <div className="blokkPad-s">
                                        <DatoInput
                                            id="startdato"
                                            label={intl.formatMessage({
                                                id:
                                                    'uttaksplan.utsettelseskjema.startdato.sporsmal'
                                            })}
                                            dato={startdato}
                                            feil={
                                                visStartdatofeil &&
                                                startdatoFeil
                                                    ? startdatoFeil
                                                    : undefined
                                            }
                                            onChange={(dato: Date) =>
                                                this.setStartdato(dato)
                                            }
                                            avgrensninger={{
                                                minDato: tidsrom.startdato,
                                                maksDato: tidsrom.sluttdato,
                                                helgedagerIkkeTillatt: true,
                                                ugyldigeTidsperioder: ugyldigeTidsrom
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
                                                    'uttaksplan.utsettelseskjema.sluttdato.sporsmal'
                                            })}
                                            feil={
                                                visSluttdatofeil &&
                                                sluttdatoFeil
                                                    ? sluttdatoFeil
                                                    : undefined
                                            }
                                            avgrensninger={{
                                                minDato: tilTidsrom.startdato,
                                                maksDato: tilTidsrom.sluttdato,
                                                ugyldigeTidsperioder: ugyldigeTidsrom,
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
