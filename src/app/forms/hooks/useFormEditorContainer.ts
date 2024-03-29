import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { formQuery } from "app/forms/queries/formQuery";
import { saveFormValidated, saveFormValidationFailed } from "app/forms/actions";

export const useFormEditorContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { formId } = router.query;
  const { data, error, loading } = useQuery(formQuery, {
    variables: { id: formId },
  });
  const form = data?.form;

  return {
    form,
    error,
    loading,
    onFinish: (values) => {
      dispatch(saveFormValidated({ form: { id: formId, ...values } }));
    },
    onFinishFailed: (values) => {
      dispatch(saveFormValidationFailed({ form: { id: formId, ...values } }));
    },
  };
};
