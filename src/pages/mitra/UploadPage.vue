<template>
  <div class="bg-white q-pa-md">
    <div class="bagianpertama mt-16">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="storefront" size="20px " />
        <h2
          class="text-black font-open-sans"
          style="font-size: 18px; justify-content: left"
        >
          Service Types
        </h2>
      </div>
      <div class="q-gutter-y-md column">
        <q-select
          outlined
          label-color="green"
          v-model="typeService"
          :options="typeServiceOptions"
          label="Label"
        >
        </q-select>
      </div>
    </div>
    <div class="bagianpertama mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="shopping_cart" size="20px " />
        <h2
          class="text-black font-open-sans"
          style="font-size: 18px; justify-content: left"
        >
          Types of Goods
        </h2>
      </div>
      <div class="q-gutter-y-md column">
        <q-select
          outlined
          label-color="green"
          v-model="typegoods"
          :options="typeOptions"
          label="Label"
        >
        </q-select>
      </div>
    </div>

    <div class="bagiankedua mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="shopping_cart_checkout" size="20px" />
        <h2
          class="text-black font-open-sans"
          style="font-size: 18px; justify-content: left"
        >
          Name of Goods
        </h2>
      </div>
      <div class="q-gutter-y-md column">
        <q-card>
          <q-input
            standout="bg-teal text-white"
            v-model="namegoods"
            bg-color="white"
            label="Name"
            :dense="dense"
          />
        </q-card>
      </div>
    </div>

    <div class="bagianketiga mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="payments" size="20px" />
        <h2
          class="text-black font-open-sans"
          style="font-size: 18px; justify-content: left"
        >
          Price
        </h2>
      </div>
      <div class="q-gutter-y-md column">
        <q-card>
          <q-input
            standout="bg-teal 
            text-white"
            v-model="payments"
            bg-color="white"
            label="Price"
            :dense="dense"
          />
        </q-card>
      </div>
    </div>

    <div class="bagiankeempat mt-6">
      <div class="flex items-center px-1 gap-2">
        <q-icon color="green" name="edit_note" size="20px" />
        <h2
          class="text-black font-open-sans"
          style="font-size: 18px; justify-content: left"
        >
          Description
        </h2>
      </div>
      <div class="q-gutter-y-md column">
        <q-card>
          <q-input
            type="textarea"
            standout="bg-teal text-white"
            bg-color="white"
            v-model="deskripsi"
            label="Description"
            :dense="dense"
          />
        </q-card>
      </div>

      <div class="mt-6">
        <div class="flex items-center px-1 gap-2">
          <q-icon color="green" name="folder" size="20px" />
          <h2
            class="text-black font-open-sans"
            style="font-size: 18px; justify-content: left"
          >
            Upload Image
          </h2>
        </div>
        <div class="q-gutter-y-md" style="max-width: 300px">
          <q-card>
            <q-file
              filled
              v-model="img"
              label="Click To Upload"
              :placeholder="img"
              bg-color="white"
              max-files="1"
              @update:model-value="handleUpload()"
              type="file"
            >
            </q-file>
          </q-card>

          <q-img :src="imgURL" />
        </div>
      </div>

      <!-- <div class="q-gutter-md" style="max-width: 300px">
            <q-card>
              <q-file filled v-model="file" label="Click To Upload" max-files="1">
                <template v-slot:before>
                  <q-icon name="folder_open" />
                </template>
              </q-file>
            </q-card>
          </div> -->

      <div class="q-gutter-sm mx-auto mt-6 w-fit">
        <q-btn
          unelevated
          rounded
          color="green"
          label="SEND"
          @click="sendData()"
        />
        <q-btn
          outline
          rounded
          color="green"
          label="BACK"
          @click="navigate.back()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import api from 'src/AxiosInterceptors';
console.log(document.cookie);
export default {
  setup() {
    const imgURL = ref('');
    const img = ref(null);
    const handleUpload = () => {
      console.log('handleUpload is triggered');
      if (img.value) {
        imgURL.value = URL.createObjectURL(img.value);
      }
    };
    // const sendData = () => {
    //   // Prepare data object
    //   const data = {
    //     type: this.model,
    //     name: this.namegoods,
    //     price: this.payments,
    //     description: this.deskripsi,
    //     file: this.file,
    //   }

    //   // Send data to the server using axios (replace the URL with your actual API endpoint)
    //   axios
    //     .post('http://localhost:8080/productReq', data)
    //     .then((response) => {
    //       console.log('Data sent successfully:', response.data)
    //       // Reset form fields if needed
    //       this.model = null
    //       this.namegoods = ''
    //       this.payments = ''
    //       this.deskripsi = ''
    //       this.file = ''
    //     })
    //     .catch((error) => {
    //       console.error('Error sending data:', error)
    //     })
    // }
    return {
      model: ref(null),
      deskripsi: ref(''),
      payments: ref(''),
      namegoods: ref(''),
      imgURL,
      img,
      handleUpload,
      navigate: useRouter(),
      filihan: [],
      options: ['Food', 'Drink', 'Laundry', 'Cleaning Tool'],
    };
  },
  data() {
    return {
      typeService: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tesz: [] as { id: any }[],
      typeServiceOptions: [
        { value: 1, label: 'Mini Market' },
        { value: 2, label: 'Food Beverage' },
      ],
      typegoods: null,
      typeOptions: [
        { value: 1, label: 'Drink' },
        { value: 2, label: 'Food' },
        { value: 3, label: 'Cleaning Tool' },
        { value: 4, label: 'Medicine' },
        // Add more options as needed
      ],
      selectedService: ref(''),
    };
  },
  mounted() {
    this.tesst();
  },
  methods: {
    handleService(id: string) {
      this.selectedService = id;
    },
    tes() {
      console.log(this.model);
    },

    async tesst() {
      try {
        const resp = await api.get('/productReq/status/PENDING', {
          withCredentials: true,
        });

        this.tesz = resp.data.data;
        console.log(this.tesz);
      } catch (error) {
        console.error(error);
      }
    },
    sendData() {
      const formData = new FormData();
      formData.append('title', this.namegoods);
      formData.append('serviceTypeId', this.typeService.value);
      formData.append('typeId', this.typegoods.value);
      formData.append('desc', this.deskripsi);
      formData.append('price', this.payments);
      formData.append('picture', this.img);
      api
        .post('/productReq/create', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // console.log('Data sent successfully:', response.data)
          this.$router.push('/mitra/minimarket');
          // Reset form fields if needed
          this.model = null;
          this.namegoods = '';
          this.payments = '';
          this.deskripsi = '';
          this.imgURL = '';
        })
        .catch((error) => {
          console.error('Error sending data:', error);
        });
    },
  },
};
</script>
