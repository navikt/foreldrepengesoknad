import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Checkbox, Input } from 'nav-frontend-skjema';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Landvelger from '../components/landvelger/Landvelger';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import { Språkkode } from 'common/intl/types';

interface OwnProps {
    annenForelder: AnnenForelderPartial;
    onChange: (
        annenForelder: AnnenForelderPartial,
        e: React.ChangeEvent<any>
    ) => void;
    språk: Språkkode;
}

type Props = OwnProps & InjectedIntlProps;

const FødselsnummerSpørsmål = (props: Props) => {
    const { annenForelder, onChange, intl, språk } = props;
    const { kanIkkeOppgis, fnr, utenlandskFnr } = annenForelder;

    return (
        <React.Fragment>
            <Spørsmål
                render={() => (
                    <Input
                        disabled={kanIkkeOppgis}
                        label={getMessage(intl, 'annenForelder.spørsmål.fnr')}
                        name="fødselsnummer"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange({ fnr: e.target.value }, e)
                        }
                        value={fnr}
                    />
                )}
            />

            <Spørsmål
                render={() => (
                    <Checkbox
                        disabled={kanIkkeOppgis}
                        checked={utenlandskFnr}
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
                        språk={språk}
                        defaultValue={annenForelder.bostedsland}
                    />
                )}
            />
        </React.Fragment>
    );
};

export default injectIntl(FødselsnummerSpørsmål);
