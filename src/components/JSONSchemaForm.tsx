import React from "react";
import { implementRuntimeComponent } from "@sunmao-ui/runtime";
import { Type } from "@sinclair/typebox";
import { css } from "@emotion/css";
import Form from "@rjsf/bootstrap-4";
import { FALLBACK_METADATA } from "../sunmao-helper";
import "bootstrap/dist/css/bootstrap.min.css";

const StateSchema = Type.Object({
  value: Type.String(),
});

const PropsSchema = Type.Object({
  schema: Type.Any({
    // widget: "expression",
  }),
  uiSchema: Type.Any({
    // widget: "expression",
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
    exampleSize: [3, 6],
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
  const { schema, uiSchema, customStyle } = props;

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      className={css(customStyle?.content)}
    />
  );
});
