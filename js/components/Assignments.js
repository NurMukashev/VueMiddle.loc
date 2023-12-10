import AssignmentList from "./AssignmentList.js";
export default{

    components: { AssignmentList },

    template: `
        <assignment-list :assignments="filters.inProgress" title="InProgress"></assignment-list>
        <assignment-list :assignments="filters.completed" title="Completed"></assignment-list>
        
        <form @submit.prevent="add">
            <div class="text-black border border-gray-600">
                <input v-model="newAssignment" placeholder="New Assignment" type="text" class="p-2">
                <button type="submit" class="bg-white p-2 border-l">Add</button>
            </div>
        </form>
    `,

    data(){
      return {
        assignments: [
            {name:'Finish the project', complete:false, id:1},
            {name:'Meeting with partners', complete:false, id:2},
            {name:'Hire a consultant', complete:false, id:3},
        ],

        newAssignment: '',
      };
    },

    computed: {
        filters(){
            return {
                inProgress: this.assignments.filter(assignment => !assignment.complete),
                completed: this.assignments.filter(assignment => assignment.complete)
            };
        },
    },

    methods: {
        add(){
            this.assignments.push({
                name: this.newAssignment,
                completed: false,
                id: this.assignments.length + 1,
            });

            this.newAssignment = '';
        },
    },

}