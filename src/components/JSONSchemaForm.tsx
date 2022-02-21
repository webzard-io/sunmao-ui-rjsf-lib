import React, { useEffect, useState } from "react";
import { implementRuntimeComponent } from "@sunmao-ui/runtime";
import { Type } from "@sinclair/typebox";
import { css } from "@emotion/css";
import Form from "@rjsf/chakra-ui";
import { Box, Button } from "@chakra-ui/react";
import { FALLBACK_METADATA } from "../sunmao-helper";

const StateSchema = Type.Object({
  value: Type.Any(),
});

const PropsSchema = Type.Object({
  schema: Type.Any({
    title: "JSON Schema",
    widget: "expression",
    category: "Basic",
  }),
  uiSchema: Type.Any({
    title: "UI Schema",
    widget: "expression",
    category: "Basic",
  }),
  defaultFormData: Type.Any({
    title: "Default Form Data",
    widget: "expression",
    category: "Basic",
  }),
  submitText: Type.String({
    title: "Submit Text",
    category: "Display",
  }),
  submitting: Type.Boolean({
    title: "Submitting",
    category: "Display",
  }),
  omitExtraData: Type.Boolean({
    title: "Omit Extra Data",
    default: false,
    category: "Advance",
  }),
});

export default implementRuntimeComponent({
  version: "rjsf/v1",
  metadata: {
    ...FALLBACK_METADATA,
    name: "json_schema_form",
    displayName: "JSON schema form",
    description: "Define a form with JSON schema",
    exampleProperties: {
      schema: {
        title: "A registration form",
        description: "A simple form example.",
        type: "object",
        required: ["firstName", "lastName"],
        properties: {
          firstName: {
            type: "string",
            title: "First name",
            default: "Chuck",
          },
          lastName: {
            type: "string",
            title: "Last name",
          },
          telephone: {
            type: "string",
            title: "Telephone",
            minLength: 10,
          },
        },
      },
      uiSchema: {
        firstName: {
          "ui:autofocus": true,
          "ui:emptyValue": "",
          "ui:autocomplete": "family-name",
        },
        lastName: {
          "ui:emptyValue": "",
          "ui:autocomplete": "given-name",
        },
        age: {
          "ui:widget": "updown",
          "ui:title": "Age of person",
          "ui:description": "(earthian year)",
        },
        bio: {
          "ui:widget": "textarea",
        },
        password: {
          "ui:widget": "password",
          "ui:help": "Hint: Make it strong!",
        },
        date: {
          "ui:widget": "alt-datetime",
        },
        telephone: {
          "ui:options": {
            inputType: "tel",
          },
        },
      },
    },
  },
  spec: {
    properties: PropsSchema,
    state: StateSchema,
    methods: {},
    slots: [],
    styleSlots: ["content"],
    events: ["onSubmit"],
  },
})((props) => {
  const {
    schema,
    uiSchema,
    customStyle,
    mergeState,
    callbackMap,
    elementRef,
    omitExtraData,
    defaultFormData,
    submitText = "Submit",
    submitting,
  } = props;
  const [formData, setFormData] = useState(defaultFormData);
  useEffect(() => {
    mergeState({
      value: formData,
    });
  }, [formData]);

  return (
    <div ref={elementRef}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        className={css(customStyle?.content)}
        onSubmit={() => {
          callbackMap?.onSubmit();
        }}
        formData={formData}
        onChange={(e) => setFormData(e.formData)}
        omitExtraData={omitExtraData}
      >
        <Box marginTop={3}>
          <Button type="submit" variant="solid" isLoading={submitting}>
            {submitText}
          </Button>
        </Box>
      </Form>
    </div>
  );
});
