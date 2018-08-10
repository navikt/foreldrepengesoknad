import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { addYears } from 'date-fns';
import DatoInput from 'common/components/skjema/elements/dato-input/DatoInput';
import { renderDag } from 'common/util/renderUtils';

export interface OwnProps {
    termindato?: Date;
    termindatoErUgyldig?: boolean;
    onChange: (termindato: Date) => void;
}

type Props = OwnProps & InjectedIntlProps;

class TermindatoSpørsmål extends React.Component<Props> {
    render() {
        const { termindato, termindatoErUgyldig, onChange, intl } = this.props;

        return (
            <DatoInput
                id="input-termindato"
                dato={termindato}
                label={intl.formatMessage({
                    id: 'uttaksplan.skjema.label.termindato'
                })}
                onChange={onChange}
                avgrensninger={{
                    minDato: addYears(new Date(), -1),
                    maksDato: addYears(new Date(), 2)
                }}
                feil={
                    termindatoErUgyldig
                        ? {
                              feilmelding: intl.formatMessage({
                                  id: 'skjema.feilmelding.ugyldig_termindato'
                              })
                          }
                        : undefined
                }
                dayPickerProps={{
                    renderDay: renderDag
                }}
            />
        );
    }
}

export default injectIntl(TermindatoSpørsmål);
