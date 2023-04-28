import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { connect as formConnect, FieldArray } from 'formik';
import get from 'lodash/get';

import { FormikProps } from 'app/types/Formik';
import Block from 'common/components/block/Block';
import JaNeiSpørsmål from 'app/formik/wrappers/JaNeiSpørsmål';
import getMessage from 'common/util/i18nUtils';
import List from 'common/components/list/List';
import { UferdigSøknad } from 'app/types/Søknad';
import BEMHelper from 'common/util/bem';

import { AnnenInntekt } from 'app/types/AnnenInntekt';
import { Næring } from 'app/types/SelvstendigNæringsdrivende';
import './arbeidSeksjon.less';
import { Button, Modal } from '@navikt/ds-react';

export interface ModalFormProps<T> {
    element?: T;
    endre: boolean;
    onAdd: (element: T) => void;
    onCancel: () => void;
}

export interface ModalSummaryProps<T> {
    element: T;
    onEdit: () => void;
    onDelete: () => void;
    editButtonAriaText?: string;
    deleteButtonAriaText?: string;
    //intl: InjectedIntl;
}

interface OwnProps<T> {
    name: string;
    listName: string;
    legend: string;
    labels?: {
        ja: string;
        nei: string;
    };
    buttonLabel: string;
    infoboksTekst?: string | React.ReactNode;
    summaryListTitle?: {
        title: string;
        info?: string;
    };
    summaryListElementComponent: FunctionComponent<ModalSummaryProps<T>>;
    renderForm: (props: ModalFormProps<T>) => React.ReactNode;
}

type OuterProps = OwnProps<any>;
type Props = OuterProps & FormikProps;

const cls = BEMHelper('arbeidSeksjon');

const Arbeidsforholdseksjon: FunctionComponent<Props> = (props: Props) => {
    const intl = useIntl();
    const { formik, name, listName, legend, labels, buttonLabel, summaryListTitle, infoboksTekst } = props;
    const visLeggTilKnapp = get(formik.values, name) === true;

    const elementer: any[] = get(formik.values, listName, []);

    const [currentIndex, selectIndex] = useState(get(elementer, 'length', 0));
    const [modalIsOpen, toggleModal] = useState(false);
    const [endre, toggleEndring] = useState(false);

    const openModalForAdding = () => {
        toggleEndring(false);
        toggleModal(true);
    };

    const openModalForEditing = (index: number) => () => {
        selectIndex(index);
        toggleEndring(true);
        toggleModal(true);
    };

    return (
        <>
            <Block margin="none">
                <JaNeiSpørsmål name={name} legend={legend} labels={labels} description={infoboksTekst} />
            </Block>

            <FieldArray
                name={listName}
                render={({ push, replace, remove }) => {
                    return (
                        <div className={cls.block}>
                            <Block
                                margin="none"
                                marginTop={summaryListTitle ? 's' : undefined}
                                visible={elementer.length > 0 && visLeggTilKnapp}
                                header={summaryListTitle}
                            >
                                <List
                                    data={elementer}
                                    renderElement={(element, index: number) => {
                                        return (
                                            <props.summaryListElementComponent
                                                key={`${listName}-${index}`}
                                                element={element}
                                                onEdit={openModalForEditing(index)}
                                                onDelete={() => {
                                                    remove(index);
                                                }}
                                            />
                                        );
                                    }}
                                />
                            </Block>
                            <Block visible={visLeggTilKnapp} marginTop="s" margin="none">
                                <Button
                                    variant="secondary"
                                    className={cls.element('leggTil')}
                                    onClick={openModalForAdding}
                                    type="button"
                                >
                                    {buttonLabel}
                                </Button>
                            </Block>

                            <Modal
                                closeButton={true}
                                open={modalIsOpen}
                                shouldCloseOnOverlayClick={false}
                                aria-label={getMessage(intl, `utenlandsopphold.modal.ariaLabel`)}
                                onClose={() => toggleModal(false)}
                            >
                                <Modal.Content>
                                    {props.renderForm({
                                        endre,
                                        element: endre ? elementer[currentIndex] : undefined,
                                        onCancel: () => toggleModal(false),
                                        onAdd: (arbeidsforhold: Næring | AnnenInntekt) => {
                                            endre ? replace(currentIndex, arbeidsforhold) : push(arbeidsforhold);
                                            toggleModal(false);
                                        },
                                    })}
                                </Modal.Content>
                            </Modal>
                        </div>
                    );
                }}
            />
        </>
    );
};

export default formConnect<OuterProps, UferdigSøknad>(Arbeidsforholdseksjon);
