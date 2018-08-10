import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Checkbox } from 'nav-frontend-skjema';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Landvelger from '../components/landvelger/Landvelger';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import { getFødselsnummerRegler } from '../util/validation/fields/fødselsnummer';
import Input from 'common/components/skjema/wrappers/Input';
import { InputChangeEvent, SelectChangeEvent } from '../types/dom/Events';

interface FødselsnummerSpørsmålProps {
    kanIkkeOppgis: boolean;
    søkersFødselsnummer: string;
    fnr: string;
    utenlandskFnr: boolean;
    bostedsland: string;
    onChange: (
        annenForelder: AnnenForelderPartial,
        e: React.ChangeEvent<any>
    ) => void;
}

type Props = FødselsnummerSpørsmålProps & InjectedIntlProps;

const FødselsnummerBolk = (props: Props) => {
    const {
        kanIkkeOppgis,
        fnr,
        utenlandskFnr,
        søkersFødselsnummer,
        bostedsland,
        onChange,
        intl
    } = props;

    return (
        <React.Fragment>
            <Spørsmål
                render={() => (
                    <Input
                        disabled={kanIkkeOppgis || false}
                        label={getMessage(intl, 'annenForelder.spørsmål.fnr')}
                        name="fødselsnummer"
                        onChange={(e: InputChangeEvent) =>
                            onChange({ fnr: e.target.value }, e)
                        }
                        value={fnr || ''}
                        validators={getFødselsnummerRegler(
                            fnr,
                            utenlandskFnr,
                            søkersFødselsnummer,
                            intl
                        )}
                        infotekst="Dette er en test"
                        autoComplete="off"
                    />
                )}
            />

            <Spørsmål
                render={() => (
                    <Checkbox
                        disabled={kanIkkeOppgis}
                        checked={utenlandskFnr || false}
                        label={getMessage(
                            intl,
                            'annenForelder.spørsmål.utenlandskFnr'
                        )}
                        onChange={(e: InputChangeEvent) =>
                            onChange({ utenlandskFnr: e.target.checked }, e)
                        }
                    />
                )}
            />

            <Spørsmål
                synlig={utenlandskFnr === true}
                render={() => (
                    <Landvelger
                        label={
                            <Labeltekst intlId={'annenForelder.bostedsland'} />
                        }
                        onChange={(land: string, e: SelectChangeEvent) =>
                            onChange({ bostedsland: land }, e)
                        }
                        defaultValue={bostedsland}
                    />
                )}
            />
        </React.Fragment>
    );
};

export default injectIntl(FødselsnummerBolk);
