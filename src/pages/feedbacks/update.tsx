// import { Fields } from "components";
// import { Field } from "formik";
// import { Container } from "modules";
// import { Button, Spin } from "antd";
// import { useHooks } from "hooks";

// const Feedback = ({ showEditModal, selectedCard }: any): JSX.Element => {
//   const { get } = useHooks();
//   return (
//     <div className="">
//       <Container.Form
//         className="w-[100%]"
//         url={`/feedbacks/${get(selectedCard, "_id")}`}
//         name="feedbacks"
//         method="put"
//         fields={[
//           {
//             name: "name",
//             type: "string",
//             value: get(selectedCard, "name"),
//             required: true,
//           },
//           {
//             name: "question",
//             type: "string",
//             value: get(selectedCard, "question"),
//             required: true,
//           },
//           {
//             name: "answer",
//             type: "string",
//             value: get(selectedCard, "answer"),
//             required: true,
//           },
//           {
//             name: "status",
//             value: get(selectedCard, "status"),
//             required: true,
//           },
//         ]}
//         onSuccess={(data, resetForm, query) => {
//           query.invalidateQueries({ queryKey: ["feedbacks"] });
//           showEditModal(false)
//         }}
//         onError={(error) => {
//           console.log("Error", error);
//         }}
//       >
//         {({ isSubmitting, setFieldValue }) => {
//           return (
//             <Spin spinning={isSubmitting} tip="Verifying">
//               <Field
//                 component={Fields.Input}
//                 className="mb-5 w-[100%]"
//                 name="name"
//                 type="text"
//                 placeholder="name"
//                 size="large"
//               />
//               <Field
//                 component={Fields.Input}
//                 className="mb-5 w-[100%]"
//                 name="question"
//                 type="text"
//                 placeholder="question"
//                 size="large"
//               />
//               <Field
//                 className="mb-5 w-[100%]"
//                 component={Fields.Input}
//                 name="answer"
//                 type="text"
//                 placeholder="answer"
//                 size="large"
//               />
//               <Button
//                 className="w-full border-0 h-auto py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
//                 htmlType="submit"
//               >
//                 Saqlash
//               </Button>
//             </Spin>
//           );
//         }}
//       </Container.Form>
//     </div>
//   );
// };

// export default Feedback;

import React from 'react';
import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin, Checkbox } from "antd"; // Import Checkbox from Ant Design
import { useHooks } from "hooks";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const Feedback = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get } = useHooks();
  // Function to handle checkbox change event
  const handleStatusChange = (e: CheckboxChangeEvent, setFieldValue: Function) => {
    const newValue = e.target.checked; // Get the checked status of the checkbox
    setFieldValue("status", newValue); // Update Formik's state with the new value
  };

  return (
    <div className="">
      <Container.Form
        className="w-[100%]"
        url={`/feedbacks/${get(selectedCard, "_id")}`}
        name="feedbacks"
        method="put"
        fields={[
          {
            name: "name",
            type: "string",
            value: get(selectedCard, "name"),
            required: true,
          },
          {
            name: "question",
            type: "string",
            value: get(selectedCard, "question"),
            required: true,
          },
          {
            name: "answer",
            type: "string",
            value: get(selectedCard, "answer"),
            required: true,
          },
          {
            name: "status",
            value: get(selectedCard, "status"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["feedbacks"] });
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
                name="name"
                type="text"
                placeholder="name"
                size="large"
              />
              <Field
                component={Fields.Input}
                className="mb-5 w-[100%]"
                name="question"
                type="text"
                placeholder="question"
                size="large"
              />
              <Field
                className="mb-5 w-[100%]"
                component={Fields.Input}
                name="answer"
                type="text"
                placeholder="answer"
                size="large"
              />
              {/* Add Checkbox component for status field */}
              <Checkbox
                onChange={(e: CheckboxChangeEvent) => handleStatusChange(e, setFieldValue)} // Pass the change event handler
                checked={get(selectedCard, "status")} // Set checked state based on the status value
                className="mt-4" // Add Tailwind CSS classes here
              >
                Status
              </Checkbox>
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

export default Feedback;
