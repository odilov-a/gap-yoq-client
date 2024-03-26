import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Dealer = ({
  showCreateModal,
  setSuccess,
  successed,
}: any): JSX.Element => {
  const { t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/dealers"
        method="post"
        name="dealers"
        fields={[
          {
            name: "name",
            type: "string",
            required: true,
          },
          {
            name: "address",
            type: "string",
            required: true,
          },
          {
            name: "number",
            type: "string",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["dealers"] });
          setSuccess((prev: any) => !prev);
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <Field
                rootClassName="mb-[40px] w-[450px]"
                component={Fields.Input}
                name="name"
                type="text"
                placeholder={t("name")}
                size="large"
              />
              <Field
                rootClassName="mb-[40px] w-[450px]"
                component={Fields.Input}
                name="address"
                type="text"
                placeholder={t("address")}
                size="large"
              />
              <Field
                rootClassName="mb-[40px] w-[450px]"
                component={Fields.Input}
                name="number"
                type="text"
                placeholder={t("number")}
                size="large"
              />
              <Button
                title="Saqlash"
                className="w-full mt-[20px]"
                htmlType="submit"
                size="large"
              />
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Dealer;
