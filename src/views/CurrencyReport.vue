<script setup>
import { storeToRefs } from "pinia";
import { ref, reactive, onMounted } from "vue";
import { useAuthStore, useUsersStore, useAlertStore } from "@/stores";
import Multiselect from "@vueform/multiselect";
import { fetchWrapper } from "@/helpers";
import { Alert } from "@/components";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const source = "USD";
const availableCurrencies = ref([]);
const isLoading = ref(false);
const reportsLoading = ref(false);
const currency = ref(null);
const range = ref(null);
const interval = ref(null);
const currencyHistoryReports = ref([]);
const rangeOptions = ref({
  "one-year": "Range: One Year, Interval: Monthly",
  "six-months": "Range: Six Months, Interval: Weekly",
  "one-month": "Range: One Month, Interval: Daily",
});
const rangeReportFetchInterval = ref(null);

onMounted(async () => {
  if (availableCurrencies.value.length == 0) {
    const response = await fetchWrapper.get(
      `${import.meta.env.VITE_API_URL}/api/currency`
    );
    const data = await response;
    availableCurrencies.value = data.currencies;
  }
  availableCurrencies.value = Object.keys(availableCurrencies.value).map(
    (item) => {
      return {
        value: item,
        label: item + " - " + availableCurrencies.value[item],
      };
    }
  );

  getReportsByUser();
});

const getReportsByUser = async () => {
  if (rangeReportFetchInterval.value != null) {
    clearInterval(rangeReportFetchInterval.value);
  }
  let isReportProcessing = false;
  if (user.value != null) {
    reportsLoading.value = true;
    const response = await fetchWrapper.get(
      `${import.meta.env.VITE_API_URL}/api/currency/${
        user.value.user.id
      }/report`
    );
    const data = await response;
    currencyHistoryReports.value = data.map((item) => {
      let country = availableCurrencies.value.filter(
        (element) => element.value.toLowerCase() == item.currency.toLowerCase()
      );
      if (item.status == "processing") {
        isReportProcessing = true;
      }
      return { country: country[0].label, ...item };
    });
    reportsLoading.value = false;
  }
  if (isReportProcessing && user.value != null) {
    rangeReportFetchInterval.value = setInterval(function () {
      getReportsByUser();
    }, 5000);
  }
};

const generateReport = async () => {
  const alertStore = useAlertStore();
  if (currency.value != null && range.value != null) {
    if (range.value == "one-year") {
      interval.value = "monthly";
    } else if (range.value == "six-months") {
      interval.value = "weekly";
    } else if (range.value == "one-month") {
      interval.value = "daily";
    }
    isLoading.value = true;
    const response = await fetchWrapper.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/currency/report?source=${source}&currency=${currency.value}&range=${
        range.value
      }&interval=${interval.value}`
    );
    let data = await response;
    alertStore.success(response.message);
    isLoading.value = false;
    getReportsByUser();
  } else {
    if (currency.value == null && range.value == null) {
      alertStore.error("Select currency and range to generate report");
    } else if (currency.value != null && range.value == null) {
      alertStore.error("Select range to generate report");
    } else if (currency.value == null && range.value != null) {
      alertStore.error("Select currency to generate report");
    }
  }
};
</script>

<template>
  <div v-if="user">
    <h1 class="text-center">Generate Currency Report</h1>
    <div class="row text-center">
      <div
        class="col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-6 offset-sm-3 col-xs-12"
      >
        <Alert />
      </div>
      <div
        class="col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-6 offset-sm-3 col-xs-12 mt-4"
      >
        <Multiselect
          data-cy="currency"
          v-model="currency"
          placeholder="Select currency"
          :close-on-select="true"
          :searchable="true"
          :min-chars="1"
          :max="1"
          :options="availableCurrencies"
        />
      </div>
      <div
        class="col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-6 offset-sm-3 col-xs-12 mt-4"
      >
        <Multiselect
          data-cy="range"
          v-model="range"
          placeholder="Select range"
          :close-on-select="true"
          :searchable="true"
          :min-chars="1"
          :max="1"
          :options="rangeOptions"
        />
      </div>
      <div
        class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-6 offset-sm-3 col-xs-12 mt-3"
      >
        <button
          class="btn btn-primary"
          :disabled="isLoading"
          @click="generateReport"
        >
          <span
            v-show="isLoading"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          Generate Report
        </button>
      </div>
    </div>
    <div class="row mt-5">
      <div
        class="col-lg-8 offset-lg-2 col-md-12 offset-md-0 col-sm-6 offset-sm-3 col-xs-12 mt-4"
      >
        <table class="table table-striped">
          <thead class="bg-info">
            <tr>
              <th style="width: 10%">Id</th>
              <th style="width: 30%">Currency ({{ source }})</th>
              <th style="width: 50%">Range</th>
              <th style="width: 10%">Status</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="currencyHistoryReports.length">
              <tr v-for="report in currencyHistoryReports" :key="report.id">
                <td>{{ report.id }}</td>
                <td>{{ report.country }}</td>
                <td>{{ rangeOptions[report.range] }}</td>
                <td>{{ report.status }}</td>
              </tr>
            </template>
            <tr v-if="reportsLoading">
              <td colspan="4" class="text-center">
                <span
                  class="spinner-border spinner-border-lg align-center"
                ></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
