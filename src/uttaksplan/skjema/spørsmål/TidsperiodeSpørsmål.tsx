import * as React from 'react';
import * as classnames from 'classnames';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Feil } from 'common/components/skjema-input-element/types';
import { Row, Column } from 'nav-frontend-grid';
import DatoInput from 'common/components/dato-input/DatoInput';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { renderDag } from 'common/util/renderUtils';
import { Tidsperiode } from 'nav-datovelger';

interface TidsperiodeDatoProps {
    label?: string;
    tidsperiode?: Tidsperiode;
    dato?: Date;
    feil?: Feil;
    visFeil?: boolean;
    onChange: (dato: Date) => void;
}

export interface OwnProps {
    startdato: TidsperiodeDatoProps;
    sluttdato: TidsperiodeDatoProps;
    tidsperiodeFeil?: Feil;
    ugyldigeTidsperioder?: Tidsperiode[];
    helgedagerIkkeTillatt?: boolean;
}

export type Props = OwnProps & InjectedIntlProps;

const TidsperiodeSpørsmål: React.StatelessComponent<Props> = ({
    startdato,
    sluttdato,
    tidsperiodeFeil,
    ugyldigeTidsperioder,
    helgedagerIkkeTillatt,
    intl
}) => {
    const minSluttdato = startdato.dato;
    const tidsperiodeStartdato = startdato.tidsperiode;
    const tidsperiodeSluttdato = sluttdato.tidsperiode;
    return (
        <SkjemaGruppe
            feil={tidsperiodeFeil}
            className={classnames('tidsperiodeSkjemagruppe', {
                'tidsperiodeSkjemagruppe--harFeil':
                    tidsperiodeFeil !== undefined
            })}>
            <Row>
                <Column xs="12" sm="6">
                    <div className="blokkPad-s">
                        <div className="blokk-xxs">
                            <DatoInput
                                id="startdato"
                                label={
                                    startdato.label ||
                                    intl.formatMessage({
                                        id: 'uttaksplan.startdato.sporsmal'
                                    })
                                }
                                dato={startdato.dato}
                                feil={
                                    startdato.visFeil && startdato.feil
                                        ? startdato.feil
                                        : undefined
                                }
                                onChange={(dato: Date) =>
                                    startdato.onChange(dato)
                                }
                                avgrensninger={{
                                    minDato: tidsperiodeStartdato
                                        ? tidsperiodeStartdato.startdato
                                        : undefined,
                                    maksDato: tidsperiodeStartdato
                                        ? tidsperiodeStartdato.sluttdato
                                        : undefined,
                                    helgedagerIkkeTillatt,
                                    ugyldigeTidsperioder
                                }}
                                kalenderplassering="fullskjerm"
                                dayPickerProps={{
                                    renderDay: renderDag
                                }}
                            />
                        </div>
                    </div>
                </Column>
                <Column xs="12" sm="6">
                    <div className="blokkPad-s">
                        <div className="blokk-xxs">
                            <DatoInput
                                id="sluttdato"
                                dato={sluttdato.dato}
                                label={
                                    sluttdato.label ||
                                    intl.formatMessage({
                                        id: 'uttaksplan.sluttdato.sporsmal'
                                    })
                                }
                                feil={
                                    sluttdato.visFeil && sluttdato.feil
                                        ? sluttdato.feil
                                        : undefined
                                }
                                avgrensninger={{
                                    minDato:
                                        minSluttdato ||
                                        (tidsperiodeSluttdato
                                            ? tidsperiodeSluttdato.startdato
                                            : undefined),
                                    maksDato: tidsperiodeSluttdato
                                        ? tidsperiodeSluttdato.sluttdato
                                        : undefined,
                                    ugyldigeTidsperioder,
                                    helgedagerIkkeTillatt
                                }}
                                onChange={(date) => sluttdato.onChange(date)}
                                kalenderplassering="fullskjerm"
                                dayPickerProps={{
                                    renderDay: renderDag
                                }}
                            />
                        </div>
                    </div>
                </Column>
            </Row>
        </SkjemaGruppe>
    );
};

export default injectIntl(TidsperiodeSpørsmål);
