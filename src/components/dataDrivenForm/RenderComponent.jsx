import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from 'primereact/inputswitch';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import lodash from 'lodash';
import { Calendar } from "primereact/calendar";

export default function RenderComponent({ field, setFormValues, form, isInvalid }) {

    const customOnchange = (field) => {
        return (e) => {
            const { name } = field;
            setFormValues(name)(e);
            if (field.onChange) {
                field.onChange(field, e);
            }
        }
    }

    switch (field.component) {
        case 'InputText':
            return (<span className="p-float-label">
                <InputText type={field.type} value={form[field.name] || ''}
                    onChange={customOnchange(field)}
                    className={`${isInvalid() ? 'p-invalid' : ''}`}
                    disabled={field.disabled} />
                <label htmlFor={field.label}>{field.label}</label></span>
            );
        case 'Chips':
            return <Chips value={form[field.name] || []} onChange={customOnchange(field)}
                className={`${isInvalid() ? 'p-invalid' : ''}`} placeholder={field.label}></Chips>;
        case 'InputSwitch':
            return (
                <>
                    <h6 className={field.labelClassName}>{field.label}</h6>
                    <InputSwitch name={field.name} checked={form[field.name] || false}
                        onChange={customOnchange(field)} />
                </>
            );
        case 'ToggleButton':
            return (
                <>
                    <h6>{field.label}</h6>
                    <ToggleButton onLabel={field.onLabel} offLabel={field.offLabel}
                        onIcon={field.onIcon} offIcon={field.offIcon}
                        checked={form[field.name] || false}
                        onChange={customOnchange(field)} />
                </>
            );
        case 'Dropdown':
            const dropDownProps = lodash.omit(field, ['validators', 'uniqueKey', 'onChange']);
            return <Dropdown value={form[field.name] || ''}
                onChange={customOnchange(field)}
                {...dropDownProps} />;
        case 'MultiSelect':
            const multipSelectDropDownProps = lodash.omit(field, ['validators', 'uniqueKey', 'onChange']);
            return <MultiSelect value={form[field.name] || ''}
                onChange={customOnchange(field)}
                {...multipSelectDropDownProps} />;
        case 'Calendar':
            const calendarProps = lodash.omit(field, ['validators', 'uniqueKey', 'onChange']);
            return (<>
                <Calendar value={form[field.name] || ''}
                    onChange={customOnchange(field)} {...calendarProps} />
            </>);
        default:
            return null;
    }
}