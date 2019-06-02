<template>
  <div class="dark-background">
    <div class="row">
      <div class="col-md-4 col-sm-12">
        <h2 class="text-white">No progress</h2>
        <no-progress-tasks />
      </div>
      <div class="col-md-4 col-sm-12">
        <h2 class="text-white">In progress</h2>
        <in-progress-tasks />
      </div>
      <div class="col-md-4 col-sm-12">
        <h2 class="text-white">Completed</h2>
        <completed-tasks />
      </div>
    </div>
  </div>
</template>

<script>
  import noProgressTasks from '../components/NoProgressTasks.vue';
  import inProgressTasks from '../components/InProgressTasks.vue';
  import completedTasks from '../components/CompletedTasks.vue';

  export default {
    name: 'dashboard',
    components: {
      noProgressTasks,
      inProgressTasks,
      completedTasks
    },
    data() {
      return {
        user: null,
        users: null,
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
    mounted() {
      this.user = this.$store.state.user;
      this.users = this.$store.state.users;
    }
  }
</script>