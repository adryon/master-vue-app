<template>
	<div class="App-header">
		<strong class="mb-3 text-white">Login</strong>
		<div class="col-lg-4">
			<div class="card">
			  <div class="card-body">
			  	<div class="container">
				    <form @submit.prevent="submit">
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
						  	<span class="paragraph">
                  <a href="javascript: void(0);" @click="goToRegister()">
                    Register
                  </a> if you don't have an account!
                </span>
		          </div>
		          <div class="form-group">
						  	<button type="submit" class="btn btn-primary" value="Submit">Login</button>
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
	  name: 'login',
	  data() {
	    return {
	    	email: '',
	    	password: '',
	    };
	  },
	  methods: {
	    ...mapActions(['login']),
		  submit() {
		    const payload = {
		    	email: this.email,
		    	password: this.password,
		    }
		    this.login(payload).then(result => {
		    	if (result) {
		    		this.$router.push({path: 'dashboard',});
		    	}
		    });
		  },
	    goToRegister() {
	      this.$router.push({path: 'register',});
	    },
	  },
	};
</script>