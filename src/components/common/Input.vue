<template>
  <b-form-group :id="group_id" :label="label" :label-for="id" :description="description">
    <b-form-input
      :id="id"
      :value="value"
      :type="type"
      required
      :state="state"
      :placeholder="placeholder"
      @input="$emit('change', {type: id, value: $event})"
    ></b-form-input>
    <b-form-invalid-feedback :state="state">{{invalid_message}}</b-form-invalid-feedback>
  </b-form-group>
</template>
<script>
export default {
  name: "Input",
  props: {
    group_id: "",
    label: "",
    id: "",
    value: "",
    type: "",
    state: false,
    placeholder: "",
    invalid_message: "",
    description: ""
  },
};
</script>