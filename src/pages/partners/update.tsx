import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const Partner = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get } = useHooks();
  return (
    <div className="">
      <Container.Form
        className="w-[100%]"
        url={`/partners/${get(selectedCard, "_id")}`}
        method="put"
        name="partners"
        configs={{
          headers: { 'Content-Type': 'multipart/form-data' },
        }}
        fields={[
          {
            name: "title",
            type: "string",
            value: get(selectedCard, "title"),
            required: true,
          },
          {
            name: "image",
            type: "string",
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["partners"] });
          showEditModal(false)
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <Field
                component={Fields.Input}
                className="mb-3 w-full"
                name="title"
                type="text"
                placeholder="title"
                size="large"
              />
              <Field
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                className="mb-4"
                name="image"
              />
              <Button
                className="w-full border-0 h-auto py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
                htmlType="submit"
              >
                Saqlash
              </Button>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Partner;
