<script>
export default {
  name: "ErrPage",
  props: {
    errorCode: {
      type: String,
      required: false,
    },
    errorTitle: {
      type: String,
      required: false,
    },
    errorDescription: {
      type: String,
      required: false,
    },
  }
}
</script>

<template>
  <div class="text-center mb-4" style="height: 245px;">
      <div class=" card w-50 mx-auto" style="background-color: rgba(0, 0, 0, 0.3); border-radius: 50px;">
        <!-- 👉 Title and subtitle -->
    <h1 v-if="errorCode" class=" text-white text-h1 font-weight-medium">
      {{errorCode }}
    </h1>
    <h5 v-if="errorTitle" class=" text-white text-h5 font-weight-medium mb-3">
      {{errorTitle }}
    </h5>
    <p v-if="errorDescription" class="text-white">
      {{errorDescription }}
    </p>
      </div>
  </div>
</template>
