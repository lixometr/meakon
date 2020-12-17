<template>
  <div class="product-option">
    <!-- <div
      class="d-flex align-items-center cursor-pointer justify-content-between"
      @click="isOpen = !isOpen"
    >
      <span>{{ item.name || `Поле ${idx}` }}</span>
      <CButton color="danger" @click="remove">
        <CIcon name="cil-trash"></CIcon>
      </CButton>
    </div> -->
    <!-- <CCollapse class="pt-3" :show="isOpen"> -->
    <CRow alignVertical="center">
      <CCol col="6">
        <AInput
          :isValid="$v.item.name.$error ? false : undefined"
          label="Название поля"
          v-model="item.name"
          @input="emitData"
        />
      </CCol>
      <CCol col="6">
        <v-select
          :class="{ 'vue-select-error': $v.item.type.$error }"
          placeholder="Выберите тип поля"
          :multiple="false"
          v-model="item.type"
          :options="types"
          label="label"
          :reduce="(item) => item.key"
          :searchable="true"
          @input="changeType"
        />
      </CCol>
    </CRow>
    <CRow class="mb-4 border-bottom pb-3" alignVertical="center">
      <CCol col="6"
        ><AInput
          :isValid="$v.item.var_name.$error ? false : undefined"
          class="mt-3"
          label="Значение в коде"
          v-model="item.var_name"
          @input="onChangeVarName"
          description="Название поля должно быть уникальным, генерируется автоматически с
        учетом названия поля (только латинские буквы, цифры и нижние подчеркивания)"
      /></CCol>
      <CCol col="6">
        <Label label="Обязательное?" class="mt-3">
          <CInputCheckbox
            custom
            :checked.sync="item.required"
            @update:checked="emitData"
          />
        </Label>
      </CCol>
      <CCol col="12">
        <CRow class="d-flex align-items-center">
          <CCol col="2" class="text-right"><span> Комментарий</span></CCol>
          <CCol col="10" class="pl-2"
            ><CInput
              class="mt-3 w-100 flex-1"
              :canFull="true"
              v-model="item.comment"
              @input="emitData"
            />
          </CCol>
        </CRow>
      </CCol>
    </CRow>
    <PageTemplateFieldChooser
      v-model="item"
      @input="emitData"
      :type="item.type"
      :key="item.type"
      ref="cType"
    />
    <!-- </CCollapse> -->
  </div>
</template>

<script>
import _ from "lodash";
import PageTemplateFieldChooser from "./PageTemplateFieldChooser";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { required } from "vuelidate/lib/validators";
export default {
  props: {
    value: Object,
    idx: Number,
  },
  validations: {
    item: {
      name: {
        required,
      },
      var_name: {
        required,
      },
      type: {
        required,
      },
    },
  },
  data() {
    return {
      isOpen: false,
      item: _.cloneDeep(this.value),
      hasVarName: !!this.value.var_name,
    };
  },

  components: {
    PageTemplateFieldChooser,
  },
  computed: {
    types() {
      return [
        {
          label: "Текст",
          key: "text",
        },
        {
          label: "Область текста",
          key: "textArea",
        },
        {
          label: "Диапазон",
          key: "range",
        },
        {
          label: "Изображение",
          key: "image",
        },
        {
          label: "Файл",
          key: "file",
        },
        {
          label: "Галлерея",
          key: "gallery",
        },
        {
          label: "Выбор (Select)",
          key: "select",
        },
        {
          label: "Флажок (CheckBox)",
          key: "checkbox",
        },
        {
          label: "Переключатель (Radio)",
          key: "radio",
        },
        {
          label: "Да/нет",
          key: "switcher",
        },
        {
          label: "Аккардеон",
          key: "accordion",
        },
        {
          label: "Таб",
          key: "tab",
        },
        {
          label: "Блок",
          key: "block",
        },
        {
          label: "Повторитель",
          key: "repeater",
        },
      ];
    },
  },
  created() {
    if (!this.item.settings) this.$set(this.item, "settings", {});
  },
  methods: {
    validate() {
      this.$v.$touch();
      const cTypeValid = this.$refs.cType.validate();
      return (
        !this.$v.item.name.$error &&
        !this.$v.item.var_name.$error &&
        !this.$v.item.type.$error &&
        cTypeValid
      );
    },
    onChangeVarName() {
      this.hasVarName = true;
      this.emitData();
    },
    changeType() {
      // if(this.dat)
      this.$set(this.item, "settings", {});
      this.emitData();
    },
    emitData() {
      this.$emit("input", this.item);
    },

    remove() {
      this.$emit("delete");
    },
  },
  watch: {
    item: {
      deep: true,
      handler() {
        if (this.hasVarName) return;
        const name = this.item.name || "";
        let sValue = cyrillicToTranslit().transform(name.toLowerCase(), "_");
        sValue = sValue.replace(/\/-\./g, "_");
        this.$set(this.item, "var_name", sValue);
        // this.emitData()
      },
    },
    value: {
      deep: true,
      handler() {
        this.item = _.cloneDeep(this.value);
      },
    },
  },
};
</script>

<style>
</style>