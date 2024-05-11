export interface FieldValue {
  value: string;
  label: string;
  _id: string;
}

export interface Field {
  type: string;
  label: string;
  name: string;
  className: string;
  required: boolean;
  enabled: boolean;
  _id: string;
  values: FieldValue[];
}

export interface FormData {
  form_id: string;
  title: string;
  description: string;
  theme: string;
  fields: Field[];
  more_count: number;
  loop: boolean;
  limit: number | null;
  max_file_size: number | null;
  file_types: string[] | null;
}

export interface FieldPayloadType {
  parent_id: string;
  fields: Field[];
  file_included: boolean;
  other_config: {
    loop: boolean;
    limit: number | null;
    max_file_size: number | null;
    file_types: string[] | null;
  };
}
