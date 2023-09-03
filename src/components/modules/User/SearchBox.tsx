import { Button, Form, Input, InputNumber } from "antd";
import { resetPage } from "@store/slice/globalSlice";
import { useAppDispatch } from "@utils/hook";
import { ICustomSearchBox } from "@interface/tableCustomize";

const SearchBox = ({ searchData, labelName }: any) => {
  const [form] = Form.useForm()
  // console.log(labelName)
  
  const renderFields = () => {
    return labelName.map((field: ICustomSearchBox) => {
      let inputComponent;
  
      switch (field.inputType) {
        case "number":
          inputComponent = <InputNumber />;
          break;
        // Add more cases for different input types if needed
        default:
          inputComponent = <Input />;
          break;
      }
  
      return (
        <Form.Item
          label={field.label}
          name={field.name}
          rules={field?.rules ? field?.rules[0] : undefined}
          key={field.name}
        >
          {inputComponent}
        </Form.Item>
      );
    });
  };
  

  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    searchData(values);
    dispatch(resetPage());
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const resetTable = () => {
    return dispatch(resetPage());
  };
  return (
    <>
      <div className="searchBox">
        <Form
        form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="searchBox__field">
            {
              renderFields()
            }
          </div>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="btnHandle">
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
              <Button type="default" htmlType="reset" onClick={resetTable}>
                Đặt lại
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SearchBox;
