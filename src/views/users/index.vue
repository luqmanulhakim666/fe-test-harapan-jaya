<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <v-spacer />
      <v-btn
        color="primary"
        variant="flat"
        class="text-white capitalize"
        @click="createUser"
      >
        Create User
      </v-btn>
    </div>

    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
    >
      <v-text-field
        v-model="searchQuery"
        variant="solo"
        append-inner-icon="mdi-magnify"
        placeholder="Search users..."
        class="w-full md:w-1/2"
      />
      <v-spacer />
      <v-select
        v-model="sort"
        :items="['asc', 'desc']"
        variant="solo"
        label="Sort"
        class="w-32"
      />
      <v-select
        v-model="perPage"
        :items="[3, 6, 9]"
        variant="solo"
        label="Per page"
        class="w-32"
      />
    </div>

    <Loading v-if="userStore.loading" />

    <div v-else>
      <div
        v-if="paginatedUsers.length"
        class="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <UserCard
          v-for="user in paginatedUsers"
          :key="user.id"
          :user="user"
          @click="openUserDetail(user)"
          class="cursor-pointer"
        >
          <template #actions>
            <div class="flex gap-2">
              <v-btn color="yellow" small @click.stop="editUser(user.id)">
                <span class="capitalize">
                  <v-icon size="14">mdi-pencil</v-icon>
                  Edit
                </span>
              </v-btn>
              <v-btn color="red" small @click.stop="confirmDelete(user.id)">
                <span class="capitalize">
                  <v-icon size="14">mdi-delete</v-icon>
                  Delete
                </span>
              </v-btn>
            </div>
          </template>
        </UserCard>
      </div>
      <NotFound v-else />
    </div>

    <Pagination
      v-if="totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:page="currentPage = $event"
      class="mt-8"
    />

    <UserDetailModal v-model="showDetailModal" :user="selectedUser" />
    <Confirm
      v-model="showConfirm"
      title="Delete User"
      message="Are you sure you want to delete this user?"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import UserCard from '@/components/cards/UserCard.vue'
import NotFound from '@/components/cards/NotFound.vue'
import Loading from '@/components/Loading.vue'
import Pagination from '@/components/Pagination.vue'
import Confirm from '@/components/modals/Confirm.vue'
import UserDetailModal from '@/components/modals/UserDetail.vue'
import { usePageTitle } from '@/components/composables/usePageTitle'
import { showToast } from '@/utils/toast'
import type { User } from '@/types/User'

usePageTitle('Users')

const userStore = useUserStore()
const router = useRouter()

const searchQuery = ref('')
const perPage = ref(3)
const sort = ref('asc')
const currentPage = ref(1)

const showConfirm = ref(false)
const userToDelete = ref<number | null>(null)
const showDetailModal = ref(false)
const selectedUser = ref<User | null>(null)

onMounted(() => {
  if (!userStore.users.length) userStore.fetchUsers()
})

watch([searchQuery, perPage], () => (currentPage.value = 1))

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return userStore.users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.address.city.toLowerCase().includes(query)
  )
})

const searchRules = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return userStore.users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.address.city.toLowerCase().includes(query)
  )
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredUsers.value.length / perPage.value))
)
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value

  const temp = filteredUsers.value.slice(start, start + perPage.value)

  return temp.sort((a, b) => {
    if (sort.value === 'asc') {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
    }

    if (a.name < b.name) return 1
    if (a.name > b.name) return -1
    return 0
  })
})

const createUser = () => router.push('/users/create')
const editUser = (id: number) => router.push(`/users/${id}`)
const openUserDetail = (user: User) => {
  selectedUser.value = user
  showDetailModal.value = true
}
const confirmDelete = (id: number) => {
  userToDelete.value = id
  showConfirm.value = true
}
const onConfirmDelete = async (done: () => void) => {
  if (!userToDelete.value) return done()
  try {
    await userStore.deleteUser(userToDelete.value)
    showToast.success('User deleted successfully!')
    userToDelete.value = null
  } catch {
    showToast.error('Failed to delete user.')
  } finally {
    done()
  }
}
</script>
