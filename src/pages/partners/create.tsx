import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Partner = ({
  showCreateModal,
  setSuccess,
  successed,
}: any): JSX.Element => {
  const { t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/partners"
        method="post"
        name="partners"
        configs={{
          headers: { 'Content-Type': 'multipart/form-data' },
        }}
        fields={[
          {
            name: "title",
            type: "string",
            required: true,
          },
          {
            name: "image",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["partners"] });
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
                rootClassName="mb-[10px] w-[450px]"
                component={Fields.Input}
                name="title"
                type="text"
                placeholder={t("title")}
                size="large"
              />
              <Field
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                rootClassName="mb-[40px]"
                name="image"
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

export default Partner;
