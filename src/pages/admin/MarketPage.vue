<template>
  <div class="min-w-full p-3 min-h-full bg-white mt-10">
    <q-card class="p-3 rounded-xl shadow-md overflow-x-hidden">
      <!-- START OF TABLE -->
      <q-table
        class="my-table table-rounded"
        flat
        bordered
        title=""
        :rows="filteredData"
        :loading="loading"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:top-right>
          <div class="bg-gray-100 px-2 rounded-md">
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              input-class="placeholder-color text-black"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" class="text-black" />
              </template>
            </q-input>
          </div>
        </template>
        <!-- img -->
        <template v-slot:body-cell-image="props">
          <q-td :props="props">
            <q-img
              :src="props.row.picture"
              class="w-[75px] h-auto rounded-xl"
            />
          </q-td>
        </template>
        <!-- DETAIL ACTION -->
        <template v-slot:body-cell-detailaction="props">
          <q-td :props="props">
            {{ getService(props.row.typeId) }}
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <button :onClick="() => fetcdata(props.row.id)">
              lihat detail
            </button>
          </q-td>
        </template>
      </q-table>
      <q-pagination
        v-model="current"
        color="teal"
        :max="pagi.rowsNumber"
        :max-pages="5"
        :ellipses="false"
        @update:model-value="tes(current)"
        :boundary-numbers="false"
      />
      <!-- END OF TABLE -->
    </q-card>

    <!-- BUTTON ACTION -->
  </div>
</template>

<script lang="ts">
import api from 'src/AxiosInterceptors';
import { ref } from 'vue';

const rows = [
  {
    image: 'Ayam Taliwang.jpg',
    id: 111,
    name: 'Ayam Taliwang',
    price: 'Rp. 98.500',
    detail: 'Detail',
  },
  {
    image: 'Ayam Taliwang.jpg',
    id: 222,
    name: 'Ayam Taliwang',
    price: 'Rp. 98.500',
    detail: 'Detail',
  },
  {
    image: 'Ayam Taliwang.jpg',
    id: 333,
    name: 'Ayam Taliwang',
    price: 'Rp. 98.500',
    detail: 'Detail',
  },
  {
    image: 'Ayam Taliwang.jpg',
    id: 444,
    name: 'Ayam Taliwang',
    price: 'Rp. 98.500',
    detail: 'Detail',
  },
  {
    image: 'Ayam Taliwang.jpg',
    id: 555,
    name: 'Ayam Taliwang',
    price: 'Rp. 98.500',
    detail: 'Detail',
  },
  {
    image: 'Ayam Taliwang.jpg',
    id: 666,
    name: 'Ayam Taliwang',
    price: 'Rp. 98.500',
    detail: 'Detail',
  },
];
const detailOptions = [
  { id: 1, label: 'Medicine' },
  { id: 2, label: 'Food' },
  { id: 2, label: 'Drink' },
  { id: 2, label: 'Cleaning Tool' },
];

export default {
  setup() {
    const columns = [
      {
        name: 'image',
        label: 'Image',
        align: 'center',
        field: 'picture',
        sortable: false,
        style: 'width: 15px; border-radius: 10px 0 0 10px;',
      },
      { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
      {
        name: 'title',
        align: 'center',
        label: 'Name',
        field: 'title',
        sortable: true,
      },
      {
        name: 'price',
        label: 'Price',
        field: 'price',
        sortable: true,
        align: 'center',
        sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
      },

      {
        name: 'detailaction',
        label: 'Detail',
        align: 'center',
        field: 'typeId',
        style: 'width: 15px; border-radius: 0 10px 10px 0;',
      },

      {
        name: 'action',
        label: 'action',
        align: 'center',
        field: 'action',
        style: 'width: 15px; border-radius: 0 10px 10px 0;',
      },
    ];

    const pagination = ref({
      sortBy: 'id',
      descending: false,
      page: 1,
      rowsPerPage: 3,
    });

    const market = ref(
      [] as {
        id: never;
        picture: string;
        title: string;
        price: number;
        typeId: number;
        serviceTypeId: number;
        user: {
          name: string;
        };
      }[]
    );

    api
      .get('/productReq/status/ACCEPTED', { withCredentials: true })
      .then((response) => {
        market.value = response.data.data.filter(
          (item: { serviceTypeId: number }) => item.serviceTypeId === 1
        );
      });
    const loading = ref(true);
    return {
      columns,
      loading,
      pagination,
      // filteredRows,
      // filter,
      rows,
      market,
      pagn: {
        rowsPerPage: 10, // Set your desired number of rows per page
        page: 1, // Current page
        rowsNumber: 0, // Total number of rows (initialize with 0, it will be updated later)
      },
      current: ref(2),
      detailOptions,
    };
  },
  data() {
    return {
      pagi: {
        rowsPerPage: 10, // Set your desired number of rows per page
        page: 1, // Current page
        rowsNumber: 0, // Total number of rows (initialize with 0, it will be updated later)
      },
      typegoods: null,
      typeOptions: [
        { value: 1, label: 'Drink' },
        { value: 2, label: 'Food' },
        { value: 3, label: 'Cleaning Tool' },
        { value: 4, label: 'Medicine' },
        // Add more options as needed
      ],
      data: [] as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id: any;
        picture: string;
        title: string;
        price: number;
        typeId: number;
        serviceTypeId: number;
        user: {
          name: string;
        };
      }[],
      dataa: [] as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id: any;
        picture: string;
        title: string;
        price: number;
        typeId: number;
        serviceTypeId: number;
        user: {
          name: string;
        };
      }[],
      page: 1,
      filter: '',
    };
  },
  mounted() {
    this.getData();
    this.tes(this.current);
  },
  methods: {
    async tes(page: number | undefined) {
      try {
        const res = await api.get(`/services/1?page=${page}`, {
          withCredentials: true,
        });

        console.log(res);
        this.dataa = res.data.data.data;
        this.pagi.rowsNumber = res.data.data.meta.lastPage;
      } catch (error) {
        console.error(error);
      }
    },
    onPageChange(page: number | undefined) {
      this.tes(page);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async fetcdata(id: any) {
      try {
        const resp = await api.get(`/productReq/${id}`, {
          withCredentials: true,
        });

        console.log(resp.data.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getData() {
      try {
        const response = await api.get('/productReq/status/ACCEPTED', {
          withCredentials: true,
        });
        this.data = response.data.data.filter(
          (item: { serviceTypeId: number }) => item.serviceTypeId === 1
        );
        // console.log(response.data.data)
      } catch (error) {
        // console.error(error)
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getService(typeId: any) {
      const labels = {
        1: 'Drink',
        2: 'Food',
        3: 'Cleaning Tool',
        4: 'Medicine',
      };

      return labels[typeId] || 'Unknown';
    },
  },
  computed: {
    filteredData() {
      const lowerCaseFilter = this.filter.toLowerCase();
      return this.market.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerCaseFilter) ||
          item.user.name.toLowerCase().includes(lowerCaseFilter) ||
          this.getService(item.typeId).toLowerCase().includes(lowerCaseFilter)
      );
    },
  },
};
</script>

<style lang="scss">
.my-table {
  border-radius: 0.375rem;
}
.q-table tbody tr:nth-child(even) {
  background-color: #f1fff4; /* Warna abu-abu untuk baris genap */
}

.q-table tbody tr:nth-child(odd) {
  background-color: #ffffff; /* Warna putih untuk baris ganjil */
}

.q-table thead th {
  background-color: #069550; /* Ganti dengan warna latar belakang yang Anda inginkan untuk header */
  color: #ffffff; /* Warna teks di header */
  font-weight: bold;
}

.table-rounded thead tr:first-child th:first-child {
  border-radius: 10px 0 0 10px;
}

.table-rounded thead tr:first-child th:last-child {
  border-radius: 0 10px 10px 0;
}

.table-rounded tbody tr {
  border-spacing: 0.25rem 0.25rem;
  row-gap: 1px;
  margin: 10px 0 !important;
}
.q-table tbody tr:hover {
  background-color: initial;
}
.q-table tbody tr:margin {
  margin: 10px 0 !important;
}
</style>
