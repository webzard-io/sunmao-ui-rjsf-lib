// move to @sunmao-ui/runtime in the future?

import { ComponentMetadata } from "@sunmao-ui/core/lib/metadata";
import { TUnion, TLiteral, Type } from "@sinclair/typebox";

export type IntoStringUnion<T> = {
  [K in keyof T]: T[K] extends string ? TLiteral<T[K]> : never;
};

export function StringUnion<T extends string[]>(
  values: [...T]
): TUnion<IntoStringUnion<T>> {
  return Type.KeyOf(
    Type.Object(
      values.reduce((prev, cur) => {
        prev[cur] = Type.Boolean();
        return prev;
      }, {} as any)
    )
  ) as any;
}

export const FALLBACK_METADATA: ComponentMetadata = {
  name: "",
  description: "",
  displayName: "",
  isDraggable: true,
  isResizable: true,
  exampleProperties: {},
  exampleSize: [1, 1],
};
