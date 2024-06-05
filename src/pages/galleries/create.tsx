import { Spin, Select } from "antd";
import { Field, FieldProps  } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Gallery = ({ showCreateModal, createModal, system }: any): JSX.Element => {
  const { t, get } = useHooks();
  const { Option } = Select;
  const changePattern = (value: any, setFieldValue: any) => {
    setFieldValue("type", value);
    console.log("Pattern changed to:", value);
  };
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `galleries/${get(data, "_id")}` : "galleries"}
        method={data._id ? "put" : "post"}
        name="galleries"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "type",
            required: true,
            value: get(data, "types"),
          },
          {
            name: "image",
            required: true,
            value: get(data, "image[0].small"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["galleries"] });
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
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                label={t("Rasmni yuklang") + " (png, jpg, jpeg)"}
                rootClassName="mb-[10px]"
                name="image"
                accept="image/png, image/jpeg, image/jpg"
              />
              <Field name="type">
                {({ field, form }: FieldProps) => (
                  <Select
                    className="w-full"
                    defaultValue={get(system, "animal")}
                    size={"large"}
                    onChange={(value: any) => {
                      form.setFieldValue(field.name, value);
                      changePattern(value, form.setFieldValue);
                    }}
                  >
                    <Option value={"animal"}>{t("animal")}</Option>
                    <Option value={"oil"}>{t("oil")}</Option>
                    <Option value={"cotton"}>{t("cotton")}</Option>
                    <Option value={"village"}>{t("village")}</Option>
                    <Option value={"spinning"}>{t("spinning")}</Option>
                    <Option value={"weaving"}>{t("weaving")}</Option>
                    <Option value={"paint"}>{t("paint")}</Option>
                    <Option value={"sewing"}>{t("sewing")}</Option>
                  </Select>
                )}
              </Field>
              <Button
                title={t("Saqlash")}
                className="w-full mt-[10px]"
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

export default Gallery;