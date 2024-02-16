import { PencilWritingIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { Block, bemUtils, formatDate } from '@navikt/fp-common';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidIUtlandetInput } from 'app/types/ArbeidIUtlandet';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import './arbeid-i-utlandet-visning.css';

interface Props {
    arbeidIUtlandet: ArbeidIUtlandetInput;
    setSelectedAnnenInntekt?: React.Dispatch<React.SetStateAction<ArbeidIUtlandetInput | undefined>>;
    deleteAnnenInntekt?: (arbeidIUtlandet: ArbeidIUtlandetInput) => void;
}

const getTilTekst = (arbeid: ArbeidIUtlandetInput): string => {
    return !arbeid.pågående && arbeid.tom ? formatDate(arbeid.tom) : 'Pågående';
};

const ArbeidIUtlandetVisning: FunctionComponent<Props> = ({
    arbeidIUtlandet,
    setSelectedAnnenInntekt,
    deleteAnnenInntekt,
}) => {
    const intl = useIntl();
    const bem = bemUtils('arbeidIUtlandetVisning');

    return (
        <div>
            <Block padBottom="l">
                <div className={bem.block}>
                    <BodyShort className={bem.element('tittel')}>{arbeidIUtlandet.arbeidsgiverNavn}</BodyShort>

                    <BodyShort className={bem.element('land')}>
                        {getCountryName(arbeidIUtlandet.land, intl.locale)}
                    </BodyShort>

                    <BodyShort className={bem.element('dato')}>
                        {formatDate(arbeidIUtlandet.fom)} - {getTilTekst(arbeidIUtlandet)}
                    </BodyShort>
                    {setSelectedAnnenInntekt && (
                        <Button
                            aria-label="rediger informasjon om arbeid i utlandet"
                            variant="secondary"
                            className={bem.element('rediger')}
                            icon={<PencilWritingIcon aria-hidden />}
                            onClick={() => setSelectedAnnenInntekt(arbeidIUtlandet)}
                        />
                    )}
                    {deleteAnnenInntekt && (
                        <Button
                            aria-label="slett informasjon om arbeid i utlandet"
                            variant="secondary"
                            className={bem.element('slett')}
                            icon={<TrashIcon aria-hidden />}
                            onClick={() => deleteAnnenInntekt(arbeidIUtlandet)}
                        />
                    )}
                </div>
            </Block>
        </div>
    );
};

export default ArbeidIUtlandetVisning;
