import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const News = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get } = useHooks();
  return (
    <div className="">
      <Container.Form
        className="w-[100%]"
        url={`/news/${get(selectedCard, "_id")}`}
        name="news"
        method="put"
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
            name: "hashtag",
            type: "string",
            value: get(selectedCard, "hashtag"),
            required: true,
          },
          {
            name: "description",
            type: "string",
            value: get(selectedCard, "description"),
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
          query.invalidateQueries({ queryKey: ["news"] });
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
                className="mb-5 w-[100%]"
                name="title"
                type="text"
                placeholder="News nomi"
                size="large"
              />
              <Field
                component={Fields.Input}
                className="mb-5 w-[100%]"
                name="hashtag"
                type="text"
                placeholder="hashtag nomi"
                size="large"
              />
              <Field
                className="mb-5 w-[100%]"
                component={Fields.Input}
                name="description"
                type="text"
                placeholder="News haqida"
                size="large"
              />
              <div className="flex justify-between">
                <Field
                  component={Fields.FileUpload}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                  name="image"
                />
                <Field
                  component={Fields.FileUpload}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                  name="image02"
                />
                <Field
                  component={Fields.FileUpload}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                  name="image03"
                />
              </div>
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

export default News;