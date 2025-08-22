<template>
  <div class="p-6">
    <router-link to="/users" class="text-blue-500 mb-4 block">
      <v-icon>mdi-arrow-left</v-icon> Back
    </router-link>

    <Loading v-if="isLoading" />

    <div v-if="!isLoading">
      <h1 class="text-2xl font-bold mb-4">
        {{ isNewUser ? 'Create New User' : 'Edit User' }}
      </h1>

      <div class="bg-white p-6 rounded-xl">
        <v-form @submit.prevent="onSubmit" class="space-y-4">
          <v-text-field
            v-model="name"
            label="Name"
            variant="outlined"
            :error-messages="errors.name"
            required
          />
          <v-text-field
            v-model="username"
            label="Username"
            variant="outlined"
            :error-messages="errors.username"
            required
          />
          <v-text-field
            v-model="email"
            label="Email"
            variant="outlined"
            :error-messages="errors.email"
            required
          />
          <v-text-field
            v-model="phone"
            label="Phone"
            variant="outlined"
            :error-messages="errors.phone"
            required
          />
          <v-autocomplete
            v-model="city"
            :items="cities"
            label="City"
            variant="outlined"
            clearable
            :error-messages="errors['address.city']"
            required
          />

          <v-btn type="submit" color="primary">{{
            isNewUser ? 'Save' : 'Update'
          }}</v-btn>
        </v-form>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <Confirm
      v-model="showConfirm"
      title="Confirm Submission"
      :message="isNewUser ? 'Create this user?' : 'Update this user?'"
      :loading="isLoadingSubmit"
      @confirm="onConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/stores/user'
import { showToast } from '@/utils/toast'
import Loading from '@/components/Loading.vue'
import Confirm from '@/components/modals/Confirm.vue'
import type { NewUserPayload } from '@/types/User'

// Router and store
const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string
const userStore = useUserStore()

// Reactive states
const isLoading = ref(false)
const isLoadingSubmit = ref(false)
const showConfirm = ref(false)
let pendingSubmit: (() => void) | null = null

// Cities
const cities = [
  'Jakarta',
  'Bandung',
  'Surabaya',
  'Yogyakarta',
  'Medan',
  'Denpasar'
]

const isNewUser = computed(() => slug === 'create')

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

// Vee-validate
const schema = yup.object({
  name: yup.string().required('Name is required'),
  username: yup
    .string()
    .required('Username is required')
    .test('unique', 'Username already exists', (value) => {
      if (!value) return true
      const currentId = isNewUser.value ? null : slug.replace('/edit', '')
      return !userStore.users.some(
        (u) => u.username === value && u.id.toString() !== currentId
      )
    }),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required'),
  address: yup.object({ city: yup.string().required('City is required') })
})

const { handleSubmit, errors, resetForm } = useForm<NewUserPayload>({
  validationSchema: schema,
  initialValues: {
    name: '',
    username: '',
    email: '',
    phone: '',
    address: { city: '' }
  }
})

const { value: name } = useField('name')
const { value: username } = useField('username')
const { value: email } = useField('email')
const { value: phone } = useField('phone')
const { value: city } = useField<string | null>('address.city')

const fetchUserData = async () => {
  if (isNewUser.value) return resetForm()
  const id = Number(slug)
  try {
    isLoading.value = true
    await userStore.fetchUser(id)
    if (userStore.user) {
      const u = userStore.user
      resetForm({
        values: {
          name: u.name,
          username: u.username,
          email: u.email,
          phone: u.phone,
          address: { city: u.address.city }
        }
      })
    }
  } catch (e: any) {
    showToast.error(e.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchUserData)

const submitCreate = handleSubmit(async (values) => {
  try {
    await userStore.createUser(values)
    showToast.success('User created!')

    router.push('/users')
  } catch (e: any) {
    showToast.error(e.message)
  }
})

const submitEdit = handleSubmit(async (values) => {
  const id = Number(slug)

  try {
    await userStore.updateUser(id, values)
    showToast.success('User updated!')
    router.push('/users')
  } catch (e: any) {
    showToast.error(e.message)
  }
})

const onSubmit = handleSubmit(() => {
  pendingSubmit = isNewUser.value ? submitCreate : submitEdit
  showConfirm.value = true
})

const onConfirm = async () => {
  isLoadingSubmit.value = true
  if (pendingSubmit) await pendingSubmit()
  pendingSubmit = null
  isLoadingSubmit.value = false

  showConfirm.value = false
}
</script>
