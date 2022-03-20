<template>
  <div>
    <div>
      <h1>Register</h1>
    </div>
    <v-container>
      <div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            type="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :counter="18"
            :rules="passRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn color="success" class="mr-4" @click="register()">
            Register
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        </v-form>
      </div>
    </v-container>
  </div>
</template>
<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../plugins/firebaseinit";
export default {
  data: () => ({
    valid: true,
    email: "",
    password: "",
    passRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length <= 12) || "Password must be less than 12 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    register() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          data.user
            .updateProfile({
              user: this.email,
            })
            .then((userCredential) => {
              const user = userCredential.user;
              console.log("User = " + user);
              this.LoginActive = false;
              this.$router.replace("/Login");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
          // ..
        });
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
<style></style>
