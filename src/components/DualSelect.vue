<template>
  <div class="dual-select">
    <div class="available-container">
      <div class="select-header">
        <span>
          {{ availableLabel }}
        </span>
      </div>

      <div class="select-area">
        <div>
          <input
            v-model="searchAvailableOption"
            placeholder="Search..."
            class="search-input"
          >
        </div>
        <VuePerfectScrollbar
          ref="mailListPS"
          :settings="scrollSettings"
          class="select-scroll-area"
        >
          <ul class="available-list">
            <li
              v-for="option in availableOptions"
              :key="`available-${option[trackBy]}`"
              class="cursor-pointer"
              @click="selectOption(option[trackBy])"
            >
              {{ option[label] }}
            </li>
          </ul>
        </VuePerfectScrollbar>
      </div>
      <div>
        <button
          :disabled="availableOptions.length <= 0"
          class="cursor-pointer select-all-btn btn"
          @click="selectAll"
        >
          Select All
        </button>
      </div>
    </div>

    <div class="selected-container">
      <div class="select-header">
        <span class="ml-2">{{ selectedLabel }}</span>
      </div>
      <div class="select-area">
        <VuePerfectScrollbar
          :settings="scrollSettings"
          class="selected-scroll-area"
        >
          <ul>
            <li
              v-for="option in selectedOptions"
              :key="`selected-${option[trackBy]}`"
              class="cursor-pointer"
              @click="deSelectOption(option[trackBy])"
            >
              {{ option[label] }}
            </li>
          </ul>
        </VuePerfectScrollbar>
      </div>
      <div>
        <button
          :disabled="selectedOptions.length <= 0"
          class="cursor-pointer deselect-all-btn btn"
          @click="deSelectAll"
        >
          Remove All
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import "@/assets/index.scss";

export default {
  name: "DualSelect",
  components: {
    VuePerfectScrollbar
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    trackBy: {
      type: String,
      default: "id"
    },
    label: {
      type: String,
      default: "name"
    },
    availableLabel: {
      type: String,
      default: "Available Items"
    },
    selectedLabel: {
      type: String,
      default: "Selected Items"
    },
  },
  data() {
    return {
      scrollSettings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.30
      },
      searchAvailableOption: "",
      availableOptions: [],
      selectedOptions: []
    };
  },
  watch: {
    options: function() {
      this.setInitialOptions();
    },
    searchAvailableOption: function(value) {
      this.availableOptions = this.options.filter(
        option => option[this.label].includes(value) && !this.selectedOptions.includes(option)
      );
    },
    selectedOptions() {
      this.$emit("input", this.selectedOptions);
    }
  },
  created() {
    this.setInitialOptions();
  },
  methods: {
    setInitialOptions() {
      this.availableOptions = [...this.options];
      this.selectedOptions = [];
      this.searchAvailableOption = "";
    },
    selectOption(trackBy) {
      this.selectedOptions = [
        ...this.selectedOptions,
        this.availableOptions.find(option => option[this.trackBy] === trackBy)
      ];
      this.availableOptions = this.availableOptions.filter(
        option => option[this.trackBy] !== trackBy
      );
    },
    deSelectOption(trackBy) {
      this.availableOptions = [
        ...this.availableOptions,
        this.selectedOptions.find(option => option[this.trackBy] === trackBy)
      ];
      this.selectedOptions = this.selectedOptions.filter(
        option => option[this.trackBy] !== trackBy
      );
    },
    selectOptions(options) {
      this.selectedOptions = [
        ...this.selectedOptions,
        ...this.availableOptions.filter(option => options.includes(option))
      ];
      this.availableOptions = this.availableOptions.filter(option => !options.includes(option));
    },
    deSelectOptions(options) {
      this.availableOptions = [
        ...this.availableOptions,
        ...this.selectedOptions.filter(option => options.includes(option))
      ];
      this.selectedOptions = this.selectedOptions.filter(option => !options.includes(option));
    },
    selectAll() {
      this.selectedOptions = [...this.options];
      this.availableOptions = [];
    },
    deSelectAll() {
      this.availableOptions = [...this.options];
      this.selectedOptions = [];
    }
  }
};
</script>
