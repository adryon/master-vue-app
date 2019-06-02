<template>
	<div>
		<div v-for="item in user.data.completedTasks">
			<div v-if="user.showSearch === true">
				<div 
					class="card m-2" 
					v-bind:class="{ 'border-success': item.priority === 'low', 'border-warning': item.priority === 'medium', 'border-danger': item.priority === 'high' }"
					v-if="item.title.toLowerCase().includes(user.searchInput.toLowerCase())">
		      <div class="card-body">
		        <h5 class="card-title">{{item.title}}</h5>
		        <p class="card-text">{{item.description}}</p>
		        <p class="card-text">Priority: {{item.priority}}</p>
		      </div>
		      <div class="card-footer">
		        <edit-task :task="item" :category="'completedTasks'" />
		        <span>
		          <button class="btn btn-link" data-toggle="dropdown">Delete</button>
		          <div class="dropdown-menu">
		          	<button class="dropdown-item" @click="() => deleteModal(item)">Yes</button>
		          	<button class="dropdown-item">No</button>
		          </div>
		        </span>
		        <span>
		          <button class="btn btn-link" data-toggle="dropdown">Move to...</button>
		          <div class="dropdown-menu">
		          	<button class="dropdown-item" @click="() => moveModal(item, 'completedTasks', 'noProgressTasks')">No Progress</button>
		          	<button class="dropdown-item" @click="() => moveModal(item, 'completedTasks', 'inProgressTasks')">In Progress</button>
		          </div>
		        </span>
		      </div>
		    </div>
			</div>
			<div v-else>
				<div class="card m-2" v-bind:class="{ 'border-success': item.priority === 'low', 'border-warning': item.priority === 'medium', 'border-danger': item.priority === 'high' }">
		      <div class="card-body">
		        <h5 class="card-title">{{item.title}}</h5>
		        <p class="card-text">{{item.description}}</p>
		        <p class="card-text">Priority: {{item.priority}}</p>
		      </div>
		      <div class="card-footer">
		        <edit-task :task="item" :category="'completedTasks'" />
		        <span>
		          <button class="btn btn-link" data-toggle="dropdown">Delete</button>
		          <div class="dropdown-menu">
		          	<button class="dropdown-item" @click="() => deleteModal(item)">Yes</button>
		          	<button class="dropdown-item">No</button>
		          </div>
		        </span>
		        <span>
		          <button class="btn btn-link" data-toggle="dropdown">Move to...</button>
		          <div class="dropdown-menu">
		          	<button class="dropdown-item" @click="() => moveModal(item, 'completedTasks', 'noProgressTasks')">No Progress</button>
		          	<button class="dropdown-item" @click="() => moveModal(item, 'completedTasks', 'inProgressTasks')">In Progress</button>
		          </div>
		        </span>
		      </div>
		    </div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex';
	import EditTask from './EditTask.vue';

	export default {
		name: 'completedTasks',
		components: {
      EditTask,
    },
		data() {
			return {
				users: null,
				results: [],
			}
		},
		methods: {
			...mapActions(['moveTask', 'deleteTask']),
			deleteModal(task) {
				const payload = {
					taskUID: task.uid,
					userUID: this.user.data.uid,
					category: 'completedTasks',
				}
				this.deleteTask(payload)
			},
			moveModal(item, from, where) {
				const payload = {
					task: item,
					userUID: this.user.data.uid,
					from: from,
					where: where
				}
				this.moveTask(payload);
			},
		},
		computed: {
			user: function() {
				return this.$store.state.user;
			}
		},
	}
</script>