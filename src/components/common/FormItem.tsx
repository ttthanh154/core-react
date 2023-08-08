import { IFormItem } from "../../interface/form/FormItem";

const FormItem = (props: IFormItem) => {
    const {data} = props;
    return (
        <>
        Hello From FromItem: {data}
        </>
    )
}

export default FormItem