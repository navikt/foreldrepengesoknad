import * as React from 'react';
import { useIntl } from 'react-intl';
import { Checkbox } from 'nav-frontend-skjema';
import { AnnenForelderPartial } from '../../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import { getFødselsnummerRegler } from '../../util/validation/fødselsnummer';
import Input from 'common/components/skjema/wrappers/Input';
import { InputChangeEvent } from '../../../common/types/Events';
import ValiderbarControl from 'common/lib/validation/elements/ValiderbarControl';
import Landvelger from 'app/components/skjema/landvelger/Landvelger';

interface FødselsnummerSpørsmålProps {
    navn: string;
    kanIkkeOppgis: boolean;
    søkersFødselsnummer: string;
    fnr: string;
    utenlandskFnr: boolean;
    bostedsland: string;
    onChange: (annenForelder: AnnenForelderPartial) => void;
}

type Props = FødselsnummerSpørsmålProps;

const FødselsnummerBolk = (props: Props) => {
    const { kanIkkeOppgis, fnr, utenlandskFnr, søkersFødselsnummer, bostedsland, navn, onChange } = props;
    const intl = useIntl();

    return (
        <ValiderbarControl
            render={(validateField) => (
                <>
                    <Block margin="xs">
                        <Input
                            id="fødselsnummer"
                            disabled={kanIkkeOppgis || false}
                            label={getMessage(intl, 'annenForelder.spørsmål.fnr', { navn })}
                            name="fødselsnummer"
                            onChange={(v: string) => onChange({ fnr: v })}
                            value={fnr || ''}
                            validators={getFødselsnummerRegler(fnr, utenlandskFnr, søkersFødselsnummer, intl)}
                            autoComplete="off"
                        />
                    </Block>

                    <Block>
                        <Checkbox
                            name="harUtenlandskFnr"
                            disabled={kanIkkeOppgis}
                            checked={utenlandskFnr || false}
                            label={getMessage(intl, 'annenForelder.spørsmål.utenlandskFnr', { navn })}
                            onChange={(e: InputChangeEvent) => {
                                onChange({ utenlandskFnr: e.target.checked });
                                validateField('fødselsnummer');
                            }}
                        />
                    </Block>

                    <Block visible={utenlandskFnr === true}>
                        <Landvelger
                            label={<Labeltekst intlId="annenForelder.bostedsland" intlValue={{ navn }} />}
                            onChange={(land: string) => onChange({ bostedsland: land })}
                            defaultValue={bostedsland}
                        />
                    </Block>
                </>
            )}
        />
    );
};

export default FødselsnummerBolk;
