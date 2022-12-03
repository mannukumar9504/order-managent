import Form from 'react-bootstrap/Form';
import { useTranslation } from "react-i18next";

function SwitchAtom(props) {
    const { label, type, checked, onChange, error = '' } = props;
    const { t } = useTranslation();

    return (
        <Form>
            <Form.Check 
                type={type}
                id="custom-switch"
                label={label}
                checked={checked}
                onChange={onChange}
            />
            {error ? <p className="text-danger">{t(error)}</p> : ''}
        </Form>
    );
}

export default SwitchAtom;