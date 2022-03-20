<template>
  <div>
    <div>
      <h1>Login</h1>
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
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="login()"
          >
            Login
          </v-btn>
          <v-btn color="error" class="mr-4" @click="logout()"> Logout </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        </v-form>
      </div>
    </v-container>
  </div>
</template>
<script>
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../plugins/firebaseinit";
export default {
  data: () => ({
    csDoc: [],
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
    logout() {
      signOut(auth)
        .then(() => {
          this.$router.replace("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    login() {
      //const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User = " + user);
          // ...
          this.LoginActive = false;
          this.$router.replace("/About");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
    },
  },
};
</script>
<style></style>
