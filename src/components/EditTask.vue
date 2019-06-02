<template>
	<span>
		<button class="btn btn-link" data-toggle="modal" data-target="#editTaskModal">Edit</button>
    <div class="modal" id="editTaskModal">
      <form @submit.prevent="submit">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">New Task</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
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
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-success" value="Submit">Save</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </form>
    </div>
	</span>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		name: 'editTask',
		props: ['task', 'category'],
		data() {
			return {
				title: '',
	      description: '',
	      priority: '',
	      assignedSearchInput: '',
	      assignedUser: {},
	      showUsersList: false,
	      showSelectedUser: true,
	      usersList: [],
	      uid: ''
			}
		},
		methods: {
			...mapActions(['editTask']),
		  submit() {
		  	const payload = {
		  		task: {
		  			title: this.title,
			  		description: this.description,
			    	priority: this.priority,
		  		},
		  		userUID: this.assignedUser.uid,
		  		taskUID: this.uid,
		  		category: this.category
		  	}
		    this.editTask(payload);
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
		},
		mounted() {
			this.title = this.task.title;
			this.description = this.task.description;
			this.priority = this.task.priority;
			this.uid = this.task.uid;
			this.user = this.$store.state.user;
			this.assignedUser = this.user.data;
		}
	}
</script>