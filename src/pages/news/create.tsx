import { Spin, notification } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const News = ({
  showCreateModal,
  setSuccess,
  successed,
}: any): JSX.Element => {
  const { t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/news"
        method="post"
        name="news"
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
            name: "hashtag",
            type: "string",
            required: true,
          },
          {
            name: "description",
            type: "string",
            required: true,
          },
          {
            name: "image",
            required: true,
          },
          {
            name: "image02",
          },
          {
            name: "image03",
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          notification["success"]({
            message: "Успешно!",
            duration: 2,
          });
          // query.invalidateQueries({ queryKey: ["news"] });
          setSuccess((prev: any) => !prev);
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          notification["error"]({
            message: error ? error : "Произошло ошибка!",
            duration: 2,
          });
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <Field
                rootClassName="mb-[40px] w-[450px]"
                component={Fields.Input}
                name="title"
                type="text"
                placeholder={t("News nomi")}
                size="large"
              />
              <Field
                rootClassName="mb-[40px] w-[450px]"
                component={Fields.Input}
                name="hashtag"
                type="text"
                placeholder={t("hashtag")}
                size="large"
              />
              <Field
                rootClassName="mb-[40px] w-[450px]"
                component={Fields.Input}
                name="description"
                type="text"
                placeholder={t("News haqida")}
                size="large"
              />
              <div className="flex justify-between">
                <Field
                  component={Fields.FileUpload}
                  setFieldValue={setFieldValue}
                  rootClassName="mb-[40px]"
                  name="image"
                />
                <Field
                  component={Fields.FileUpload}
                  setFieldValue={setFieldValue}
                  rootClassName="mb-[40px]"
                  name="image02"
                />
                <Field
                  component={Fields.FileUpload}
                  setFieldValue={setFieldValue}
                  rootClassName="mb-[40px]"
                  name="image03"
                />
              </div>
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

export default News;
