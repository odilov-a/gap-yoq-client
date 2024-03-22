import { Spin, notification } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Feedback = ({
  showCreateModal,
  setSuccess,
  successed,
}: any): JSX.Element => {
  const { t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/feedbacks"
        method="post"
        name="feedbacks"
        fields={[
          {
            name: "name",
            type: "string",
            required: true,
          },
          {
            name: "question",
            type: "string",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          notification["success"]({
            message: "Успешно!",
            duration: 2,
          });
          query.invalidateQueries({ queryKey: ["feedbacks"] });
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
                name="name"
                type="text"
                placeholder="name"
                size="large"
              />
              <Field
                rootClassName="mb-[40px] w-[450px]"
                component={Fields.Input}
                name="question"
                type="text"
                placeholder="question"
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

export default Feedback;