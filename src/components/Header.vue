<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light" >
	  <a class="navbar-brand" href="/dashboard">Tasker</a>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>

	  <div class="collapse navbar-collapse" id="navbarSupportedContent">
	    <ul class="navbar-nav mr-auto">
	      <li class="nav-item active">
	      </li>
	    </ul>
	    <form class="form-inline my-2 my-lg-0">
	      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" @input="searchTasks"/>
	    </form>
	    <button class="btn btn-outline-success my-2 my-sm-0" type="button" data-toggle="modal" data-target="#addTaskModal">Add Task</button>
      <div class="modal" id="addTaskModal">
			  <div class="modal-dialog">
			    <div class="modal-content">

			      <div class="modal-header">
			        <h4 class="modal-title">New Task</h4>
			        <button type="button" class="close" data-dismiss="modal">&times;</button>
			      </div>

			      <div class="modal-body">
			        <form @submit.prevent="submit">
					    	<div class="form-group">
							    <label>Title</label>
							    <input 
							    	type="text" 
							    	class="form-control" 
							    	placeholder="Enter a title" 
							    	name="title" 
							    	required
							    	v-model="title"
							    />
							  </div>
							  <div class="form-group">
							    <label>Description</label>
							    <textarea 
							    	type="text" 
							    	class="form-control" 
							    	placeholder="Enter a description" 
							    	name="description" 
							    	required
							    	v-model="description"
							    />
							  </div>
							  <div class="form-group">
							    <label>Assign to...</label>
							    <input 
							    	type="text" 
							    	class="form-control" 
							    	placeholder="Search ..." 
							    	name="assignedSearch" 
							    	v-model="assignedSearchInput"
							    	@input="handleAssignedSearch"
							    />
							  </div>
							  <ul class="list-group" v-if="showUsersList">
							  	<li class="list-group-item" v-for="user in usersList">
							  		{{user.name}}
							  		<button type="button" class="btn btn-primary float-right" @click="() => onUserClick(user)">Select</button>
								  </li>
								</ul>
								<div v-if="showSelectedUser">
									<div>
								  	<p>Assigned user: {{assignedUser.name}}</p>
								  	<button type="button" class="btn btn-danger btn-small" @click="removeAssignedUser">Remove</button>
								  </div>
								</div>

								<div class="form-group">
								  <label>Priority:</label>
								  <select class="form-control" name="priority" v-model="priority">
								    <option class="text-success" value="low">Low</option>
								    <option class="text-warning" value="medium">Medium</option>
								    <option class="text-danger" value="high">High</option>
								  </select>
								</div>
			          <div class="form-group">
							  	<button type="submit" class="btn btn-primary" value="Submit">Create a task!</button>
							  </div>
							</form>
			      </div>

			      <div class="modal-footer">
			        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
			      </div>

			    </div>
			  </div>
			</div>
	    <ul class="nav navbar-nav navbar-right">
	    	<li class="nav-item dropdown">
		      <div class="inset dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
            <img src="http://rs775.pbsrc.com/albums/yy35/PhoenyxStar/link-1.jpg~c200" alt="placeholder"/>
          </div>
		      <div class="dropdown-menu dropdown-menu-right">
		      	<div class="dropdown-header">{{user && user.data ? user.data.email : null}}</div>
					  <div class="dropdown-divider"></div>
		        <a class="dropdown-item" href="javascript: void(0);" @click="logOutUser()">Sign Out</a>
		      </div>
		    </li>
      </ul>
	  </div>
	</nav>
</template>

<script>
	import { mapActions } from 'vuex';
	import _ from  'lodash';

	export default {
		name: 'register',
		data() {
			return {
				user: null,
				title: '',
	    	description: '',
	    	priority: '',
	    	assignedSearchInput: '',
	    	assignedUser: {},
	    	showUsersList: false,
	    	showSelectedUser: false,
	    	usersList: []
			}
		},
		methods: {
			...mapActions(['logOut', 'newTask', 'updateSearchInput', 'dismissSearchInput']),
			submit() {
		    const payload = {
		    	task: {
		    		title: this.title,
			  		description: this.description,
			    	priority: this.priority,
		    	},
		    	uid: this.assignedUser.uid,
		  	}
		    this.newTask(payload);
		  },
		  handleAssignedSearch(event) {
		  	var usersList = [];

		  	this.users.data.map(user => {
		  		if (user.name.toLowerCase().includes(event.target.value.toLowerCase())) {
		  			usersList.push(user);
		  		}
		  	})

		  	this.showUsersList = true;
		  	this.usersList = usersList;
		  },
		  onUserClick(user) {
		  	this.assignedUser = user;
		  	this.showUsersList = false;
		  	this.showSelectedUser = true;
		  	this.assignedSearchInput = '';
		  },
		  removeAssignedUser() {
		  	this.assignedUser = {};
		  	this.showUsersList = false;
		  	this.showSelectedUser = false;
		  },
		  searchTasks(event) {
		  	if (event.target.value !== '') {
		  		this.updateSearchInput(event.target.value);
		  	} else {
		  		this.dismissSearchInput();
		  	}
		  },
			logOutUser() {
				this.logOut().then(result => {
					this.$router.push({path: 'login',});
				})
			}
		},
		mounted() {
			this.user = this.$store.state.user;
			this.users = this.$store.state.users;
		}
	}
</script>