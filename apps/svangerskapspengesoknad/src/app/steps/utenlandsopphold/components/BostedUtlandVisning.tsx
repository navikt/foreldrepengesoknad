import { Block, bemUtils, formatDate } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';
import './bosted-utland-visning.css';
import { BodyShort, Button, Label } from '@navikt/ds-react';
import { PencilWritingIcon, TrashIcon } from '@navikt/aksel-icons';
import { BostedUtland } from 'app/types/BostedUtland';

interface Props {
    oppholdIUtlandet: BostedUtland;
    setSelectedOpphold: React.Dispatch<React.SetStateAction<BostedUtland | undefined>>;
    deleteOpphold: (arbeidIUtlandet: BostedUtland) => void;
}

const BostedUtlandVisning: FunctionComponent<Props> = ({ oppholdIUtlandet, setSelectedOpphold, deleteOpphold }) => {
    const intl = useIntl();
    const bem = bemUtils('bostedUtlandVisning');

    const handleOnClickRediger = (oppholdIUtlandet: BostedUtland) => {
        setSelectedOpphold(oppholdIUtlandet);
    };

    const handleOnClickSlett = (oppholdIUtlandet: BostedUtland) => {
        deleteOpphold(oppholdIUtlandet);
    };

    return (
        <div>
            <Block padBottom="l">
                <div className={bem.block}>
                    <Label className={bem.element('tittel')}>
                        {' '}
                        {getCountryName(oppholdIUtlandet.landkode, intl.locale)}
                    </Label>
                    <BodyShort className={bem.element('dato')}>
                        {formatDate(oppholdIUtlandet.fom)} - {formatDate(oppholdIUtlandet.tom)}
                    </BodyShort>
                    <Button
                        aria-label="rediger opphold i utlandet"
                        variant="secondary"
                        className={bem.element('rediger')}
                        icon={<PencilWritingIcon aria-hidden />}
                        onClick={() => handleOnClickRediger(oppholdIUtlandet)}
                    />
                    <Button
                        aria-label="slett opphold i utlandet"
                        variant="secondary"
                        className={bem.element('slett')}
                        icon={<TrashIcon aria-hidden />}
                        onClick={() => handleOnClickSlett(oppholdIUtlandet)}
                    />
                </div>
            </Block>
        </div>
    );
};

export default BostedUtlandVisning;
