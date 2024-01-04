import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from "./AssignmentCreate.js";
import AssignmentTags from "./AssignmentTags.js";
export default{

    components: {
        AssignmentList,
        AssignmentCreate,
        AssignmentTags,
    },

    template: `
        <assignment-tags
            v-model:currentTag="currentTag" 
            :initial-tags="assignments.map(a => a.tag)"
        />
        <assignment-list :assignments="filters.inProgress" title="InProgress"></assignment-list>
        <assignment-list :assignments="filters.completed" title="Completed"></assignment-list>
        
        <assignment-create @add="add"></assignment-create>
    `,

    data(){
      return {
        assignments: [],

        currentTag: 'all',
      };
    },

    computed: {
        filters(){
            return {
                inProgress: this.filteredAssignments.filter(assignment => !assignment.complete),
                completed: this.filteredAssignments.filter(assignment => assignment.complete)
            };
        },
        filteredAssignments(){
            if(this.currentTag === 'all'){
                return this.assignments;
            }

            return this.assignments.filter(a => a.tag === this.currentTag);
        },
    },

    created(){
      fetch('http://localhost:3001/assignments')
          .then(response => response.json())
          .then(assignments => {
              this.assignments = assignments;
          });
    },

    methods: {
        add(name){
            this.assignments.push({
                name: name,
                completed: false,
                id: this.assignments.length + 1,
            });
        },
    },

}