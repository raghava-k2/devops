import { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import RenderLayoutForm from "./RenderLayoutForm";
import { isInvalid, validations } from "./validationUtil";
import RenderFormArray from "./RenderFormArray";
import RenderSubForm from "./RenderSubForm";

export default function DataDrivenForm({ schema, onSubmit, data, onChange }) {
    const [form, setForm] = useState({});
    const [errors, setErros] = useState({});

    const setFormValues = (field) => {
        return ({ target: { value } }) => {
            setForm(prevState => {
                if (onChange) {
                    onChange(({ ...prevState, ...{ [field]: value } }));
                }
                return ({ ...prevState, ...{ [field]: value } });
            });
        }
    }

    const { fields, footer } = schema;

    const submitForm = () => {
        const errorsObj = validations(fields, form);
        if (isInvalid(errorsObj)) {
            setErros(errorsObj);
        } else {
            onSubmit(form);
        }
    }

    const resetForm = () => {
        setForm({});
        setErros({});
    }

    useEffect(() => {
        setForm(p => ({ ...p, ...(data || {}) }));
    }, [data]);

    return (
        <>
            {
                fields.map((field, index) => {
                    if (field.name === 'layout' && 'fields' in field) {
                        return <RenderLayoutForm field={field}
                            key={field.uniqueKey} index={index}
                            setFormValues={setFormValues} form={form}
                            errors={errors}
                        />;
                    } else if (field.component === 'FORM_ARRAY') {
                        return <RenderFormArray field={field}
                            key={field.uniqueKey}
                            setFormValues={setFormValues} form={form}
                            errors={errors}
                        />;
                    } else if (field.component === 'SUB_FORM') {
                        return <RenderSubForm field={field}
                            key={field.uniqueKey}
                            setFormValues={setFormValues} form={form}
                            errors={errors} />
                    }
                    else {
                        return null;
                    }
                })
            }
            <Footer footer={footer} onSubmitForm={submitForm}
                onResetForm={resetForm}></Footer>
        </>
    );
}

function Footer({ footer, onSubmitForm, onResetForm }) {
    const { submit, reset } = footer || {};
    const { label: submitButtonLabel, className: submitButtonClassName } = (submit || { label: 'Submit', className: '' });
    const { label: resetButtonLabel, className: resetButtonClassName } = (reset || { label: 'Reset', className: '' });
    return (
        <div className="p-grid p-justify-end cac-data-driven-footer">
            <div className="p-col-12 p-text-right">
                <Button label={resetButtonLabel} className={`${resetButtonClassName}`}
                    onClick={onResetForm} />
                <Button label={submitButtonLabel} className={`${submitButtonClassName}`}
                    onClick={onSubmitForm} />
            </div>
        </div>
    )
}
