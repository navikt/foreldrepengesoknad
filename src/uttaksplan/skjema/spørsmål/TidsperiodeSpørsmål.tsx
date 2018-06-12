import * as React from 'react';
import * as classnames from 'classnames';
import { SkjemaGruppe, Checkbox } from 'nav-frontend-skjema';
import { Feil } from 'common/components/skjema-input-element/types';
import { Row, Column } from 'nav-frontend-grid';
import DatoInput from 'common/components/dato-input/DatoInput';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { renderDag } from 'common/util/renderUtils';
import { Tidsperiode } from 'nav-datovelger';
import UkerOgDager from 'common/components/uker-og-dager/UkerOgDager';
import { tidsperiodeUtil } from 'uttaksplan/utils/dataUtils';

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
    beholdVarighet?: boolean;
    onChangeBeholdVarighet: (behold: boolean) => void;
}

export type Props = OwnProps & InjectedIntlProps;

const TidsperiodeSpørsmål: React.StatelessComponent<Props> = ({
    startdato,
    sluttdato,
    tidsperiodeFeil,
    ugyldigeTidsperioder,
    helgedagerIkkeTillatt,
    beholdVarighet,
    onChangeBeholdVarighet,
    intl
}) => {
    const minSluttdato = startdato.tidsperiode
        ? startdato.tidsperiode.sluttdato
        : startdato.dato;
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
                                    minDato: startdato.tidsperiode
                                        ? startdato.tidsperiode.startdato
                                        : undefined,
                                    maksDato: startdato.tidsperiode
                                        ? startdato.tidsperiode.sluttdato
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
                        <Checkbox
                            checked={beholdVarighet}
                            label="Behold varigheten"
                            onChange={(evt) =>
                                onChangeBeholdVarighet(evt.target.checked)
                            }
                        />
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
                                    minDato: minSluttdato,
                                    ugyldigeTidsperioder,
                                    helgedagerIkkeTillatt
                                }}
                                onChange={(date) => sluttdato.onChange(date)}
                                kalenderplassering="fullskjerm"
                                dayPickerProps={{
                                    renderDay: renderDag
                                }}
                                disabled={beholdVarighet}
                            />
                        </div>
                        {startdato.dato &&
                            sluttdato.dato && (
                                <UkerOgDager
                                    dager={tidsperiodeUtil({
                                        startdato: startdato.dato,
                                        sluttdato: sluttdato.dato
                                    }).antallUttaksdager()}
                                />
                            )}
                    </div>
                </Column>
            </Row>
        </SkjemaGruppe>
    );
};

export default injectIntl(TidsperiodeSpørsmål);
