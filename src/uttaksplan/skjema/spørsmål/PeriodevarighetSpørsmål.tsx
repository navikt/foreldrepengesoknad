import * as React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Row, Column } from 'nav-frontend-grid';
import DatoInput from 'common/components/dato-input/DatoInput';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { renderDag } from 'common/util/renderUtils';

export interface Props {
    startdato?: Date;
    sluttdato?: Date;
    setStartdato: (dato: Date) => void;
    setSluttdato: (dato: Date) => void;
}

const PeriodevarighetSpørsmål: React.StatelessComponent<
    Props & InjectedIntlProps
> = ({ startdato, sluttdato, setSluttdato, setStartdato, intl }) => (
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
                        onChange={(dato: Date) => setStartdato(dato)}
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
                        onChange={(date) => setSluttdato(date)}
                        kalenderplassering="fullskjerm"
                        dayPickerProps={{
                            renderDay: renderDag
                        }}
                    />
                </div>
            </Column>
        </Row>
    </SkjemaGruppe>
);

export default injectIntl(PeriodevarighetSpørsmål);
