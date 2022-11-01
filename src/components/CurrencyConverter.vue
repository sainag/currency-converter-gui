<script setup>
import { ref, reactive, onMounted } from "vue";
import Multiselect from "@vueform/multiselect";
import { fetchWrapper } from "@/helpers";
import { useUsersStore, useAlertStore } from "@/stores";
import { Alert } from "@/components";

const source = "USD";
const availableCurrencies = ref([]);
const isLoading = ref(false);
const currency = reactive({
  selected: [],
  converted: {},
});

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
});

const convertCurrencies = async () => {
  if (currency.selected.length > 0) {
    isLoading.value = true;
    const response = await fetchWrapper.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/currency/convert?source=${source}&currencies=${currency.selected.join(
        ","
      )}`
    );
    let data = await response;
    currency.converted = currency.selected.map((item) => {
      let country = availableCurrencies.value.filter(
        (element) => element.value == item
      );
      return { country: country[0].label, rate: data.quotes[source + item] };
    });
    isLoading.value = false;
  } else {
    const alertStore = useAlertStore();
    alertStore.error("Select currencies to convert");
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div
        class="col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-6 offset-sm-3 col-xs-12 mt-4"
      >
        <Alert />
        <Multiselect
          data-cy="select-field"
          v-model="currency.selected"
          mode="tags"
          placeholder="Select currencies"
          :close-on-select="false"
          :searchable="true"
          :create-option="false"
          :min-chars="1"
          :max="5"
          :options="availableCurrencies"
        />
      </div>
      <div
        class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-6 offset-sm-3 col-xs-12 mt-3"
      >
        <button
          class="btn btn-primary"
          :disabled="isLoading"
          @click="convertCurrencies"
        >
          <span
            v-show="isLoading"
            class="spinner-border spinner-border-sm mr-1"
          ></span>
          Convert
        </button>
      </div>
    </div>
    <div class="row mt-5">
      <div
        class="col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-6 offset-sm-3 col-xs-12 mt-4"
        v-if="currency.converted.length > 0"
      >
        <table class="table table-borderd table-responsive">
          <thead>
            <tr class="bg-primary text-light">
              <th style="width: 50%">Country</th>
              <th style="width: 50%">Amount (1 USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in currency.converted" :key="item">
              <td>{{ item.country }}</td>
              <td>
                <strong>{{ item.rate }}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
