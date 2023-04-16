<template>
  <section class="seller-register main-layout full">
    <h1>Become a Seller</h1>
    <form>
      <label class="flex">
        <span class="flex column">
          Full Name
          <p>Ex.John Smith</p>
        </span>
        <input />
      </label>
      <label class="flex">
        <span>
          Username
          <p>this name will be shown to other users</p>
        </span>
        <input />
      </label>
      <label class="flex">
        <span>
          Password
          <p>4 characters or more</p>
        </span>
        <input />
      </label>
      <label class="flex">
        <span>
          Profile Picture
          <p>Add a profile picture of yourself so customers will know exactly who they’ll be working with.</p>
        </span>
        <input />
      </label>

      <section class="img-profile-uploader">
        <div class="img-container">
          <img src="../assets/img/profile-default-img.png" />
        </div>
      <label for="imgUpload"></label>
      <input class="upload-file" type="file" accpet="img/" id="imgUpload" />
    </section>

      <label class="flex">
        <span>
          Description
          <p>Share a bit about your work experience, cool projects you’ve completed, and your area of expertise.</p>
        </span>
        <textarea></textarea>
      </label>
      
      <label class="flex">
        <span>
          Country
          <p>Where are you from?</p>
        </span>
        <input />
      </label>
    </form>

    <div class="btns flex space-between">
        <button class="cancel-btn" @click="$router.push('/#')" >Cancel</button>
      <button @submit="hadleSubmit">Sign up</button>
      </div>
  </section>
</template>

<script>
export default {};
</script>

