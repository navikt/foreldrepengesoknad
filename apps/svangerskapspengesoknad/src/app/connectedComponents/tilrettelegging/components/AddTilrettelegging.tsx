import Block from 'common/components/block/Block';
import InputField from 'app/formik/wrappers/InputField';
import DatoInput from 'app/formik/wrappers/DatoInput';
import { Avgrensninger } from 'common/types';
import BEMHelper from 'common/util/bem';
import SlettKnapp from 'common/components/slett-knapp/SlettKnapp';
import './addTilrettelegging.less';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface Props {
    showDeleteButton: boolean;
    datoInputName: string;
    datoLabel: string;
    prosentInputName?: string;
    prosentLabel?: string;
    datoAvgrensninger: Avgrensninger;
    delvisTilrettelegging: boolean;
    onDelete: () => void;
}

const AddTilrettelegging: React.FunctionComponent<Props> = ({
    onDelete,
    showDeleteButton,
    datoAvgrensninger,
    datoInputName,
    datoLabel,
    prosentInputName,
    prosentLabel,
    delvisTilrettelegging,
}) => {
    const intl = useIntl();
    const cls = BEMHelper('addTilrettelegging');

    return (
        <Block margin="xs">
            <div className={cls.block}>
                <div className={cls.element('datoWrapper')}>
                    <DatoInput name={datoInputName} label={datoLabel} datoAvgrensinger={datoAvgrensninger} />
                </div>
                {delvisTilrettelegging && (
                    <div className={cls.element('prosentWrapper')}>
                        <InputField
                            type="number"
                            max={100}
                            min={0}
                            step={0.01}
                            placeholder="0"
                            name={prosentInputName!}
                            label={prosentLabel!}
                        />
                    </div>
                )}
                <div className={cls.element('deleteWrapper')}>
                    {showDeleteButton && (
                        <SlettKnapp onClick={onDelete} ariaLabel={getMessage(intl, 'tilrettelegging.fjernPeriode')} />
                    )}
                </div>
            </div>
        </Block>
    );
};

export default AddTilrettelegging;
