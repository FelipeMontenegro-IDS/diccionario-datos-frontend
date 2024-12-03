import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { IDrawer } from '../interfaces/IDrawer';
import { DrawerComponent } from './Drawer.component';
import { IOpenDawer } from '../interfaces/IOpenDawer';
import { CompoundButton, Field, Input, Textarea } from '@fluentui/react-components';
import { CalendarMonthRegular } from "@fluentui/react-icons";
import { IAddDescripcionTable, IAddDescripcionTableRead, IAddDescripcionTableWrite } from '../interfaces/IAddDescripcionTable';
import { SaveDescriptionTable } from '../http-client/http.database';


const DrawerAgregarDescripcion = ({ isOpen, setIsOpen, object, reload }: IOpenDawer<IAddDescripcionTableRead>) => {

    const [formAddDescriptionTable, setFormAddDescriptionTable] = useState<IAddDescripcionTableRead>({
        column: "",
        dataType: "",
        description: "",
        maxLength: "",
        schema: "",
        table: ""
    });


    const submit = () => {

        const request: IAddDescripcionTableWrite = {
            column: formAddDescriptionTable.column,
            description: formAddDescriptionTable.description,
            schema: formAddDescriptionTable.schema,
            table: formAddDescriptionTable.table
        };

        SaveDescriptionTable(request)
            .then((response) => {
                console.log(response);
                reload();
                clear();
                setTimeout(() => {
                    setIsOpen(false);
                }, 2000)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const clear = () => {
        setFormAddDescriptionTable({
            column: "",
            dataType: "",
            description: "",
            maxLength: "",
            schema: "",
            table: ""
        });
        object = {
            column: "",
            dataType: "",
            description: "",
            maxLength: "",
            schema: "",
            table: ""
        }
    }

    useEffect(() => {
        if (isOpen) {
            setFormAddDescriptionTable({
                column: object?.column || "",
                dataType: object?.dataType || "",
                maxLength: object?.maxLength || "",
                description: object?.description || "",
                schema: object?.schema || "",
                table: object?.table || ""
            });
        }

    }, [isOpen])

    return (
        <DrawerComponent
            isOpen={isOpen}
            position="end"
            size="small"
            type="overlay"
            title="Agregar Descripción"
            appearance='subtle'
            TitleButtomCancel='Cancelar'
            TitleButtomPrimary='Agregar'
            setIsOpen={setIsOpen}
            onClickButtomPrimary={() => {
                submit();
            }}
            onClickButtomCancel={() => {
                setIsOpen(false);
            }}
        >
            <div className='row gap-2 mt-3'>
                <div className='col-md-12'>
                    <pre>{JSON.stringify(formAddDescriptionTable, null, 2)}</pre>
                </div>
                <div className="col-md-12">
                    <Field
                        label="Nombre"
                        validationState="none"
                        validationMessage=""
                    >
                        <Input value={object?.column ?? ""} readOnly disabled />
                    </Field>
                </div>
                <div className="col-md-12">
                    <Field
                        label="Tipo Dato"
                        validationState="none"
                        validationMessage=""
                    >
                        <Input value={object?.dataType ?? ""} readOnly disabled />
                    </Field>
                </div>
                <div className="col-md-12">
                    <Field
                        label="Maximum Length"
                        validationState="none"
                        validationMessage=""
                    >
                        <Input value={object?.maxLength ?? ""} readOnly disabled />
                    </Field>
                </div>
                <div className="col-md-12">
                    <Field
                        label="Descripción"
                        validationState="none"
                        validationMessage=""
                    >
                        <Textarea
                            value={formAddDescriptionTable.description}
                            onChange={(e, data) => {
                                setFormAddDescriptionTable({
                                    ...formAddDescriptionTable,
                                    description: data.value
                                })
                            }}
                            rows={4}
                        />
                    </Field>
                </div>
            </div>
        </DrawerComponent>
    );
}

export {
    DrawerAgregarDescripcion
};