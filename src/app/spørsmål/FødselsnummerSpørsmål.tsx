import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Checkbox, Input } from 'nav-frontend-skjema';
import AnnenForelder, {
    AnnenForelderPartial
} from '../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Landvelger from '../components/landvelger/Landvelger';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import { ValidInput } from 'common/lib/validation';
import { getFødselsnummerRegler } from '../util/validation/fødselsnummer';

interface FødselsnummerSpørsmålProps {
    søkersFødselsnummer: string;
    annenForelder: AnnenForelderPartial;
    onChange: (
        annenForelder: AnnenForelderPartial,
        e: React.ChangeEvent<any>
    ) => void;
}

type Props = FødselsnummerSpørsmålProps & InjectedIntlProps;

const FødselsnummerSpørsmål = (props: Props) => {
    const { søkersFødselsnummer, annenForelder, onChange, intl } = props;
    const { kanIkkeOppgis, fnr, utenlandskFnr } = annenForelder;
    const FnrComponent = annenForelder.utenlandskFnr ? Input : ValidInput;

    return (
        <React.Fragment>
            <Spørsmål
                render={() => (
                    <FnrComponent
                        disabled={kanIkkeOppgis ? true : false}
                        label={getMessage(intl, 'annenForelder.spørsmål.fnr')}
                        name="fødselsnummer"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange({ fnr: e.target.value }, e)
                        }
                        value={fnr || ''}
                        validators={getFødselsnummerRegler(
                            annenForelder,
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
                synlig={annenForelder.utenlandskFnr === true}
                render={() => (
                    <Landvelger
                        label={
                            <Labeltekst intlId={'annenForelder.bostedsland'} />
                        }
                        onChange={(
                            bostedsland: string,
                            e: React.ChangeEvent<HTMLSelectElement>
                        ) => onChange({ bostedsland }, e)}
                        defaultValue={annenForelder.bostedsland}
                    />
                )}
            />
        </React.Fragment>
    );
};

export default injectIntl(FødselsnummerSpørsmål);
