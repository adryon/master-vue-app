<template>
	<div class="app-header">
		<strong class="mb-3 text-white">Register</strong>
		<div class="col-lg-4">
			<div class="card">
			  <div class="card-body">
			  	<div class="container">
				    <form @submit.prevent="submit">
				    	<div class="form-group">
						    <label>Full Name</label>
						    <input 
						    	type="text" 
						    	class="form-control" 
						    	placeholder="Enter your name" 
						    	name="name" 
						    	required
						    	v-model="name"
						    />
						  </div>
						  <div class="form-group">
						    <label>Email address</label>
						    <input 
						    	type="email" 
						    	class="form-control" 
						    	placeholder="Enter email" 
						    	name="email" 
						    	required
						    	v-model="email"
						    />
						  </div>
						  <div class="form-group">
						    <label>Password</label>
						    <input 
						    	type="password" 
						    	class="form-control" 
						    	placeholder="Password" 
						    	name="password"
						    	required 
						    	v-model="password"
						    />
						  </div>
						  <div class="form-group">
						    <label>Confirm Password</label>
						    <input 
						    	type="password" 
						    	class="form-control" 
						    	placeholder="Confirm Password" 
						    	name="confirmPassword"
						    	required 
						    	v-model="confirmPassword"
						    />
						  </div>
						  <div class="form-group">
		            <span class="paragraph">
                  <a href="javascript: void(0);" @click="goToLogin()">
                    Login
                  </a> if you already have an account!
                </span>
		          </div>
		          <div class="form-group">
						  	<button type="submit" class="btn btn-primary" value="Submit">Create an account</button>
						  </div>
						</form>
					</div>
			  </div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
	  name: 'register',
	  data() {
	    return {
	      name: '',
	    	email: '',
	    	password: '',
	    	confirmPassword: '',
	    };
	  },
	  methods: {
	    ...mapActions(['register']),
		  submit() {
		    const payload = {
		    	name: this.name,
		    	email: this.email,
		    	password: this.password,
		    }
		    this.register(payload);
		  },
	    goToLogin() {
	      this.$router.push({path: 'login',});
	    },
	  },
	};
</script>

<style>
.app-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: black;
}
</style>