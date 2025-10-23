import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import { NewNote } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
}

const DisplayingErrorMessagesSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  content: Yup.string().max(500, "Too Long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required"),
});

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

const formValues: FormValues = {
  title: "",
  content: "",
  tag: "",
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const isId = useId();
  const queryClient = useQueryClient();

  const { mutate: addNote, isPending } = useMutation({
    mutationFn: (contentText: NewNote) => createNote(contentText),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      onClose();
    },
  });

  const handleSubmit = (
    value: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    addNote({ content: value.content, title: value.title, tag: value.tag });
    formikHelpers.resetForm();
  };
  return (
    <Formik
      initialValues={formValues}
      onSubmit={handleSubmit}
      validationSchema={DisplayingErrorMessagesSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${isId}-title`}>Title</label>
          <Field
            id={`${isId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="p" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${isId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${isId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="p" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${isId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${isId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="p" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            {isPending ? "Creating.." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
