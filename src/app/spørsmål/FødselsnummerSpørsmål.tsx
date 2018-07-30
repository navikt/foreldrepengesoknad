import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Landvelger from '../components/landvelger/Landvelger';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import { ValidInput } from 'common/lib/validation';
import { getFødselsnummerRegler } from '../util/validation/fields/fødselsnummer';

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

const FødselsnummerSpørsmål = (props: Props) => {
    const {
        kanIkkeOppgis,
        fnr,
        utenlandskFnr,
        søkersFødselsnummer,
        bostedsland,
        onChange,
        intl
    } = props;
    const FnrComponent = utenlandskFnr ? Input : ValidInput;

    return (
        <React.Fragment>
            <Spørsmål
                render={() => (
                    <FnrComponent
                        disabled={kanIkkeOppgis || false}
                        label={getMessage(intl, 'annenForelder.spørsmål.fnr')}
                        name="fødselsnummer"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange({ fnr: e.target.value }, e)
                        }
                        value={fnr || ''}
                        validators={getFødselsnummerRegler(
                            fnr,
                            utenlandskFnr,
                            søkersFødselsnummer,
                            intl
                        )}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                        onChange={(
                            land: string,
                            e: React.ChangeEvent<HTMLSelectElement>
                        ) => onChange({ bostedsland: land }, e)}
                        defaultValue={bostedsland}
                    />
                )}
            />
        </React.Fragment>
    );
};

export default injectIntl(FødselsnummerSpørsmål);
