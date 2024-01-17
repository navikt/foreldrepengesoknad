import { Block, bemUtils, formatDate } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';
import './arbeid-i-utlandet-visning.css';
import { BodyShort, Button } from '@navikt/ds-react';
import { PencilWritingIcon, TrashIcon } from '@navikt/aksel-icons';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';

interface Props {
    arbeidIUtlandet: ArbeidIUtlandet;
    setSelectedAnnenInntekt?: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    deleteAnnenInntekt?: (arbeidIUtlandet: ArbeidIUtlandet) => void;
}

const getTilTekst = (arbeid: ArbeidIUtlandet): string => {
    return !arbeid.pågående && arbeid.tidsperiode.tom ? formatDate(arbeid.tidsperiode.tom) : 'Pågående';
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
                        {formatDate(arbeidIUtlandet.tidsperiode.fom)} - {getTilTekst(arbeidIUtlandet)}
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
