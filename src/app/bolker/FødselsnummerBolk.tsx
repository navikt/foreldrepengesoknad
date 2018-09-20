import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Checkbox } from 'nav-frontend-skjema';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import Landvelger from '../components/landvelger/Landvelger';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import { getFødselsnummerRegler } from '../util/validation/fields/fødselsnummer';
import Input from 'common/components/skjema/wrappers/Input';
import { InputChangeEvent, SelectChangeEvent } from '../types/dom/Events';

interface FødselsnummerSpørsmålProps {
    navn: string;
    kanIkkeOppgis: boolean;
    søkersFødselsnummer: string;
    fnr: string;
    utenlandskFnr: boolean;
    bostedsland: string;
    onChange: (annenForelder: AnnenForelderPartial, e: React.ChangeEvent<any>) => void;
}

type Props = FødselsnummerSpørsmålProps & InjectedIntlProps;

const FødselsnummerBolk = (props: Props) => {
    const { kanIkkeOppgis, fnr, utenlandskFnr, søkersFødselsnummer, bostedsland, navn, onChange, intl } = props;

    return (
        <React.Fragment>
            <Block margin="xs">
                <Input
                    disabled={kanIkkeOppgis || false}
                    label={getMessage(intl, 'annenForelder.spørsmål.fnr', { navn })}
                    name="fødselsnummer"
                    onChange={(e: InputChangeEvent) => onChange({ fnr: e.target.value }, e)}
                    value={fnr || ''}
                    validators={getFødselsnummerRegler(fnr, utenlandskFnr, søkersFødselsnummer, intl)}
                    infotekst="Dette er en test"
                    autoComplete="off"
                />
            </Block>

            <Block>
                <Checkbox
                    disabled={kanIkkeOppgis}
                    checked={utenlandskFnr || false}
                    label={getMessage(intl, 'annenForelder.spørsmål.utenlandskFnr', { navn })}
                    onChange={(e: InputChangeEvent) => onChange({ utenlandskFnr: e.target.checked }, e)}
                />
            </Block>

            <Block visible={utenlandskFnr === true}>
                <Landvelger
                    label={<Labeltekst intlId={'annenForelder.bostedsland'} intlValue={{ navn }} />}
                    onChange={(land: string, e: SelectChangeEvent) => onChange({ bostedsland: land }, e)}
                    defaultValue={bostedsland}
                />
            </Block>
        </React.Fragment>
    );
};

export default injectIntl(FødselsnummerBolk);
