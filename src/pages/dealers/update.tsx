import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const Dealer = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get } = useHooks();
  return (
    <div className="">
      <Container.Form
        className="w-[100%]"
        url={`/dealers/${get(selectedCard, "_id")}`}
        method="put"
        name="dealers"
        fields={[
          {
            name: "name",
            type: "string",
            value: get(selectedCard, "name"),
            required: true,
          },
          {
            name: "number",
            type: "string",
            value: get(selectedCard, "number"),
            required: true,
          },
          {
            name: "address",
            type: "string",
            value: get(selectedCard, "address"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["dealers"] });
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
                className="mb-3 w-[100%]"
                name="name"
                type="text"
                placeholder="name"
                size="large"
              />
              <Field
                className="mb-3 w-[100%]"
                component={Fields.Input}
                name="address"
                type="text"
                placeholder="address"
                size="large"
              />
              <Field
                className="mb-3 w-[100%]"
                component={Fields.Input}
                name="number"
                type="text"
                placeholder="number"
                size="large"
              />
              <Button
                className="w-full h-auto border-0 py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
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

export default Dealer;
