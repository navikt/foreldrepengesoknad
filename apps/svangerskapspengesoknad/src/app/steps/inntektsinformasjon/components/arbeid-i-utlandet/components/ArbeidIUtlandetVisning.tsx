import { Block, bemUtils, formatDate } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';
import './arbeid-i-utlandet-visning.css';
import { BodyShort, Button, Label } from '@navikt/ds-react';
import { PencilWritingIcon, TrashIcon } from '@navikt/aksel-icons';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { InntektsinformasjonFormField } from '../../../inntektsinformasjonFormConfig';
import { convertBooleanOrUndefinedToYesOrNo } from '@navikt/fp-common/src/common/utils/formUtils';

interface Props {
    arbeidIUtlandet: ArbeidIUtlandet;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    deleteAnnenInntekt: (arbeidIUtlandet: ArbeidIUtlandet) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const getTilTekst = (arbeid: ArbeidIUtlandet): string => {
    return !arbeid.pågående && arbeid.tidsperiode.tom ? formatDate(arbeid.tidsperiode.tom) : 'Pågående';
};

const ArbeidIUtlandetVisning: FunctionComponent<Props> = ({
    arbeidIUtlandet,
    setSelectedAnnenInntekt,
    deleteAnnenInntekt,
    setFieldValue,
}) => {
    const intl = useIntl();
    const bem = bemUtils('arbeidIUtlandetVisning');

    const handleOnClickRediger = (arbeidIUtlandet: ArbeidIUtlandet) => {
        setSelectedAnnenInntekt(arbeidIUtlandet);
        setFieldValue(InntektsinformasjonFormField.arbeidIUtlandetLand, arbeidIUtlandet.land);
        setFieldValue(InntektsinformasjonFormField.arbeidIUtlandetNavnArbeidsgiver, arbeidIUtlandet.arbeidsgiverNavn);
        setFieldValue(InntektsinformasjonFormField.arbeidIUtlandetFom, arbeidIUtlandet.tidsperiode.fom);
        setFieldValue(InntektsinformasjonFormField.arbeidIUtlandetTom, arbeidIUtlandet.tidsperiode.tom);
        setFieldValue(
            InntektsinformasjonFormField.arbeidIUtlandetPågående,
            convertBooleanOrUndefinedToYesOrNo(arbeidIUtlandet.pågående)
        );
    };

    const handleOnClickSlett = (arbeidIUtlandet: ArbeidIUtlandet) => {
        deleteAnnenInntekt(arbeidIUtlandet);
    };

    return (
        <div>
            <Block padBottom="l">
                <div className={bem.block}>
                    <Label className={bem.element('tittel')}>{arbeidIUtlandet.arbeidsgiverNavn}</Label>

                    <BodyShort className={bem.element('land')}>
                        {getCountryName(arbeidIUtlandet.land, intl.locale)}
                    </BodyShort>

                    <BodyShort className={bem.element('dato')}>
                        {formatDate(arbeidIUtlandet.tidsperiode.fom)} - {getTilTekst(arbeidIUtlandet)}
                    </BodyShort>
                    <Button
                        aria-label="rediger informasjon om arbeid i utlandet"
                        variant="secondary"
                        className={bem.element('rediger')}
                        icon={<PencilWritingIcon aria-hidden />}
                        onClick={() => handleOnClickRediger(arbeidIUtlandet)}
                    />
                    <Button
                        aria-label="slett informasjon om arbeid i utlandet"
                        variant="secondary"
                        className={bem.element('slett')}
                        icon={<TrashIcon aria-hidden />}
                        onClick={() => handleOnClickSlett(arbeidIUtlandet)}
                    />
                </div>
            </Block>
        </div>
    );
};

export default ArbeidIUtlandetVisning;
